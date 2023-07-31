import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvailableAdaptersComponent } from './adapters/available-adapters.component';
import { AvailableConnectorsComponent } from './connectors/availableConnectors.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'services/availableServices',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'consents',
        loadChildren: () => import('./consents/consents.module').then((m) => m.ConsentsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'services',
        loadChildren: () => import('./services/services.module').then((m) => m.ServicesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'adapters',
        loadChildren: () => import('./adapters/adapters.module').then((m) => m.AdaptersModule),
        component: AvailableAdaptersComponent,
      },
      {
        path: 'connectors',
        loadChildren: () => import('./connectors/connectors.module').then((m) => m.ConnectorsModule),
        component: AvailableConnectorsComponent,
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'dmm',
        loadChildren: () => import('./data-model-mapper/dmm.module').then((m) => m.DMMModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'management',
        loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
        canActivate: [AuthGuard],
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
