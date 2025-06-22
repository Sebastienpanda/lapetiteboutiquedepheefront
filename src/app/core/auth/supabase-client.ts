import { environment } from "@environments/environment";
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
	environment.supabaseUrl,
	environment.supabaseKey,
);
