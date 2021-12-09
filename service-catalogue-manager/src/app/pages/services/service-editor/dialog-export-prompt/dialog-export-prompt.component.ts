import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-dialog-export-prompt',
  templateUrl: 'dialog-export-prompt.component.html',
  styleUrls: ['dialog-export-prompt.component.scss'],
})
export class DialogExportPromptComponent {
  constructor(protected ref: NbDialogRef<DialogExportPromptComponent>) {}

  name = '';
  exportFormat = 'json';

  cancel(): void {
    this.ref.close();
  }

  submit(): void {
    this.ref.close({ name: this.name, exportFormat: this.exportFormat });
  }
}
