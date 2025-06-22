import type { Product } from "@core/products/product-model";

export interface Favoris {
	id: number;
	liked: boolean;
	product: Product;
}
