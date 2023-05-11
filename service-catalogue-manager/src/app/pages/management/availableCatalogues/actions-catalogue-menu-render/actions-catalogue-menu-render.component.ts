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
import {Countries} from '../add-catalogue/countries'
import { AvailableServicesService } from '../../../services/availableServices/availableServices.service'

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
  competentAuthority: string;
  lastRefresh;
  catalogueID: string;
  country: string;
  category: string;
  homePage: string;
  apiEndpoint: string;
  active: string;
  refresh: any;
  name: string;
  description: string;
  status: string = 'inactive'
  type: string;
  authenticated: boolean;
  clientID: string;
  clientSecret: string;
  actions: NbMenuItem[];
  countries: string[] = Countries.countries
  placeholders = {
    competentAuthority : this.translate.instant('general.catalogues.competent_authority'),
    country : this.translate.instant('general.catalogues.country'),
    category : this.translate.instant('general.catalogues.category'),
    homePage : this.translate.instant('general.catalogues.home_page'),
    apiEndpoint : this.translate.instant('general.catalogues.api_endpoint'),
    refresh : this.translate.instant('general.catalogues.refresh'),
    description : this.translate.instant('general.catalogues.description'),
    clientID : this.translate.instant('general.catalogues.client_ID'),
    clientSecret : this.translate.instant('general.catalogues.client_secret'),
    name : this.translate.instant('general.catalogues.name'),
    status : this.translate.instant('general.catalogues.status'),
    type : this.translate.instant('general.catalogues.type'),
    oAuth2endpoint : this.translate.instant('general.catalogues.o_auth_2_endpoint')
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
    return this.value.active == AdapterStatusEnum.Active ? true : false;
  }

  ngOnInit(): void {
    console.log("init")
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
    this.refresh = this.value.refresh == 86400000 ? 'Every day' : this.value.refresh == 604800000 ? 'Every week' :  this.value.refresh == 2629800000 ? 'Every month' : undefined
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
    console.log("Translated acions label called")
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
          title: this.translate.instant('general.catalogues.activate_deactivate') as string,
          data: 'register',
        }
      ];
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
        authenticated = this.authenticated,
        oAuth2Endpoint = this.oAuth2Endpoint,
        clientSecret = this.clientSecret,
        clientID = this.clientID,
        services,
        lastRefresh = this.lastRefresh;

        try {
          services = (await this.availableServicesService.getRemoteServicesCount(apiEndpoint)).total
        }
        catch{
          services = 0;
        }

        switch(this.refresh) {
          case 'Every day' : refresh = 86400000; break;
          case 'Every week' : refresh = 604800000; break;
          case 'Every month' : refresh = 2629800000; break;
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
        authenticated,
        clientID,
        clientSecret,
        oAuth2Endpoint,
        services,
        lastRefresh
      } as unknown)) as CatalogueEntry, catalogueID);
      this.updateResult.emit(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_edited_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.name) errors.push({
        "path": "root.name",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.description) errors.push({
        "path": "root.description",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.type) errors.push({
        "path": "root.type",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })

      console.log("error:", "\n", error)
      if (error.message == "Catalogue ID must be set") {
        console.log(error)
        /*TODO this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.catalogueID",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });*/
      }/*
      else if (error.status && error.status == 400) {
        if (error.error.status == "Catalogue already exists")
          TODOthis.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.catalogueID",
                "property": "minLength",
                "message": "A catalogue with catalogue ID < " + this.catalogueID + " > already exists",
                "errorcount": 1
              }
            ]
          });
        else this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }*/
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
          serviceName: this.value.catalogueID,
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) void this.onDeRegisterCatalogue();
      });
  }

  onRegisterCatalogue = async (): Promise<void> => {
    try {
      this.value.active = this.value.active == "active" ? "inactive" : "active";
      this.value = await this.availableCataloguesService.registerCatalogue(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_activated_message', { catalogueName: this.value.catalogueID }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      console.log("Error during activating catalogue\n", error)
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegisterCatalogue = async (): Promise<void> => {
    try {
      this.value.active = this.value.active == "active" ? "inactive" : "active";
      this.value = await this.availableCataloguesService.deregisterCatalogue(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_deactivated_message', { catalogueName: this.value.catalogueID }), '');
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
              this.translateService.instant('general.catalogues.catalogue_deleted_message', { catalogueName: this.value.catalogueID }),
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

