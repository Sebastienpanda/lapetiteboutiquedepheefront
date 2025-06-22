import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: '',
        renderMode: RenderMode.Server,
    },
    {
        path: 'panier',
        renderMode: RenderMode.Client,
    },
    // {
    //   path: "test",
    //   renderMode: RenderMode.Client,
    // },
    // {
    //   path: "success",
    //   renderMode: RenderMode.Client,
    // },
    {
        path: 'inscription',
        renderMode: RenderMode.Client,
    },
    {
        path: 'connexion',
        renderMode: RenderMode.Client,
    },
    // {
    //   path: "confirmation-email",
    //   renderMode: RenderMode.Client,
    // },
    // {
    //   path: "profil",
    //   renderMode: RenderMode.Client,
    // },
    // {
    //   path: "profil/editer-profil",
    //   renderMode: RenderMode.Client,
    // },
    // {
    //   path: "profil/favoris",
    //   renderMode: RenderMode.Client,
    // },
    // {
    //   path: "profil/listes-envie",
    //   renderMode: RenderMode.Client,
    // },
    {
        path: 'boutique',
        renderMode: RenderMode.Client,
    },
    {
        path: 'boutique/:slug',
        renderMode: RenderMode.Client,
    },
    // {
    //   path: "a-propos",
    //   renderMode: RenderMode.Client,
    // },
    // {
    //   path: "faq",
    //   renderMode: RenderMode.Client,
    // },
    // {
    //   path: "commission",
    //   renderMode: RenderMode.Client,
    // },
    {
        path: '**',
        renderMode: RenderMode.Client,
    },
];
