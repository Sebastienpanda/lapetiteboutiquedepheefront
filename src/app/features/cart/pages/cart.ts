import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CartItem } from '@core/cart/cart-item-model';
import { CartService } from '@core/cart/cart-service';
import { CheckoutService } from '@core/checkout/checkout-service';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { DecimalPipe } from '@angular/common';
import { ResponsiveImageComponent } from '@shared/component/response-images/responsive-image';
import { supabase } from '@auth/supabase-client';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, SectionWrapper, ResponsiveImageComponent, DecimalPipe],
})
export default class Cart implements OnInit {
    private readonly cart = inject(CartService);
    private readonly checkout = inject(CheckoutService);
    readonly cartItems = this.cart.cartItems;

    ngOnInit() {
        void this.cart.initializeCartItemsFromServer();
    }

    subtotal() {
        return this.cartItems().reduce((acc, item) => acc + (item.price_at_add * item.quantity), 0);
    }

    total() {
        return this.subtotal();
    }

    increase(item: CartItem) {
        item.quantity++;
    }

    decrease(item: CartItem) {
        if (item.quantity > 1) {
            item.quantity--;
        }
    }

    clearCart() {
        void this.cart.clearCart();
    }

    async checkoutNow() {
        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
            body: {
                cartItems: this.cartItems().map(item => ({
                    product_id: item.product.id,
                    name: item.product.name,
                    price: item.price_at_add,
                    quantity: item.quantity,
                    images: [item.product.images[0]?.image_url || ''],
                })),
            },
        });

        if (error) {
            console.error('Erreur lors de la création de la session Stripe:', error);
            return;
        }

        if (data?.url) {
            window.location.href = data.url;
        } else {
            console.error('URL de redirection non reçue depuis la function');
        }
    }

    async removeItem(item: CartItem) {
        try {
            await this.cart.removeItemFromCart(item.id);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'item :', error);
        }
    }
}
