import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorDialogCatalogueService } from './error-dialog/error-dialog-catalogue/error-dialog-catalogue.service';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './mapper-records/home.component';

@NgModule({
  imports: [PagesRoutingModule, ThemeModule, NbMenuModule, DashboardModule, TranslateModule.forChild({}),],
  declarations: [PagesComponent, HomeComponent],
  providers: [ErrorDialogCatalogueService],
})
export class PagesModule {}
