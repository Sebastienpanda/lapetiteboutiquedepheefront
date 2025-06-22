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
	selector: "app-input-field",
	templateUrl: "./input-field.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, LucideAngularModule],
})
export class InputField {
	readonly control = input<FormControl>(new FormControl());
	readonly label = input("");
	readonly id = input("");
	readonly placeholder = input("");
	readonly type = input<"text" | "email" | "password">("text");
	readonly errorMessages = input<Record<string, string>>({});
	readonly required = input(false);
	readonly confirmPassword = input(false);
	readonly isPassword = computed(() => this.type() === "password");
	readonly isConfirm = input(false);
	readonly showPassword = signal(false);
	readonly showPasswordTips = input(false);
	readonly tipsContent = input<Array<string> | null>(null);
	readonly tipsVisible = signal(false);

	toggleTips() {
		this.tipsVisible.update((v) => !v);
	}

	protected readonly Object = Object;

	hasError(key: string): boolean {
		const ctrl = this.control();
		return ctrl.hasError(key) && (ctrl.touched || ctrl.dirty);
	}

	togglePasswordVisibility() {
		this.showPassword.update((v) => !v);
	}

	protected readonly EyeOff = EyeOff;
	protected readonly Eye = Eye;
}
