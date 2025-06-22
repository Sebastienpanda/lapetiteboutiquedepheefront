import { inject, Injectable } from '@angular/core';
import type { Resolve } from '@angular/router';
import { AuthService } from '@auth/auth-service';
import { userStore } from '@core/state/user/user-store';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<any> {
    private readonly auth = inject(AuthService);
    private readonly store = inject(userStore);

    async resolve() {
        const session = await this.auth.supabase.auth.getSession();
        const supabaseId = session.data.session?.user?.id;

        if (supabaseId) {
            this.store.loadUser(supabaseId);
        }
    }
}
