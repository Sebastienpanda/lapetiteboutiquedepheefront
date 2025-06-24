import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FavorisService } from '@core/favoris/favoris-service';
import { userStore } from '@core/state/user/user-store';
import { ShoppingCart, Trash2 } from 'lucide-angular';

@Component({
    selector: 'app-favoris-items',
    templateUrl: './favoris-items.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class FavorisItems {
    private readonly favorisService = inject(FavorisService);
    private readonly userStore = inject(userStore);

    protected readonly favoris = this.favorisService.favoris;

    constructor() {
        effect(() => {
            const user = this.userStore.user();
            if (user) {
                void this.favorisService.getFavoris(user.id);
            }
        });
    }

    // onAddToCart(product: Product) {
    // 	console.log("Ajouter au panier :", product);
    // }
    //
    // onRemove(productId: string) {
    // 	this.products.update((p) => p.filter((prod) => prod.id !== productId));
    // }

    protected readonly Trash2 = Trash2;
    protected readonly ShoppingCart = ShoppingCart;
}
