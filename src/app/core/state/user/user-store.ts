import { inject } from '@angular/core';
import type { UserState } from '@core/user/user-model';
import { UserService } from '@core/user/user-service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const userStore = signalStore(
    { providedIn: 'root' },
    withState<UserState>({
        user: null,
        loading: false,
        error: null,
    }),

    withMethods((store) => {
        const userService = inject(UserService);

        return {
            loadUser(supabaseId: string): void {
                patchState(store, { loading: true, error: null });

                userService.getUserBySupabaseId(supabaseId).subscribe({
                    next: (res: any) => {
                        const user = res;
                        patchState(store, { user, loading: false });
                    },
                    error: (err) => {
                        patchState(store, {
                            error: err.message ?? 'Erreur inconnue',
                            loading: false,
                        });
                    },
                });
            },
        };
    }),
);
