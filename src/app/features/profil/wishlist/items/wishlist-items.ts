import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { CartService } from '@core/cart/cart-service';
import { userStore } from '@core/state/user/user-store';
import { WishlistService } from '@core/wishlist/wishlist-service';
import { ShoppingCart, Trash2 } from 'lucide-angular';
import { toast } from 'ngx-sonner';

@Component({
    selector: 'app-wishlist-items',
    templateUrl: './wishlist-items.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class WishlistItems {
    private readonly wishlistService = inject(WishlistService);
    private readonly userStore = inject(userStore);

    readonly selectedWishlistId = signal<null | number>(null);
    protected readonly wishlists = this.wishlistService.wishlists;
    readonly searchTerm = input<string>('');
    private readonly cart = inject(CartService);

    constructor() {
        effect(() => {
            const user = this.userStore.user();
            if (user) {
                void this.wishlistService.getWishlists(user.id);
            }
        });
    }

    readonly filteredWishlists = computed(() => {
        const selected = this.selectedWishlistId();
        const search = this.searchTerm()?.toLowerCase().trim() ?? '';

        return this.wishlists().filter((wishlist) => {
            const matchesFolder = selected === null || wishlist.id === selected;

            const matchesSearch =
                search === '' ||
                wishlist.name.toLowerCase().includes(search) ||
                wishlist.wishlist_items.some(
                    (item) =>
                        item.product?.name?.toLowerCase().includes(search) ||
                        item.product?.description?.toLowerCase().includes(search),
                );

            return matchesFolder && matchesSearch;
        });
    });

    // isInCart(productId: number | undefined): boolean {
    // 	if (!productId) {
    // 		console.warn("🟡 Vérif panier ignorée : productId invalide", productId);
    // 		return false;
    // 	}
    //
    // 	const ids = this.cart.cartProductIds();
    // 	return ids.has(productId);
    // }

    addToCart(event: MouseEvent, product: any) {
        event.preventDefault();
        event.stopPropagation();

        if (!product || typeof product.id !== 'number') {
            console.warn('❌ Produit invalide, pas ajouté :', product);
            return;
        }

        void this.cart.addToCart({
            id: product.id,
            product,
            price_at_add: product.price,
            quantity: 1,
        });

        toast.success(`${product.name} ajouté au panier`);
    }

    // onAddToCart(product: Product) {
    // 	console.log("Ajouter au panier :", product);
    // }
    //
    // onRemove(productId: string) {
    // 	this.products.update((p) => p.filter((prod) => prod.id !== productId));
    // }

    protected readonly Trash2 = Trash2;
    protected readonly ShoppingCart = ShoppingCart;
}
