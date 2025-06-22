import { NgTemplateOutlet, isPlatformBrowser } from "@angular/common";
import {
	type AfterViewInit,
	CUSTOM_ELEMENTS_SCHEMA,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	PLATFORM_ID,
	type TemplateRef,
	inject,
	input,
	viewChild,
} from "@angular/core";

interface WithId {
	id: string | number;
}

@Component({
	selector: "app-slider",
	templateUrl: "./slider.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class Slider<T extends WithId> implements AfterViewInit {
	readonly swiperRef = viewChild("swiperRef", { read: ElementRef });
	readonly prevEl = viewChild("prevEl", { read: ElementRef });
	readonly nextEl = viewChild("nextEl", { read: ElementRef });
	readonly data = input.required<T[]>();
	readonly template = input<TemplateRef<{ $implicit: T }>>();
	readonly platformId = inject(PLATFORM_ID);
	readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId)) return;

		const swiperEl = this.swiperRef()?.nativeElement;
		const prev = this.prevEl()?.nativeElement;
		const next = this.nextEl()?.nativeElement;

		if (swiperEl && prev && next) {
			Object.assign(swiperEl, {
				slidesPerView: 1,
				loop: true,
				spaceBetween: 16,
				pagination: false,
				a11y: false,
				navigation: {
					nextEl: next,
					prevEl: prev,
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
						slidesPerGroup: 2,
						spaceBetween: 24,
					},
					1024: {
						slidesPerView: 3,
						slidesPerGroup: 3,
						spaceBetween: 24,
					},
				},
			});

			swiperEl.initialize();
		}
	}
}
