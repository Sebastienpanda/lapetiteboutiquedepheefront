import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { AuthService } from "@auth/auth-service";
import { confirmPasswordValidator } from "@auth/confirm-password-validator";
import { InputField } from "@shared/component/ui/forms/inputs/input-field/input-field";
import { Lock, LucideAngularModule } from "lucide-angular";
import { toast } from "ngx-sonner";

@Component({
	selector: "app-security",
	templateUrl: "./security.html",
	imports: [LucideAngularModule, ReactiveFormsModule, InputField],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Security {
	protected readonly Lock = Lock;
	private readonly fb = inject(NonNullableFormBuilder);
	private readonly auth = inject(AuthService);

	readonly passwordForm = this.fb.group(
		{
			password: ["", [Validators.required, Validators.minLength(12)]],
			confirmPassword: ["", [Validators.required]],
		},
		{ validators: confirmPasswordValidator },
	);

	async onSubmit() {
		if (this.passwordForm.valid) {
			const { password } = this.passwordForm.value;

			const { error } = await this.auth.supabase.auth.updateUser({
				password: password!,
			});

			if (error) {
				if (error.code === "same_password") {
					toast.error(
						"Erreur : Le nouveau mot de passe ne doit pas correspondre à l'ancien mot de passe",
					);
				}
			} else {
				toast.success("Mot de passe mis à jour avec succès !");
				this.passwordForm.reset();
			}
		} else if (this.passwordForm.invalid) {
			this.passwordForm.markAllAsTouched();
			return;
		}
	}
}
