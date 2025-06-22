export interface CartItem {
    id: string;
    quantity: number;
    price_at_add: number;
    product: {
        id: string;
        name: string;
        price: number;
        slug: string;
        type: string;
        categorie: {
            id: string;
            name: string;
        },
        images: {
            id: string;
            image_url: string;
        }[];
    },

}
