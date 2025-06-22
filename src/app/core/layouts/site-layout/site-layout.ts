import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Footer } from "@shared/component/footer/footer";
import { HeaderSite } from "@shared/component/site/site-header";

@Component({
	selector: "app-layout-site-layout",
	templateUrl: "./site-layout.html",
	imports: [RouterOutlet, Footer, HeaderSite, HeaderSite],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SiteLayout {}
