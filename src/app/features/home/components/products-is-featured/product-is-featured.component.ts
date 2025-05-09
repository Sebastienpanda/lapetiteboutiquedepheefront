import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SectionIntroComponent } from "@shared/component/ui/sectionIntroComponent/section-intro.component";
import { ProductsFeaturedService } from "../../../../core/services/products-featured/products-featured.service";
import { SliderComponent } from "@shared/component/slider/slider.component";

@Component({
	selector: "app-product",
	templateUrl: "./product-is-featured.component.html",
	imports: [CommonModule, SectionIntroComponent, SliderComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductIsFeaturedComponent {
	readonly productsIsFeatured = inject(ProductsFeaturedService);

	readonly data = computed(() => this.productsIsFeatured.httpProductsIsFeatured.value());
}
