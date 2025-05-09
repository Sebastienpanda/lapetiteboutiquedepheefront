import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadChildren: () => import("@layouts/home/home.route").then((m) => m.routes),
	},
	{
		path: "",
		loadChildren: () => import("@layouts/site/site.route").then((m) => m.routes),
	},
];
