import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import type { Product } from "@core/products/product-model";
import type { Wishlist } from "@core/wishlist/wishlist-model";
import { environment } from "@environments/environment";
import { firstValueFrom, map } from "rxjs";

@Injectable({ providedIn: "root" })
export class WishlistService {
	private readonly http = inject(HttpClient);
	readonly wishlists = signal<Wishlist[]>([]);

	async initializeWishlistsFromServer(userId: number) {
		const res = await firstValueFrom(
			this.http.get<{ data: Wishlist[] }>(
				`${environment.apiUrl}/wishlists/all?userId=${userId}`,
			),
		);

		// const wishlists = res.data.map((wishlist) => ({
		// 	...wishlist,
		// 	wishlist_items: (wishlist.wishlist_items ?? []).map((item) => ({
		// 		...item,
		// 		product: this.addFullImageUrls(item.product),
		// 	})),
		// }));

		// this.wishlists.set(wishlists);
	}

	// private addFullImageUrls(product: Product): Product {
	// 	return {
	// 		...product,
	// 		images: (product.images ?? []).map((gallery) => ({
	// 			...gallery,
	// 			images: addFullImageUrlsToImages(gallery.images),
	// 		})),
	// 	};
	// }

	async addToWishlist(
		product: Product,
		userId: number,
		name: string,
		note?: string,
	) {
		const wishlistItemRes = await firstValueFrom(
			this.http.post<{ data: { id: number; documentId: string } }>(
				`${environment.apiUrl}/wishlist-items`,
				{
					data: {
						product: product.id,
						note: note,
					},
				},
			),
		);

		const itemDocId = wishlistItemRes.data.documentId;

		const res = await firstValueFrom(
			this.http.get<{ data: Wishlist[] }>(
				`${environment.apiUrl}/wishlists?filters[application_user][id][$eq]=${userId}&filters[name][$eq]=${encodeURIComponent(name)}`,
			),
		);

		if (res.data.length === 0) {
			await firstValueFrom(
				this.http.post(`${environment.apiUrl}/wishlists`, {
					data: {
						name: name,
						application_user: userId,
						wishlist_items: {
							connect: [itemDocId],
						},
					},
				}),
			);
		} else {
			const wishlistId = res.data[0].documentId;

			const existingRes = await firstValueFrom(
				this.http.get<{ data: { wishlist_items: { documentId: string }[] } }>(
					`${environment.apiUrl}/wishlists/${wishlistId}?populate[wishlist_items][fields][0]=documentId`,
				),
			);

			const existing = existingRes.data.wishlist_items.map((i) => i.documentId);
			const updated = [...existing, itemDocId];

			await firstValueFrom(
				this.http.put(`${environment.apiUrl}/wishlists/${wishlistId}`, {
					data: {
						wishlist_items: {
							connect: updated,
						},
					},
				}),
			);
		}
	}

	getWishlists(userId: number) {
		return this.http.get<{ data: Wishlist[] }>(
			`${environment.apiUrl}/wishlists?filters[application_user][id][$eq]=${userId}&populate[wishlist_items][populate]=product`,
		);
	}

	getWishlistCount(userId: number) {
		return this.http
			.get<any>(
				`${environment.apiUrl}/wishlists?filters[application_user][id][$eq]=${userId}`,
			)
			.pipe(map((res) => res?.data?.length ?? 0));
	}

	async createWishlist(userId: number, name: string, note?: string) {
		return await firstValueFrom(
			this.http.post(`${environment.apiUrl}/wishlists`, {
				data: {
					name: name,
					application_user: userId,
				},
			}),
		);
	}
}
