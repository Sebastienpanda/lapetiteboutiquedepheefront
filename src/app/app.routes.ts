import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('@core/layouts/home-layout/home-route').then((m) => m.routes),
    },
    {
        path: '',
        loadChildren: () =>
            import('@core/layouts/site-layout/site-route').then((m) => m.routes),
    },
    {
        path: '',
        loadChildren: () =>
            import('@core/layouts/auth-layout/auth-route').then((m) => m.routes),
    },
    // {
    //   path: "test",
    //   loadComponent: () => import("@features/test/test"),
    // },
    // {
    //   path: "success",
    //   loadComponent: () => import("@features/paiment/success"),
    // },
    {
        path: '**',
        loadComponent: () => import('@features/not-found/not-found'),
    },
];
