import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-notifications",
	templateUrl: "./notification.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notification {}
