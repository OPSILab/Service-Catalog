import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DMMComponent } from './dmm.component';

const routes: Routes = [
  {
    path: '',
    component: DMMComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DMMRoutingModule {}
