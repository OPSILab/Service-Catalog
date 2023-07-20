import { Component, Inject, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { AppConfig } from '../../../model/appConfig';
import { NgxConfigureService } from 'ngx-configure';

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-import.component.html',
  styleUrls: ['dialog-import.component.scss'],
})
export class DialogImportComponent implements OnInit {
  private appConfig: AppConfig;
  selectedFile: File;
  file: String;
  fileOutput: String;
  json: Record<string, unknown>;
  selectedItem //= 'Json';
  dataUrl: string;
  extension: String;

  @Input() type: string;


  constructor(private http: HttpClient, protected ref: NbDialogRef<DialogImportComponent>,
    private errorService: ErrorDialogService,
    @Inject(DOCUMENT) private document: Document,
    ) {


  }

  cancel(): void {
    this.ref.close();
  }


  async ngOnInit() {


  }

  fixBrokenPageBug(){
    document.getElementsByTagName('html')[0].className=""
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


  async onUpload(type:string): Promise<void> {
    var source;
    if (type == "url") {
      this.file = await this.http.get<any>(this.dataUrl, { responseType: 'text' as 'json' }).toPromise();
      this.ref.close({ content: this.file, source: this.dataUrl , format:"url"});
    } else {

      this.ref.close({ content: this.file, source: this.selectedFile.name , format:"file"});
    }

  }


}
