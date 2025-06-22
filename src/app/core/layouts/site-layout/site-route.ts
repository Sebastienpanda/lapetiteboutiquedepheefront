import type { Routes } from '@angular/router';
import SiteLayout from '@core/layouts/site-layout/site-layout';
import { UserResolver } from '@core/user/user-resolver';

export const routes: Routes = [
    {
        path: '',
        component: SiteLayout,
        resolve: {
            user: UserResolver,
        },
        children: [
            {
                path: 'panier',
                loadComponent: () => import('@features/cart/pages/cart'),
            },
            // 	{
            // 		path: "",
            // 		loadChildren: () =>
            // 			import("@core/layouts/profil-layout/profil-layout-routes").then(
            // 				(m) => m.routes,
            // 			),
            // 	},
            {
                path: 'boutique',
                loadComponent: () => import('@features/boutique/boutique'),
            },
            {
                path: 'boutique/:slug',
                loadComponent: () => import('@features/boutique/product/productPage'),
            },
            {
                path: 'faq',
                loadComponent: () => import('@features/faq/faq'),
            },
            {
                path: 'commission',
                loadComponent: () => import('@features/commission/commission'),
            },
            {
                path: 'a-propos',
                loadComponent: () => import('@features/about/about'),
            },
        ],
    },
];
