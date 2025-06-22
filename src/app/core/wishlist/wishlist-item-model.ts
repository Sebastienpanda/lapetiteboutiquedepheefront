import type { Product } from "@core/products/product-model";

export interface WishlistItems {
	id: number;
	note?: string;
	product: Product;
}
