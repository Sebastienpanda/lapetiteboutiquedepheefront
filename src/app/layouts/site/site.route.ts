import { Routes } from "@angular/router";
import SiteLayoutComponent from "@layouts/site/site.layout.component";

export const routes: Routes = [
	{
		path: "",
		component: SiteLayoutComponent,
		children: [
			{
				path: "boutique",
				loadComponent: () => import("@features/boutique/boutique.component"),
			},
			{
				path: "a-propos",
				loadComponent: () => import("@features/about/about.component"),
			},
		],
	},
];
