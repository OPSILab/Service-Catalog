import { ServicesCount } from './../../../model/services/servicesCount';
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig, System } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { LoginService } from '../../../auth/login/login.service';
import { AvailableServicesService } from '../../services/availableServices/availableServices.service';
import { AvailableCataloguesService } from '../availableCatalogues/availableCatalogues.service';
import { StatusRenderComponent } from '../availableCatalogues/status-render/status-render.component';
import { ActionsMenuRenderComponent } from './actions-menu-render/actions-menu-render.component';
import { AddRemoteCatalogueDatasetComponent } from './add-remote-catalogue-dataset/add-remote-catalogue-dataset.component';
import { CatalogueDataset } from '../../../model/catalogue/catalogueDataset';
import { ManageConfigurationsService } from './manage-configurations.service';

@Component({
  selector: 'manage-configurations',
  templateUrl: './manage-configurations.component.html',
  styleUrls: ['./manage-configurations.component.scss']
})

export class ManageConfigurationsComponent implements OnInit, OnDestroy {
  @Input() value: CatalogueDataset;
  @Output() updateResult = new EventEmitter<unknown>();

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
  private availableCatalogues: CatalogueDataset[];
  private unsubscribe: Subject<void> = new Subject();
  URLLabel: string;

  constructor(
    private availableCatalogueService: AvailableCataloguesService,
    private loginService: LoginService,
    private availableCatalogueDatasetsService: ManageConfigurationsService,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private dialogService: NbDialogService,
    private errorService: ErrorDialogService
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

  async activeDatasetsFilter() {
    //this.datasets=[]
    //let remoteDatasets = await this.availableCatalogueDatasetsService.getCatalogueDatasets()
    for (let dataset of this.availableCatalogues)
      try {
        if (dataset.type == 'Json') await this.availableCatalogueService.getCataloguesFromFile(dataset.URL);
        else await this.availableCatalogueService.getRemoteCatalogues(dataset.URL)
        dataset.status = "active"
      }
      catch (error) {
        console.error("Error during get remote dataset ", dataset.name)
        console.error(error.message)
      }
  }

  async ngOnInit() {
    try {
      this.availableCatalogues = await this.availableCatalogueDatasetsService.getCatalogueDatasets();
      await this.activeDatasetsFilter()
      void this.source.load(this.availableCatalogues);
    } catch (error) {
      console.error("error:<\n", error, ">\n")
      if (error.statusCode === '401' || error.status == 401)
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      this.errorService.openErrorDialog(error);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      this.dialogService.open(AddRemoteCatalogueDatasetComponent).onClose.subscribe(async () => {
        this.ngOnInit();
        //this.availableCatalogues.push(this.value);
        //void this.source.load(this.availableCatalogues)
      }
      );
      this.updateResult.emit(this.value);
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      }
      this.errorService.openErrorDialog(error);
    }
  }

  loadTableSettings(): Record<string, unknown> {
    this.nameLabel = this.translate.instant('general.catalogues.dataset.name') as string;
    this.actionsLabel = this.translate.instant('general.catalogues.dataset.actions') as string;
    this.URLLabel = this.translate.instant('general.catalogues.dataset.URL') as string;
    this.statusLabel = this.translate.instant('general.catalogues.status') as string;

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
          valuePrepareFunction: (cell, row: CatalogueDataset) => row.name,
        },
        URL: {
          title: this.URLLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: CatalogueDataset) => row.URL,
        },
        status: {
          title: this.statusLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: async (cell, row: CatalogueDataset) => row.status,
          renderComponent: StatusRenderComponent,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: CatalogueDataset) => row,
          renderComponent: ActionsMenuRenderComponent,
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

