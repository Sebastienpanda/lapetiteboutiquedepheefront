import { DatePipe } from '@angular/common';
import {
    type AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Product } from '@core/products/product-model';
import { ProductsService } from '@core/products/products-service';
import { userStore } from '@core/state/user/user-store';
import type { Wishlist } from '@core/wishlist/wishlist-model';
import { WishlistService } from '@core/wishlist/wishlist-service';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { WishlistModalComponent } from '@shared/component/ui/wishlist-modal/wishlist-modal';
import { Heart, LucideAngularModule, Share, ShieldCheck, ShoppingCart, Sparkles, Undo2 } from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { Button } from '@shared/component/ui/button/button';

export interface Comment {
    author: string;
    rating: number;
    message: string;
    date: Date;
}

@Component({
    selector: 'app-product',
    templateUrl: './productPage.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        DatePipe,
        LucideAngularModule,
        SectionWrapper,
        Button,
        WishlistModalComponent,


    ],
})
export default class ProductPage implements AfterViewInit {
    protected readonly Sparkles = Sparkles;
    protected readonly Undo2 = Undo2;
    protected readonly ShieldCheck = ShieldCheck;
    protected readonly Share = Share;
    protected readonly Heart = Heart;
    protected readonly ShoppingCart = ShoppingCart;
    readonly quantity = signal(1);
    readonly swiperRef = viewChild('swiperRef', { read: ElementRef });
    readonly thumbs = viewChild('thumbsSwiper', { read: ElementRef });
    readonly prevEl = viewChild('prevEl', { read: ElementRef });
    readonly nextEl = viewChild('nextEl', { read: ElementRef });

    private readonly route = inject(ActivatedRoute);
    private readonly productsService = inject(ProductsService);
    private readonly wishlistService = inject(WishlistService);
    protected readonly userStore = inject(userStore);
    readonly wishlistModal = viewChild(WishlistModalComponent);

    readonly product = signal<Product | null>(null);
    readonly selectedProduct = signal<Product | null>(null);

    constructor() {
        const slug = this.route.snapshot.paramMap.get('slug');

        if (slug) {
            this.productsService.setSlug(slug);
            const product = this.productsService.getProductBySlug();
            if (product) {
                console.log(product);
                product.subscribe((res) => {
                    console.log(res);
                    this.product.set(res);
                });
            }
        }
    }

    openWishlistModal() {
        this.selectedProduct.set(this.product());
        // this.wishlistModal()?.open();
    }

    readonly comments = signal<Array<Comment>>([
        {
            author: 'Marie L.',
            rating: 5,
            message: 'Produit magnifique, merci beaucoup !',
            date: new Date('2025-03-15'),
        },
        {
            author: 'Thomas D.',
            rating: 4,
            message: 'Très bon produit, petite remarque sur la taille.',
            date: new Date('2025-03-01'),
        },
    ]);

    readonly newAuthor = signal('');
    readonly newMessage = signal('');
    readonly newRating = signal(0);
    readonly hoveredRating = signal(0);

    scrollToTop() {
        window.scrollTo(0, 0);
    }

    submitComment() {
        if (!this.newAuthor() || !this.newMessage() || this.newRating() === 0)
            return;

        this.comments.update((prev) => [
            {
                author: this.newAuthor(),
                rating: this.newRating(),
                message: this.newMessage(),
                date: new Date(),
            },
            ...prev,
        ]);

        this.newAuthor.set('');
        this.newMessage.set('');
        this.newRating.set(0);
    }

    ngAfterViewInit(): void {
        const swiperEl = this.swiperRef()?.nativeElement;
        const thumbsEl = this.thumbs()?.nativeElement;
        const prev = this.prevEl()?.nativeElement;
        const next = this.nextEl()?.nativeElement;

        if (swiperEl && thumbsEl && prev && next) {
            const productImagesCount = this.product()?.images?.length ?? 0;
            const shouldLoop = productImagesCount > 1;

            Object.assign(thumbsEl, {
                slidesPerView: 3,
                spaceBetween: 8,
                watchSlidesProgress: true,
                freeMode: true,
                loop: shouldLoop,
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                    },
                },
            });

            Object.assign(swiperEl, {
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                loop: shouldLoop,
                zoom: true,
                thumbs: { swiper: thumbsEl },
            });

            thumbsEl.initialize();
            swiperEl.initialize();
        }
    }

    shareProduct() {
        const product = this.product();
        if (!product) return;

        if (navigator.share) {
            navigator
                .share({
                    title: product.name,
                    text: product.description ?? '',
                    url: window.location.href,
                })
                .catch((err) => {
                    console.error('Erreur de partage :', err);
                });
        } else {
            toast.error('Le partage n’est pas supporté sur ce navigateur.');
        }
    }

    onWishlistSelected(wishlist: Wishlist) {
        const product = this.product();
        const userId = this.userStore.user()?.id;
        if (!product || !userId) return;

        // this.wishlistService
        //     .addToWishlist(product, userId, wishlist.name)
        //     .then(() => {
        //         toast.success('Produit ajouté à la wishlist !');
        //     })
        //     .catch(() => toast.error('Erreur lors de l’ajout à la wishlist.'));
    }
}
