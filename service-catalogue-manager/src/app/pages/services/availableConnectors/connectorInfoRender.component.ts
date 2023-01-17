import { OnInit } from '@angular/core';
//details: i (info) button
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';
import { ConnectorEntryLog } from '../../../model/connector/connectorEntryLog';
import { AvailableConnectorsService } from './availableConnectors.service';


@Component({
  templateUrl: `./connectorInfoRender.component.html`,
})

export class ConnectorInfoRenderComponent implements OnInit {
  @Input() value: ConnectorEntry;
  @ViewChild('availableConnectorInfoModal', { static: true }) connectorInfoModalRef: TemplateRef<unknown>;

  logs: ConnectorEntryLog[]
  public settings: Record<string, unknown>;
  private date: Date;
  private message: String;

  constructor(private translate: TranslateService, private modalService: NbDialogService, private translateService: TranslateService, private availableConnectorsService: AvailableConnectorsService,) {
    this.settings = this.loadTableSettings();
  }

  async ngOnInit(): Promise<void> {
    console.log("connectorInfoRender.component.ts.ngOnInit()")
    this.logs = await this.availableConnectorsService.getConnectorLogs(this.value.connectorId)

  }

  showConnectorInfoModal(): void {
    this.modalService.open(this.connectorInfoModalRef, {
      context: {
        modalHeader: this.value.name,
        description: this.value.description,
        connectorId: this.value.connectorId,
        serviceId: this.value.serviceId,
        status: this.value.status,
        connectorUrl: this.value.url,
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
          valuePrepareFunction: (cell, row: ConnectorEntryLog) => row.issued,
        },
        message: {
          title: this.message,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row: ConnectorEntryLog) => row.message,
        }
      }
    };
  }
}
