import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'item-detail/:id',
    loadComponent: () => import('./pages/tabs/item-detail/item-detail.page').then( m => m.ItemDetailPage),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then( m => m.routes),
  },
];
