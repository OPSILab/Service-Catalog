import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AvailableConnectorsComponent } from "./availableConnectors.component";

const routes: Routes = [
  {
    path: 'availableConnectors',
    component: AvailableConnectorsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ],
  exports: [RouterModule],
})
export class ConnectorsRoutingModule {}
