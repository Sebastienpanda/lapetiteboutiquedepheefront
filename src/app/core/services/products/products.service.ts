import { computed, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { httpResource } from "@angular/common/http";
import { ProductImage } from "../products-featured/products-featured.service";

export interface Products {
	id: string;
	name: string;
	description: string;
	slug: string;
	price: number;
	stock: number;
	is_featured: boolean;
	images: Array<ProductImage>;
}

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	private readonly apiUrl = environment.apiUrl;
	readonly page = signal(1);
	readonly limit = signal(6);
	private _lastTotalPages: number | null = null;

	readonly httpProducts = httpResource<{ data: Array<Products>; total: number }>(() => ({
		url: `${this.apiUrl}/products/all`,
		method: "GET",
		params: {
			page: this.page(),
			limit: this.limit(),
		},
	}));

	setPage(newPage: number) {
		this.page.set(newPage);
	}

	readonly totalPages = computed(() => {
		const value = this.httpProducts.value()?.total;
		if (!value) return this._lastTotalPages ?? 0;

		const pages = Math.ceil(value / this.limit());
		this._lastTotalPages = pages;
		return pages;
	});
}
