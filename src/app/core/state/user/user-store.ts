import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { supabase } from '@auth/supabase-client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const userStore = signalStore(
    { providedIn: 'root' },
    withState<{
        user: SupabaseUser | null;
        loading: boolean;
        error: string | null;
    }>({
        user: null,
        loading: false,
        error: null,
    }),

    withMethods((store) => {
        return {
            async loadUser() {
                patchState(store, { loading: true, error: null });

                const { data, error } = await supabase.auth.getUser();

                if (error || !data?.user) {
                    console.log(error);
                    console.log(data);
                    patchState(store, {
                        error: error?.message ?? 'Utilisateur non connecté',
                        loading: false,
                    });
                    return;
                }

                patchState(store, {
                    user: data.user,
                    loading: false,
                });

                return data.user;
            },
        };
    }),
);
