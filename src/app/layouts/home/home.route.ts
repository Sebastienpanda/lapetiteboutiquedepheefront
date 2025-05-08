import { Routes } from "@angular/router";
import HomeLayoutComponent from "@layouts/home/home.layout.component";

export const routes: Routes = [
	{
		path: "",
		component: HomeLayoutComponent,
		children: [
			{
				path: "",
				loadComponent: () => import("@features/home/home.component"),
			},
		],
	},
];
