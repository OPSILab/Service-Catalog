import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DMMService } from '../../data-model-mapper/dmm.service';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    @Input() value;

    @ViewChild('availableRecordInfoModal', { static: true }) recordInfoModalRef: TemplateRef<unknown>;

    public settings: Record<string, unknown>;
    private date: Date;
    private message: String;
    dialogRef


    constructor(
      private errorDialogService: ErrorDialogService,
      private translate: TranslateService,
      private modalService: NbDialogService,
      private translateService: TranslateService,
      private availableRecordsService: DMMService,
      private dialogService: NbDialogService
    ) {
    }

    async ngOnInit(): Promise<void> {

    }

    async showRecordInfoModal(): Promise<void> {
      this.dialogRef = this.modalService.open(this.recordInfoModalRef, {
        context: {
          modalHeader: this.value.name,
          description: this.value.description,
          recordId: this.value.recordId,
          serviceId: this.value.serviceId,
          status: this.value.status,
          recordUrl: this.value.url,
        },
        hasScroll: true,
      });
    }
  }
