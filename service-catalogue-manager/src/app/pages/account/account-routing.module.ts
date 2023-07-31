import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
];

@NgModule({
  imports: [TranslateModule.forChild({}),RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
