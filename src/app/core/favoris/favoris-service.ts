import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Favoris } from '@core/favoris/favoris-model';
import { environment } from '@environments/environment';
import { from, map } from 'rxjs';
import { supabase } from '@auth/supabase-client';

@Injectable({ providedIn: 'root' })
export class FavorisService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;
    readonly _favoris = signal<Favoris[]>([]);

    // async initializeFavorisFromServer(userId: number) {
    // 	const res = await firstValueFrom(
    // 		this.http.get<{ data: Favoris[] }>(
    // 			`${environment.apiUrl}/favoris/all?userId=${userId}`,
    // 		),
    // 	);
    //
    // 	const favoris = res.data.map((item) => ({
    // 		...item,
    // 		product: this.addFullImageUrls(item.product),
    // 	}));
    //
    // 	this._favoris.set(favoris);
    // }

    getFavorisByProduct(productId: string, userId: string) {
        return from(
            supabase
                .from('favoris')
                .select('*')
                .eq('application_user_id', userId)
                .eq('product_id', productId)
                .single(),
        );
    }

    getFavoris(userId: number) {
        return this.http.get<any>(
            `${this.apiUrl}/favoris?filters[application_user][id][$eq]=${userId}`,
        );
    }

    getFavorisCount(userId: number) {
        return this.http
            .get<any>(
                `${this.apiUrl}/favoris?filters[application_user][id][$eq]=${userId}`,
            )
            .pipe(map((res) => res?.data?.length ?? 0));
    }

    createFavori(productId: string, userId: string) {
        return from(
            supabase.from('favoris').insert([
                {
                    liked: true,
                    application_user_id: userId,
                    product_id: productId,
                },
            ]).select('id')
                .single(),
        );
    }

    updateFavori(favoriId: string, liked: boolean, userId: string) {
        return from(
            supabase
                .from('favoris')
                .update({ liked })
                .eq('id', favoriId)
                .eq('application_user_id', userId),
        );
    }

    // private addFullImageUrls(product: Product): Product {
    // 	return {
    // 		...product,
    // 		images: (product.images ?? []).map((gallery) => ({
    // 			...gallery,
    // 			images: addFullImageUrlsToImages(gallery.images),
    // 		})),
    // 	};
    // }
}
