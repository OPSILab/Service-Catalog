import { OnInit } from '@angular/core';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';
import { ConnectorEntryLog } from '../../../model/connector/connectorEntryLog';
import { Dataset } from '../../../model/services/dataset';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { AvailableServiceRow } from '../availableServices/availableServices.component';
import { AvailableServicesService } from '../availableServices/availableServices.service';
import { ServiceInfoRenderComponent } from '../availableServices/serviceInfoRender.component';
import { AvailableConnectorsService } from './availableConnectors.service';


@Component({
  templateUrl: `./connectorInfoRender.component.html`,
})

export class ConnectorInfoRenderComponent implements OnInit {
  @Input() value: ConnectorEntry;

  @ViewChild('availableConnectorInfoModal', { static: true }) connectorInfoModalRef: TemplateRef<unknown>;
  @ViewChild('availableServiceInfoModal', { static: true }) serviceInfoModalRef: TemplateRef<unknown>;

  logs: ConnectorEntryLog[];
  service: AvailableServiceRow;
  public settings: Record<string, unknown>;
  private date: Date;
  private message: String;
  dialogRef


  constructor(
    private errorDialogService: ErrorDialogService,
    private availableServicesService: AvailableServicesService,
    private translate: TranslateService,
    private modalService: NbDialogService,
    private translateService: TranslateService,
    private availableConnectorsService: AvailableConnectorsService,
    private dialogService: NbDialogService
  ) {
    this.settings = this.loadTableSettings();
  }

  async ngOnInit(): Promise<void> {

  }

  async showConnectorInfoModal(): Promise<void> {
    try {
      this.logs = await this.availableConnectorsService.getConnectorLogs(this.value.connectorId)
      if (this.value.serviceId) this.service = await this.availableServicesService.getService(this.value.serviceId)
    }
    catch (error) {
      if (error.status==404) console.log("Error during services load:\nSome service with serviceId set in connector descriptions dont't exist")
    }
    this.dialogRef = this.modalService.open(this.connectorInfoModalRef, {
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

  mapDatasetsConcept(datasets: Array<Dataset>): Map<string, string[]> {
    return datasets.reduce(
      (map, dataset) =>
        map.set(
          dataset.identifier,
          dataset.dataMapping.map(
            (concept) =>
              concept.name + (concept.required ? '' : ` (${this.translateService.instant('general.services.data_concept_optional') as string})`)
          )
        ),
      new Map<string, string[]>()
    );
  }

  viewService() {
    this.dialogService.open(ServiceInfoRenderComponent).onClose.subscribe(() => { });
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
