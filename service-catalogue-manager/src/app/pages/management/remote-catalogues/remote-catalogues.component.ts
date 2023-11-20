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
    status: '',
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

  homePageLabel: string;
  remoteCatalogues: any[];

  constructor(
    private errorService: ErrorDialogService,
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
    this.selectedDataset = this.datasets.filter(dataset => dataset.name = this.selectedDatasetName)[0]
    console.log("ngOnChanges", this.datasets.filter(name => name = this.selectedDataset)[0], this.selectedDataset)
    this.ngOnInit()
  }

  async activeDatasetsFilter() {

    /*
    this.datasets=[]
      let remoteDatasets = await this.availableCatalogueDatasetsService.getCatalogueDatasets()
      for (let dataset of remoteDatasets)
        try {
          if (dataset.type=="Service Catalogue") await this.availableCataloguesService.getRemoteCatalogues(dataset.URL)
          else await this.availableCataloguesService.getCataloguesFromFile(dataset.URL)
          this.datasets.push(dataset)
        }
        catch (error) {
          console.error("Error during get remote dataset ", dataset.name)
          console.error(error.message)
        }*/

    this.datasets = await this.availableCatalogueDatasetsService.getCatalogueDatasets()
  }

  async ngOnInit() {
    try {
      await this.activeDatasetsFilter()
    } catch (error) {
      console.error("Remote catalogues component")
      console.error(error)
      if (error.statusCode === '404' || error.status == 404)
        error.message = "Remote catalogue was not reachable.\n\n" + error.message
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
      this.dialogService.open(AddCatalogueComponent).onClose.subscribe(() => {
        void console.log("confirm ok", this.ngOnInit());
      });
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
}



