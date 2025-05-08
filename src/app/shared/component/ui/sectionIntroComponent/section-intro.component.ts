import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-section-intro",
	templateUrl: "./section-intro.component.html",
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionIntroComponent {
	readonly title = input.required<string>();
	readonly description = input.required<string>();
	readonly color = input("");
}
