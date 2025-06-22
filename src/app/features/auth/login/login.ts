import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@auth/auth-service";
import { InputField } from "@shared/component/ui/forms/inputs/input-field/input-field";
import { ArrowLeft, LucideAngularModule } from "lucide-angular";
import { toast } from "ngx-sonner";

@Component({
	selector: "app-login",
	imports: [LucideAngularModule, RouterLink, InputField, ReactiveFormsModule],
	templateUrl: "./login.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Login {
	readonly ArrowLeft = ArrowLeft;
	private readonly supabase = inject(AuthService);
	private readonly router = inject(Router);
	private readonly fb = inject(NonNullableFormBuilder);

	readonly form = this.fb.group({
		email: this.fb.control("", [Validators.required, Validators.email]),
		password: this.fb.control("", [Validators.required]),
	});

	async login() {
		if (this.form.valid) {
			const { email, password } = this.form.value;
			const { error } = await this.supabase.signIn(email, password);
			if (error) {
				const message =
					error.code === "invalid_credentials"
						? "Email ou mot de passe incorrect"
						: "Une erreur est survenue. Veuillez réessayer.";
				toast.error(message);
				return;
			}
			await this.router.navigate(["/profil"]);
			toast.success("Connexion Réussi");
		} else if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
	}
}
