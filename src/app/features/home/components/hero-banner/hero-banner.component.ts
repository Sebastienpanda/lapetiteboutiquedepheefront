import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	signal,
	viewChild,
} from "@angular/core";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { ScrollDispatcher, ViewportRuler } from "@angular/cdk/scrolling";
import { Subject, takeUntil, throttleTime } from "rxjs";
import { ButtonComponent } from "@shared/component/ui/button/button.component";

@Component({
	selector: "app-hero-banner",
	imports: [CommonModule, LucideAngularModule, ButtonComponent],
	templateUrl: "./hero-banner.component.html",
	animations: [
		trigger("fadeInScale", [
			transition(":enter", [
				style({ opacity: 0, transform: "scale(0.95)" }),
				animate("500ms ease-in-out", style({ opacity: 1, transform: "scale(1)" })),
			]),
		]),
		trigger("staggerText", [
			transition(":enter", [
				query("p", [
					style({ opacity: 0, transform: "translateY(10px)" }),
					stagger(150, animate("700ms ease-in-out", style({ opacity: 1, transform: "translateY(0)" }))),
				]),
			]),
		]),
		trigger("buttonFadeIn", [
			transition(":enter", [
				query(
					"button",
					[
						style({ opacity: 0, transform: "translateY(10px)" }),
						stagger(150, [animate("900ms ease-in-out", style({ opacity: 1, transform: "translateY(0)" }))]),
					],
					{ optional: true },
				),
			]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroBannerComponent implements OnInit, OnDestroy {
	readonly bannerRef = viewChild("banner", { read: ElementRef });
	readonly scallopRef = viewChild("scallop", { read: ElementRef });

	private readonly platformId = inject(PLATFORM_ID);
	private readonly scrollDispatcher = inject(ScrollDispatcher);
	private readonly viewportRuler = inject(ViewportRuler);
	private readonly destroy$ = new Subject<void>();

	readonly scallopStuck = signal(false);
	readonly circlesCount = signal(0);

	protected readonly Array = Array;

	ngOnInit() {
		if (!isPlatformBrowser(this.platformId)) return;

		this.onScrollCheck();

		// Update circle count on viewport size changes
		this.viewportRuler
			.change(100)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.updateCircleCount());

		// Initial circle count
		this.updateCircleCount();

		// Handle scroll events
		this.scrollDispatcher
			.scrolled()
			.pipe(throttleTime(16), takeUntil(this.destroy$))
			.subscribe(() => this.onScrollCheck());
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private updateCircleCount() {
		const circleWidth = 40;
		const viewportWidth = this.viewportRuler.getViewportSize().width;
		this.circlesCount.set(Math.ceil(viewportWidth / circleWidth));
	}

	private onScrollCheck() {
		const banner = this.bannerRef()?.nativeElement as HTMLElement;
		const scallop = this.scallopRef()?.nativeElement as HTMLElement;
		const header = document.querySelector("header");

		if (!banner || !scallop || !header) return;

		const bannerBottom = banner.getBoundingClientRect().bottom;

		const isSticky = bannerBottom <= 144;
		this.scallopStuck.set(isSticky);
		header.classList.toggle("test", bannerBottom <= 144);
	}
}
