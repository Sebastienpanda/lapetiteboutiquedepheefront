import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { supabase } from '@auth/supabase-client';
import { userStore } from '@core/state/user/user-store';

@Component({
    selector: 'app-chat-test',
    imports: [CommonModule, FormsModule],
    templateUrl: './test.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatTestComponent implements OnDestroy {
    message = '';
    readonly messages = signal<{ content: string; sender_id: string, image_url?: string; }[]>([]);
    private conversationId = '41da87c7-a02f-43ca-9924-82739a71b076';
    private readonly store = inject(userStore);
    selectedFile: File | null = null;


    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.selectedFile = input.files[0];
        }
    }

    protected get userId() {
        console.log(this.store.user());
        return this.store.user()?.id ?? '';
    }

    get username() {
        return this.store.user()?.user_metadata['username'] ?? 'Moi';
    }

    private readonly channelName = `conversation-${this.conversationId}`;

    private channel = supabase.channel(this.channelName);

    constructor() {
        this.listenToMessages();
        void this.fetchHistory();
    }

    async fetchHistory() {
        const { data, error } = await supabase
            .from('messages')
            .select('content, sender_id,image_url')
            .eq('conversation_id', this.conversationId)
            .order('created_at', { ascending: true });

        if (!error && data) {
            this.messages.set(data);
        }
    }

    listenToMessages() {
        this.channel = supabase
            .channel(this.channelName)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${this.conversationId}`,
                },
                (payload) => {
                    console.log('🔁 Nouveau message reçu via Realtime:', payload);
                    this.messages.update((prev) => [...prev, payload.new as { content: string; sender_id: string }]);
                },
            )
            .subscribe((status) => {
                console.log('📡 Subscription status:', status);
            });
        console.log('🧪 Subscription setup complete for conversation:', this.conversationId);
    }

    async send() {
        if (!this.userId) {
            console.error('User ID manquant');
            return;
        }

        let imageUrl: string | null = null;

        // 1. Upload image si présente
        if (this.selectedFile) {
            const safeName = this.selectedFile.name.replace(/[^a-z0-9.\-_]/gi, '_');
            const fileName = `${Date.now()}-${safeName}`;
            const { data, error } = await supabase.storage
                .from('chat-uploads')
                .upload(`messages/${fileName}`, this.selectedFile);

            if (error) {
                console.error('Erreur upload image', error.message);
                return;
            }

            imageUrl = supabase.storage
                .from('chat-uploads')
                .getPublicUrl(`messages/${fileName}`).data.publicUrl;
        }

        // 2. Insert message avec ou sans image
        const { error: insertError } = await supabase.from('messages').insert([
            {
                conversation_id: this.conversationId,
                sender_id: this.userId,
                content: this.message || null,
                image_url: imageUrl,
            },
        ]);

        if (insertError) {
            console.error('Erreur insert message', insertError.message);
        }

        this.message = '';
        this.selectedFile = null;
    }

    ngOnDestroy() {
        void this.channel.unsubscribe();
        void supabase.removeChannel(this.channel);
    }
}
