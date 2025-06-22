import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@environments/environment";

@Injectable({ providedIn: "root" })
export class CheckoutService {
	private readonly http = inject(HttpClient);

	createCheckoutSession(items: any[]) {
		return this.http.post<{ url: string }>(
			`${environment.apiUrl}/checkout`,
			items,
		);
	}
}
