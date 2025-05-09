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
];
