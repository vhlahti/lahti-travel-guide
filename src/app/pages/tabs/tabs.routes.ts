import { Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

export const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                loadComponent: () => import('./home/home.page').then( m => m.HomePage),
            },
            {
                path: 'favorites',
                loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
            },
            {
                path: 'account',
                loadComponent: () => import('./account/account.page').then( m => m.AccountPage),
            },
            {
                path: 'about',
                loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
            },
        ]
    },
];