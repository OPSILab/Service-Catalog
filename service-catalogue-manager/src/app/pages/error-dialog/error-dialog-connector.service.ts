import { Injectable } from '@angular/core';
import { ErrorDialogConnectorComponent } from './error-dialog-connector.component';
import { NbDialogService } from '@nebular/theme';

@Injectable()
export class ErrorDialogConnectorService {
  constructor(private modalService: NbDialogService) {}

  openErrorDialog(error: unknown): void {
    this.modalService.open(ErrorDialogConnectorComponent, {
      context: {
        error: error,
      },
      hasScroll: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }
}
