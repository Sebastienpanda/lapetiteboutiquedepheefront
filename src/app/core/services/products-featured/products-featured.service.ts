import { Injectable } from "@angular/core";
import { httpResource } from "@angular/common/http";
import { environment } from "@environments/environment";

export interface ProductImage {
	path_png: string;
	path_webp: string;
	is_first_image?: boolean;
}

export interface ProductIsFeatured {
	id: string;
	name: string;
	description: string;
	slug: string;
	price: number;
	stock: number;
	is_featured: boolean;
	image: ProductImage;
}

@Injectable({
	providedIn: "root",
})
export class ProductsFeaturedService {
	private readonly apiUrl = environment.apiUrl;

	httpProductsIsFeatured = httpResource<Array<ProductIsFeatured>>(() => this.apiUrl + "/products/featured", {
		defaultValue: [],
	});
}
