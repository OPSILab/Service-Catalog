import { Injectable } from '@angular/core';
import { ErrorDialogCatalogueComponent } from './error-dialog-catalogue.component';
import { NbDialogService } from '@nebular/theme';
import { AppConfig } from '../../../model/appConfig';
import { NgxConfigureService } from 'ngx-configure';

@Injectable({providedIn: 'root'})
export class ErrorDialogCatalogueService {
  constructor(private modalService: NbDialogService,
    ) {
    }

  openErrorDialog(error: unknown): void {
    this.modalService.open(ErrorDialogCatalogueComponent, {
      context: {
        error: error,
      },
      hasScroll: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }
}
