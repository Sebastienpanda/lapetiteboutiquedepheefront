import { Injectable, signal } from '@angular/core';
import { supabase } from '@auth/supabase-client';
import { Order } from '@core/order/order-model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    readonly order = signal<Order[] | null>(null);

    async createOrder(orderData: {
        stripe_id: string;
        user_id: string;
        total_amount: number;
        items: {
            product_id: string;
            quantity: number;
            price: number;
        }[];
    }) {
        const { stripe_id, user_id, total_amount, items } = orderData;

        // 1. Créer la commande
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([
                {
                    stripe_id,
                    created_by: user_id,
                    total_amount,
                    status: 'paid',
                },
            ])
            .select('id')
            .single();

        if (orderError || !order) {
            throw new Error('Erreur lors de la création de la commande : ' + orderError?.message);
        }

        // 2. Créer les items associés
        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(
                items.map((item) => ({
                    order_id: order.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_at_order: item.price,
                    created_by: user_id,
                })),
            );

        if (itemsError) {
            throw new Error('Erreur lors de l’insertion des items : ' + itemsError.message);
        }

        return order;
    }

    async getCommande(userId: string) {
        const { data, error } = await supabase
            .from('orders')
            .select(`
            *,
            order_items (
                *,
                product:product_id (
                    *,
                    images:product_images (
                        id,
                        image_url,
                        cover
                    )
                )
            )
        `)
            .eq('created_by', userId)
            .filter('order_items.product.product_images.cover', 'eq', true); // 🧠 bien conservé

        if (error) {
            console.error('❌ Erreur lors de la récupération des commandes :', error.message);
            throw error;
        }

        this.order.set(data ?? []);
    }
}
