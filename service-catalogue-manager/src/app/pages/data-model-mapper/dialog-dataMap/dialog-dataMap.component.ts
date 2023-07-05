import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { AppConfig } from '../../../model/appConfig';
import { NgxConfigureService } from 'ngx-configure';

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-dataMap.component.html',
  styleUrls: ['dialog-dataMap.component.scss'],
})
export class DialogDataMapComponent implements OnInit {
  private appConfig: AppConfig;

  selectedProp: string //= 'Json';
  selectedItem: string;
  dataMap

  @Input() mapOptions: string[];
  @Input() selectPath: string;
  @Output() editedValue = new EventEmitter<unknown>();


  constructor(private http: HttpClient, protected ref: NbDialogRef<DialogDataMapComponent>,
    private errorService: ErrorDialogService,
  ) {

  }

  cancel(): void {
    this.ref.close();
  }

  confirm() {
    this.ref.close(this.selectedProp);
    this.editedValue.emit(this.selectedProp);
  }

  async ngOnInit() {
    console.log("MAP OPTIONS\n", this.mapOptions)

  }




}
