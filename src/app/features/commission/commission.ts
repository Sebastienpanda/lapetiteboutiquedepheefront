import {
	ChangeDetectionStrategy,
	Component,
	type OnInit,
	inject,
} from "@angular/core";
import { FormBuilder, type FormGroup } from "@angular/forms";
import { Button } from "@shared/component/ui/button/button";
import { SectionIntro } from "@shared/component/ui/sectionIntroComponent/section-intro";
import {
	Key,
	LucideAngularModule,
	MoreHorizontal,
	Paintbrush,
	Square,
} from "lucide-angular";

@Component({
	selector: "app-commission",
	templateUrl: "./commission.html",
	imports: [LucideAngularModule, SectionIntro, Button],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Commission implements OnInit {
	commissionForm!: FormGroup;
	selectedType = "illustration"; // Par défaut
	types = ["illustration", "sticker", "crochet", "autre"];
	private readonly fb = inject(FormBuilder);

	ngOnInit(): void {
		this.initForm();
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
