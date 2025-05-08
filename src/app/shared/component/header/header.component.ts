import { ViewportRuler } from "@angular/cdk/scrolling";
import { isPlatformBrowser } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	effect,
	HostBinding,
	HostListener,
	inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	signal,
} from "@angular/core";
import { LucideAngularModule } from "lucide-angular";
import { Subject, takeUntil } from "rxjs";
import { NavigationComponent } from "../navigation/navigation.component";
import { MobileMenuComponent } from "../mobile/mobile.component";
import { MenuService } from "../mobile/mobile.service";

@Component({
	selector: "app-header",
	imports: [LucideAngularModule, NavigationComponent, MobileMenuComponent, MobileMenuComponent],
	templateUrl: "./header.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
	readonly scrollY = signal(0);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly viewportRuler = inject(ViewportRuler);
	protected readonly menu = inject(MenuService);
	private readonly destroy$ = new Subject<void>();

	@HostBinding("class.test2")
	get isScrolled(): boolean {
		return this.scrollY() > 0;
	}

	@HostBinding("class.menu-open")
	get menuOpen(): boolean {
		return this.menu.isOpen();
	}

	private readonly _ = effect(() => {
		if (!isPlatformBrowser(this.platformId)) return;
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
		if (!isPlatformBrowser(this.platformId)) return;
		this.viewportRuler
			.change(100)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				const width = this.viewportRuler.getViewportSize().width;
				if (width >= 1024 && this.menu.isOpen()) {
					this.closeMenu();
				}
			});
	}

	ngOnDestroy() {
		if (!isPlatformBrowser(this.platformId)) return;
		this.destroy$.next();
		this.destroy$.complete();
		document.body.classList.remove("menu-open");
	}

	@HostListener("window:scroll", [])
	onScroll() {
		if (!isPlatformBrowser(this.platformId)) return;
		this.scrollY.set(window.scrollY);
	}
}
