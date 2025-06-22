import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Product } from '@core/products/product-model';
import { environment } from '@environments/environment';
import { from, map, shareReplay } from 'rxjs';
import { supabase } from '@auth/supabase-client';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private readonly apiUrl = environment.apiUrl;
    private readonly http = inject(HttpClient);
    private readonly slug = signal<string | null>(null);
    readonly search = signal('');

    setSlug(slug: string): void {
        this.slug.set(slug);
    }

    getProductBySlug() {
        const slug = this.slug();
        if (!slug) return null;
        return this.http.get<Product>(`${this.apiUrl}/products/show/${slug}`).pipe(
            shareReplay(1),
        );
    }

    getFeaturedProducts(userId?: string) {
        const query = supabase
            .from('products')
            .select(`
            id,
            name,
            description,
            slug,
            price,
            categorie:categories (
                id,
                name
            ),
            images:product_images (
                id,
                image_url,
                cover
            ),
            favori:favoris (
                id,
                liked,
                application_user_id
            )
        `)
            .eq('show_on_homepage', true)
            .eq('images.cover', true);

        if (userId) {
            void query.eq('favori.application_user_id', userId);
        }

        return from(query).pipe(
            map(({ data, error }) => {
                if (error) throw new Error(error.message);
                return data.map(product => ({
                    ...product,
                    favori: product.favori?.[0] ?? null,
                }));
            }),
            shareReplay(1),
        );
    }

    getProductsPaginated(
        page = 1,
        limit = 6,
    ) {
        const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());


        return this.http
            .get<{ data: Product[]; totalPages: number; page: number; }>(
                `${environment.apiUrl}/products/all?${params.toString()}`,
            );
    }
}
