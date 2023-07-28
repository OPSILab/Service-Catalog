import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Observable } from 'rxjs-compat/Observable';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-dataMap.component.html',
  styleUrls: ['dialog-dataMap.component.scss'],
})
export class DialogDataMapComponent implements OnInit {

  //private appConfig: AppConfig;
  selectedProp //= 'Json';
  spreadProps = ""
  selectedProps = []
  public settings: unknown;
  selectedItem = {
    direct: undefined,
    concat: undefined,
    static: undefined,
    array: undefined,
    base64: false
  };
  options = [
    "direct",
    "concat",
    "static",
    "array"
  ]
  selectedOption
  elements = [0]
  dataMap

  @Input() mapOptions: string[];
  @Input() selectPath: string;
  @Output() editedValue = new EventEmitter<unknown>();
  filteredMapOptions$: Observable<string[]>;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    protected ref: NbDialogRef<DialogDataMapComponent>//,
    //private errorService: ErrorDialogService,
  ) {
  }

  fixBrokenPageBug(){
    document.getElementsByTagName('html')[0].className=""
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

  concat() {

    if (this.selectedItem.static)
      this.selectedProps.push("static:" + this.selectedProp)
    else
      this.selectedProps.push(this.selectedProp)
    this.selectedProp = ""
    this.spreadProps = ""
    for (let prop of this.selectedProps)
      this.spreadProps += prop + ", "
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

    for (let option in this.mapOptions)
      sourceMapOptions[option] = { option: this.mapOptions[option] }
  }

  encodeChange($event) {

    if ($event) {
      this.selectedItem.concat = false
      this.selectedItem.array = false
    }
  }
}
