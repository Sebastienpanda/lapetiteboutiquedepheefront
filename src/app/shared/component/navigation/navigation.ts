import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { userStore } from '@core/state/user/user-store';
import { navigationData } from '@shared/component/navigation/navigation-data';
import { Panier } from '@shared/component/panier/panier';
import { Button } from '@shared/component/ui/button/button';
import { LucideAngularModule, Menu } from 'lucide-angular';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, LucideAngularModule, RouterLinkActive, Panier, Button],
})
export class Navigation {
    readonly navigations = signal(navigationData);
    protected readonly Menu = Menu;
    menuClick = output<void>();
    readonly user = inject(userStore);
}
