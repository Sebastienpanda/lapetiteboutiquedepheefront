import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ProfileSectionLayout } from '@core/layouts/profil-layout/items/profile-section-layout';
import { CommandesItems } from '@features/profil/commandes/items/commandes-items';

@Component({
    selector: 'app-commandes',
    templateUrl: './commandes.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ProfileSectionLayout, CommandesItems],
})
export default class Commandes {
    readonly baseTitle = signal('Mes Commandes');
}
