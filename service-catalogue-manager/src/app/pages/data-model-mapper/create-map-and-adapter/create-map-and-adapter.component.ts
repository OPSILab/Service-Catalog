import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
import { Mapper } from '../../../model/adapter/mapper';
import { AppConfig } from '../../../model/appConfig';
import { ErrorDialogAdapterService } from '../../error-dialog/error-dialog-adapter.service';
import { AddAdapterComponent } from '../../services/available-adapters/add-adapter/add-adapter.component';
import { AvailableAdaptersService } from '../../services/available-adapters/available-adapters.service';

@Component({
  selector: 'create-map-and-adapter',
  templateUrl: './create-map-and-adapter.component.html',
  styleUrls: ['./create-map-and-adapter.component.scss']
})
export class CreateMapAndAdapterComponent implements OnInit {

  @Input() value: AdapterEntry;
  @Output() editedValue = new EventEmitter<unknown>();
  adapterId: string
  name: string = ''
  description: string = ''
  status: string = "inactive"
  type: string = "MODEL"
  context: string = "IMPORT"
  url: string
  previousUrl: string
  sourceDataType: string
  inputItemFormControl: FormControl;
  textareaItemFormControl: FormControl;
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  loaded = false
  mappers: Mapper[];
  validURL = true
  IDs: string[] = [];
  names: string[] = [];
  page1 = true
  lastPage = false
  contextDiv = false
  typeDiv = false
  sourceDataDiv = true
  createAdapter = false
  mapId: string
  placeholders = {
    adapterId: this.translate.instant('general.adapters.adapterId'),
    mapId: this.translate.instant('general.dmm.mapId'),
    status: this.translate.instant('general.adapters.status'),
    url: this.translate.instant('general.adapters.status'),
    sourceDataType: this.translate.instant('general.adapters.source_data_type'),
    description: this.translate.instant('general.adapters.description'),
    type: this.translate.instant('general.adapters.type'),
    context: this.translate.instant('general.adapters.context'),
  }
  private appConfig: AppConfig;

  constructor(
    private http: HttpClient,
    protected ref: NbDialogRef<AddAdapterComponent>,
    private toastrService: NbToastrService,
    private errorService: ErrorDialogAdapterService,
    private availableAdapterService: AvailableAdaptersService,
    private translate: TranslateService,
    private configService: NgxConfigureService
  ) {
    this.appConfig = this.configService.config as AppConfig
    console.debug(this)
  }

  cancel(): void {
    this.ref.close();
  }

  fixBrokenPageBug(){
    document.getElementsByTagName('html')[0].className=""
  }

  next() {
    if (this.page1)
      this.page1 = false
    else if (this.sourceDataDiv) {
      this.sourceDataDiv = false
      this.typeDiv = true
    }
    else if (this.typeDiv) {
      this.contextDiv = true
      this.typeDiv = false
    }
    else if (this.contextDiv){
      //this.contextDiv=false
      this.lastPage= true
    }
  }

  back() {
    if (this.lastPage) this.lastPage = false
    if (this.sourceDataDiv) {
      this.page1 = true
    }
    else if (this.typeDiv) {
      this.sourceDataDiv = true
      this.typeDiv = false
    }
    else if (this.contextDiv){
      this.contextDiv=false
      this.typeDiv = true
    }
  }

  onModelChange($event){
    if ($event == 'MODEL'){
      this.contextDiv = true;
      this.typeDiv = false
    }
    else this.lastPage = true
  }

  ngOnInit(): void {
    console.debug(this)
    this.loaded = false
    this.url = this.appConfig.data_model_mapper.default_mapper_url

    if (this.value) {
      this.name = this.value.name;
      this.description = this.value.description;
      this.status = this.value.status;
      this.adapterId ? this.adapterId : this.value ? this.value.adapterId : null;
      this.type = this.value.type;
      this.url = this.value.url;
      this.context = this.value.context;
      this.sourceDataType = this.value.sourceDataType
    }

    try {
      if (this.value && this.value.adapterId) this.adapterId = this.value.adapterId
      this.url = this.appConfig.data_model_mapper.default_mapper_url
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
    }
  }

  private filterID(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.IDs.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterName(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterID(filterString)),
    );
  }

  confirm() {
    try {
      this.onSubmit()
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
    }
  }

  async onSubmit() {
    console.debug(this.value)
    try {

      let name = this.name || this.value.name,
        description = this.description || this.value.description,
        status = this.status || this.value.status,
        adapterId = this.adapterId ? this.adapterId : this.value ? this.value.adapterId : null,
        type = this.type || this.value.type,
        url = this.url || this.value.url,
        context = this.context || this.value.context,
        sourceDataType = this.sourceDataType || this.value.sourceDataType

      if (adapterId == '' || adapterId == null)
        throw new Error("Adapter ID must be set");

      if (this.value) {
        await this.availableAdapterService.updateAdapter(((
          type == "MODEL" ?
            { name, description, status, adapterId, type, url, context, sourceDataType } as unknown :
            { name, description, status, adapterId, type, url, sourceDataType } as unknown)) as AdapterEntry, this.value.adapterId)
        this.ref.close(this.value);
        this.editedValue.emit(this.value);
        this.showToast('primary', this.translate.instant('general.adapters.adapter_edited_message'), '');
      }

      else {
        await this.availableAdapterService.saveAdapter(((
          type == "MODEL" ?
            { name, description, status, adapterId, type, url, context, sourceDataType } as unknown :
            { name, description, status, adapterId, type, url, sourceDataType } as unknown)) as AdapterEntry);

        this.ref.close(type == "MODEL" ?
          { name, description, status, adapterId, type, url, context, sourceDataType } :
          { name, description, status, adapterId, type, url, sourceDataType });
        this.editedValue.emit(this.value);
        this.showToast('primary', this.translate.instant('general.adapters.adapter_added_message'), '');
      }
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.adapterId) errors.push({
        "path": "root.adapterId",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.name) errors.push({
        "path": "root.name",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.description) errors.push({
        "path": "root.description",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.url) errors.push({
        "path": "root.url",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.type) errors.push({
        "path": "root.type",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (this.type == "MODEL" && !this.context) errors.push({
        "path": "root.context",
        "property": "minLength",
        "message": "Value required for adapter type model",
        "errorcount": 1
      })

      console.error("error:", "\n", error)
      if (error.message == "Adapter ID must be set") {
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.adapterId",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });
      }
      else if (error.status && error.status == 400) {
        if (error.error.status == "Adapter already exists")
          this.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.adapterId",
                "property": "minLength",
                "message": "A adapter with adapter ID < " + this.adapterId + " > already exists",
                "errorcount": 1
              }
            ]
          });
        else this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2500,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    } as Partial<NbToastrConfig>;

    this.toastrService.show(body, title, config);
  }
}

