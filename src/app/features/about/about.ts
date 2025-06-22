import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SectionIntro } from "@shared/component/ui/sectionIntroComponent/section-intro";

@Component({
	selector: "app-about",
	templateUrl: "./about.html",
	imports: [SectionIntro],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class About {}
