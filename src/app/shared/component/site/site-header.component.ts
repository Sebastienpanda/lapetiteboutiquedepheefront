import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Platform } from "@angular/cdk/platform";
import { ViewportRuler } from "@angular/cdk/scrolling";
import { Subject, takeUntil } from "rxjs";
import { LucideAngularModule, X } from "lucide-angular";
import { NavigationComponent } from "@shared/component/navigation/navigation.component";
import { MobileMenuComponent } from "@shared/component/mobile/mobile.component";
import { MenuService } from "@shared/component/mobile/mobile.service";

@Component({
	selector: "app-site-header",
	imports: [LucideAngularModule, NavigationComponent, MobileMenuComponent],
	templateUrl: "./site-header.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSiteComponent implements OnInit, OnDestroy {
	private readonly platform = inject(Platform);
	private readonly viewportRuler = inject(ViewportRuler);
	private readonly destroy$ = new Subject<void>();
	protected readonly menu = inject(MenuService);

	protected readonly X = X;

	readonly circlesCount = signal(0);

	private readonly _ = effect(() => {
		const isOpen = this.menu.isOpen();
		document.body.classList.toggle("menu-open", isOpen);
	});

	toggleMenu() {
		this.menu.toggle();
	}

	closeMenu = () => {
		this.menu.close();
	};

	ngOnInit() {
		if (!this.platform.isBrowser) {
			return;
		}

		this.viewportRuler
			.change(100)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.updateCircleCount();
				const width = this.viewportRuler.getViewportSize().width;
				if (width >= 1024 && this.menu.isOpen()) {
					this.closeMenu();
				}
			});

		this.updateCircleCount();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
		document.body.classList.remove("menu-open");
	}

	private updateCircleCount() {
		if (!this.platform.isBrowser) return;

		const circleWidth = 40;
		const viewportWidth = this.viewportRuler.getViewportSize().width;
		const count = Math.ceil(viewportWidth / circleWidth);
		this.circlesCount.set(count);
	}

	protected readonly Array = Array;
}
