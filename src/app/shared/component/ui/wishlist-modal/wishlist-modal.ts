import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	input,
	output,
	signal,
	viewChild,
} from "@angular/core";
import type { Product } from "@core/products/product-model";
import { userStore } from "@core/state/user/user-store";
import type { Wishlist } from "@core/wishlist/wishlist-model";
import { WishlistService } from "@core/wishlist/wishlist-service";
import { LucideAngularModule, Plus } from "lucide-angular";
import { toast } from "ngx-sonner";

@Component({
	selector: "app-wishlist-modal",
	imports: [CommonModule, LucideAngularModule],
	templateUrl: "./wishlist-modal.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistModalComponent {
	private readonly wishlistService = inject(WishlistService);
	private readonly userStore = inject(userStore);
	readonly wishlists = signal<Wishlist[]>([]);
	readonly product = input<Product | null>();
	readonly userId = input<number>();

	readonly selected = output<any>();
	readonly cancel = output<void>();

	readonly dialogRef = viewChild("dialogRef", { read: ElementRef });
	readonly showCreate = signal(false);
	readonly newListName = signal("");

	// open() {
	// 	this.refreshWishlists();
	// 	this.dialogRef()?.nativeElement?.showModal();
	// }

	close() {
		this.dialogRef()?.nativeElement?.close();
	}

	// refreshWishlists() {
	// 	const userId = this.userStore.user()?.id;
	// 	if (!userId) return;
  //
	// 	this.wishlistService.getWishlists(userId).subscribe({
	// 		next: (res) => this.wishlists.set(res.data),
	// 		error: () => toast.error("Erreur de chargement des wishlists."),
	// 	});
	// }

	select(list: Wishlist | string) {
		if (this.productAlreadyInList(list)) {
			return toast.warning("Produit existant dans la wishlist", {
				description: "Ce produit existe déja dans la wishlist",
			});
		}
		return this.selected.emit(<Wishlist>list);
	}

	productAlreadyInList(wishlist: Wishlist | string): boolean {
		if (typeof wishlist === "string") return false;

		if (!Array.isArray(wishlist.wishlist_items)) return false;

		const currentProductId = this.product()?.id;
		if (!currentProductId) return false;

		return wishlist.wishlist_items.some(
			(item) => item.product.id === currentProductId,
		);
	}

	createNew() {
		if (this.newListName().trim()) {
			this.selected.emit({ name: this.newListName().trim() } as Wishlist);
			this.newListName.set("");
			this.showCreate.set(false);
		}
	}

	handleCancel() {
		this.cancel.emit();
		this.close();
	}

	onInputChange(event: Event) {
		this.newListName.set((event.target as HTMLInputElement).value);
	}

	protected readonly Plus = Plus;
}
