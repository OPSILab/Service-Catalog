import { AvailableServicesService } from './../../availableServices/availableServices.service';
import { AdapterEntry } from './../../../../model/adapter/adapterEntry';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ServiceModel } from '../../../../model/services/serviceModel';
import { Byte } from '@angular/compiler/src/util';
import { AppConfig } from '../../../../model/appConfig';
import { NgxConfigureService } from 'ngx-configure';
import { AvailableAdaptersService } from '../../../adapters/available-adapters.service';

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-import-prompt.component.html',
  styleUrls: ['dialog-import-prompt.component.scss'],
})
export class DialogImportPromptComponent implements OnInit {
  private appConfig: AppConfig;
  selectedFile: File;
  file: string;
  fileOutput: String;
  service: ServiceModel;
  json: Record<string, unknown>;
  selectedItem//= 'Json';
  adapters: AdapterEntry[];
  adaptersActive: AdapterEntry[];
  extension: String;
  selectedAdapter: AdapterEntry;

  constructor(private http: HttpClient, protected ref: NbDialogRef<DialogImportPromptComponent>,
    private errorService: ErrorDialogService, private availableAdaptersService: AvailableAdaptersService, private availableServicesService: AvailableServicesService,
    private configService: NgxConfigureService,) {
    this.appConfig = this.configService.config as AppConfig
  }

  cancel(): void {
    this.ref.close();
  }


  async ngOnInit() {
    this.adaptersActive = [];
    this.adapters = await this.availableAdaptersService.getAdapters();
    this.adapters.forEach(adapterEntry => {
      if (adapterEntry.status == "active" && adapterEntry.type == "MODEL")
        this.adaptersActive.push(adapterEntry)
    });
  }

  onFileChanged(event: Event): void {
    for (let adapter of this.adaptersActive) {
      if (this.selectedItem == adapter.adapterId) {
        this.selectedAdapter = adapter
        break
      }
      else this.selectedAdapter = undefined
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.selectedFile = (<HTMLInputElement>event.target).files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile, 'UTF-8');
      fileReader.onload = () => {
        try {
          this.file = fileReader.result as string
          this.extension = (<HTMLInputElement>event.target).files[0].name.split('.').pop().toLowerCase()
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

  async onUpload(): Promise<void> {
    let content, format, services
    if (!this.selectedAdapter) {
      content = JSON.parse(this.file) as Record<string,unknown>
      format = this.selectedItem
    }
    else {
      services = await this.availableServicesService.getAdaptedService(this.selectedAdapter.sourceDataType, this.file, this.selectedAdapter)
      //services = await this.availableServicesService.getAdaptedService(this.extension, this.file, this.selectedAdapter)
      content = services[0]
      format = this.extension
    }
    this.ref.close({ content, format });
  }
}
