import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CartItem } from '@core/cart/cart-item-model';
import { CartService } from '@core/cart/cart-service';
import { CheckoutService } from '@core/checkout/checkout-service';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { DecimalPipe } from '@angular/common';
import { ResponsiveImageComponent } from '@shared/component/response-images/responsive-image';

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


        // try {
        //     const res = await firstValueFrom(
        //         // this.checkout.createCheckoutSession(items),
        //     );
        //     window.location.href = res.url;
        // } catch (error) {
        //     console.error('Erreur lors de la redirection Stripe :', error);
        // }
    }

    removeItem(item: CartItem) {

    }
}
