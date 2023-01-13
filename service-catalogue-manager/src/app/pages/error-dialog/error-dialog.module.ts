import { NgModule } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog.component';
import { NbCardModule } from '@nebular/theme';
import { ErrorDialogService } from './error-dialog.service';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorDialogConnectorComponent } from './error-dialog-connector.component';
import { ErrorDialogConnectorService } from './error-dialog-connector.service';

@NgModule({
  imports: [CommonModule, NbCardModule, TranslateModule.forChild()],
  declarations: [ErrorDialogComponent, ErrorDialogConnectorComponent],
  exports: [ErrorDialogComponent, ErrorDialogConnectorComponent],
  entryComponents: [ErrorDialogComponent, ErrorDialogConnectorComponent],
  providers: [ErrorDialogService, ErrorDialogConnectorService, Location],
})
export class ErrorDialogModule {}
