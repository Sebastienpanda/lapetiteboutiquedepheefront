import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-auth-layout",
	templateUrl: "auth-layout.html",
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthLayout {}
