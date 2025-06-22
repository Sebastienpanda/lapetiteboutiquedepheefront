import type {
	AbstractControl,
	ValidationErrors,
	ValidatorFn,
} from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (
	control: AbstractControl,
): ValidationErrors | null => {
	const password = control.get("password")?.value;
	const confirm = control.get("confirmPassword");

	if (!confirm) return null;

	const match = password === confirm.value;

	if (!match) {
		confirm.setErrors({ passwordMismatch: true });
	} else {
		const errors = confirm.errors;
		if (errors) {
			delete errors["passwordMismatch"];
			if (Object.keys(errors).length === 0) {
				confirm.setErrors(null);
			} else {
				confirm.setErrors(errors);
			}
		}
	}
	return null;
};
