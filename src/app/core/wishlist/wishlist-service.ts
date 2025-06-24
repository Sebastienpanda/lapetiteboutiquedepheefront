import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Product } from '@core/products/product-model';
import type { Wishlist } from '@core/wishlist/wishlist-model';
import { from, map } from 'rxjs';
import { supabase } from '@auth/supabase-client';

@Injectable({ providedIn: 'root' })
export class WishlistService {
    private readonly http = inject(HttpClient);
    readonly wishlists = signal<Wishlist[]>([]);

    async addToWishlist(
        product: Product,
        userId: string,
        name: string,
        note?: string,
    ) {
        const { data: existingWishlist, error: fetchError } = await supabase
            .from('wishlists')
            .select('id')
            .eq('created_by', userId)
            .eq('name', name)
            .maybeSingle();

        if (fetchError) {
            throw new Error('Erreur récupération wishlist : ' + fetchError.message);
        }

        let wishlistId: string;

        if (!existingWishlist) {
            const { data: newWishlist, error: createError } = await supabase
                .from('wishlists')
                .insert([
                    {
                        name,
                        created_by: userId,
                    },
                ])
                .select('id')
                .single();

            if (createError || !newWishlist) {
                throw new Error('Erreur création wishlist : ' + createError?.message);
            }

            wishlistId = newWishlist.id;
        } else {
            wishlistId = existingWishlist.id;
        }

        // 3. Crée wishlist_items AVEC wishlist_id
        const { data: wishlistItem, error: itemError } = await supabase
            .from('wishlist_items')
            .insert([
                {
                    product_id: product.id,
                    note,
                    created_by: userId,
                    wishlist_id: wishlistId,
                },
            ])
            .select('id')
            .single();

        if (itemError || !wishlistItem) {
            throw new Error('Erreur ajout wishlist item : ' + itemError?.message);
        }

        console.log('✅ Produit ajouté à la wishlist !');
    }

    async getWishlists(userId: string) {
        const { data, error } = await supabase
            .from('wishlists')
            .select(`
    *,
    wishlist_items (
      *,
      product:product_id (
        *,
        images:product_images (
          id,
          image_url,
          cover
        )
      )
    )
  `)
            .eq('created_by', userId)
            .filter('wishlist_items.product.product_images.cover', 'eq', true);

        if (error) {
            console.error('Erreur lors de la récupération des wishlists :', error.message);
            throw error;
        }

        this.wishlists.set(data ?? []);
    }

    getWishlistCount(userId: string) {
        return from(
            supabase
                .from('wishlists')
                .select('*', { count: 'exact', head: true })
                .eq('created_by', userId),
        ).pipe(
            map(({ count, error }) => {
                if (error) {
                    console.error('Erreur récupération wishlists :', error.message);
                    return 0;
                }
                return count ?? 0;
            }),
        );
    }

    async createWishlist(userId: string, name: string): Promise<Wishlist> {
        const { data, error } = await supabase
            .from('wishlists')
            .insert([{ name, created_by: userId }])
            .select('*')
            .single();

        if (error || !data) {
            throw new Error('Erreur création de la wishlist : ' + error?.message);
        }

        return data;
    }
}
