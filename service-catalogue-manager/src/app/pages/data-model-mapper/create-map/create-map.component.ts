import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { Mapper } from '../../../model/adapter/mapper';
import { AppConfig } from '../../../model/appConfig';
import { ErrorDialogAdapterService } from '../../error-dialog/error-dialog-adapter.service';
import { DMMService } from '../dmm.service';

@Component({
  selector: 'create-map-and-adapter',
  templateUrl: './create-map.component.html',
  styleUrls: ['./create-map.component.scss']
})
export class CreateMapComponent implements OnInit {

  @Input() value: any;
  @Output() editedValue = new EventEmitter<unknown>();
  adapterId: string
  message
  name: string = ''
  sourceDataType: string
  selectedFile: File;
  json: Record<string, unknown>;
  loaded = false
  mappers: Mapper[];
  createAdapter = false
  mapId: string
  unsaved
  status
  description
  save
  update
  sources
  dataModels
  updateAdapter
  saveSchema = false
  path
  saveSource = false
  placeholders = {
    adapterId: this.translate.instant('general.adapters.adapterId'),
    mapId: this.translate.instant('general.dmm.mapId')
  }
  private appConfig: AppConfig;
  jsonMap: any;
  schema: any;
  config: any;
  sourceDataURL: any;
  dataModelURL: any;
  sourceData: any;
  dataModelID
  sourceDataID: any;
  sourceSaved: any;
  schemaSaved: any;

  constructor(
    protected dialogService: NbDialogService,
    private dmmService: DMMService,
    protected ref: NbDialogRef<CreateMapComponent>,
    private toastrService: NbToastrService,
    private errorService: ErrorDialogAdapterService,
    private translate: TranslateService,
    private configService: NgxConfigureService
  ) {
    this.appConfig = this.configService.config as AppConfig
  }

  cancel(): void {
    this.ref.close();
  }

  fixBrokenPageBug() {
    document.getElementsByTagName('html')[0].className = ""
  }

  selectFiltered(property, id) {
    try {
      return this[property].filter(filteredProperty => filteredProperty.id == id)[0]
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  ngOnInit(): void {

    //this.adapterId = Date.now().toString(); this.name = Date.now().toString(); this.description = Date.now().toString(); this.status = "Under development"
    this.loaded = false
    if (this.value)
      for (let key in this.value)
        this[key] = this.value[key]
  }

  confirm() {
    try {
      this.onSubmit()
    }
    catch (error) {
      console.error(error)
    }
  }

  confirmSubmit() {
    this.ref.close(true)
  }

  async onSubmit() {
    if ((this.unsaved.schema && !this.saveSchema) || (this.unsaved.source && !this.saveSource))
      this.dialogService.open(CreateMapComponent, {
        context: {
          message: "There are unsaved changes. Are you sure you want to discard them ?"
        }
      }).onClose.subscribe(async (confirm) => {
        if (confirm) {
          await this.submit()
        }
      });
    else
      await this.submit()
  }

  async sourceIdAlreadyExists() {
    /*
    if (this.saveSource && !this.sourceSaved && this.selectFiltered("sources", this.adapterId))
      try {
        return await this.dmmService.getSource(this.adapterId)
      }
      catch (error) {
        if (error.error.code == 404)
          console.log("You can use this source ID")
        else
          console.error(error.message || error.error?.message)
        return false
      }
    else
      return false
    */
    return this.saveSource && !this.sourceSaved && this.selectFiltered("sources", this.adapterId)
  }

  schemaIdAlreadyExists() {
    /*
    if (this.saveSchema && !this.schemaSaved && this.selectFiltered("dataModels", this.adapterId))
      try {
        return this.dmmService.getSchema(this.adapterId)
      }
      catch (error) {
        if (error.error.code == 404)
          console.log("You can use this schema ID")
        else
          console.error(error.message || error.error?.message)
        return false
      }
    else
      return false
    */
    return this.saveSchema && !this.schemaSaved && this.selectFiltered("dataModels", this.adapterId)
  }

  async submit() {
    let errors
    let name = this.name,
      adapterId = this.adapterId,
      description = this.description,
      status = this.status

    if (adapterId == '' || adapterId == null)
      throw new Error("Adapter ID must be set");

    if (await this.sourceIdAlreadyExists()) {
      //errors = true
      //this.errorHandle("source", { error: "id already exists", status: 400 })
      this.sourceSaved = true
    }

    if (!errors)
      if (await this.schemaIdAlreadyExists()) {
        //errors = true
        //this.errorHandle("schema", { error: "id already exists", status: 400 })
        this.schemaSaved = true
      }

    if (!errors)
      try {

        while (adapterId[0] == " ") adapterId = adapterId.substring(1)
        while (adapterId[adapterId.length - 1] == " ") adapterId = adapterId.substring(0, adapterId.length - 1)

        if (this.save) {
          await this.dmmService.saveMap({
            name,
            adapterId,
            status,
            description
          },
            status,
            description,
            this.jsonMap,
            this.saveSchema || (!this.dataModelURL && !this.dataModelID) ? this.schema : undefined,
            this.sourceDataType,
            this.config,
            this.saveSource ? undefined : this.sourceDataURL,
            this.saveSchema ? undefined : this.dataModelURL,
            this.saveSchema ? undefined : this.dataModelID,
            this.saveSource ? this.sourceData : undefined,
            this.saveSource ? undefined : this.sourceDataID,
            this.path);
          this.ref.close({ name, adapterId, status, description, saveSchema: this.saveSchema, saveSource: this.saveSource });
          this.editedValue.emit({ name, adapterId, status, description });
          this.showToast('primary', this.translate.instant('general.dmm.map_added_message'), '');
        }

        else {
          await this.dmmService.updateMap(
            {
              name,
              adapterId,
              status,
              description
            },
            status,
            description,
            this.jsonMap,
            this.saveSchema || (!this.dataModelURL && !this.dataModelID) ? this.schema : undefined,
            this.sourceDataType,
            this.config,
            this.saveSource ? undefined : this.sourceDataURL,
            this.saveSchema ? undefined : this.dataModelURL,
            this.saveSchema ? undefined : this.dataModelID,
            this.saveSource ? this.sourceData : undefined,
            this.saveSource ? undefined : this.sourceDataID,
            this.path);
          this.ref.close({ name, adapterId, status, description, saveSchema: this.saveSchema, saveSource: this.saveSource });
          this.editedValue.emit({ name, adapterId, status, description });
          this.showToast('primary', this.translate.instant('general.dmm.map_edited_message'), '');
        }

      }
      catch (error) {
        this.errorHandle("record", error)
        errors = true
      }
    if (!errors && this.saveSchema)
      try {
        if (!this.schemaSaved)
          await this.dmmService.saveSchema({ name, adapterId, status, description }, status, description, this.schema);
        else
          await this.dmmService.updateSchema({ name, adapterId, status, description }, status, description, this.schema);
      }
      catch (error) {
        this.errorHandle("schema", error)
        errors = true
      }
    if (!errors && this.saveSource)
      try {
        if (!this.sourceSaved)
          await this.dmmService.saveSource({ name, adapterId, status, description }, status, description, this.sourceData, this.path);
        else
          await this.dmmService.updateSource({ name, adapterId, status, description }, status, description, this.sourceData, this.path);
      }
      catch (error) {
        this.errorHandle("source", error)
        errors = true
      }
  }

  errorHandle(entity, error) {
    console.error(error)
    let errors: Object[] = []

    if (!this.jsonMap) errors.push({
      "path": "root.map",
      "message": "Value required",
      "errorcount": 1
    })
    if (!this.schema && !this.dataModelID && !this.dataModelURL) errors.push({
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
    if (!this.status) errors.push({
      "path": "root.status",
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
    if (!this.sourceData && !this.sourceDataURL && !this.sourceDataID) errors.push({
      "path": "root.source",
      "property": "minLength",
      "message": "Value required",
      "errorcount": 1
    })

    if (error.message == "Adapter ID must be set") {
      this.errorService.openErrorDialog({
        error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
          {
            "path": "root.Id",
            "property": "minLength",
            "message": "Value required",
            "errorcount": 1
          }
        ]
      });
    }
    //else if (error.status == 413)
    else if (error.status == 0)
      this.errorService.openErrorDialog(error)
    else if (error.status && error.status == 400 || error.message == "Schema required" || error.message == "Map required")
      if (error?.error == "id already exists" || error?.error?.error == "id already exists")
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.id",
              "property": "minLength",
              "message": "A " + entity + " with map ID < " + this.adapterId + " > already exists",
              "errorcount": 1
            }
          ]
        });
      else this.errorService.openErrorDialog({
        error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
      });
    else this.errorService.openErrorDialog(error);
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

