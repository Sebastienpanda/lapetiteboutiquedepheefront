import type { CartItem } from "@core/cart/cart-item-model";

export interface CartParent {
	cart_items: CartItem[];
}
