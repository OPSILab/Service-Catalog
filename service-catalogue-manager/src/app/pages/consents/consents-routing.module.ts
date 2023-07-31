import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsentsComponent } from './consents.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'register',
    component: ConsentsComponent,
  },
];

@NgModule({
  imports: [TranslateModule.forChild({}),RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsentsRoutingModule {}
