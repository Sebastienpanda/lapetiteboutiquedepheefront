import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { ProfileSectionLayout } from '@core/layouts/profil-layout/items/profile-section-layout';
import type { Product } from '@core/products/product-model';
import { userStore } from '@core/state/user/user-store';
import type { Wishlist } from '@core/wishlist/wishlist-model';
import { WishlistService } from '@core/wishlist/wishlist-service';
import { WishlistItems } from '@features/profil/wishlist/items/wishlist-items';
import { WishlistModalComponent } from '@shared/component/ui/wishlist-modal/wishlist-modal';
import { toast } from 'ngx-sonner';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlistParent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ProfileSectionLayout, WishlistItems, WishlistModalComponent],
})
export default class WishlistParent {
    protected readonly userStore = inject(userStore);
    private readonly wishlistService = inject(WishlistService);
    readonly product = signal<Product | null>(null);
    readonly wishlists = signal<Wishlist[]>([]);
    readonly baseTitle = signal('Mes listes d\'envies');
    readonly search = signal('');
    readonly wishlistModal = viewChild(WishlistModalComponent);

    openWishlistModal() {
        this.wishlistModal()?.open();
    }

    // refreshWishlists() {
    //     const userId = this.userStore.user()?.id;
    //     if (!userId) return;
    //
    //     this.wishlistService.getWishlists(userId).subscribe({
    //         next: (res) => {
    //             this.wishlists.set(res.data);
    //         },
    //         error: (err) => {
    //             console.error('Erreur de rafraîchissement des wishlists', err);
    //         },
    //     });
    // }

    onWishlistSelected(wishlist: Wishlist) {
        const userId = this.userStore.user()?.id;
        if (!userId) return;

        this.wishlistService
            .createWishlist(userId, wishlist.name)
            .then(() => {
                toast.success('Liste créée avec succès !');
            })
            .catch(() => toast.error('Erreur lors de la création de la liste.'));
    }
}
