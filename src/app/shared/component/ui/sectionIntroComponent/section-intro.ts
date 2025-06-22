import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-section-intro",
	templateUrl: "./section-intro.html",
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionIntro {
	readonly title = input.required<string>();
	readonly description = input.required<string>();
	readonly color = input("");
}
