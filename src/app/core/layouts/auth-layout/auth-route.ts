import type { Routes } from '@angular/router';
import AuthLayout from '@core/layouts/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'inscription',
                loadComponent: () => import('@features/auth/register/register'),
            },
            {
                path: 'connexion',
                loadComponent: () => import('@features/auth/login/login'),
            },
            {
                path: 'confirmation-email',
                loadComponent: () =>
                    import('@features/auth/confirm-email/confirm-email'),
            },
        ],
    },
];
