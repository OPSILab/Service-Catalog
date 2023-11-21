import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConnectorEntry } from '../../../../model/connector/connectorEntry';
import { ConnectorEntryLog } from '../../../../model/connector/connectorEntryLog';
import { Dataset } from '../../../../model/services/dataset';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { AvailableConnectorsService } from '../../../services/availableConnectors/availableConnectors.service';
import { AvailableServiceRow } from '../../../services/availableServices/availableServices.component';
import { AvailableServicesService } from '../../../services/availableServices/availableServices.service';
import { ServiceInfoRenderComponent } from '../../../services/availableServices/serviceInfoRender.component';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry';

@Component({
  selector: 'info-render-remote-catalogue',
  templateUrl: './info-render-remote-catalogue.component.html',
  styleUrls: ['./info-render-remote-catalogue.component.css']
})
export class InfoRenderRemoteCatalogueComponent implements OnInit {

  @Input() value: CatalogueEntry;

  @ViewChild('availableCatalogueInfoModal', { static: true }) catalogueInfoModalRef: TemplateRef<unknown>;

  logs: ConnectorEntryLog[];
  service: AvailableServiceRow;
  public settings: Record<string, unknown>;
  private date: Date;
  private message: String;
  dialogRef
  lastUpdate: string;


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

    this.lastUpdate = this.refresh()

  }

  refresh() {
    let lastUpdate = Date.now() - this.value.lastRefresh
    let lastUpdateDetails = {
      day: lastUpdate / 86400000,
      week: lastUpdate / 604800000,
      month: lastUpdate / 2629800000

    }
    if (lastUpdateDetails.month > 1 || lastUpdateDetails.month == 1)
      return lastUpdateDetails.month.toString()[0] + " months ago"
    if (lastUpdateDetails.week > 1 || lastUpdateDetails.week == 1)
      return lastUpdateDetails.week.toString()[0] + " weeks ago"
    if (lastUpdateDetails.day > 1 || lastUpdateDetails.day == 1)
      return lastUpdateDetails.day.toString()[0] + " days ago"

  }

  async showCatalogueInfoModal(): Promise<void> {
    type Context = { [key: string]: any }
    let context: Context = {}
    if (this.value.name) context.modalHeader = this.value.name;
    if (this.value.country) context.country = this.value.country;
    if (this.value.services) context.services = this.value.services;
    if (this.value.status) context.status = this.value.status;
    if (this.value.active) context.active = this.value.active != undefined ? this.value.active : "Not specified";
    if (this.value.description) context.description = this.value.description;
    if (this.value.competentAuthority) context.competentAuthority = this.value.competentAuthority;
    if (this.value.category) context.category = this.value.category;
    if (this.value.homePage) context.homePage = this.value.homePage;
    if (this.value.apiEndpoint) context.apiEndpoint = this.value.apiEndpoint;
    if (this.value.type) context.type = this.value.type;
    if (this.value.refresh) context.refresh = this.value.refresh;
    if (this.value.authenticated) context.modalHeader = this.value.authenticated;
    if (this.value.oAuth2Endpoint) context.oAuth2Endpoint = this.value.oAuth2Endpoint;

    this.dialogRef = this.modalService.open(this.catalogueInfoModalRef, {
      context,
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

