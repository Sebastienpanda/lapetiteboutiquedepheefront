import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    inject,
    OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/cart/cart-service';
import { FavorisService } from '@core/favoris/favoris-service';
import type { Product } from '@core/products/product-model';
import { ProductsService } from '@core/products/products-service';
import { userStore } from '@core/state/user/user-store';
import { ResponsiveImageComponent } from '@shared/component/response-images/responsive-image';
import { Slider } from '@shared/component/slider/slider';
import { SectionIntro } from '@shared/component/ui/sectionIntroComponent/section-intro';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { Heart, LucideAngularModule } from 'lucide-angular';
import { debounceTime, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { toast } from 'ngx-sonner';
import { Button } from '@shared/component/ui/button/button';

@Component({
    selector: 'app-product',
    templateUrl: './product-is-featured.html',
    imports: [
        CommonModule,
        SectionIntro,
        Slider,
        ResponsiveImageComponent,
        SectionWrapper,
        LucideAngularModule,
        RouterLink,
        Button,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('pulseHeart', [
            state('liked', style({ transform: 'scale(1)', opacity: 1 })),
            state('unliked', style({ transform: 'scale(1)', opacity: 1 })),

            transition('* => liked', [
                style({ transform: 'scale(1)', opacity: 1 }),
                animate(
                    '200ms ease-in-out',
                    style({ transform: 'scale(1.3)', opacity: 0.7 }),
                ),
                animate(
                    '100ms ease-in-out',
                    style({ transform: 'scale(1)', opacity: 1 }),
                ),
            ]),

            transition('* => unliked', [
                style({ transform: 'scale(1)', opacity: 1 }),
                animate(
                    '200ms ease-in-out',
                    style({ transform: 'scale(0.8)', opacity: 0.5 }),
                ),
                animate(
                    '100ms ease-in-out',
                    style({ transform: 'scale(1)', opacity: 1 }),
                ),
            ]),
        ]),
    ],
})
export class ProductIsFeatured implements OnInit {
    readonly productsService = inject(ProductsService);
    private readonly cart = inject(CartService);
    readonly featuredProducts = toSignal(this.productsService.getFeaturedProducts(), {
        initialValue: [],
    });
    private readonly favorisService = inject(FavorisService);
    protected readonly userStore = inject(userStore);
    private readonly cdr = inject(ChangeDetectorRef);
    pulseState: Record<string, 'liked' | 'unliked'> = {};
    protected readonly Heart = Heart;
    protected readonly favoriClicks = new Subject<Product>();
    private readonly debounceDuration = 300;

    ngOnInit(): void {
        this.favoriClicks
            .pipe(debounceTime(this.debounceDuration))
            .subscribe((product) => this._toggleFavori(product));
    }

    // isInCart(productId: number) {
    // 	return this.cart.cartProductIds().has(productId);
    // }

    addToCart(event: MouseEvent, product: any) {
        event.preventDefault();
        event.stopPropagation();
        void this.cart.addToCart({
            productId: product.id,
            priceAtAdd: product.price,
            quantity: 1,
        });
    }

    private updateFavoriLocally(
        product: Product,
        favori: { id: string; liked: boolean },
    ) {
        Object.assign(product, {
            ...product,
            favori: { ...favori },
        });
        this.cdr.markForCheck();
    }

    private _toggleFavori(product: Product) {
        const userId = this.userStore.user()?.id;
        if (!userId) return;

        this.favorisService
            .getFavorisByProduct(product.id, userId)
            .subscribe((res) => {
                const existing = res.data;

                if (!existing) {
                    this.favorisService
                        .createFavori(product.id, userId)
                        .subscribe((newFavori: any) => {
                            this.updateFavoriLocally(product, {
                                id: newFavori.data.id,
                                liked: true,
                            });
                            this.pulseState[product.id] = 'liked';
                            toast.success('Ajouté aux favoris');
                        });
                } else {
                    const newState = !existing.liked;
                    this.favorisService
                        .updateFavori(existing.id, newState, userId)
                        .subscribe(() => {
                            this.updateFavoriLocally(product, {
                                id: existing.id,
                                liked: newState,
                            });
                            toast.success(
                                newState ? 'Ajouté aux favoris' : 'Retiré des favoris',
                            );
                        });
                }
            });
    }

    onClickHeart(event: MouseEvent, product: Product) {
        event.preventDefault();
        event.stopPropagation();
        console.log('Heart clicked for product:', product);
        this.favoriClicks.next(product);
    }
}
