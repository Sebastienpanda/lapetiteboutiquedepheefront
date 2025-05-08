import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { ChevronLeft, ChevronRight, LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-pagination",
	templateUrl: "./pagination.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LucideAngularModule],
})
export class PaginationComponent {
	protected readonly ChevronRight = ChevronRight;
	protected readonly ChevronLeft = ChevronLeft;
	readonly totalPages = input<number>(3);
	readonly currentPage = input<number>(1);
	readonly pageChange = output<number>();

	get pages(): Array<number> {
		return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
	}

	goToPage(page: number) {
		this.pageChange.emit(page);
	}

	onKeyDown(event: KeyboardEvent, page: number) {
		const target = event.target as HTMLElement;
		if (event.key === "ArrowRight" && page < this.totalPages()) {
			this.goToPage(page + 1);

			const sibling = target.parentElement?.querySelector(`[data-page="${page + 1}"]`) as HTMLElement;

			sibling?.focus();
		}

		if (event.key === "ArrowLeft" && page > 1) {
			this.goToPage(page - 1);

			const prevButton = target.closest("nav")?.querySelector(`[data-page="${page - 1}"]`) as HTMLElement | null;

			prevButton?.focus();
		}
	}

	nextPage() {
		if (this.currentPage() < this.totalPages()) {
			this.goToPage(this.currentPage() + 1);
		}
	}

	previousPage() {
		if (this.currentPage() > 1) {
			this.goToPage(this.currentPage() - 1);
		}
	}
}
