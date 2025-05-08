import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-section-wrapper",
	templateUrl: "./section-wrapper.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWrapperComponent {}
