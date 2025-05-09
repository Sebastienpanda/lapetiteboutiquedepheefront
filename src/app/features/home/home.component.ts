import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeroBannerComponent } from "@features/home/components/hero-banner/hero-banner.component";
import { CategoriesComponent } from "@features/home/components/categories/categories.component";
import { BentoGridComponent } from "@features/home/components/bento grid/bento-grid.component";
import { ProductIsFeaturedComponent } from "@features/home/components/products-is-featured/product-is-featured.component";
import { ConfianceComponent } from "@features/home/components/confiance/confiance.component";
import { NewslettersComponent } from "@features/home/components/newsletters/newsletters.component";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		HeroBannerComponent,
		CategoriesComponent,
		BentoGridComponent,
		ProductIsFeaturedComponent,
		ConfianceComponent,
		NewslettersComponent,
	],
})
export default class HomeComponent {}
