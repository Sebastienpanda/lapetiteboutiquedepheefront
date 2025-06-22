import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Button } from "@shared/component/ui/button/button";
import { LucideAngularModule, Mail } from "lucide-angular";

@Component({
	selector: "app-faq",
	templateUrl: "./faq.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LucideAngularModule, Button],
})
export default class Faq {
	protected readonly Mail = Mail;
}
