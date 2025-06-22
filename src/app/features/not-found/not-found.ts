import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SectionWrapper } from "@shared/component/ui/sectionWrapper/section-wrapper";

@Component({
	selector: "app-not-found",
	templateUrl: "./not-found.html",
	imports: [RouterLink, SectionWrapper],
})
export default class NotFound {}
