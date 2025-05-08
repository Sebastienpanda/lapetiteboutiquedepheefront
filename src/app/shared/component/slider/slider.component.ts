import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	inject,
	input,
	PLATFORM_ID,
	viewChild,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpResourceRef } from "@angular/common/http";
import { ButtonComponent } from "@shared/component/ui/button/button.component";

interface DataHttpResourceRefInterface {
	id: string;
	name: string;
	price: number;
	image: {
		path_png: string;
		path_webp: string;
	};
}

@Component({
	selector: "app-slider",
	templateUrl: "./slider.component.html",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent],
})
export class SliderComponent implements AfterViewInit {
	readonly swiperRef = viewChild("swiperRef", { read: ElementRef });
	readonly prevEl = viewChild("prevEl", { read: ElementRef });
	readonly nextEl = viewChild("nextEl", { read: ElementRef });
	readonly dataHttpResourceRef = input.required<HttpResourceRef<Array<DataHttpResourceRefInterface>> | null>();
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
