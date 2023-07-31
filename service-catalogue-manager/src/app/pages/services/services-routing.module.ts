import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailableServicesComponent } from './availableServices/availableServices.component';
import { EditorComponent } from './service-editor/editor.component';
import { AvailableCataloguesComponent } from '../management/availableCatalogues/availableCatalogues.component';
import { RemoteCataloguesComponent } from '../management/remote-catalogues/remote-catalogues.component';
import { ManageConfigurationsComponent } from '../management/manage-configurations/manage-configurations.component';
import { TranslateModule } from '@ngx-translate/core';


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
  imports: [RouterModule.forChild(routes), TranslateModule.forChild({}),],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
