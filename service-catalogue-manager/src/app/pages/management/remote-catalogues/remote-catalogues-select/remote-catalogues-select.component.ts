/* eslint-disable @typescript-eslint/no-unsafe-call */
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CatalogueDataset } from '../../../../model/catalogue/catalogueDataset';
import { ManageConfigurationsService } from '../../manage-configurations/manage-configurations.service';
import { AvailableCataloguesService } from '../../availableCatalogues/availableCatalogues.service';
import { ActionsCatalogueMenuRenderComponent } from '../../availableCatalogues/actions-catalogue-menu-render/actions-catalogue-menu-render.component';
import { AppConfig, System } from '../../../../model/appConfig';
import { AvailableServicesService } from '../../../services/availableServices/availableServices.service';
import { ActionsFederateComponent } from './actions-federate/actions-federate.component';
import { InfoRenderRemoteCatalogueComponent } from '../info-render-remote-catalogue/info-render-remote-catalogue.component';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry';

@Component({
  selector: 'remote-catalogues-select',
  templateUrl: './remote-catalogues-select.component.html',
  styleUrls: ['./remote-catalogues-select.component.css']
})
export class RemoteCataloguesSelectComponent implements OnInit, OnChanges {
  @Input() selectedDatasetName: string;
  @Output() updateResult = new EventEmitter<unknown>();

  /*loading message settings = {
    actions: false,
    hideSubHeader: true,
    noDataMessage: 'Loading, Please wait...',
    columns: {},
    attr: {
      class: 'table table-striped table-bordered table-hover'
    },
    defaultStyle: false
  };*/

  //selectedDatasetName: string;

  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemLocale: string;
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
  private unsubscribe: Subject<void> = new Subject();
  homePageLabel: string;
  datasets: CatalogueDataset[];
  selectedDataset: CatalogueDataset;
  remoteCatalogues: any[];
  unreachable: boolean = false
  //selectedDatasetName: string;

  private systemConfig: System;
  private config: AppConfig;
  detailsLabel: string;
  afterLoadSettings: Record<string, unknown>;
  datasetUnreachableSettings: Record<string, unknown>;
  //availableCatalogues: CatalogueEntry[];

  constructor(
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
    this.settings = this.loadTableSettings("Loading, please wait...");
    this.afterLoadSettings = this.loadTableSettings("No data found");
    this.datasetUnreachableSettings = this.loadTableSettings("Remote catalogue dataset is unreachable");
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
    if (!this.datasets) await this.activeDatasetsFilter()
    if (!this.selectedDataset) this.selectedDataset = this.datasets[0];
    if (!this.selectedDatasetName && this.selectedDataset) this.selectedDatasetName = this.selectedDataset.name
    this.selectedDataset = this.datasets.filter(dataset => dataset.name == changes['selectedDatasetName'].currentValue)[0]// || this.datasets[0]
    if (this.selectedDataset)
      if (this.selectedDataset?.type == "Service Catalogue")
        this.availableCataloguesService.getRemoteCatalogues(this.selectedDataset.URL)
          .then(async c => {
            this.remoteCatalogues = c
            this.loading = false
            this.unreachable = false
            //void this.source.load(c)
            if (this.remoteCatalogues && this.remoteCatalogues[0]) {
              for (let remoteCatalogue of this.remoteCatalogues) {
                let cataloguesAlreadyFedarated
                try {
                  cataloguesAlreadyFedarated = await this.availableCataloguesService.getCatalogueByURL(remoteCatalogue.apiEndpoint)
                }
                catch (error) {
                  console.error(error.message)
                }
                if (cataloguesAlreadyFedarated)
                  remoteCatalogue.federated = true;
                remoteCatalogue.clientID = undefined;//TODO verify if ID must be hidden
              }
            }
            else this.remoteCatalogues = []
            void this.source.load(this.remoteCatalogues);
            this.updateResult.emit(this.remoteCatalogues);
          }
          )
          .catch(error => {
            console.error(error.message)
            this.unreachable = true
            this.loading = false

            //this.remoteCatalogues = [{ name: "Remote dataset unreachable" }]
            this.settings.noDataMessage = "Loading Please Wait";
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            //void this.source.load(this.remoteCatalogues)
            //void this.source.load(this.remoteCatalogues)
            //this.updateResult.emit(this.remoteCatalogues);
          }
          )
      else
        this.availableCataloguesService.getCataloguesFromFile(this.selectedDataset.URL)
          .then(async c => {
            this.remoteCatalogues = c
            this.loading = false
            this.unreachable = false
            //void this.source.load(c)
            if (this.remoteCatalogues && this.remoteCatalogues[0]) {
              for (let remoteCatalogue of this.remoteCatalogues) {
                let cataloguesAlreadyFedarated
                try {
                  cataloguesAlreadyFedarated = await this.availableCataloguesService.getCatalogueByURL(remoteCatalogue.apiEndpoint)
                }
                catch (error) {
                  console.error(error.message)
                }
                if (cataloguesAlreadyFedarated)
                  remoteCatalogue.federated = true;
                remoteCatalogue.clientID = undefined;//TODO verify if ID must be hidden
              }
            }
            else this.remoteCatalogues = []
            void this.source.load(this.remoteCatalogues);
            this.updateResult.emit(this.remoteCatalogues);
          }
          )
          .catch(error => {
            console.error(error.message)
            this.unreachable = true
            this.loading = false
            //this.remoteCatalogues = [{ name: "Remote dataset unreachable" }]
            this.settings.noDataMessage = "Loading Please Wait";
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            //void this.source.load(this.remoteCatalogues)
            //void this.source.load(this.remoteCatalogues)
            //this.updateResult.emit(this.remoteCatalogues);
          })
  }


  resetfilters(): void {
    this.source.reset();
  }

  async activeDatasetsFilter() {
    this.datasets = await this.availableCatalogueDatasetsService.getCatalogueDatasets()

    /*   this.datasets = []
       let remoteDatasets = await this.availableCatalogueDatasetsService.getCatalogueDatasets()
       for (let dataset of remoteDatasets)
         try {
           if (dataset.type == "Service Catalogue") await this.availableCataloguesService.getRemoteCatalogues(dataset.URL)
           else await this.availableCataloguesService.getCataloguesFromFile(dataset.URL)
           this.datasets.push(dataset)
         }
         catch (error) {
           console.error("Error during get remote dataset ", dataset.name)
           console.error(error.message)
         }*/
  }

  async ngOnInit() {
    if (!this.datasets) await this.activeDatasetsFilter()
    if (!this.selectedDataset && this.datasets && this.datasets[0]) this.selectedDataset = this.datasets[0];
    if (!this.selectedDatasetName && this.selectedDataset) this.selectedDatasetName = this.selectedDataset.name
    //try {
    if (this.selectedDataset)
      if (this.selectedDataset.type == "Service Catalogue")
        this.availableCataloguesService.getRemoteCatalogues(this.selectedDataset.URL)
          .then(async c => {
            this.remoteCatalogues = c
            this.loading = false
            this.unreachable = false
            //void this.source.load(c)
            if (this.remoteCatalogues && this.remoteCatalogues[0]) {
              for (let remoteCatalogue of this.remoteCatalogues) {
                let cataloguesAlreadyFedarated
                try {
                  cataloguesAlreadyFedarated = await this.availableCataloguesService.getCatalogueByURL(remoteCatalogue.apiEndpoint)
                }
                catch (error) {
                  console.error(error.message)
                }
                if (cataloguesAlreadyFedarated)
                  remoteCatalogue.federated = true;
                remoteCatalogue.clientID = undefined;//TODO verify if ID must be hidden
              }
            }
            else this.remoteCatalogues = []
            void this.source.load(this.remoteCatalogues);
            this.updateResult.emit(this.remoteCatalogues);
          }
          )
          .catch(error => {
            console.error(error.message)
            this.unreachable = true
            this.loading = false
            //this.remoteCatalogues = [{ name: "Remote dataset unreachable" }]
            this.settings.noDataMessage = "Loading Please Wait";
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            //void this.source.load(this.remoteCatalogues)
            //void this.source.load(this.remoteCatalogues)
            //this.updateResult.emit(this.remoteCatalogues);
          }
          )
      else
        this.availableCataloguesService.getCataloguesFromFile(this.selectedDataset.URL)
          .then(async c => {
            this.remoteCatalogues = c
            this.loading = false
            this.unreachable = false
            //void this.source.load(c)
            if (this.remoteCatalogues && this.remoteCatalogues[0]) {
              for (let remoteCatalogue of this.remoteCatalogues) {
                let cataloguesAlreadyFedarated
                try {
                  cataloguesAlreadyFedarated = await this.availableCataloguesService.getCatalogueByURL(remoteCatalogue.apiEndpoint)
                }
                catch (error) {
                  console.error(error.message)
                }
                if (cataloguesAlreadyFedarated)
                  remoteCatalogue.federated = true;
                remoteCatalogue.clientID = undefined;//TODO verify if ID must be hidden
              }
            }
            else this.remoteCatalogues = []
            void this.source.load(this.remoteCatalogues);
            this.updateResult.emit(this.remoteCatalogues);
          }
          )
          .catch(error => {
            console.error(error.message)
            this.unreachable = true ; this.loading = false
            //this.remoteCatalogues = [{ name: "Remote dataset unreachable" }]
            this.settings.noDataMessage = "Loading Please Wait";
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            void this.source.load([])
            this.settings = this.loadTableSettings("Catalogue dataset unreachable")
            //void this.source.load(this.remoteCatalogues)
            //this.updateResult.emit(this.remoteCatalogues);
          })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadTableSettings(message): Record<string, unknown> {
    this.nameLabel = this.translate.instant('general.catalogues.name') as string;
    this.homePageLabel = this.translate.instant('general.catalogues.home_page') as string;
    this.countryLabel = this.translate.instant('general.catalogues.country') as string;
    this.actionsLabel = this.translate.instant('general.catalogues.actions') as string;
    this.infoLabel = this.translate.instant('general.catalogues.details') as string;
    this.statusLabel = this.translate.instant('general.catalogues.status') as string;
    this.activeLabel = this.translate.instant('general.catalogues.active') as string;
    this.servicesLabel = this.translate.instant('general.catalogues.services') as string;
    this.detailsLabel = this.translate.instant('general.catalogues.details') as string;

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
      noDataMessage: message,
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
        homePage: {
          title: this.homePageLabel,
          editor: {
            type: 'textarea',
          },
          width: '55%',
        },
        details: {
          title: this.detailsLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row,
          renderComponent: InfoRenderRemoteCatalogueComponent,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row) => row,
          renderComponent: ActionsFederateComponent,
          onComponentInitFunction: (instance) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            instance.updateResult.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.ngOnInit());
          }//,
          //onComponentChangeFunction: this.ngOnInit()
        },
        //noDataMessage: "Dataset is unreachable"
      },
    };
  }

}



