import {
	animate,
	group,
	query,
	style,
	transition,
	trigger,
} from "@angular/animations";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
	selector: "app-profil-layout",
	templateUrl: "./profil-layout.html",
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("routeAnimations", [
			transition("* <=> *", [
				query(":enter, :leave", [style({ display: "block", width: "100%" })], {
					optional: true,
				}),
				group([
					query(
						":leave",
						[
							animate(
								"200ms ease-out",
								style({ opacity: 0, transform: "translateY(10px)" }),
							),
						],
						{
							optional: true,
						},
					),
					query(
						":enter",
						[
							style({ opacity: 0, transform: "translateY(10px)" }),
							animate(
								"200ms ease-in",
								style({ opacity: 1, transform: "translateY(0)" }),
							),
						],
						{ optional: true },
					),
				]),
			]),
		]),
	],
})
export default class ProfilLayoutComponent {
	readonly router = inject(Router);

	getAnimationState(): string {
		return this.router.url;
	}
}
