import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Key, LucideAngularModule, MoreHorizontal, Paintbrush, Square } from "lucide-angular";
import { SectionIntroComponent } from "@shared/component/ui/sectionIntroComponent/section-intro.component";
import { ButtonComponent } from "@shared/component/ui/button/button.component";
import { SeoService } from "@core/services/seo/seo.service";

@Component({
	selector: "app-commission",
	templateUrl: "./commission.component.html",
	imports: [LucideAngularModule, SectionIntroComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CommissionComponent implements OnInit {
	commissionForm!: FormGroup;
	selectedType = "illustration"; // Par défaut
	types = ["illustration", "sticker", "crochet", "autre"];
	private readonly fb = inject(FormBuilder);
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		this.initForm();
		this.seo.updateTitle("Commission");
		this.seo.updateDescription("Vous avez un projet unique en tête ? Nous sommes là pour donner vie à vos idées");
	}

	initForm() {
		this.commissionForm = this.fb.group({
			name: [""],
			email: [""],
			phone: [""],
			style: [""],
			format: [""],
			color: [""],
			background: [false],
			budget: [""],
			delay: [""],
		});
	}

	selectType(type: string) {
		this.selectedType = type;
		// Tu peux ici ajouter une logique pour reset certains champs selon le type
	}

	onSubmit() {
		if (this.commissionForm.valid) {
			console.log("Formulaire envoyé:", this.commissionForm.value);
			// Appelle à ton service ici
		}
	}

	getIconName(type: string) {
		switch (type) {
			case "illustration":
				return Paintbrush;
			case "sticker":
				return Square;
			case "crochet":
				return Key;
			case "autre":
				return MoreHorizontal;
			default:
				return Paintbrush; // Default icon
		}
	}
}
