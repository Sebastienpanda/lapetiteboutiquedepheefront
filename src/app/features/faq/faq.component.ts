import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { LucideAngularModule, Mail } from "lucide-angular";
import { ButtonComponent } from "@shared/component/ui/button/button.component";
import { SeoService } from "@core/services/seo/seo.service";

@Component({
	selector: "app-faq",
	templateUrl: "./faq.component.html",
	imports: [LucideAngularModule, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FaqComponent implements OnInit {
	protected readonly Mail = Mail;
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		this.seo.updateTitle("Foire aux questions");
		this.seo.updateDescription("Trouvez rapidement des réponses à vos questions les plus fréquentes.");
	}
}
