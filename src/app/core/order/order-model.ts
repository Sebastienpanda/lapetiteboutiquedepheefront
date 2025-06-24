import { Product } from '@core/products/product-model';

export interface Order {
    id: string;
    stripe_id: string;
    total_amount: number;
    status: 'paid' | 'pending' | 'cancelled';
    created_at: string;
    created_by: string;
    order_items: OrderItem[];
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price_at_order: number;
    created_at: string;
    created_by: string;
    product: Product;
}
