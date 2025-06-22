import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Footer } from "@shared/component/footer/footer";
import { Header } from "@shared/component/header/header";

@Component({
	selector: "app-layout-home-layout",
	templateUrl: "./home-layout.html",
	imports: [Header, RouterOutlet, Footer],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeLayout {}
