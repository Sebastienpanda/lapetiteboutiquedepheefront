import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ArrowRight, LucideAngularModule } from "lucide-angular";
import { SectionIntroComponent } from "@shared/component/ui/sectionIntroComponent/section-intro.component";
import { ButtonComponent } from "@shared/component/ui/button/button.component";

@Component({
	selector: "app-categories",
	imports: [RouterLink, LucideAngularModule, SectionIntroComponent, ButtonComponent],
	templateUrl: "./categories.component.html",
})
export class CategoriesComponent {
	protected readonly ArrowRight = ArrowRight;
}
