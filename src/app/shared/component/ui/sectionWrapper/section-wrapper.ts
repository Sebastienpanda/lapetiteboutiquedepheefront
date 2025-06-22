import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-section-wrapper",
	templateUrl: "./section-wrapper.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWrapper {}
