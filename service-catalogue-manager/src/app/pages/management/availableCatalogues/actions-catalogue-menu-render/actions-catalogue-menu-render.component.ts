import { Component, Input, Output, OnInit, OnChanges, TemplateRef, EventEmitter, OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import {
  NbMenuService,
  NbToastrService,
  NbDialogService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrConfig,
  NbMenuItem
} from '@nebular/theme';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { AvailableCataloguesService } from '.././availableCatalogues.service';
import { LoginService } from '../../../../auth/login/login.service';
import { AdapterStatusEnum } from '../../../../model/services/adapter';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../../../model/appConfig';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { AvailableServicesService } from '../../../services/availableServices/availableServices.service'
import * as spatials from '../../../../../assets/data/service-schema/en/spatials.json'

/*
import * as spatials_de from '../../../../../assets/data/service-schema/de/spatials.json'
import * as spatials_el from '../../../../../assets/data/service-schema/el/spatials.json'
import * as spatials_lv from '../../../../../assets/data/service-schema/lv/spatials.json'
import * as spatials_it from '../../../../../assets/data/service-schema/it/spatials.json'
*/

@Component({
  selector: 'actions-catalogue-menu-render',
  templateUrl: 'actions-catalogue-menu-render.component.html',
  styleUrls: ['actions-catalogue-menu-render.component.scss']

})
export class ActionsCatalogueMenuRenderComponent implements OnInit, OnDestroy {

  @Input() value: CatalogueEntry;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue: CatalogueEntry;
  @Output() outValue = new EventEmitter<unknown>();
  clientReset=false;
  competentAuthority: string;
  lastRefresh;
  catalogueID: string;
  country: string;
  category: string;
  homePage: string;
  apiEndpoint: string;
  active: boolean;
  refresh: any;
  name: string;
  description: string;
  status: string = 'inactive'
  type: string;
  authenticated: boolean;
  clientID: string;
  clientSecret: string;
  actions: NbMenuItem[];
  countries: string[] = spatials.enum//Countries.countries
  placeholders = {
    competentAuthority: this.translate.instant('general.catalogues.competent_authority'),
    country: this.translate.instant('general.catalogues.country'),
    category: this.translate.instant('general.catalogues.category'),
    homePage: this.translate.instant('general.catalogues.home_page'),
    apiEndpoint: this.translate.instant('general.catalogues.api_endpoint'),
    refresh: this.translate.instant('general.catalogues.refresh'),
    description: this.translate.instant('general.catalogues.description'),
    clientID: this.translate.instant('general.catalogues.client_ID'),
    clientSecret: this.translate.instant('general.catalogues.client_secret'),
    name: this.translate.instant('general.catalogues.name'),
    status: this.translate.instant('general.catalogues.status'),
    type: this.translate.instant('general.catalogues.type'),
    oAuth2endpoint: this.translate.instant('general.catalogues.o_auth_2_endpoint')
  }
  private appConfig: AppConfig;
  private unsubscribe: Subject<void> = new Subject();

  ref;


  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  @ViewChild('editCatalogue', { static: false }) editCatalogue: TemplateRef<unknown>;
  validURL: boolean;
  oAuth2Endpoint: string;
  iconURL: any;

  constructor(
    private http: HttpClient,
    private availableCataloguesService: AvailableCataloguesService,
    private menuService: NbMenuService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private configService: NgxConfigureService,
    private availableServicesService: AvailableServicesService,


  ) {
    this.appConfig = this.configService.config as AppConfig
  }

  get registered(): boolean {
    return this.value.active;
  }

  ngOnInit(): void {
    this.catalogueID = this.value.catalogueID
    this.country = this.value.country
    this.competentAuthority = this.value.competentAuthority
    this.category = this.value.category
    this.active = this.value.active
    this.apiEndpoint = this.value.apiEndpoint
    this.authenticated = this.value.authenticated
    this.clientID = this.value.clientID
    this.clientSecret = this.value.clientSecret
    this.oAuth2Endpoint = this.value.oAuth2Endpoint
    this.name = this.value.name
    this.description = this.value.description
    this.type = this.value.type
    this.status = this.value.status
    this.homePage = this.value.homePage
    this.lastRefresh = this.value.lastRefresh
    this.iconURL = this.value.iconURL
    this.refresh = this.value.refresh == 86400000 ? 'Every day' : this.value.refresh == 604800000 ? 'Every week' : this.value.refresh == 2629800000 ? 'Every month' : undefined
    this.actions = this.translatedActionLabels();
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.catalogueID))
      .subscribe((event) => {
        switch (event.item.data) {
          case 'edit':
            this.openEditCatalogue();
            break;
          case 'delete':
            this.openDeleteFromRegistryDialog();
            break;
          case 'register':
            this.openRegisterDialog();
            break;
          case 'deregister':
            this.openDeRegisterDialog();
            break;
          case 'Download metadata':
            this.saveAsFile()
        }
      });
  }

  openEditCatalogue(): void {
    this.ref = this.dialogService
      .open(this.editCatalogue, {
        hasScroll: false,
        context: {
          serviceName: this.value.name,
        },
      })
      .onClose.subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translatedActionLabels(): NbMenuItem[] {
    if (this.registered) {
      return [
        {
          title: this.translate.instant('general.catalogues.deactivate') as string,
          data: 'deregister',
        }
      ];
    } else {
      return [
        {
          title: this.translate.instant('general.catalogues.edit') as string,
          data: 'edit',
        },
        {
          title: this.translate.instant('general.catalogues.delete') as string,
          data: 'delete',
        },
        {
          title: this.translate.instant('general.catalogues.download_metadata') as string,
          data: 'Download metadata',
        },
        {
          title: this.translate.instant('general.catalogues.activate') as string,
          data: 'register',
        }
      ];
    }
  }

  errorTemplate(value): Object {
    let error = {
      "path": "root",
      "property": "minLength",
      "message": "Value required",
      "errorcount": 1
    }
    error.path.concat(value)
    return error;
  }

  saveAsFile(): void {
    this.saveFile(this.value.name, 'json', this.value.catalogueID);
    /*
    this.dialogService
      .open(DialogExportPromptComponent)
      .onClose.subscribe((result) => result && this.saveFile(result.name, result.exportFormat, this.value.identifier));
      */
  }

  async saveFile(name: string, exportFormat: string, serviceId: string): Promise<void> {
    this.errorDialogService;
    let model: Record<string, unknown>;
    try {
      switch (exportFormat) {
        case 'cpsv':
          model = await this.availableServicesService.getCpsvService(serviceId);
          break;
        case 'sdg':
          break;

        case 'json-ld':
          model = await this.availableServicesService.getJsonldService(serviceId);
          break;

        default:
          model = (this.value as unknown) as Record<string, unknown>;
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.errorDialogService.openErrorDialog(error);
    }
    const filename = `${name}.json`,
      blob = new Blob([JSON.stringify(model, null, 2)], {
        type: 'application/json;charset=utf-8',
      });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      a.download = filename;
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');

      a.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false,
        })
      );
    }
  }

  async onEdit() {
    try {
      let name = this.name,
        catalogueID = this.catalogueID,
        competentAuthority = this.competentAuthority,
        country = this.country,
        category = this.category,
        homePage = this.homePage,
        apiEndpoint = this.apiEndpoint,
        active = this.active,
        refresh,
        description = this.description,
        type = this.type,
        iconURL=this.iconURL,
        authenticated = this.authenticated,
        oAuth2Endpoint = this.oAuth2Endpoint,
        clientSecret = this.clientSecret,
        clientID = this.clientID,
        services,
        lastRefresh = this.lastRefresh;

      try {
        services = (await this.availableServicesService.getRemoteServicesCount(apiEndpoint)).total
      }
      catch {
        services = 0;
      }

      switch (this.refresh) {
        case 'Every day': refresh = 86400000; break;
        case 'Every week': refresh = 604800000; break;
        case 'Every month': refresh = 2629800000; break;
      }

      await this.availableCataloguesService.updateCatalogue((({
        catalogueID,
        name,
        competentAuthority,
        country,
        category,
        description,
        homePage,
        apiEndpoint,
        active,
        refresh,
        type,
        iconURL,
        authenticated,
        clientID,
        clientSecret,
        oAuth2Endpoint,
        services,
        lastRefresh
      } as unknown)) as CatalogueEntry, catalogueID, clientSecret ? true : false);
      this.updateResult.emit(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_edited_message', { catalogueName: name }), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.name) errors.push(this.errorTemplate("name"))
      if (!this.apiEndpoint) errors.push(this.errorTemplate("apiEndpoint"))
      if (!this.authenticated) errors.push(this.errorTemplate("authenticated"))
      if (this.active === undefined) errors.push(this.errorTemplate("active"))
      if (!this.refresh) errors.push(this.errorTemplate("refresh"))

      console.log("error:", "\n", error)

      if (error.status && error.status == 400 && error.error && error.error.status == "Catalogue already exists") {
        this.errorDialogService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.catalogueID",
              "property": "minLength",
              "message": "A catalogue with catalogue ID < " + this.catalogueID + " > already exists",
              "errorcount": 1
            }
          ]
        });
      }

      else {
        if (error.status == 404)
          errors.push({
            "path": "apiEndpoint",
            "property": "not found",
            "message": "Api endpoint returned page not found",
            "errorcount": 1
          })

        this.errorDialogService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }
    }
  }

  openRegisterDialog(): void {
    this.dialogService
      .open(this.confirmRegisterDialog, {
        hasScroll: false,
        context: {
          serviceName: this.value.catalogueID,
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) void this.onRegisterCatalogue();
      });
  }

  openDeRegisterDialog(): void {
    this.dialogService
      .open(this.confirmDeRegisterDialog, {
        hasScroll: false,
        context: {
          serviceName: this.value.name,
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) void this.onDeRegisterCatalogue();
      });
  }

  onRegisterCatalogue = async (): Promise<void> => {
    try {
      this.value.active = !this.value.active;
      this.value.lastRefresh=0
      this.value = await this.availableCataloguesService.registerCatalogue(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_activated_message', { catalogueName: this.value.name }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      console.error("Error during activating catalogue\n", error)
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegisterCatalogue = async (): Promise<void> => {
    try {
      this.value.active = !this.value.active;
      this.value = await this.availableCataloguesService.deregisterCatalogue(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_deactivated_message', { catalogueName: this.value.name }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  openDeleteFromRegistryDialog(): void {
    const ref = this.dialogService.open(this.confirmDeleteDialogTemplate, {
      context: {
        serviceName: this.value.catalogueID,
        callback: async () => {
          try {
            await this.availableCataloguesService.deleteCatalogue(this.value.catalogueID);
            this.showToast(
              'primary',
              this.translateService.instant('general.catalogues.catalogue_deleted_message', { catalogueName: this.value.name }),
              ''
            );
            ref.close();
            this.updateResult.emit(this.value.catalogueID);
          } catch (error) {
            if (error.statusCode === '401' || error.status == 401) {
              void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
            } else this.errorDialogService.openErrorDialog(error);
          }
        },
      },
    });
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2500,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    } as Partial<NbToastrConfig>;

    this.toastrService.show(body, title, config);
  }

  toggle(authenticated: boolean) {
    this.authenticated = authenticated;
  }
}

