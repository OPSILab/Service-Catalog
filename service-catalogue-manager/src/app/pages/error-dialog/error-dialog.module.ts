import { NgModule } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog.component';
import { NbCardModule,  NbAccordionModule } from '@nebular/theme';
import { ErrorDialogService } from './error-dialog.service';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorDialogConnectorComponent } from './error-dialog-connector.component';
import { ErrorDialogConnectorService } from './error-dialog-connector.service';
import { ErrorDialogAdapterComponent } from './error-dialog-adapter.component';
import { ErrorDialogAdapterService } from './error-dialog-adapter.service';
import { ErrorDialogCatalogueComponent } from './error-dialog-catalogue/error-dialog-catalogue.component';

@NgModule({
  imports: [NbAccordionModule, CommonModule, NbCardModule, TranslateModule.forChild()],
  declarations: [ErrorDialogComponent, ErrorDialogConnectorComponent, ErrorDialogAdapterComponent, ErrorDialogCatalogueComponent],
  exports: [ErrorDialogComponent, ErrorDialogConnectorComponent, ErrorDialogAdapterComponent],
  entryComponents: [ErrorDialogComponent, ErrorDialogConnectorComponent, ErrorDialogAdapterComponent],
  providers: [ErrorDialogService, ErrorDialogConnectorService, ErrorDialogAdapterService, Location],
})
export class ErrorDialogModule {}
