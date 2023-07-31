import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AvailableConnectorsComponent } from "./availableConnectors.component";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: 'availableConnectors',
    component: AvailableConnectorsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule.forChild({}),],
  exports: [RouterModule],
})
export class ConnectorsRoutingModule {}
