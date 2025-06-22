import type { Routes } from "@angular/router";
import HomeLayout from "@core/layouts/home-layout/home-layout";
import { UserResolver } from "@core/user/user-resolver";

export const routes: Routes = [
	{
		path: "",
		component: HomeLayout,
		resolve: {
			user: UserResolver,
		},
		children: [
			{
				path: "",
				loadComponent: () => import("@features/home/home"),
			},
		],
	},
];
