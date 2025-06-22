import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Button } from "@shared/component/ui/button/button";
import { SectionIntro } from "@shared/component/ui/sectionIntroComponent/section-intro";
import { SectionWrapper } from "@shared/component/ui/sectionWrapper/section-wrapper";

@Component({
	selector: "app-newsletters",
	templateUrl: "./newsletters.html",
	imports: [SectionIntro, Button, SectionWrapper],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Newsletters {}
