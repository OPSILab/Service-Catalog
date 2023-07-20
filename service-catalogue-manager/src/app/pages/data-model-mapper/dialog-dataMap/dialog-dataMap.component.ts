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
  spreadProps = ""
  selectedProps = []
  public settings: unknown;

  selectedItem = {
    direct: undefined,
    concat: undefined,
    static: undefined,
    array: undefined,
    base64: undefined
  };

  options = ["direct",
    "concat",
    "static",
    "array"]

  selectedOption

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
        option: {
          title: "Select the source key",
          type: 'text',
          //filter: false,
          width: '100%',
          valuePrepareFunction: (cell, row: any) => row.option
        }
      },
    };
  }

  fixBrokenPageBug(){
    document.getElementsByTagName('html')[0].className=""
  }

  onUserRowSelect(event): void {
    //if (this.selectedItem.concat || this.selectedItem.array)
    //this.selectedProps[this.selectedProps.length] = event.data
    //else
    this.selectedProp = event.data.option
  }

  onChangeStatic(value) {
    this.selectedProp = "static:" + value
  }

  static() {
    this.selectedProps.push("static:" + this.selectedProp)
  }

  cancel(): void {
    this.ref.close();
  }

  reset(){

    this.selectedProps = []
    this.spreadProps = ""
  }

  back() {

    if (this.selectedItem.direct || this.selectedItem.static) {
      this.selectedItem.direct = undefined
      this.selectedItem.static = undefined
    }
    else if (this.selectedItem.array || this.selectedItem.concat && !this.selectedItem.base64) {
      this.selectedItem.array = undefined
      this.selectedItem.concat = undefined
    }
    else for (const [key, value] of Object.entries(this.selectedItem))
      this.selectedItem[key] = undefined

    this.selectedProp = ""
    this.selectedProps = []
  }

  concat() {
    if (this.selectedItem.static)
      this.selectedProps.push("static:" + this.selectedProp)
    else
      this.selectedProps.push(this.selectedProp)
    this.selectedProp = ""
    this.spreadProps = ""
    for (let prop of this.selectedProps)
      this.spreadProps += prop + ", "
    //console.debug(this.selectedProps)

  }

  confirm() {
    if (this.selectedItem.base64)
      this.selectedProp = "encode:base64:" + JSON.stringify(this.selectedProps)
    else if (this.selectedItem.concat || this.selectedItem.array)
      this.selectedProp = this.selectedProps
    else if (this.selectedItem.static)
      this.selectedProp = "static:" + this.selectedProp
    this.ref.close(this.selectedProp);
    this.editedValue.emit(this.selectedProp);
  }

  async ngOnInit() {
    let sourceMapOptions = []
    console.log("MAP OPTIONS\n", this.mapOptions)
    for (let option in this.mapOptions)
      sourceMapOptions[option] = { option: this.mapOptions[option] }

    void this.source.load(sourceMapOptions)
  }

  encodeChange($event) {
    console.debug("EVENT")
    console.debug($event)
    if ($event) {
      this.selectedItem.concat = false
      this.selectedItem.array = false
    }
  }
  onUpdate($event) { this.filteredMapOptions$ = of(this.filterMapOption($event)) };


  private filterMapOption(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.mapOptions.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

}
