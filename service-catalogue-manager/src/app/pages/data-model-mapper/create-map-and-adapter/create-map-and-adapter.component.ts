import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
import { Mapper } from '../../../model/adapter/mapper';
import { AppConfig } from '../../../model/appConfig';
import { ErrorDialogAdapterService } from '../../error-dialog/error-dialog-adapter.service';
import { AddAdapterComponent } from '../../services/available-adapters/add-adapter/add-adapter.component';
import { AvailableAdaptersService } from '../../services/available-adapters/available-adapters.service';
import { DMMService } from '../dmm.service';

@Component({
  selector: 'create-map-and-adapter',
  templateUrl: './create-map-and-adapter.component.html',
  styleUrls: ['./create-map-and-adapter.component.scss']
})
export class CreateMapAndAdapterComponent implements OnInit {

  @Input() value: any;
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
  save
  update
  updateAdapter
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
  jsonMap: any;
  schema: any;

  constructor(
    private dmmService: DMMService,
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

  fixBrokenPageBug() {
    document.getElementsByTagName('html')[0].className = ""
  }

  ngOnInit(): void {
    console.debug(this)
    this.loaded = false
    this.url = this.appConfig.data_model_mapper.default_mapper_url

    if (this.value)
      for (let key in this.value)
        this[key] = this.value[key]

    try {
      this.url = this.appConfig.data_model_mapper.default_mapper_url
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
    }
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
    console.debug(this)

    try {

      let name = this.name,
        description = this.description,
        status = this.status,
        adapterId = this.adapterId,
        type = this.type,
        url = this.url,
        context = this.context,
        sourceDataType = this.sourceDataType

      if (adapterId == '' || adapterId == null)
        throw new Error("Adapter ID must be set");

      if (!this.createAdapter && this.save) {
        await this.dmmService.saveMap({ name, adapterId }, this.jsonMap, this.schema);
        this.ref.close({ name, adapterId });
        this.editedValue.emit(this.value);
        this.showToast('primary', this.translate.instant('general.dmm.map_added_message'), '');
      }

      else if (!this.createAdapter && !this.save) {
        await this.dmmService.updateMap({ name, adapterId }, this.jsonMap, this.schema);
        this.ref.close({ name, adapterId });
        this.editedValue.emit(this.value);
        this.showToast('primary', this.translate.instant('general.dmm.map_edited_message'), '');
      }

      else {

        if (this.value && this.updateAdapter) {
          await this.dmmService.updateMap({ name, adapterId }, this.jsonMap, this.schema);
          await this.availableAdapterService.updateAdapter(((
            type == "MODEL" ?
              { name, description, status, adapterId, type, url, context, sourceDataType } as unknown :
              { name, description, status, adapterId, type, url, sourceDataType } as unknown)) as AdapterEntry, this.value.adapterId)
          this.value = type == "MODEL" ?
            { name, description, status, adapterId, type, url, context, sourceDataType } :
            { name, description, status, adapterId, type, url, sourceDataType }
          this.ref.close(this.value);
          this.editedValue.emit(this.value);
          this.showToast('primary', this.translate.instant('general.dmm.map_edited_message'), '');
        }

        else {
          this.update ? await this.dmmService.updateMap({ name, adapterId }, this.jsonMap, this.schema) : await this.dmmService.saveMap({ name, adapterId }, this.jsonMap, this.schema);
          await this.availableAdapterService.saveAdapter(((
            type == "MODEL" ?
              { name, description, status, adapterId, type, url, context, sourceDataType } as unknown :
              { name, description, status, adapterId, type, url, sourceDataType } as unknown)) as AdapterEntry);
          console.debug("MAP\n", this.jsonMap, "SCHEMA\n", this.schema)
          !this.update ? this.showToast('primary', this.translate.instant('general.dmm.map_added_message'), '') :
            this.showToast('primary', this.translate.instant('general.dmm.map_edited_message')+this.translate.instant('general.dmm.adapter_added_message'), '')

          this.ref.close(type == "MODEL" ?
            { name, description, status, adapterId, type, url, context, sourceDataType } :
            { name, description, status, adapterId, type, url, sourceDataType });

          this.editedValue.emit(this.value);
        }
      }
    }
    catch (error) {
      console.error(error)
      let errors: Object[] = []

      if (!this.jsonMap) errors.push({
        "path": "root.map",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.schema) errors.push({
        "path": "root.schema",
        "message": "Value required",
        "errorcount": 1
      })
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
      if (!this.description && this.createAdapter) errors.push({
        "path": "root.description",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.url && this.createAdapter) errors.push({
        "path": "root.url",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.type && this.createAdapter) errors.push({
        "path": "root.type",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (this.type == "MODEL" && !this.context && this.createAdapter) errors.push({
        "path": "root.context",
        "property": "minLength",
        "message": "Value required for adapter type model",
        "errorcount": 1
      })

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
      else if (error.status == 0)
        this.errorService.openErrorDialog(error)
      else if (error.status && error.status == 400 && this.createAdapter) {
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
      else if (error.status && error.status == 400 || error.message == "Schema required" || error.message == "Map required") {
        console.debug(error.error)
        if (error?.error == "id already exists" || error?.error?.error == "id already exists")
          this.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.mapId",
                "property": "minLength",
                "message": "A map with map ID < " + this.adapterId + " > already exists",
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

