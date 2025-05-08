import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { LucideAngularModule, LucideIconData } from "lucide-angular";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	imports: [LucideAngularModule, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	readonly variant = input<"primary" | "secondary" | "outline">("primary");
	readonly type = input<"button" | "submit" | "reset">("button");
	readonly size = input<"sm" | "md" | "lg">("md");
	readonly disabled = input<boolean>(false);
	readonly icon = input<LucideIconData | undefined>(undefined);
	readonly ariaLabel = input<string | undefined>(undefined);
	readonly routerLink = input<string | undefined>(undefined);
	readonly textLink = input<string | undefined>(undefined);

	readonly isLink = computed(() => !!this.routerLink());

	readonly buttonClass = computed(() => {
		const variants = {
			primary: "btn-primary",
			secondary: "bg-base-100 text-base-content hover:bg-base-200",
			outline: "btn-outline",
		};
		const sizes = {
			sm: "btn-sm",
			md: "btn-md",
			lg: "btn-lg",
		};
		return `btn ${variants[this.variant()]} ${sizes[this.size()]} text-sm w-full px-4`;
	});
}
