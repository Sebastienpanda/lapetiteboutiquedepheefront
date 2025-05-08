import { ChangeDetectionStrategy, Component, ElementRef, HostListener, output, signal, viewChild } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LucideAngularModule, Menu, ShoppingBag } from "lucide-angular";
import { navigation } from "@shared/component/navigations/navigation";
import { ButtonComponent } from "@shared/component/ui/button/button.component";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, ButtonComponent, LucideAngularModule, RouterLinkActive],
})
export class NavigationComponent {
	readonly navigations = signal(navigation);
	protected readonly Menu = Menu;
	protected readonly ShoppingBag = ShoppingBag;
	menuClick = output<void>();
	isCartOpen = false;
	readonly cartMenuRef = viewChild("cartMenuRef", { read: ElementRef });
	readonly cartButtonRef = viewChild("cartButtonRef", { read: ElementRef });

	@HostListener("document:click", ["$event"])
	onClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const menu = this.cartMenuRef();
		const button = this.cartButtonRef();

		if (
			this.isCartOpen &&
			menu &&
			!menu.nativeElement.contains(target) &&
			button &&
			!button.nativeElement.contains(target)
		) {
			this.isCartOpen = false;
		}
	}

	toggleCart() {
		this.isCartOpen = !this.isCartOpen;
	}
}
