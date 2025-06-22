import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Button } from "@shared/component/ui/button/button";
import { SectionIntro } from "@shared/component/ui/sectionIntroComponent/section-intro";
import { SectionWrapper } from "@shared/component/ui/sectionWrapper/section-wrapper";
import { ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-categories",
	imports: [
		RouterLink,
		LucideAngularModule,
		SectionIntro,
		Button,
		SectionWrapper,
	],
	templateUrl: "./categories.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
	protected readonly ArrowRight = ArrowRight;
}
