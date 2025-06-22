import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth-service';
import type { EmailOtpType } from '@supabase/supabase-js';
import { toast } from 'ngx-sonner';
import { supabase } from '@auth/supabase-client';

@Component({
    selector: 'app-confirm-email',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ``,
    
})
export default class ConfirmEmailComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly auth = inject(AuthService);

    ngOnInit() {
        const token_hash = this.route.snapshot.queryParamMap.get('token_hash');
        const type = this.route.snapshot.queryParamMap.get(
            'type',
        ) as EmailOtpType | null;

        if (!token_hash || !type) {
            toast.error('Lien invalide ou incomplet.');
            void this.router.navigateByUrl('/auth/auth-code-error');
            return;
        }

        this.auth.supabase.auth
            .verifyOtp({ type, token_hash })
            .then(async ({ data, error }) => {
                if (error || !data.user) {
                    toast.error('Erreur de vérification : ' + error?.message);
                    void this.router.navigateByUrl('/auth/auth-code-error');
                } else {
                    const user = data.user;


                    const { data: existingUser } = await supabase
                        .from('application_users')
                        .select('id')
                        .eq('supabase_id', user.id)
                        .maybeSingle();

                    if (!existingUser) {
                        const { error: insertError } = await supabase
                            .from('application_users')
                            .insert({
                                email: user.email,
                                supabase_id: user.id,
                                username: user.user_metadata?.['username'] ?? 'Utilisateur',
                            });

                        if (insertError) {
                            toast.error('Impossible de créer l\'utilisateur : ' + insertError.message);
                            return;
                        }
                    }

                    toast.success('Adresse e-mail vérifiée avec succès ✅');
                    void this.router.navigateByUrl('/profil');
                }
            });
    }
}
