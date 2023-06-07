import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbToastrService, NbDialogService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { LoginService } from '../../../../../auth/login/login.service';
import { AppConfig } from '../../../../../model/appConfig';
import { CatalogueEntry } from '../../../../../model/catalogue/catalogueEntry';
import { AdapterStatusEnum } from '../../../../../model/services/adapter';
import { ErrorDialogService } from '../../../../error-dialog/error-dialog.service';
import { AvailableServicesService } from '../../../../services/availableServices/availableServices.service';
//import { Countries } from '../../../availableCatalogues/add-catalogue/countries';
import { AvailableCataloguesService } from '../../../availableCatalogues/availableCatalogues.service';
import * as spatials from '../../../../../../assets/data/service-schema/en/spatials.json'

/*
import * as spatials_de from '../../../../../assets/data/service-schema/de/spatials.json'
import * as spatials_el from '../../../../../assets/data/service-schema/el/spatials.json'
import * as spatials_lv from '../../../../../assets/data/service-schema/lv/spatials.json'
import * as spatials_it from '../../../../../assets/data/service-schema/it/spatials.json'
*/

@Component({
  selector: 'actions-federate',
  templateUrl: './actions-federate.component.html',
  styleUrls: ['./actions-federate.component.scss']
})
export class ActionsFederateComponent implements OnInit {

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
  oAuth2Endpoint: string;
  clientID: string;
  clientSecret: string;
  actions: NbMenuItem[];
  called = false;
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

  validURL: boolean;
  federated = false;

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

  async ngOnInit(): Promise<void> {
    let catalogue
    if (!this.called) {
      catalogue = await this.availableCataloguesService.getCatalogueByURL(this.value.apiEndpoint)
      this.called = true;
      if (catalogue)
        if (catalogue.catalogueID)
          this.federated = true;

      await this.ngOnInit();
    }

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
    this.refresh = this.value.refresh == 86400000 ? 'Every day' : this.value.refresh == 604800000 ? 'Every week' : this.value.refresh == 2629800000 ? 'Every month' : undefined
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();

  }

  async federate() {
    try {
      let name = this.name,
        catalogueID = new String(Date.now()) + JSON.stringify(Math.random() * 999999999999999) + name,
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
        services;
      try {
        services = (await this.availableServicesService.getRemoteServicesCount(apiEndpoint)).total
      }
      catch (error) {
        console.error("Error during services count setting")
        console.error(error)
        services = 0
      }

      switch (this.refresh) {
        case 'Every day': refresh = 86400000; break;
        case 'Every week': refresh = 604800000; break;
        case 'Every month': refresh = 2629800000; break;
        default: refresh = 604800000; break;
      }

      await this.availableCataloguesService.saveCatalogue((({
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
        services
      } as unknown)) as CatalogueEntry);
      this.updateResult.emit(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_added_message'), '');

      this.ngOnInit()
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.name) errors.push(this.errorTemplate("name"))
      if (!this.apiEndpoint) errors.push(this.errorTemplate("apiEndpoint"))
      if (!this.authenticated) errors.push(this.errorTemplate("authenticated"))
      if (!this.active) errors.push(this.errorTemplate("active"))
      if (!this.refresh) errors.push(this.errorTemplate("refresh"))

      console.error("error:", "\n", error)

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

  errorTemplate(value): Object {
    let error = {
      "path": "root",
      "property": "minLength",
      "message": "Value required",
      "errorcount": 1
    }
    error.path = error.path + "." + value
    return error;
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
}
