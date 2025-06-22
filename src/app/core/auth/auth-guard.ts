import { inject } from "@angular/core";
import { type CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth-service";

export const authGuard: CanActivateFn = async () => {
	const authService = inject(AuthService);
	const router = inject(Router);

	const { data } = await authService.supabase.auth.getSession();
	const user = data.session?.user;

	if (!user) {
		await router.navigate(["/connexion"]);
		return false;
	}

	authService.currentUser.next({
		email: user.email ?? "",
		username: user.user_metadata?.["username"] ?? "",
	});

	return true;
};
