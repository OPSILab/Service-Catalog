import { StatusCardComponent } from './../../../dashboard/status-card/status-card.component';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { AvailableConnectorsService } from '../availableConnectors.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { ConnectorEntry } from '../../../../model/connector/connectorEntry'
import { Component, Input, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-add-new-prompt.component.html',
  styleUrls: ['dialog-add-new-prompt.component.scss'],
})

export class DialogAddNewPromptComponent {
  @Input() value: ConnectorEntry;
  @Output() editedValue = new EventEmitter<unknown>();
  http: HttpClient;
  configService: NgxConfigureService;
  inputItemNgModel;
  name: string = "name";
  description: string = "description";
  url: string = "url";
  status: string = "status";
  connectorId:string="connectorId"
  serviceId: string = "serviceId";
  textareaItemNgModel;
  inputItemFormControl
  textareaItemFormControl
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  static formType: string = 'edit';

  constructor(protected ref: NbDialogRef<DialogAddNewPromptComponent>, private errorService: ErrorDialogService, private availableConnectorService: AvailableConnectorsService) {
    console.log("constructor: ", this.value)
   }

  cancel(): void {
    this.ref.close();
  }

  onInit(): void {
    this.inputItemFormControl = new FormControl();
    this.textareaItemFormControl = new FormControl();
    console.log("onInit", this.value)
    this.name = this.value.name
    this.description=this.value.description
    this.status=this.value.status
    this.connectorId=this.value.connectorId
    this.serviceId=this.value.serviceId
    this.url=this.value.url
  }

  getFormType(): string {
    return DialogAddNewPromptComponent.formType
  }

  onFileChanged(event: Event): void {
    try {
      console.log("onFileChanged", this.value)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    console.log("confirm", this.value)
    if (DialogAddNewPromptComponent.formType == 'edit')
      this.onEdit()
    else
      this.onSubmit()
  }

  onEdit() {
    console.log("onedit value: ", this.value)
    let name = this.name, description = this.description, status = this.status, connectorId= this.connectorId, serviceId = this.serviceId, url = this.url;
    this.availableConnectorService.updateConnector((({ name, description, status, connectorId, serviceId, url } as unknown)) as ConnectorEntry, connectorId);//as unknown)) as ConnectorEntry were VisualStudioCode tips
    console.log("dialog-add-new-prompt.component.ts.onEdit(): Updated")
    this.ref.close({ content: this.json, format: this.selectedItem });
    this.editedValue.emit(this.value);
  }

  onSubmit() {
    console.log("onsubmit", this.value)
    let name = this.name, description = this.description, status = this.status, connectorId= this.connectorId, serviceId = this.serviceId, url = this.url
    this.availableConnectorService.saveConnector((({ name, description, status, connectorId, serviceId, url } as unknown)) as ConnectorEntry)
    console.log("dialog-add-new-prompt.component.ts.onSubmit: Saved")
    this.ref.close()
    this.editedValue.emit(this.value);
  }
}
