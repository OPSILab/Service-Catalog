import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailableCataloguesComponent } from './availableCatalogues/availableCatalogues.component';


const routes: Routes = [
  {
    path: 'federatedCatalogues',
    component: AvailableCataloguesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
