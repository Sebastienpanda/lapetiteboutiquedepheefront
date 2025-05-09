import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { SectionIntroComponent } from "@shared/component/ui/sectionIntroComponent/section-intro.component";
import { SeoService } from "@core/services/seo/seo.service";

@Component({
	selector: "app-about",
	templateUrl: "./about.component.html",
	imports: [SectionIntroComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent implements OnInit {
	private readonly seo = inject(SeoService);
	ngOnInit(): void {
		this.seo.updateTitle("À propos");
		this.seo.updateDescription("Page de présentation de la boutique et de son histoire.");
	}
}
