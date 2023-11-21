import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CatalogueDataset } from '../../../../model/catalogue/catalogueDataset';
import { AppConfig, System } from '../../../../model/appConfig';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '../../../../auth/login/login.service';
import { Description } from '../../../../model/services/description';
import { ServiceModel } from '../../../../model/services/serviceModel';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { ActionsServiceMenuRenderComponent } from '../actionsServiceMenuRender.component';
import { AvailableServicesService } from '../availableServices.service';
import { CustomKeywordRenderComponent } from '../custom-keyword-render.component';
import { CustomStatusRenderComponent } from '../custom-status-render.component';
import { ServiceInfoRenderComponent } from '../serviceInfoRender.component';
import { AvailableCataloguesService } from '../../../management/availableCatalogues/availableCatalogues.service';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry';

export interface AvailableServiceRow extends ServiceModel {
  locale?: string;
  spatial?: string;
  description?: string;
  keywords?: string[];
}

@Component({
  selector: 'catalogue-select',
  templateUrl: './catalogue-select.component.html',
  styleUrls: ['./catalogue-select.component.css']
})
export class CatalogueSelectComponent implements OnInit, OnChanges {
  @Input() selectedCatalogueName: string;
  @Output() selectedCatalogueCountry = new EventEmitter<any>();
  @Output() updateResult = new EventEmitter<unknown>();

  private serviceLabel: string;
  private descriptionLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;
  private spatialLabel: string;
  private keywords: string;

  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private availableServices: ServiceModel[] = [];
  private unsubscribe: Subject<void> = new Subject();
  catalogues: CatalogueEntry[];
  selectedCatalogue: any;
  services: ServiceModel[];
  private config: AppConfig;
  serviceRegistryUrl: string;
  country: any;
  loading: boolean;
  unreachable: boolean;
  loaded: boolean;
  afterLoadSettings: Record<string, unknown>;
  datasetUnreachableSettings: Record<string, unknown>;

  constructor(
    private availableServicesService: AvailableServicesService,
    private availableCataloguesService: AvailableCataloguesService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private loginService: LoginService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService
  ) {
    this.settings = this.loadTableSettings("Loading, please wait...");
    this.afterLoadSettings = this.loadTableSettings("No data found");
    this.datasetUnreachableSettings = this.loadTableSettings("Remote catalogue dataset is unreachable");
    // this.locale = (this.configService.config as AppConfig).i18n.locale;    // TODO change with user language preferences
    this.locale = this.translate.currentLang;
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;


  }

  getLocalLabel() {
    return this.translate.instant('general.services.local') as string
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.loading = true
    this.unreachable = false
    this.loaded = false
    void await this.source.load([])
    try {
      if (!this.catalogues) this.catalogues = await this.availableCataloguesService.getCatalogues()
    }
    catch (error) {
      console.error(error.message)
      this.loading = false
      this.unreachable = true
      this.loaded = false
    }
    if (!this.unreachable) {
      //if (!this.selectedCatalogue) this.selectedCatalogue = this.catalogues[0];
      //if (!this.selectedCatalogueName) this.selectedCatalogueName = this.selectedCatalogue.name
      this.selectedCatalogue = this.catalogues.filter(catalogue => catalogue.name == changes['selectedCatalogueName'].currentValue)[0]// || this.datasets[0]
      if (!(changes['selectedCatalogueName'].currentValue == this.translate.instant('general.services.local') as string)) {
        this.availableServicesService.getRemoteServices(this.selectedCatalogue.catalogueID)
          .then(async s => await this.response(s))
          .catch(error => this.handleResponseError(error))
        this.country = this.selectedCatalogue.country
      }
      if ((changes['selectedCatalogueName'].currentValue == this.translate.instant('general.services.local') as string)) {
        this.availableServicesService.getServices()
          .then(async c => await this.response(c))
          .catch(error => this.handleResponseError(error))
        this.selectedCatalogue = { name: this.translate.instant('general.services.local') as string, catalogueID: "local", country: this.config.system.country }
        this.country = this.selectedCatalogue.country
      }

      this.selectedCatalogueCountry.emit(this.selectedCatalogue || { name: this.translate.instant('general.services.local') as string, catalogueID: "local", country: this.config.system.country })
      //this.loadSource(this.selectedCatalogue?.catalogueID || "local");
    }
  }

  async ngOnInit(): Promise<void> {
    this.loading = true
    this.unreachable = false
    this.loaded = false
    try {
      if (!this.catalogues)
        this.catalogues = await this.availableCataloguesService.getCatalogues()
      if (!this.selectedCatalogue)
        this.selectedCatalogue =
        {
          name: this.translate.instant('general.services.local') as string,
          catalogueID: "local",
          country: this.config.system.country
        }
      if (!this.selectedCatalogueName)
        this.selectedCatalogueName = this.selectedCatalogue.name
    }
    catch (error) {
      console.error(error.message)
      this.loading = false
      this.unreachable = true
      this.loaded = false
    }
    if (!this.unreachable)
      this.availableServicesService.getRemoteServices(this.selectedCatalogue.catalogueID)
        .then(async s => await this.response(s))
        .catch(error => this.handleResponseError(error))
    //void await this.source.load(this.services);
    //this.updateResult.emit(this.services);

    if (this.selectedCatalogue) this.loadSource(this.selectedCatalogue.catalogueID);
    this.translate.onLangChange.subscribe(async () => {
      await this.loadSource(this.selectedCatalogue.catalogueID);
    });
  }

  handleResponseError(error: any): any {
    console.error(error.message)
    this.unreachable = true
    this.loading = false
    this.loaded = false
    void this.source.load([])
  }

  async response(s) {
    if (Array.isArray(s)) {
      this.services = s
      this.loading = false
      this.unreachable = false
      this.loaded = true
      this.settings.noDataMessage = "No data found"
      //void this.source.load(this.services);
      if (this.selectedCatalogue) await this.loadSource(this.selectedCatalogue.catalogueID);
      this.translate.onLangChange.subscribe(async () => {
        await this.loadSource(this.selectedCatalogue.catalogueID);
      });
    }
    else (this.handleResponseError({ message: "Remote catalogue dataset is unreachable" }))
  }

  private getLocalizedDescription(availableServiceDescr: ServiceModel): Description[] {
    return availableServiceDescr.hasInfo.description.reduce((filtered: Description[], description: Description) => {
      if (this.locale !== 'en' && description.locale === this.locale) filtered = [description, ...filtered];
      else if (description.locale === 'en') filtered = [...filtered, description];
      return filtered;
    }, []);
  }

  private async loadSource(catalogueID): Promise<void> {
    try {
      this.locale = this.translate.currentLang;
      this.availableServices = this.services;
      if (this.availableServices && this.availableServices[0]) {
        if (this.availableServices && this.availableServices[0])
          for (let row in this.services)
            if (!this.local())
              this.services[row] = this.remoteService(this.services[row])
        this.source.load(
          this.availableServices.map((availableServiceDescr) => {
            /* Get Localized Human readable description of the Service, default en */
            availableServiceDescr.hasInfo.description = this.getLocalizedDescription(availableServiceDescr);

            /* Get Localized Purposes descriptions, default en */
            // availableServiceDescr.isPersonalDataHandling = this.getLocalizedPurposesDescription(availableServiceDescr);

            return {
              ...availableServiceDescr,
              locale: this.locale,
              spatial: availableServiceDescr.hasInfo.spatial,
              description: availableServiceDescr.hasInfo.description[0]?.description,
              keywords: availableServiceDescr.hasInfo.keyword,
            } as AvailableServiceRow;
          })
        );
      }
      //else throw new Error("No services loaded. Remote catalogue was not reachable or wrong authentication parameters.")
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error(error.error)
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => console.log(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }

    // Open a Toastr if there is a message in input query
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.toastrMessage)
      this.toastrService.primary('', queryParams.toastrMessage, {
        position: NbGlobalLogicalPosition.BOTTOM_END,
        duration: 3500,
      });
  }

  showCatalogueInfoModal() {

  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  remoteService(row: any) {
    row.remote = true;
    return row;
  }

  loadTableSettings(message): Record<string, unknown> {
    this.serviceLabel = this.translate.instant('general.services.service') as string;
    this.descriptionLabel = this.translate.instant('general.services.description') as string;
    this.actionsLabel = this.translate.instant('general.services.actions') as string;
    this.detailsLabel = this.translate.instant('general.services.details') as string;
    this.statusLabel = this.translate.instant('general.services.status') as string;
    this.spatialLabel = this.translate.instant('general.services.location') as string;
    this.keywords = this.translate.instant('general.services.keywords') as string;



    return {
      mode: 'external',
      attr: {
        class: 'table table-bordered',
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      noDataMessage: message,
      columns: {
        title: {
          title: this.serviceLabel,
          type: 'text',
          width: '15%',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row.title,
        },
        spatial: {
          title: this.spatialLabel,
          type: 'text',
          width: '15%',
        },

        description: {
          title: this.descriptionLabel,
          editor: {
            type: 'textarea',
          },
          width: '55%',
        },
        keywords: {
          title: "Keywords",
          type: 'custom',
          width: '5%',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row,
          renderComponent: CustomKeywordRenderComponent,

        },

        status: {
          title: this.statusLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row.status,
          renderComponent: CustomStatusRenderComponent,
        },
        details: {
          title: this.detailsLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row,
          renderComponent: ServiceInfoRenderComponent,
        },

        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row) =>
            this.local ? row : this.remoteService(row),
          renderComponent: ActionsServiceMenuRenderComponent,

          onComponentInitFunction: (instance) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            instance.updateResult.pipe(takeUntil(this.unsubscribe)).subscribe((updatedServiceData: unknown) => this.ngOnInit());
          },
        },
      },
    };
  }

  loadingSettings = {

    mode: 'external',
    attr: {
      class: 'table table-bordered',
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    noDataMessage: "Loading, please wait ... ",
    columns: {
      title: {
        title: this.translate.instant('general.services.service') as string,
        type: 'text',
        width: '15%',
        valuePrepareFunction: (cell, row: AvailableServiceRow) => row.title,
      },
      spatial: {
        title: this.translate.instant('general.services.location') as string,
        type: 'text',
        width: '15%',
      },

      description: {
        title: this.translate.instant('general.services.description') as string,
        editor: {
          type: 'textarea',
        },
        width: '55%',
      },
      keywords: {
        title: "Keywords",
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: AvailableServiceRow) => row,
        renderComponent: CustomKeywordRenderComponent,

      },

      status: {
        title: this.translate.instant('general.services.status') as string,
        sort: false,
        filter: false,
        width: '5%',
        type: 'custom',
        valuePrepareFunction: (cell, row: AvailableServiceRow) => row.status,
        renderComponent: CustomStatusRenderComponent,
      },
      details: {
        title: this.translate.instant('general.services.details') as string,
        filter: false,
        sort: false,
        width: '5%',
        type: 'custom',
        valuePrepareFunction: (cell, row: AvailableServiceRow) => row,
        renderComponent: ServiceInfoRenderComponent,
      },

      actions: {
        title: this.translate.instant('general.services.actions') as string,
        sort: false,
        width: '5%',
        filter: false,
        type: 'custom',
        valuePrepareFunction: (cell, row) =>
          this.local ? row : this.remoteService(row),
        renderComponent: ActionsServiceMenuRenderComponent,

        onComponentInitFunction: (instance) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
          instance.updateResult.pipe(takeUntil(this.unsubscribe)).subscribe((updatedServiceData: unknown) => this.ngOnInit());
        },
      },
    },
  }
  local() {
    return !this.selectedCatalogue || this.selectedCatalogue.catalogueID == "local"
  }

  resetfilters(): void {
    this.source.reset();
  }
}



