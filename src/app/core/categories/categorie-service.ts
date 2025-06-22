import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, map, shareReplay } from 'rxjs';
import { supabase } from '@auth/supabase-client';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    private readonly http = inject(HttpClient);

    getAllCategories() {
        return from(
            supabase
                .from('categories')
                .select('*'),
        ).pipe(
            map(({ data, error }) => {
                if (error) throw new Error(error.message);
                return data;
            }),
            shareReplay(1),
        );
    }
}
