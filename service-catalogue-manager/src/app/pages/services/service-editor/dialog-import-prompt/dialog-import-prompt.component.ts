import { AdapterEntry } from './../../../../model/adapter/adapterEntry';
import { AvailableAdaptersService } from './../../available-adapters/available-adapters.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'ngx-dialog-import-prompt',
  templateUrl: 'dialog-import-prompt.component.html',
  styleUrls: ['dialog-import-prompt.component.scss'],
})
export class DialogImportPromptComponent implements OnInit {
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  adapters: AdapterEntry[];
  adaptersActive: AdapterEntry[];

  constructor(protected ref: NbDialogRef<DialogImportPromptComponent>, private errorService: ErrorDialogService, private availableAdaptersService: AvailableAdaptersService) { }

  cancel(): void {
    this.ref.close();
  }


  async ngOnInit() {
    this.adaptersActive = [];
    this.adapters = await this.availableAdaptersService.getAdapters();
    this.adapters.forEach(adapterEntry => {
      if (adapterEntry.status == "active" && adapterEntry.type=="MODEL")
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
}
