import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from "@angular/core";
import { PaginationComponent } from "@shared/component/ui/pagination/pagination.component";
import { RouterLink } from "@angular/router";
import { ProductsService } from "@products/products.service";
import { ProductImage } from "@core/services/products-featured/products-featured.service";
import { CurrencyPipe } from "@angular/common";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { Meta, Title } from "@angular/platform-browser";
import { SeoService } from "@core/services/seo/seo.service";

@Component({
	selector: "app-boutique",
	templateUrl: "./boutique.component.html",
	imports: [PaginationComponent, RouterLink, CurrencyPipe],
	animations: [
		trigger("fadeInStagger", [
			transition("* => *", [
				query(
					"a",
					[
						style({ opacity: 0, transform: "translateY(10px)" }),
						stagger(100, [animate("250ms ease-in-out", style({ opacity: 1, transform: "translateY(0)" }))]),
					],
					{ optional: true },
				),
			]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoutiqueComponent implements OnInit {
	readonly productService = inject(ProductsService);
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		this.seo.updateTitle("À propos");
		this.seo.updateDescription("Page de présentation de la boutique et de son histoire.");
	}

	readonly productsResource = this.productService.httpProducts;
	readonly totalPages = this.productService.totalPages;
	readonly limit = this.productService.limit;

	readonly visibleProducts = computed(() => this.productsResource.value()?.data ?? []);
	readonly isLoadingProducts = computed(() => this.productsResource.isLoading());
	readonly page = computed(() => this.productService.page());

	readonly total = computed(() => this.productsResource.value()?.total ?? 0);
	readonly start = computed(() => (this.page() - 1) * this.limit() + 1);
	readonly end = computed(() => {
		const val = this.page() * this.limit();
		return val > this.total() ? this.total() : val;
	});

	onPageChange(newPage: number) {
		this.productService.setPage(newPage);
	}

	getFirstImage(images: Array<ProductImage>): ProductImage | undefined {
		return images.find((img) => img.is_first_image);
	}

	protected readonly Array = Array;
}
