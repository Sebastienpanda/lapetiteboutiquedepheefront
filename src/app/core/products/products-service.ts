import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { from, map, shareReplay } from 'rxjs';
import { supabase } from '@auth/supabase-client';
import { Product } from '@core/products/product-model';

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

        return from(
            supabase
                .from('products')
                .select(`
                id,
                name,
                description,
                price,
                stock,
                show_on_homepage,
                slug,
                type,
                categorie:categories (
                    id,
                    name
                ),
                images:product_images (
                    id,
                    image_url,
                    cover
                )
            `)
                .eq('slug', slug)
                .single(),
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                const product: Product = {
                    ...data,
                    categorie: Array.isArray(data.categorie) ? data.categorie[0] : data.categorie,
                };

                return product;
            }),
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

    getProductsPaginated(page = 1, limit = 6, search = '', categoryId: number | null = null) {
        const fromIndex = (page - 1) * limit;
        const toIndex = fromIndex + limit - 1;

        let query = supabase
            .from('products')
            .select(`
			id,
			name,
			description,
			price,
			stock,
			show_on_homepage,
			type,
			slug,
			categorie:categories (
				id,
				name
		 ),
			images:product_images (
				id,
				image_url,
				cover
			)
		`, { count: 'exact' })
            .eq('images.cover', true)
            .range(fromIndex, toIndex);

        if (search) {
            query = query.ilike('name', `%${search}%`);
        }

        if (categoryId) {
            query = query.eq('categorie_id', categoryId);
        }

        return from(query).pipe(
            map(({ data, count, error }) => {
                if (error) throw new Error(error.message);

                const products: Product[] = data.map((item: any) => ({
                    ...item,
                    categorie: item.categorie,
                    images: item.images,
                }));

                return {
                    data: products,
                    totalPages: count ? Math.ceil(count / limit) : 1,
                    page,
                };
            }),
        );
    }

}
