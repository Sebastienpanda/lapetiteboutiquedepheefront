import { Platform } from "@angular/cdk/platform";
import { ViewportRuler } from "@angular/cdk/scrolling";
import {
	ChangeDetectionStrategy,
	Component,
	type OnDestroy,
	type OnInit,
	effect,
	inject,
	signal,
} from "@angular/core";
import { MobileMenu } from "@shared/component/mobile/mobile";
import { MenuService } from "@shared/component/mobile/mobile-service";
import { Navigation } from "@shared/component/navigation/navigation";
import { LucideAngularModule, X } from "lucide-angular";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-site-layout-header",
	imports: [LucideAngularModule, MobileMenu, Navigation],
	templateUrl: "./site-header.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSite implements OnInit, OnDestroy {
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
