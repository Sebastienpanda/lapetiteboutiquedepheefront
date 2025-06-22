import { ChangeDetectionStrategy, Component, effect, inject, type OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/cart/cart-service';
import { CategoriesService } from '@core/categories/categorie-service';
import type { Product } from '@core/products/product-model';
import { ProductsService } from '@core/products/products-service';
import { Pagination } from '@shared/component/ui/pagination/pagination';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { toast } from 'ngx-sonner';
import { Button } from '@shared/component/ui/button/button';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-boutique',
    templateUrl: './boutique.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        Pagination,
        SectionWrapper,
        Button,
    ],
})
export default class BoutiqueComponent implements OnInit {
    readonly productsService = inject(ProductsService);
    readonly cart = inject(CartService);
    readonly categoriesService = inject(CategoriesService);
    readonly currentPage = signal(1);
    readonly totalPages = signal(1);
    readonly page = signal(1);
    readonly limit = signal(6);
    readonly products = signal<Product[]>([]);
    readonly search = signal('');
    readonly selectedCategoryId = signal<number | null>(null);
    readonly categories = toSignal(
        this.categoriesService.getAllCategories(),
        {
            initialValue: [],
        },
    );

    loadProducts() {
        this.productsService
            .getProductsPaginated(this.page(), this.limit())
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.products.set(res.data);
                    this.totalPages.set(res.totalPages);
                    this.currentPage.set(res.page);
                },
                error: () => toast.error('Erreur de chargement des produits.'),
            });
    }

    onSearchInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.search.set(value);
        this.page.set(1);
    }

    constructor() {
        effect(() => {
            this.loadProducts();
        });
    }

    ngOnInit() {
        this.loadProducts();
    }

    onPageChange(page: number) {
        this.page.set(page);
    }

    isInCart(productId: string) {
        return this.cart.cartProductIds().has(productId);
    }

    addToCart(event: MouseEvent, product: any) {
        event.preventDefault();
        event.stopPropagation();
        void this.cart.addToCart({
            productId: product.id,
            priceAtAdd: product.price_at_add,
            quantity: 1,
        });
    }
}
