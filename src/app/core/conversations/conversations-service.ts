import { Injectable } from '@angular/core';
import { supabase } from '@auth/supabase-client';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ConversationsService {
    // 🔹 Créer une conversation entre deux utilisateurs
    createConversation(userIds: string[]) {
        return from(
            supabase
                .from('conversations')
                .insert([{ participant_ids: userIds }])
                .select('*')
                .single(),
        );
    }

    // 🔹 Récupérer toutes les conversations de l’utilisateur
    getUserConversations(userId: string) {
        return from(
            supabase
                .from('conversations')
                .select('*')
                .contains('participant_ids', [userId])
                .order('created_at', { ascending: false }),
        ).pipe(map((res) => res.data));
    }

    // 🔹 Récupérer les messages d’une conversation
    getMessages(conversationId: string) {
        return from(
            supabase
                .from('messages')
                .select('*')
                .eq('conversation_id', conversationId)
                .order('created_at', { ascending: true }),
        ).pipe(map((res) => res.data));
    }

    // 🔹 Envoyer un message texte
    sendMessage(conversationId: string, senderId: string, text: string) {
        return from(
            supabase.from('messages').insert([
                {
                    conversation_id: conversationId,
                    sender_id: senderId,
                    text,
                },
            ]),
        );
    }

    // 🔹 Optionnel : envoyer une image
    sendImage(conversationId: string, senderId: string, imageUrl: string) {
        return from(
            supabase.from('messages').insert([
                {
                    conversation_id: conversationId,
                    sender_id: senderId,
                    image_url: imageUrl,
                },
            ]),
        );
    }

   
    listenToNewMessages(conversationId: string, callback: (message: any) => void) {
        return supabase
            .channel('conversation-realtime')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`,
                },
                (payload) => {
                    callback(payload.new);
                },
            )
            .subscribe();
    }
}
