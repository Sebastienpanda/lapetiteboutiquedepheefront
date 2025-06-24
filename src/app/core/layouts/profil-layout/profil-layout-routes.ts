import type { Routes } from '@angular/router';
import { authGuard } from '@auth/auth-guard';
import ProfilLayoutComponent from '@core/layouts/profil-layout/profil-layout';

export const routes: Routes = [
    {
        path: 'profil',
        component: ProfilLayoutComponent,
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('@features/profil/profil'),
            },
            {
                path: 'editer-profil',
                loadComponent: () => import('@features/profil/edit/edit'),
            },
            {
                path: 'favoris',
                loadComponent: () => import('@features/profil/favoris/favoris'),
            },
            {
                path: 'commandes',
                loadComponent: () => import('@features/profil/commandes/commandes'),
            },
            {
                path: 'listes-envie',
                loadComponent: () => import('@features/profil/wishlist/wishlistParent'),
            },
        ],
    },
];
