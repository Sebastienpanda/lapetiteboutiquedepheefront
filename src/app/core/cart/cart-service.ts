import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import type { CartItem } from '@core/cart/cart-item-model';
import { supabase } from '@auth/supabase-client';

const CART_DOCUMENT_ID_STORAGE_KEY = 'app_cart_document_id';

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly http = inject(HttpClient);
    private readonly platformId = inject(PLATFORM_ID);
    readonly cartItems = signal<CartItem[]>([]);
    private readonly cartId = signal<string | null>(this.loadCartId());
    readonly cartItemsCount = computed(() =>
        this.cartItems().reduce((total, item) => total + item.quantity, 0),
    );


    readonly cartProductIds = computed(() => {
        return new Set(this.cartItems().map((item) => item.product?.id));
    });

    readonly lastCartItems = computed(() =>
        [...this.cartItems()].slice(-3).reverse(),
    );

    readonly hasMoreThanThreeItems = computed(() => this.cartItems().length > 3);

    async initializeCartItemsFromServer() {
        const currentCartId = this.cartId();
        if (!currentCartId) return;

        const { data, error } = await supabase
            .from('cart_items')
            .select(`
            id,
            quantity,
            price_at_add,
            product:products (
                id,
                name,
                price,
                slug,
                type,
                images:product_images (
                    id,
                    image_url
                ),
                 categorie:categories (
                    id,
                    name
                )
            )
        `)
            .eq('cart_id', currentCartId)
            .eq('product.images.cover', true);

        if (error) {
            console.error('Erreur récupération panier:', error.message);
            return;
        }

        const cartItems: CartItem[] = (data as any[]).map(item => ({
            id: item.id,
            quantity: item.quantity,
            price_at_add: item.price_at_add,
            product: {
                ...item.product,
                categorie: item.product?.categorie,
            },
        }));

        this.cartItems.set(cartItems);
    }

    async addToCart({ productId, quantity, priceAtAdd }: { productId: number; quantity: number; priceAtAdd: number }) {
        let currentCartId = this.cartId();

        if (currentCartId) {
            const { data: existingCart } = await supabase
                .from('carts')
                .select('id')
                .eq('id', currentCartId)
                .single();

            if (!existingCart) {
                currentCartId = null;
                localStorage.removeItem('cart_id');
                this.cartId.set(null);
            }
        }

        if (!currentCartId) {
            const { data: newCart, error: cartError } = await supabase
                .from('carts')
                .insert([{}])
                .select('id')
                .single();

            if (cartError || !newCart) throw new Error('Cart creation failed');
            currentCartId = newCart.id;
            this.cartId.set(currentCartId);
            this.saveCartId(currentCartId!);
        }

        const { data: cartItem, error: cartItemError } = await supabase
            .from('cart_items')
            .insert([
                {
                    product_id: productId,
                    quantity: quantity,
                    price_at_add: priceAtAdd,
                    cart_id: currentCartId,
                },
            ])
            .select('id')
            .single();

        if (cartItemError || !cartItem) throw new Error('Failed to add cart item');

        await this.initializeCartItemsFromServer();
    }

    async clearCart() {
        const cartId = this.cartId();

        if (cartId) {
            try {
                const { error } = await supabase
                    .from('carts')
                    .delete()
                    .eq('id', cartId);

                if (error) {
                    console.error('Erreur lors de la suppression du panier :', error.message);
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du panier :', error);
            }
        }

        this.cartItems.set([]);
        this.cartId.set(null);

        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(CART_DOCUMENT_ID_STORAGE_KEY);
        }
    }

    private loadCartId(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(CART_DOCUMENT_ID_STORAGE_KEY);
        }

        return null;
    }

    private saveCartId(id: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(CART_DOCUMENT_ID_STORAGE_KEY, id);
        }
    }

    async removeItemFromCart(itemId: string) {
        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('id', itemId);

            if (error) {
                console.error('Erreur lors de la suppression de l\'item :', error.message);
                return;
            }
            
            this.cartItems.update((items) =>
                items.filter((item) => item.id !== itemId),
            );
        } catch (error) {
            console.error('Erreur inattendue lors de la suppression de l\'item :', error);
        }
    }
}
