import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SectionIntroComponent } from "@shared/component/ui/sectionIntroComponent/section-intro.component";
import { ButtonComponent } from "@shared/component/ui/button/button.component";

@Component({
	selector: "app-newsletters",
	templateUrl: "./newsletters.component.html",
	imports: [SectionIntroComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewslettersComponent {}
