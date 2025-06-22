import { Injectable } from '@angular/core';
import { supabase } from '@auth/supabase-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    supabase = supabase;
    currentUser = new BehaviorSubject<{
        email: string;
        username?: string;
    } | null>(null);

    constructor() {
        this.listenToAuthChanges();
        this.init();
    }

    private listenToAuthChanges() {
        this.supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                this.currentUser.next({
                    email: session.user.email ?? '',
                    username: session.user.user_metadata?.['username'] ?? '',
                });
            } else if (event === 'SIGNED_OUT') {
                this.currentUser.next(null);
            }
        });
    }

    signUp(
        email: string | undefined,
        password: string | undefined,
        name: string | undefined,
    ) {
        return this.supabase.auth.signUp({
            email: email ?? '',
            password: password ?? '',
            options: {
                data: {
                    username: name ?? '',
                },
                emailRedirectTo: 'http://localhost:4200/confirmation-email',
            },
        });
    }

    signIn(email: string | undefined, password: string | undefined) {
        return this.supabase.auth.signInWithPassword({
            email: email ?? '',
            password: password ?? '',
        });
    }

    signOut() {
        return this.supabase.auth.signOut();
    }

    private init() {
        void this.logCurrentSession();
    }

    private async logCurrentSession() {
        const { data, error } = await this.supabase.auth.getSession();
        if (error) {
            console.error('Erreur session :', error.message);
            return;
        }

        const user = data.session?.user;
        if (user) {
            this.currentUser.next({
                email: user.email ?? '',
                username: user.user_metadata?.['username'] ?? '',
            });
        }
    }
}
