import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    inject,
    type OnInit,
    signal,
    viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/cart/cart-service';
import { ResponsiveImageComponent } from '@shared/component/response-images/responsive-image';
import { LucideAngularModule, ShoppingBag } from 'lucide-angular';

@Component({
    selector: 'app-panier',
    templateUrl: './panier.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LucideAngularModule, RouterLink, ResponsiveImageComponent],
})
export class Panier implements OnInit {
    protected readonly ShoppingBag = ShoppingBag;
    readonly isCartOpen = signal(false);
    readonly cartService = inject(CartService);
    readonly cartItemsCount = inject(CartService).cartItemsCount;
    readonly cartMenuRef = viewChild('cartMenuRef', { read: ElementRef });
    readonly cartButtonRef = viewChild('cartButtonRef', { read: ElementRef });

    readonly lastCartItems = this.cartService.lastCartItems;

    ngOnInit(): void {
        void this.cartService.initializeCartItemsFromServer();
    }

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
