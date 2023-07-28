import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorDialogCatalogueService } from './error-dialog/error-dialog-catalogue/error-dialog-catalogue.service';

@NgModule({
  imports: [PagesRoutingModule, ThemeModule, NbMenuModule, DashboardModule],
  declarations: [PagesComponent],
  providers: [ErrorDialogCatalogueService],
})
export class PagesModule {}
