import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SectionWrapper } from "@shared/component/ui/sectionWrapper/section-wrapper";
import { LucideAngularModule, Shield } from "lucide-angular";

@Component({
	selector: "app-confiance",
	templateUrl: "./confiance.html",
	imports: [LucideAngularModule, SectionWrapper],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Confiance {
	protected readonly Shield = Shield;
}
