import { CdkTrapFocus } from "@angular/cdk/a11y";
import {
	ChangeDetectionStrategy,
	Component,
	input,
	signal,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { navigationData } from "@shared/component/navigation/navigation-data";
import { LucideAngularModule, ShoppingBag, X } from "lucide-angular";
import { Button } from "../ui/button/button";

@Component({
	selector: "app-mobile-menu",
	imports: [
		LucideAngularModule,
		RouterLink,
		RouterLinkActive,
		Button,
		CdkTrapFocus,
	],
	templateUrl: "./mobile.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenu {
	readonly isOpen = input(false);
	readonly close = input<() => void>(() => {});
	readonly navigations = signal(navigationData);

	protected readonly ShoppingBag = ShoppingBag;
	protected readonly X = X;
}
