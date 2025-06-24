import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { userStore } from '@core/state/user/user-store';
import { OrderService } from '@core/order/order-service';

@Component({
    selector: 'app-commandes-items',
    templateUrl: './commandes-items.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class CommandesItems {
    private readonly commandesService = inject(OrderService);
    private readonly userStore = inject(userStore);
    readonly commandes = this.commandesService.order;

    constructor() {
        effect(() => {
            const user = this.userStore.user();
            if (user) {
                void this.commandesService.getCommande(user.id);
            }
        });
    }
}
