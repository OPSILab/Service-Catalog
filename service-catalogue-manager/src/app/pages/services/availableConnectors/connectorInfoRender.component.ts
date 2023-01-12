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

export class ConnectorInfoRenderComponent implements OnInit{
  @Input() value: ConnectorEntry;
  @ViewChild('availableConnectorInfoModal', { static: true }) connectorInfoModalRef: TemplateRef<unknown>;

  logs:ConnectorEntryLog[]

  constructor(private modalService: NbDialogService, private translateService: TranslateService,private availableConnectorsService: AvailableConnectorsService,) {}
  async ngOnInit(): Promise<void> {
    console.log("connector info render component On Init")
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
}
