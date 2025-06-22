import type { CoverImage } from '@shared/component/response-images/image-model';
import { Categorie } from '@core/categories/categorie-model';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    show_on_homepage: boolean;
    slug: string;
    type: 'physique' | 'digital';
    categorie_id: string;
    coverImage: CoverImage;
    images?: CoverImage[];
    category: Categorie;
}
