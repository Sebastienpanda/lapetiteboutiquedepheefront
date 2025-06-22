import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ArrowUp, LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.html",
	imports: [LucideAngularModule, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
	currentYear: number = new Date().getFullYear();
	protected readonly ArrowUp = ArrowUp;
}
