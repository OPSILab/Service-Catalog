import { ServicesCount } from './../../../model/services/servicesCount';
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { LocalDataSource } from 'ng2-smart-table';
//import { CatalogueInfoRenderComponent } from './catalogue-info-render/catalogue-info-render.component';//TODO
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig, System } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { ConnectorStatusRenderComponent } from '../../services/availableConnectors/custom-status-render.component';
import { LoginService } from '../../../auth/login/login.service';
import { AvailableServicesService } from '../../services/availableServices/availableServices.service';
import { AvailableCataloguesService } from '../availableCatalogues/availableCatalogues.service';
import { StatusRenderComponent } from '../availableCatalogues/status-render/status-render.component';
import { AddCatalogueComponent } from '../availableCatalogues/add-catalogue/add-catalogue.component';
import { ActionsCatalogueMenuRenderComponent } from '../availableCatalogues/actions-catalogue-menu-render/actions-catalogue-menu-render.component';
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
  errorService: ErrorDialogService;
  URLLabel: string;

  constructor(
    private loginService: LoginService,
    private availableCatalogueDatasetsService: ManageConfigurationsService,
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

  async ngOnInit() {
    try {
      this.availableCatalogues = await this.availableCatalogueDatasetsService.getCatalogueDatasets();
      void this.source.load(this.availableCatalogues);
    } catch (error) {
      console.log("error:<\n", error, ">\n")
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      }
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      this.dialogService.open(AddRemoteCatalogueDatasetComponent).onClose.subscribe(() => {
        void console.log("confirm ok", this.ngOnInit());
      });
      this.updateResult.emit(this.value);
      //this.ngOnInit()
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")
      //if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")

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
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: CatalogueDataset) => row,
          renderComponent: ActionsMenuRenderComponent,//TODO
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

