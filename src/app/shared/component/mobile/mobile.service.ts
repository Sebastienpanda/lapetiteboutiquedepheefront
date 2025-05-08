import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MenuService {
	readonly isOpen = signal(false);
	toggle = () => this.isOpen.update((v) => !v);
	close = () => this.isOpen.set(false);
}
