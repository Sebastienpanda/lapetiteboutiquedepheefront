import type { Routes } from '@angular/router';
import HomeLayout from '@core/layouts/home-layout/home-layout';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('@features/home/home'),
            },
        ],
    },
];
