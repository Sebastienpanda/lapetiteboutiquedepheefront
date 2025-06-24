import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponsiveImageComponent } from '@shared/component/response-images/responsive-image';
import { LucideAngularModule, ShoppingBag } from 'lucide-angular';
import { cartStore } from '@core/state/cart/cart-store';

@Component({
    selector: 'app-panier',
    templateUrl: './panier.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LucideAngularModule, RouterLink, ResponsiveImageComponent],
})
export class Panier {
    protected readonly ShoppingBag = ShoppingBag;
    readonly isCartOpen = signal(false);
    readonly store = inject(cartStore);
    readonly cartItemsCount = this.store.itemsCount;
    readonly lastCartItems = this.store.lastItems;
    readonly cartMenuRef = viewChild('cartMenuRef', { read: ElementRef });
    readonly cartButtonRef = viewChild('cartButtonRef', { read: ElementRef });

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const menu = this.cartMenuRef();
        const button = this.cartButtonRef();

        if (
            this.isCartOpen() &&
            menu &&
            !menu.nativeElement.contains(target) &&
            button &&
            !button.nativeElement.contains(target)
        ) {
            this.isCartOpen.set(false);
        }
    }

    toggleCart() {
        this.isCartOpen.set(!this.isCartOpen());
    }
}
