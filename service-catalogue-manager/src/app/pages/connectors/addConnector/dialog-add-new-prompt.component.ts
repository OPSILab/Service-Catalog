import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NbDialogRef, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig } from "@nebular/theme";
import { TranslateService } from "@ngx-translate/core";
import { NgxConfigureService } from "ngx-configure";
import { AdapterEntry } from "../../../model/adapter/adapterEntry";
import { ConnectorEntry } from "../../../model/connector/connectorEntry";
import { ServiceModel } from "../../../model/services/serviceModel";
import { AvailableAdaptersService } from "../../adapters/available-adapters.service";
import { ErrorDialogConnectorService } from "../../error-dialog/error-dialog-connector.service";
import { AvailableServicesService } from "../../services/availableServices/availableServices.service";
import { AvailableConnectorsService } from "../availableConnectors.service";


@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-add-new-prompt.component.html',
  styleUrls: ['dialog-add-new-prompt.component.scss'],
})

export class DialogAddNewPromptComponent implements OnInit {

  @Input() value: ConnectorEntry;
  @Output() editedValue = new EventEmitter<unknown>();

  http: HttpClient;
  configService: NgxConfigureService;
  inputItemNgModel;
  name: string;
  description: string;
  url: string;
  status: string = "inactive";
  connectorId: string;
  serviceId: string// = "";
  adapterId: string
  textareaItemNgModel;
  inputItemFormControl;
  textareaItemFormControl;
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  services: ServiceModel[]
  adapters: AdapterEntry[]
  adaptersTypeModel: AdapterEntry[] = []


  constructor(protected ref: NbDialogRef<DialogAddNewPromptComponent>, private toastrService: NbToastrService,
    private errorService: ErrorDialogConnectorService,
    private availableConnectorService: AvailableConnectorsService, private availableServiceService: AvailableServicesService,
    private availableAdaptersService: AvailableAdaptersService, private translate: TranslateService) {
  }

  cancel(): void {
    this.ref.close();
  }

  async ngOnInit(): Promise<void> {
    try {
      this.inputItemFormControl = new FormControl();
      this.textareaItemFormControl = new FormControl();
      this.services = await this.availableServiceService.getServices();
      this.adapters = await this.availableAdaptersService.getAdapters();
      for (let adapter of this.adapters)
        if (adapter.type == "DATA")
          this.adaptersTypeModel.push(adapter)
      if (this.value) {
        if (this.value.name) this.name = this.value.name
        if (this.value.description) this.description = this.value.description
        if (this.value.status) this.status = this.value.status
        if (this.value.connectorId) this.connectorId = this.value.connectorId
        if (this.value.serviceId) this.serviceId = this.value.serviceId
        if (this.value.adapterId) this.adapterId = this.value.adapterId
        if (this.value.url) this.url = this.value.url
      }
    }
    catch (error) {
      if (error.message == "Cannot read properties of undefined (reading 'name')")
        console.error("Error in add-form mode")
      else {
        console.error("error:<\n", error, ">\n")
        if (error.error) if (error.error.message) console.error("message:<\n", error.error.message, ">\n")
        else if (error.message) console.error("message:<\n", error.message, ">\n")
      }
    }
  }

  onFileChanged(event: Event): void {
    try {
      this.editedValue.emit(this.value.id);
      this.editedValue.emit(this.value);
      this.selectedFile = (<HTMLInputElement>event.target).files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile, 'UTF-8');
      fileReader.onload = () => {
        try {
          this.json = JSON.parse(fileReader.result as string) as Record<string, unknown>;
        } catch (error) {
          this.errorService.openErrorDialog(error);
          this.ref.close();
        }
      };

      fileReader.onerror = (error) => {
        this.errorService.openErrorDialog(error);
      };
    } catch (error) {
      console.error("error:<\n", error, ">\n")
      if (error.error) if (error.error.message) console.error("message:<\n", error.error.message, ">\n")
      else if (error.message) console.error("message:<\n", error.message, ">\n")
      this.errorService.openErrorDialog(error);
    }
  }

  confirm() {
    try {
      this.onSubmit()
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
      if (error.error) if (error.error.message) console.error("message:<\n", error.error.message, ">\n")
      else if (error.message) console.error("message:<\n", error.message, ">\n")
    }
  }

  async onEdit() {
    try {
      let name = this.name, description = this.description, status = this.status, connectorId = this.connectorId, serviceId = this.serviceId, url = this.url;
      await this.availableConnectorService.updateConnector((({ name, description, status, connectorId, serviceId, url } as unknown)) as ConnectorEntry, connectorId);//as unknown)) as ConnectorEntry were VisualStudioCode tips
      this.ref.close({ content: this.json, format: this.selectedItem });
      this.editedValue.emit(this.value);
      this.showToast('primary', this.translate.instant('general.connectors.connector_edited_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.connectorId) errors.push({
        "path": "root.connectorId",
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

      console.error("error:", "\n", error)
      if (error.message == "Connector ID must be set") {
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.connectorId",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });
      }
      else if (error.status && error.status == 400) {
        if (error.error.status == "Connector already exists")
          this.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.connectorId",
                "property": "minLength",
                "message": "A connector with connector ID < " + this.connectorId + " > already exists",
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

  async onSubmit() {
    try {
      let name = this.name, description = this.description, status = this.status, connectorId = this.connectorId, serviceId = this.serviceId, url = this.url, adapterId = this.adapterId;
      if (connectorId == '' || connectorId == null) {
        console.error("error in dialog-add-new-prompt.component.ts.onSubmit(): Connector ID must be set");
        throw new Error("Connector ID must be set");
      }
      await this.availableConnectorService.saveConnector((({ name, description, status, connectorId, serviceId, url, adapterId } as unknown)) as ConnectorEntry);
      this.ref.close();
      this.editedValue.emit(this.value);
      this.showToast('primary', this.translate.instant('general.connectors.connector_added_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.connectorId) errors.push({
        "path": "root.connectorId",
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

      console.error("error:", "\n", error)
      if (error.message == "Connector ID must be set") {
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.connectorId",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });
      }
      else if (error.status && error.status == 400) {
        if (error.error.status == "Connector already exists")
          this.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.connectorId",
                "property": "minLength",
                "message": "A connector with connector ID < " + this.connectorId + " > already exists",
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
