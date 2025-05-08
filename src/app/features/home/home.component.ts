import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeroBannerComponent } from "@features/home/components/hero-banner/hero-banner.component";
import { CategoriesComponent } from "@features/home/components/categories/categories.component";
import { BentoGridComponent } from "@features/home/components/bento grid/bento-grid.component";
import { ProductComponent } from "@features/home/components/products/product.component";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [HeroBannerComponent, CategoriesComponent, BentoGridComponent, ProductComponent],
})
export default class HomeComponent {}
