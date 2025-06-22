import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { from, map } from 'rxjs';
import { supabase } from '@auth/supabase-client';

@Injectable({ providedIn: 'root' })
export class UserService {
    protected readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/application-users`;

    getUserBySupabaseId(supabaseId: string) {
        return from(
            supabase
                .from('application_users')
                .select('*')
                .eq('supabase_id', supabaseId)
                .single(),
        ).pipe(
            map(({ data, error }) => {
                if (error) throw new Error(error.message);
                return data;
            }),
        );
    }
}
