import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, type OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '@core/cart/cart-service';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { supabase } from '@auth/supabase-client';

@Component({
    selector: 'app-success',
    templateUrl: './success.html',
    imports: [RouterLink, SectionWrapper],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SuccessComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly http = inject(HttpClient);
    private readonly cart = inject(CartService);

    readonly loading = signal(true);
    readonly order = signal<any>(null);

    ngOnInit(): void {
        const sessionId = this.route.snapshot.queryParamMap.get('session_id');
        console.log(sessionId);
        if (!sessionId) return;

        supabase.functions
            .invoke('find-checkout-session', {
                body: { session_id: sessionId },
            })
            .then(({ data, error }) => {
                if (error) {
                    console.error('Erreur lors de la récupération de la commande :', error);
                    this.loading.set(false);
                    return;
                }

                this.order.set({
                    ...data,
                    total: data.amount_total,
                });
                this.loading.set(false);
                void this.cart.clearCart();
            })
            .catch((err) => {
                console.error('Erreur inattendue :', err);
                this.loading.set(false);
            });
    }

}
