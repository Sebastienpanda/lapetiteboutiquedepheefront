import { Component } from "@angular/core";
import { HeaderComponent } from "@shared/component/header/header.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "@shared/component/footer/footer.component";

@Component({
	selector: "app-layout-home",
	templateUrl: "./home.layout.component.html",
	imports: [HeaderComponent, RouterOutlet, FooterComponent],
})
export default class HomeLayoutComponent {}
