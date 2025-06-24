import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LucideAngularModule, Trash } from "lucide-angular";

@Component({
	selector: "app-compte",
	templateUrl: "./compte.html",
	imports: [LucideAngularModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Compte {
	protected readonly Trash = Trash;
}
