import { FormControl } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AvailableConnectorsService } from '../availableConnectors.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { ConnectorEntry } from '../../../../model/connector/connectorEntry'
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogConnectorService } from '../../../error-dialog/error-dialog-connector.service';

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
  serviceId: string;
  textareaItemNgModel;
  inputItemFormControl;
  textareaItemFormControl;
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  static formType: string = 'edit';


  constructor(protected ref: NbDialogRef<DialogAddNewPromptComponent>, private toastrService: NbToastrService,
    private errorService: ErrorDialogConnectorService,
    private availableConnectorService: AvailableConnectorsService, private translate: TranslateService) {
  }

  cancel(): void {
    this.ref.close();
  }

  ngOnInit(): void {
    try {
      this.inputItemFormControl = new FormControl();
      this.textareaItemFormControl = new FormControl();
      this.name = this.value.name
      this.description = this.value.description
      this.status = this.value.status
      this.connectorId = this.value.connectorId
      this.serviceId = this.value.serviceId
      this.url = this.value.url
    }
    catch (error) {
      console.log("Error", error)
    }
  }

  getFormType(): string {
    return DialogAddNewPromptComponent.formType
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
      this.errorService.openErrorDialog(error);
    }
  }

  confirm() {
    try {
      if (DialogAddNewPromptComponent.formType == 'edit')
        this.onEdit()
      else
        this.onSubmit()
    }
    catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    let name = this.name, description = this.description, status = this.status, connectorId = this.connectorId, serviceId = this.serviceId, url = this.url;
    this.availableConnectorService.updateConnector((({ name, description, status, connectorId, serviceId, url } as unknown)) as ConnectorEntry, connectorId);//as unknown)) as ConnectorEntry were VisualStudioCode tips
    this.ref.close({ content: this.json, format: this.selectedItem });
    this.editedValue.emit(this.value);
  }

  async onSubmit() {
    try {
      console.log("dialog-add-new-prompt.component.ts.onSubmit() ", this.value);
      let name = this.name, description = this.description, status = this.status, connectorId = this.connectorId, serviceId = this.serviceId, url = this.url;
      if (connectorId == '' || connectorId == null) {
        console.log("dialog-add-new-prompt.component.ts.onSubmit(): Connector ID must be set");
        throw new Error("Connector ID must be set");
      }
      await this.availableConnectorService.saveConnector((({ name, description, status, connectorId, serviceId, url } as unknown)) as ConnectorEntry);
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

      console.log("error:", "\n", error.error.status)
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
