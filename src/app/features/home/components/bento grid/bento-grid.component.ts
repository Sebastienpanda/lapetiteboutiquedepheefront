import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ArrowRight, LucideAngularModule } from "lucide-angular";
import { SectionIntroComponent } from "@shared/component/ui/sectionIntroComponent/section-intro.component";

@Component({
	selector: "app-bento-grid",
	templateUrl: "./bento-grid.component.html",
	imports: [CommonModule, RouterLink, LucideAngularModule, SectionIntroComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BentoGridComponent {
	protected readonly ArrowRight = ArrowRight;
	categories = [
		{
			title: "Boutique",
			description: "Notre best-seller adoré par petits et grands.",
			image: "/hero-banner-mobile.jpg",
			link: "/boutique",
			popular: true,
			featured: true,
			area: "item-1",
		},
		{
			title: "Livres de coloriages",
			description: "",
			image: "/hero-banner-mobile.jpg",
			link: "/coloriages",
			popular: false,
			featured: false,
			area: "item-2",
		},
		{
			title: "Stickers",
			description: "",
			image: "/hero-banner-mobile.jpg",
			link: "/stickers",
			popular: false,
			featured: false,
			area: "item-3",
		},
		{
			title: "Commandes personnalisées",
			description: "",
			image: "/hero-banner-mobile.jpg",
			link: "/commande",
			popular: false,
			featured: false,
			area: "item-4",
		},
		{
			title: "Accessoires",
			description: "",
			image: "/hero-banner-mobile.jpg",
			link: "/accessoires",
			popular: false,
			featured: false,
			area: "item-5",
		},
		{
			title: "Chaussures",
			description: "",
			image: "/hero-banner-mobile.jpg",
			link: "/chaussures",
			popular: false,
			featured: false,
			area: "item-6",
		},
	];
}
