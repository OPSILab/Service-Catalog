import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageConfigurationsComponent } from "../management/manage-configurations/manage-configurations.component";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: 'availableAdapters',
    component: ManageConfigurationsComponent,
  }
];

@NgModule({
  imports: [TranslateModule.forChild({}),RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdaptersRoutingModule {}
