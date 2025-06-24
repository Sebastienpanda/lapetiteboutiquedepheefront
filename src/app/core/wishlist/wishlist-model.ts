import type { WishlistItems } from '@core/wishlist/wishlist-item-model';

export interface Wishlist {
    id: number;
    name: string;
    wishlist_items: WishlistItems[];
}
