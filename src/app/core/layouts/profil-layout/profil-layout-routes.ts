import type { Routes } from "@angular/router";
import { authGuard } from "@auth/auth-guard";
import ProfilLayoutComponent from "@core/layouts/profil-layout/profil-layout";
import { UserResolver } from "@core/user/user-resolver";

export const routes: Routes = [
	{
		path: "profil",
		component: ProfilLayoutComponent,
		canActivate: [authGuard],
		canActivateChild: [authGuard],
		resolve: {
			user: UserResolver,
		},
		// children: [
		// 	{
		// 		path: "",
		// 		loadComponent: () => import("@features/profil/profil"),
		// 	},
		// 	{
		// 		path: "editer-profil",
		// 		loadComponent: () => import("@features/profil/edit/edit"),
		// 	},
		// 	{
		// 		path: "favoris",
		// 		loadComponent: () => import("@features/profil/favoris/favoris"),
		// 	},
		// 	{
		// 		path: "listes-envie",
		// 		loadComponent: () => import("@features/profil/wishlist/wishlistParent"),
		// 	},
		// ],
	},
];
