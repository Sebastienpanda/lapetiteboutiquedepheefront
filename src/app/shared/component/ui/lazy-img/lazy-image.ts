import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-lazy-img",
	templateUrl: "./lazy-image.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImage {
	readonly src = input("");
	readonly alt = input();
	readonly srcWebp = input("");
	readonly thumbnail = input(false);

	loaded = false;
}
