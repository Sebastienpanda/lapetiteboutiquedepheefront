import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: Array<ServerRoute> = [
	{
		path: "",
		renderMode: RenderMode.Server,
	},
	{
		path: "boutique",
		renderMode: RenderMode.Client,
	},
	{
		path: "a-propos",
		renderMode: RenderMode.Client,
	},
	{
		path: "faq",
		renderMode: RenderMode.Client,
	},
	{
		path: "commission",
		renderMode: RenderMode.Client,
	},
];
