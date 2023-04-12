import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailableServicesComponent } from './availableServices/availableServices.component';
import { AvailableConnectorsComponent } from './availableConnectors/availableConnectors.component';
import { EditorComponent } from './service-editor/editor.component';
import { AvailableAdaptersComponent } from './available-adapters/available-adapters.component';
import { AvailableCataloguesComponent } from '../management/availableCatalogues/availableCatalogues.component';


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
    path: 'availableAdapters',
    component: AvailableAdaptersComponent,
  },
  {
    path: 'federatedCatalogues',
    component: AvailableCataloguesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
