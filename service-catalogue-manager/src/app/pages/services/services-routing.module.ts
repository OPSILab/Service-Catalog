import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailableServicesComponent } from './availableServices/availableServices.component';
import { AvailableConnectorsComponent } from './availableConnectors/availableConnectors.component';
import { EditorComponent } from './service-editor/editor.component';
import { AvailableCataloguesComponent } from '../management/availableCatalogues/availableCatalogues.component';
import { RemoteCataloguesComponent } from '../management/remote-catalogues/remote-catalogues.component';
import { ManageConfigurationsComponent } from '../management/manage-configurations/manage-configurations.component';


const routes: Routes = [
  {
    path: 'availableServices',
    component: AvailableServicesComponent,
  },
  {
    path: 'service-editor',
    component: EditorComponent,
  },
  {
    path: 'availableConnectors',
    component: AvailableConnectorsComponent,
  },
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
export class ServicesRoutingModule {}
