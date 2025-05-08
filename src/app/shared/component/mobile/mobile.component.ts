import { ChangeDetectionStrategy, Component, input, signal } from "@angular/core";
import { LucideAngularModule, ShoppingBag, X } from "lucide-angular";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonComponent } from "../ui/button/button.component";
import { CdkTrapFocus } from "@angular/cdk/a11y";
import { navigation } from "@shared/component/navigations/navigation";

@Component({
	selector: "app-mobile-menu",
	imports: [LucideAngularModule, RouterLink, RouterLinkActive, ButtonComponent, CdkTrapFocus],
	templateUrl: "./mobile.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
	readonly isOpen = input(false);
	readonly close = input<() => void>(() => {});
	readonly navigations = signal(navigation);

	protected readonly ShoppingBag = ShoppingBag;
	protected readonly X = X;
}
