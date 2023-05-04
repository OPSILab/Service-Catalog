import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailableCataloguesComponent } from './availableCatalogues/availableCatalogues.component';
import { RemoteCataloguesComponent } from './remote-catalogues/remote-catalogues.component';
import { ManageConfigurationsComponent } from './manage-configurations/manage-configurations.component';


const routes: Routes = [
  {
    path: 'federatedCatalogues',
    component: AvailableCataloguesComponent,
  },
  {
    path: 'remoteCatalogues',
    component: RemoteCataloguesComponent,
  },
  {
    path: 'manageConfigurations',
    component: ManageConfigurationsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
