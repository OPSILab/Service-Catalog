import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DMMComponent } from './dmm.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: DMMComponent,
  },
];

@NgModule({
  imports: [TranslateModule.forChild({}),RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DMMRoutingModule {}
