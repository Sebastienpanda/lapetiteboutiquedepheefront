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
    readonly favoris = signal<Favoris[]>([]);

    getFavorisByProduct(productId: string, userId: string) {
        return from(
            supabase
                .from('favoris')
                .select('*')
                .eq('created_by', userId)
                .eq('product_id', productId)
                .single(),
        );
    }

    async getFavoris(userId: string) {
        const { data, error } = await supabase
            .from('favoris')
            .select(`
            *,
            product:product_id (
                *,
                images:product_images (
                    id,
                    image_url,
                    cover
                )
            )
        `)
            .eq('created_by', userId)
            .filter('product.product_images.cover', 'eq', true);

        if (error) {
            console.error('Erreur récupération favoris :', error.message);
            return;
        }

        this.favoris.set(data ?? []);
    }

    getFavorisCount(userId: string) {
        return from(
            supabase
                .from('favoris')
                .select('*', { count: 'exact', head: true })
                .eq('created_by', userId),
        ).pipe(
            map(({ count, error }) => {
                if (error) {
                    console.error('Erreur récupération favoris :', error.message);
                    return 0;
                }
                return count ?? 0;
            }),
        );
    }

    createFavori(productId: string, userId: string) {
        return from(
            supabase.from('favoris').insert([
                {
                    liked: true,
                    created_by: userId,
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
                .eq('created_by', userId),
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
