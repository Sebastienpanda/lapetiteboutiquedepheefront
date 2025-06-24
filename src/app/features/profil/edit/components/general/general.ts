import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { userStore } from "@core/state/user/user-store";

@Component({
	selector: "app-general",
	templateUrl: "./general.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class General {
	protected readonly userStore = inject(userStore);
}
