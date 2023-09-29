import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { DialogImportComponent } from './../../data-model-mapper/dialog-import/dialog-import.component';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'import',
  templateUrl: '../../data-model-mapper/dialog-import/dialog-import.component.html',
  styleUrls: ['../../data-model-mapper/dialog-import/dialog-import.component.scss'],
  //templateUrl: './import.component.html',
  //styleUrls: ['./import.component.css']
})
export class ImportComponent extends DialogImportComponent {

  constructor(
    public http: HttpClient,
    public ref: NbDialogRef<DialogImportComponent>,
    public errorService: ErrorDialogService,
    @Inject(DOCUMENT) public document: Document,
  ) {
    super(http, ref, errorService, document)
  }

}
