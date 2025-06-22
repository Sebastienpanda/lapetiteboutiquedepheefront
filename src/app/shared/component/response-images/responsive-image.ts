import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface Image {
    id: string;
    image_url: string;
}

@Component({
    selector: 'app-responsive-image',
    templateUrl: './responsive-image.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveImageComponent {
    readonly image = input.required<Image[]>();
    readonly alt = input.required();
    readonly class = input();
}
