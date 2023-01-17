import { StatusCardComponent } from './../../../dashboard/status-card/status-card.component';
import { Description } from './../../../../model/services/description';
import { FormControl } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AvailableAdaptersService } from '../available-adapters.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { AdapterEntry } from '../../../../model/adapter/adapterEntry'
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//TODO import { ErrorDialogAdapterService } from '../../../error-dialog/error-dialog-adapter.service';


@Component({
  selector: 'add-adapter',
  templateUrl: './add-adapter.component.html',
  styleUrls: ['./add-adapter.component.scss']
})

export class AddAdapterComponent implements OnInit {
  @Input() value: AdapterEntry;
  @Output() editedValue = new EventEmitter<unknown>();
  http: HttpClient;
  configService: NgxConfigureService;
  inputItemNgModel;
  adapterId: string = "adapterId"
  name: string = "name"
  description: string = "description"
  status: string = "inactive"
  type: string = "Model"//TODO enum
  url: string = "https://www.adapter.com"
  textareaItemNgModel;
  inputItemFormControl;
  textareaItemFormControl;
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  static formType: string = 'edit';


  constructor(protected ref: NbDialogRef<AddAdapterComponent>, private toastrService: NbToastrService,
    //TODO private errorService: ErrorDialogAdapterService,
    private availableAdapterService: AvailableAdaptersService, private translate: TranslateService) {
    console.log("constructor: ", this.value)
  }

  cancel(): void {
    this.ref.close();
  }

  ngOnInit(): void {
    try {
      this.inputItemFormControl = new FormControl();
      this.textareaItemFormControl = new FormControl();
      console.log("dialog-add-new-prompt.component.ts.onInit()", this.value)
      this.adapterId = this.value.adapterId
    }
    catch (error) {
      console.log("Error", error)
    }

  }

  getFormType(): string {
    return AddAdapterComponent.formType
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
          //TODOthis.errorService.openErrorDialog(error);
          this.ref.close();
        }
      };

      fileReader.onerror = (error) => {
        //TODOthis.errorService.openErrorDialog(error);
      };
    } catch (error) {
      //TODOthis.errorService.openErrorDialog(error);
    }
  }

  confirm() {
    console.log("dialog-add-new-prompt.component.ts.confirm()", this.value)
    if (AddAdapterComponent.formType == 'edit')
      this.onEdit()
    else
      this.onSubmit()
  }

  onEdit() {
    console.log("dialog-add-new-prompt.component.ts.onEdit() value: ", this.value)
    let adapterId = this.adapterId;
    //TODO this.availableAdapterService.updateAdapter((({ name, description, status, adapterId, serviceId, url } as unknown)) as AdapterEntry, adapterId);//as unknown)) as AdapterEntry were VisualStudioCode tips
    console.log("dialog-add-new-prompt.component.ts.onEdit(): Updated")
    this.ref.close({ content: this.json, format: this.selectedItem });
    this.editedValue.emit(this.value);
  }

  onSubmit() {
    try {
      console.log("dialog-add-new-prompt.component.ts.onSubmit() ", this.value);
      let adapterId = this.adapterId;
      if (adapterId == '' || adapterId == null) {
        console.log("dialog-add-new-prompt.component.ts.onSubmit(): Adapter ID must be set");
        throw new Error("Adapter ID must be set");
      }
      //TODO this.availableAdapterService.saveAdapter((({ name, description, status, adapterId, serviceId, url } as unknown)) as AdapterEntry);
      console.log("dialog-add-new-prompt.component.ts.onSubmit(): Saved")
      this.ref.close();
      this.editedValue.emit(this.value);
      this.showToast('primary', this.translate.instant('general.adapters.adapter_added_message'), '');
    }
    catch (error) {
      console.log(error)
      /*TODO this.errorService.openErrorDialog({ error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
        {
            "path": "root.adapterId",
            "property": "minLength",
            "message": "Value required",
            "errorcount": 1
        }
    ] });*/
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

