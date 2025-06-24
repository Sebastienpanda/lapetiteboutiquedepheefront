import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '@core/cart/cart-service';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { supabase } from '@auth/supabase-client';
import { OrderService } from '@core/order/order-service';
import { userStore } from '@core/state/user/user-store';

@Component({
    selector: 'app-success',
    templateUrl: './success.html',
    imports: [RouterLink, SectionWrapper],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SuccessComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly http = inject(HttpClient);
    private readonly cart = inject(CartService);
    private readonly orderService = inject(OrderService);
    private readonly userStore = inject(userStore);

    readonly loading = signal(true);
    readonly order = signal<any>(null);

    constructor() {
        effect(async () => {
            const user = await this.userStore.loadUser();
            const sessionId = this.route.snapshot.queryParamMap.get('session_id');

            console.log('🧪 effect déclenché - user:', user, 'sessionId:', sessionId);

            if (user && sessionId) {
                void this.loadOrder(sessionId, user.id);
            }
        });
    }

    private async loadOrder(sessionId: string, userId: string): Promise<void> {
        try {

            const { data, error } = await supabase.functions.invoke('find-checkout-session', {
                body: { session_id: sessionId },
            });

            if (error) {
                console.error('Erreur lors de la récupération de la commande :', error);
                return;
            }

            this.order.set({
                ...data,
                total: data.amount_total,
            });

            console.log('🧾 Items à enregistrer :', data.items);

            await this.orderService.createOrder({
                stripe_id: data.id,
                user_id: userId,
                total_amount: data.amount_total / 100,
                items: data.items.map((item: any) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            });

            await this.cart.clearCart();
        } catch (err) {
            console.error('Erreur inattendue :', err);
        } finally {
            this.loading.set(false);
        }
    }
}
