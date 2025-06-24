import { computed } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CartItem } from '@core/cart/cart-item-model';


export const cartStore = signalStore(
    { providedIn: 'root' },
    withState<{
        items: CartItem[];
    }>({
        items: [],
    }),

    withMethods((store) => {
        return {
            addItem(item: CartItem) {
                const existing = store.items().find(i => i.product.id === item.product.id);

                if (existing) {
                    patchState(store, {
                        items: store.items().map(i =>
                            i.product.id === item.product.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i,
                        ),
                    });
                } else {
                    patchState(store, {
                        items: [...store.items(), item],
                    });
                }
            },

            removeItem(productId: string) {
                patchState(store, {
                    items: store.items().filter(i => i.product.id !== productId),
                });
            },

            clear() {
                patchState(store, { items: [] });
            },

            getItems() {
                return store.items();
            },

            hasProduct(productId: string): boolean {
                return store.items().some(item => item.product.id === productId);
            },

            get itemsCount() {
                return computed(() =>
                    store.items().reduce((total, item) => total + item.quantity, 0),
                );
            },

            get lastItems() {
                return computed(() =>
                    [...store.items()].slice(-3).reverse(),
                );
            },
        };
    }),
);
