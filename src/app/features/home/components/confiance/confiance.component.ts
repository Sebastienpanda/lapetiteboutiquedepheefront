import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LucideAngularModule, Shield } from "lucide-angular";

@Component({
	selector: "app-confiance",
	templateUrl: "./confiance.component.html",
	imports: [LucideAngularModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfianceComponent {
	protected readonly Shield = Shield;
}
