import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "@shared/component/footer/footer.component";
import { HeaderSiteComponent } from "@shared/component/site/site-header.component";

@Component({
	selector: "app-layout-site",
	templateUrl: "./site.layout.component.html",
	imports: [RouterOutlet, FooterComponent, HeaderSiteComponent],
})
export default class SiteLayoutComponent {}
