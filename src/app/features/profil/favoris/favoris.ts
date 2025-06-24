import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ProfileSectionLayout } from "@core/layouts/profil-layout/items/profile-section-layout";
import { FavorisItems } from "@features/profil/favoris/items/favoris-items";

@Component({
	selector: "app-favoris",
	templateUrl: "./favoris.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ProfileSectionLayout, FavorisItems],
})
export default class Favoris {
	readonly baseTitle = signal("Mes favoris");
}
