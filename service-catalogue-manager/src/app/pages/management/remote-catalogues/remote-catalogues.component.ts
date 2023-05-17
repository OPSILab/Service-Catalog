import { ServicesCount } from './../../../model/services/servicesCount';
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig, System } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogueEntry } from '../../../model/catalogue/catalogueEntry';
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { ConnectorStatusRenderComponent } from '../../services/availableConnectors/custom-status-render.component';
import { LoginService } from '../../../auth/login/login.service';
import { AvailableServicesService } from '../../services/availableServices/availableServices.service';
import { AvailableCataloguesService } from '../availableCatalogues/availableCatalogues.service';
import { StatusRenderComponent } from '../availableCatalogues/status-render/status-render.component';
import { AddCatalogueComponent } from '../availableCatalogues/add-catalogue/add-catalogue.component';
import { ActionsCatalogueMenuRenderComponent } from '../availableCatalogues/actions-catalogue-menu-render/actions-catalogue-menu-render.component';
import { CatalogueDataset } from '../../../model/catalogue/catalogueDataset';
import { ManageConfigurationsService } from '../manage-configurations/manage-configurations.service';
@Component({
  selector: 'remote-catalogues',
  templateUrl: './remote-catalogues.component.html',
  styleUrls: ['./remote-catalogues.component.css']
})
export class RemoteCataloguesComponent implements OnInit, OnChanges {
  @Input() value: CatalogueEntry;
  @Input() selectedDatasetName: string;
  @Input() availableCatalogues: CatalogueEntry[];
  @Output() updateResult = new EventEmitter<unknown>();

  datasets: CatalogueDataset[];
  //selectedDatasetName: string;
  selectedDataset: CatalogueDataset = {
    name: undefined,
    type: undefined,
    URL: undefined,
    portalURL: undefined,
    authenticationMethod: undefined,
    password: undefined,
    username: undefined,
    clientSecret: '',
    clientID: '',
    catalogueDatasetID: undefined
  };
  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemConfig: System;
  private systemLocale: string;
  private config: AppConfig;
  public serviceId: string;
  public catalogueID: string;
  public serviceName: string;
  public readOnly = false;
  private nameLabel: string;
  private countryLabel: string;
  private actionsLabel: string;
  private infoLabel: string;
  private statusLabel: string;
  private activeLabel: string;
  private servicesLabel: string;
  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  //availableCatalogues: CatalogueEntry[];
  private unsubscribe: Subject<void> = new Subject();
  errorService: ErrorDialogService;
  homePageLabel: string;

  constructor(
    private loginService: LoginService,
    private availableCatalogueDatasetsService: ManageConfigurationsService,
    private availableCataloguesService: AvailableCataloguesService,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private dialogService: NbDialogService,
    private availableServicesService: AvailableServicesService,
  ) {
    this.config = this.configService.config as AppConfig;
    this.systemConfig = this.config.system;
    this.systemLocale = this.config.i18n.locale;
    this.settings = this.loadTableSettings();
    this.locale = (this.configService.config as AppConfig).i18n.locale; // TODO change with user language preferences
    this.schemaDir =
      (this.systemConfig.serviceEditorUrl.includes('localhost') ? '' : this.systemConfig.serviceEditorUrl) +
      this.systemConfig.editorSchemaPath +
      '/' +
      this.systemLocale +
      '/' +
      this.systemConfig.editorSchemaName;
    this.loading = true;
  }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.selectedDataset = this.datasets.filter(dataset => dataset.name = this.selectedDatasetName)[0]
    await this.ngOnInit()
  }

  setValue() {
    console.log("ngOnChanges", this.selectedDataset)
    this.selectedDataset = this.datasets.filter(dataset => dataset.name = this.selectedDatasetName)[0]
    console.log("ngOnChanges", this.datasets.filter(name => name = this.selectedDataset)[0], this.selectedDataset)
    this.ngOnInit()
  }

  async ngOnInit() {
    try {
      this.datasets = await this.availableCatalogueDatasetsService.getCatalogueDatasets()
      if (!this.selectedDataset.catalogueDatasetID) this.selectedDataset = this.datasets[0]
      if (!this.selectedDatasetName) this.selectedDatasetName = this.selectedDataset.name
      if (this.selectedDataset.type == "Service Catalogue") this.availableCatalogues = await this.availableCataloguesService.getRemoteCatalogues(this.selectedDataset.URL);
      else this.availableCatalogues = await this.availableCataloguesService.getCataloguesFromFile(this.selectedDataset.URL);
      void await this.source.load(this.availableCatalogues);
    } catch (error) {
      console.log("error:<\n", error, ">\n")
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      this.dialogService.open(AddCatalogueComponent).onClose.subscribe(() => {
        void console.log("confirm ok", this.ngOnInit());
      });
      this.updateResult.emit(this.value);
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")

      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      }
      this.errorService.openErrorDialog(error);
    }
  }

  loadTableSettings(): Record<string, unknown> {
    this.nameLabel = this.translate.instant('general.catalogues.name') as string;
    this.homePageLabel = this.translate.instant('general.catalogues.home_page') as string;
    this.countryLabel = this.translate.instant('general.catalogues.country') as string;
    this.actionsLabel = this.translate.instant('general.catalogues.actions') as string;
    this.infoLabel = this.translate.instant('general.catalogues.details') as string;
    this.statusLabel = this.translate.instant('general.catalogues.status') as string;
    this.activeLabel = this.translate.instant('general.catalogues.active') as string;
    this.servicesLabel = this.translate.instant('general.catalogues.services') as string;

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
        name: {
          title: this.nameLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row.name,
        },
        country: {
          title: this.countryLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row.country,
        },
        host: {
          title: this.homePageLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row.homePage,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row,
          renderComponent: ActionsCatalogueMenuRenderComponent,
          onComponentInitFunction: (instance) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            instance.updateResult.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.ngOnInit());
          },
        },
      },
    };
  }

  resetfilters(): void {
    this.source.reset();
  }
}



