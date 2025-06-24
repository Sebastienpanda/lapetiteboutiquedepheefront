import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/auth-service';
import { confirmPasswordValidator } from '@auth/confirm-password-validator';
import { InputField } from '@shared/component/ui/forms/inputs/input-field/input-field';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { toast } from 'ngx-sonner';

@Component({
    selector: 'app-register',
    templateUrl: './register.html',
    imports: [ReactiveFormsModule, RouterLink, InputField, LucideAngularModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StrapiComponent {
    protected readonly ArrowLeft = ArrowLeft;
    private readonly supabase = inject(AuthService);
    private readonly fb = inject(NonNullableFormBuilder);
    
    loading = false;
    readonly form = this.fb.group(
        {
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [
                Validators.required,
                Validators.minLength(12),
            ]),
            name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
            confirmPassword: this.fb.control('', [Validators.required]),
        },
        { validators: confirmPasswordValidator },
    );

    async onSubmit(): Promise<void> {
        if (this.form.valid) {
            const { email, password, name } = this.form.value;
            this.loading = true;
            await this.supabase.signUp(email, password, name);
            toast.success('Inscription Réussi', {
                description: 'Confirmer votre email afin de vous connecter',
            });
        } else if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
    }
}
