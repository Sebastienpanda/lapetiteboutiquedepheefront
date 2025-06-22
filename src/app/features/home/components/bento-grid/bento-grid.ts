import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SectionIntro } from "@shared/component/ui/sectionIntroComponent/section-intro";
import { SectionWrapper } from "@shared/component/ui/sectionWrapper/section-wrapper";
import { ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-bento-grid",
	templateUrl: "./bento-grid.html",
	imports: [
		CommonModule,
		RouterLink,
		LucideAngularModule,
		SectionIntro,
		SectionWrapper,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BentoGrid {
	protected readonly ArrowRight = ArrowRight;
	categories = [
		{
			title: "Boutique",
			description: "Notre best-seller adoré par petits et grands.",
			image: "/photo-1611673038517-b964c31f0ed7.jpg",
			link: "/boutique-layout",
			popular: true,
			featured: true,
			area: "item-1",
		},
		{
			title: "Livres de coloriages",
			description: "",
			image: "/photo-1700212029392-b68d7f277b89.jpg",
			link: "/coloriages",
			popular: false,
			featured: false,
			area: "item-2",
		},
		{
			title: "Stickers",
			description: "",
			image: "/photo-1611673038517-b964c31f0ed7.jpg",
			link: "/stickers",
			popular: false,
			featured: false,
			area: "item-3",
		},
		{
			title: "Commandes personnalisées",
			description: "",
			image: "/photo-1700212029392-b68d7f277b89.jpg",
			link: "/commande",
			popular: false,
			featured: false,
			area: "item-4",
		},
		{
			title: "Accessoires",
			description: "",
			image: "/photo-1611673038517-b964c31f0ed7.jpg",
			link: "/accessoires",
			popular: false,
			featured: false,
			area: "item-5",
		},
		{
			title: "Chaussures",
			description: "",
			image: "/photo-1700212029392-b68d7f277b89.jpg",
			link: "/chaussures",
			popular: false,
			featured: false,
			area: "item-6",
		},
	];
}
