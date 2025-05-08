import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ArrowUp, LucideAngularModule } from "lucide-angular";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	imports: [LucideAngularModule, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	currentYear: number = new Date().getFullYear();
	protected readonly ArrowUp = ArrowUp;

	constructor() {}
}
