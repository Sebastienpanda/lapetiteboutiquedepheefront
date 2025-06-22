import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	signal,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Button } from "@shared/component/ui/button/button";
import { ArrowLeft, Heart, LucideAngularModule, Share } from "lucide-angular";

@Component({
	selector: "app-profile-section-layout",
	templateUrl: "./profile-section-layout.html",
	imports: [LucideAngularModule, RouterLink, Button],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSectionLayout {
	private readonly _router = inject(Router);
	readonly router = signal(this._router);
	readonly searchChange = output<string>();
	readonly search = signal("");

	readonly title = input("");
	readonly showShareButton = input(false);
	readonly showShareListCreate = input(false);
	readonly wishlistCreateClick = output<void>();

	protected readonly Share = Share;
	protected readonly ArrowLeft = ArrowLeft;

	onSearchChange(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.search.set(value);
		this.searchChange.emit(value);
	}

	openWishlistModal() {
		if (this.showShareListCreate()) {
			this.wishlistCreateClick.emit();
		}
	}

	protected readonly Heart = Heart;
}
