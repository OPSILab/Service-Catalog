import { AdapterEntry } from './../../../../model/adapter/adapterEntry';
import { AvailableAdaptersService } from './../../available-adapters/available-adapters.service';
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

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-import-prompt.component.html',
  styleUrls: ['dialog-import-prompt.component.scss'],
})
export class DialogImportPromptComponent implements OnInit {
  private appConfig: AppConfig;
  selectedFile: File;
  file: String;
  fileOutput: String;
  service: ServiceModel;
  json: Record<string, unknown>;
  selectedItem //= 'Json';
  adapters: AdapterEntry[];
  adaptersActive: AdapterEntry[];
  extension: String;

  constructor(private http: HttpClient, protected ref: NbDialogRef<DialogImportPromptComponent>,
    private errorService: ErrorDialogService, private availableAdaptersService: AvailableAdaptersService,
    private configService: NgxConfigureService,) {
    this.appConfig = this.configService.config as AppConfig
  }

  cancel(): void {
    this.ref.close();
  }


  async ngOnInit() {
    console.log(String.fromCharCode(parseInt("00001010", 2)))
    console.log(String.fromCharCode(parseInt("01100001", 2)))

    this.adaptersActive = [];
    this.adapters = await this.availableAdaptersService.getAdapters();
    this.adapters.forEach(adapterEntry => {
      if (adapterEntry.status == "active" && adapterEntry.type == "MODEL")
        this.adaptersActive.push(adapterEntry)
    });
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
          this.file = fileReader.result as String
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
    if (this.extension == "csv") this.service = await this.http.post<ServiceModel>(this.adaptersActive[0].url, {
      "sourceDataType": "csv",
      "sourceData": this.file,
      "adapterID":this.adaptersActive[0].adapterId,
      //"mapID": this.appConfig.data_model_mapper.default_map_ID,
      //"dataModelIn": this.appConfig.data_model_mapper.default_data_model_name,
      "csvDelimiter": ";"
    }).toPromise();
    this.ref.close({ content: this.service[0], format: this.extension });
  }
}
