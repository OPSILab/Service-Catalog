import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailableServicesComponent } from './availableServices/availableServices.component';
import { AvailableConnectorsComponent } from './availableConnectors/availableConnectors.component';
import { EditorComponent } from './service-editor/editor.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
