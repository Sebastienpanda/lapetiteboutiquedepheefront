import { inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Injectable({ providedIn: "root" })
export class SeoService {
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);

	updateTitle(title: string) {
		this.title.setTitle(`La Petite Boutique D'Ephee${title ? " | " + title : ""}`);
	}

	updateDescription(desc: string) {
		this.meta.updateTag({ name: "description", content: desc });
	}
}
