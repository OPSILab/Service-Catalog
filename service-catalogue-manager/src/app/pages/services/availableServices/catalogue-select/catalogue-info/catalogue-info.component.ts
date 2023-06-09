import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CatalogueEntry } from '../../../../../model/catalogue/catalogueEntry';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConnectorEntryLog } from '../../../../../model/connector/connectorEntryLog';
import { Dataset } from '../../../../../model/services/dataset';
import { ErrorDialogService } from '../../../../error-dialog/error-dialog.service';
import { AvailableConnectorsService } from '../../../availableConnectors/availableConnectors.service';
import { AvailableServicesService } from '../../availableServices.service';
import { ServiceInfoRenderComponent } from '../../serviceInfoRender.component';
import { AvailableServiceRow } from '../catalogue-select.component';

@Component({
  selector: 'catalogue-info',
  templateUrl: './catalogue-info.component.html',
  styleUrls: ['./catalogue-info.component.css']
})
export class CatalogueInfoComponent implements OnInit {

  @Input() value: CatalogueEntry;

  @ViewChild('availableCatalogueInfoModal', { static: true }) catalogueInfoModalRef: TemplateRef<unknown>;

  logs: ConnectorEntryLog[];
  service: AvailableServiceRow;
  public settings: Record<string, unknown>;
  private date: Date;
  private message: String;
  dialogRef
  data
  ref


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
    type Context = {[key: string] : any}
    let context : Context = {}
    if (this.value.name) context.modalHeader = this.value.name;
    if (this.value.country) context.country = this.value.country;
    if (this.value.services) context.services = this.value.services;
    if (this.value.status) context.status = this.value.status;
    if (this.value.active!=undefined) context.active = this.value.active;
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


