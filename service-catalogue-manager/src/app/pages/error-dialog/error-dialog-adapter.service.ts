import { Injectable } from '@angular/core';
import { ErrorDialogAdapterComponent } from './error-dialog-adapter.component';
import { NbDialogService } from '@nebular/theme';

@Injectable()
export class ErrorDialogAdapterService {
  constructor(private modalService: NbDialogService) {}

  openErrorDialog(error: unknown): void {
    this.modalService.open(ErrorDialogAdapterComponent, {
      context: {
        error: error,
      },
      hasScroll: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }
}
