import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Compte } from "@features/profil/edit/components/compte/compte";
import { General } from "@features/profil/edit/components/general/general";
import { Notification } from "@features/profil/edit/components/notifications/notifications";
import { Security } from "@features/profil/edit/components/security/security";
import { SectionWrapper } from "@shared/component/ui/sectionWrapper/section-wrapper";
import {
	ArrowLeft,
	Bell,
	LucideAngularModule,
	Settings,
	Shield,
	User,
} from "lucide-angular";

@Component({
	selector: "app-edit-profil",
	templateUrl: "./edit.html",
	imports: [
		LucideAngularModule,
		RouterLink,
		SectionWrapper,
		General,
		Notification,
		Security,
		Compte,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditProfil {
	protected readonly ArrowLeft = ArrowLeft;
	selectedTab = signal<"general" | "security" | "notifications" | "account">(
		"general",
	);
	protected readonly User = User;
	protected readonly Shield = Shield;
	protected readonly Bell = Bell;
	protected readonly Settings = Settings;
}
