import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AvailableAdaptersService } from '.././available-adapters.service';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
import { AdapterEntryLog } from '../../../model/adapter/adapterEntryLog';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
@Component({
  selector: 'adapter-info-render',
  templateUrl: './adapter-info-render.component.html',
  styleUrls: ['./adapter-info-render.component.css']
})
export class AdapterInfoRenderComponent implements OnInit {
  show: any;
  logs: AdapterEntryLog[];


  constructor(
    private errorDialogService: ErrorDialogService,
    private translate: TranslateService,
    private modalService: NbDialogService,
    private translateService: TranslateService,
    private availableAdaptersService: AvailableAdaptersService,
    private dialogService: NbDialogService
  ) {
    this.settings = this.loadTableSettings();
  }


  async ngOnInit(): Promise<void> {

  }
  @Input() value: AdapterEntry;
  @ViewChild('availableAdapterInfoModal', { static: true }) adapterInfoModalRef: TemplateRef<unknown>;

  public settings: Record<string, unknown>;
  private date: Date;
  private message: String;

  async showAdapterInfoModal(): Promise<void> {
    try {
      this.logs = await this.availableAdaptersService.getAdapterLogs(this.value.adapterId)
    }
    catch (error) {
      console.log("Error:\n\n", error)
    }
    this.modalService.open(this.adapterInfoModalRef, {
      context: {
        modalHeader: this.value.name,
        description: this.value.description,
        adapterId: this.value.adapterId,
        status: this.value.status,
        adapterUrl: this.value.url,
      },
      hasScroll: true,
    });
  }

  loadTableSettings(): Record<string, unknown> {
    this.date = this.translate.instant('general.logs.issued') as Date;
    this.message = this.translate.instant('general.logs.message') as String;

    return {
      mode: 'external',
      attr: {
        class: 'table table-bordered',
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        editService: false
      },
      columns: {
        date: {
          title: this.date,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: AdapterEntryLog) => row.issued,
        },
        message: {
          title: this.message,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row: AdapterEntryLog) => row.message,
        }
      }
    };
  }
}

