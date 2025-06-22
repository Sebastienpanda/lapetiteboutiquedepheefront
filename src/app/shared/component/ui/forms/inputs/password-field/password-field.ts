import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	signal,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Eye, EyeOff, LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-password-field",
	imports: [LucideAngularModule, ReactiveFormsModule],
	templateUrl: "./password-field.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordField {
	readonly control = input<FormControl>(new FormControl());
	readonly placeholder = input("");
	readonly controlName = input("");
	readonly id = input("");
	readonly label = input("");
	readonly required = input(false);

	readonly show = signal(false);

	readonly Eye = Eye;
	readonly EyeOff = EyeOff;

	toggle() {
		this.show.update((v) => !v);
	}

	readonly errorMessage = computed(() => {
		if (this.control().hasError("required"))
			return "Le mot de passe est requis";
		if (this.control().hasError("minlength")) return "Au moins 12 caractères";
		if (this.control().hasError("pattern")) return "Mot de passe non conforme";
		return "";
	});
}
