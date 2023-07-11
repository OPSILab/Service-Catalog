import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { AppConfig } from '../../../model/appConfig';
import { NgxConfigureService } from 'ngx-configure';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs-compat/Observable';
import { LocalDataSource } from 'ng2-smart-table';
import { AddKeyComponent } from './add-key/add-key.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-dataMap.component.html',
  styleUrls: ['dialog-dataMap.component.scss'],
})
export class DialogDataMapComponent implements OnInit {
  private appConfig: AppConfig;

  selectedProp //= 'Json';
  selectedProps = []
  public settings: unknown;

  selectedItem = {
    direct: false,
    concat: false,
    static: false,
    array: false
  };

  elements = [0]

  dataMap

  @Input() mapOptions: string[];
  @Input() selectPath: string;
  @Output() editedValue = new EventEmitter<unknown>();
  filteredMapOptions$: Observable<string[]>;
  source: LocalDataSource = new LocalDataSource();


  constructor(private http: HttpClient, protected ref: NbDialogRef<DialogDataMapComponent>,
    private errorService: ErrorDialogService,
  ) {
    this.settings = this.loadTableSettings();
  }

  loadTableSettings(): Record<string, unknown> {

    return {
      mode: 'external',
      attr: {
        class: 'table table-bordered',
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        serviceName: {
          title: "Select the source key",
          type: 'text',
          filter: false,
          width: '100%',
          valuePrepareFunction: (cell, row: any) => row
        }
      },
    };
  }

  onUserRowSelect(event): void {
    this.selectedProp = event.data
  }

  static(value) {
    this.selectedProp = "static:" + value
  }

  cancel(): void {
    this.ref.close();
  }

  concat(){
    this.elements.push(this.elements.length)
    console.debug(this.selectedProps)
  }

  confirm() {
    if (this.selectedItem.static)
      this.selectedProp = "static:" + this.selectedProp
      if (this.selectedItem.concat || this.selectedItem.array)
      this.selectedProp = this.selectedProps
    this.ref.close(this.selectedProp);
    this.editedValue.emit(this.selectedProp);
  }

  async ngOnInit() {
    console.log("MAP OPTIONS\n", this.mapOptions)
    void this.source.load(this.mapOptions)
  }

  onUpdate($event) { this.filteredMapOptions$ = of(this.filterMapOption($event)) };


  private filterMapOption(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.mapOptions.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

}
