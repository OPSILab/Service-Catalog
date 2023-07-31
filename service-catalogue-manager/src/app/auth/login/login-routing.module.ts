import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginPopupComponent } from './loginPopup/loginPopup.component';
import { TranslateModule } from '@ngx-translate/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    children: [],
  },
  {
    path: 'loginPopup',
    pathMatch: 'full',
    component: LoginPopupComponent,
    children: [],
  },
];

@NgModule({
  imports: [TranslateModule.forChild({}),RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
