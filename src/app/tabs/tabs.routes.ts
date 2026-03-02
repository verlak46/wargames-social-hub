import { Routes } from '@angular/router';
import { TabsPage } from './tabs';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mapa',
        loadComponent: () =>
          import('../pages/mapa/mapa').then((m) => m.MapaPage),
      },
      {
        path: 'buscar',
        loadComponent: () =>
          import('../pages/buscar/buscar').then((m) => m.BuscarPage),
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('../pages/nuevo/nuevo').then((m) => m.NuevoPage),
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('../pages/chat/chat').then((m) => m.ChatPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../pages/perfil/perfil').then((m) => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: 'mapa',
        pathMatch: 'full',
      },
    ],
  },
];
