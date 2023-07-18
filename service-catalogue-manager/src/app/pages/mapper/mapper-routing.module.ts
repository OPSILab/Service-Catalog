import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapperComponent } from './mapper.component';

const routes: Routes = [
  {
    path: '',
    component: MapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapperRoutingModule {}
