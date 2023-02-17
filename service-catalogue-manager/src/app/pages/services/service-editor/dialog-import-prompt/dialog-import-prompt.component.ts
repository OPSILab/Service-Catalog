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

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-import-prompt.component.html',
  styleUrls: ['dialog-import-prompt.component.scss'],
})
export class DialogImportPromptComponent implements OnInit {
  selectedFile: File;
  file: String;
  fileOutput:String;
  service: ServiceModel;
  json: Record<string, unknown>;
  selectedItem //= 'Json';
  adapters: AdapterEntry[];
  adaptersActive: AdapterEntry[];
  extension: String;

  constructor(private http: HttpClient, protected ref: NbDialogRef<DialogImportPromptComponent>, private errorService: ErrorDialogService, private availableAdaptersService: AvailableAdaptersService) { }

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
          //this.json = JSON.parse(fileReader.result as string) as Record<string, unknown>;//G:
          this.file = fileReader.result as String
          this.extension = (<HTMLInputElement>event.target).files[0].name.split('.').pop().toLowerCase()//G:
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
    const fileReader = new FileReader();
    // upload code goes here
    /* console.log(
       "\nthis.selectedFile\n",
       this.selectedFile,
       "\nthis.json\n",
       this.json,
       "\nthis.selectedItem\n",

       "\nthis.adapters\n",
       this.adapters,
       "\nthis.adaptersActive\n",
       this.adaptersActive
       )*/
    console.log("\n\n", this.file, "\n\n")
    //for (let i = 0; i < this.selectedItem.length; i++) {

    //console.log(this.selectedItem[i])

    //}
    //this.ref.close({ content: this.json, format: this.selectedItem });
    //let a : Byte = 0b00001010;

    //this.fileOutput=this.file.replace("\r\n", "newline")//+this.file[1];
    if (this.extension=="csv") this.service = await this.http.post<ServiceModel>(this.adaptersActive[0].url, {
      "sourceDataType": "csv",
      "sourceData": this.file,//0b11111111
      "mapPathIn": "examples\\serviceModelMap.json",
      "dataModelIn": "ServiceModel",
      "csvDelimiter": ";"
    }).toPromise();//TODO continue this
    /*if (this.extension == "csv") console.log( await this.http.post<JSON>(this.adaptersActive[0].url, {
      "sourceDataIn": "examples\\serviceModel.csv",
      "mapPathIn": "examples\\serviceModelMap.json",
      "dataModelIn": "ServiceModel"
    }).toPromise())*/
    //this.ref.close({ content: this.file, format: this.extension });
    this.ref.close({ content: this.service, format: this.extension });
  }
}
