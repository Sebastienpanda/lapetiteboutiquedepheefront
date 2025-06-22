import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BentoGrid } from "@features/home/components/bento-grid/bento-grid";
import { Categories } from "@features/home/components/categories/categories";
import { Confiance } from "@features/home/components/confiance/confiance";
import { HeroBanner } from "@features/home/components/hero-banner/hero-banner";
import { Newsletters } from "@features/home/components/newsletters/newsletters";
import { ProductIsFeatured } from "@features/home/components/products-is-featured/product-is-featured";

@Component({
	selector: "app-home-layout",
	templateUrl: "./home.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		Categories,
		BentoGrid,
		ProductIsFeatured,
		Confiance,
		Newsletters,
		HeroBanner,
	],
})
export default class Home {}
