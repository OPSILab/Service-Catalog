import { ServiceUrls } from './../../../../model/services/serviceUrls';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { AvailableConnectorsService } from '../availableConnectors.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { ConnectorEntry } from '../../../../model/connector/connectorEntry'

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-import-prompt.component.html',
  styleUrls: ['dialog-import-prompt.component.scss'],
})
export class DialogAddNewPromptComponent {
  http: HttpClient;
  //availableConnectorService : AvailableConnectorsService
  configService : NgxConfigureService;
  inputItemNgModel;
  name: string = "name";
  description: string = "description";
  url: string = "url";
  status: string = "status";
  id: string = "id";
  serviceId: string = "serviceId";
  textareaItemNgModel;
  inputItemFormControl
  textareaItemFormControl

  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';

  constructor(protected ref: NbDialogRef<DialogAddNewPromptComponent>, private errorService: ErrorDialogService, private availableConnectorService : AvailableConnectorsService) { }

  cancel(): void {
    this.ref.close();
  }

  onInit(): void {
    this.inputItemFormControl = new FormControl();
    this.textareaItemFormControl = new FormControl();
  }

  onFileChanged(event: Event): void {
    try {
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

  onUpload(): void {
    // upload code goes here
    this.ref.close({ content: this.json, format: this.selectedItem });
  }

  onSubmit() {
    //let availableConnectorService = new AvailableConnectorsService(this.configService, this.http)
    console.log("Submitted")
    let id = this.id, name = this.name, description = this.description, status = this.status, serviceId = this.serviceId, url = this.url
    //this.submitted = true;
    //this.connectorService.addConnector(this.connector).subscribe(b=>{this.connector=b;console.log(this.connector)});
    //availableConnectorService.saveConnector({this.id, this.name, this.description, this.status, this.serviceId, this.url})
    console.log(this.availableConnectorService)
    this.availableConnectorService.saveConnector((({ id, name, description, status, serviceId, url } as unknown)) as ConnectorEntry)
    console.log("Saved")
  }
}
