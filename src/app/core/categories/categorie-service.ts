import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Categorie } from '@core/categories/categorie-model';
import { environment } from '@environments/environment';
import { shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    private readonly http = inject(HttpClient);

    getAllCategories() {
        return this.http
            .get<Categorie[]>(`${environment.apiUrl}/categories/all`)
            .pipe(
                shareReplay(1),
            );
    }
}
