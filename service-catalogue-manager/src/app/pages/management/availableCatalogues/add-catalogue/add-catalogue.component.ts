import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AvailableCataloguesService } from '../availableCatalogues.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry'
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogCatalogueService } from '../../../error-dialog/error-dialog-catalogue/error-dialog-catalogue.service';
import { AppConfig } from '../../../../model/appConfig';
import { map, startWith, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ViewChild } from '@angular/core';
//import { Countries } from './countries'
import { AvailableServicesService } from '../../../services/availableServices/availableServices.service'
import * as spatials from '../../../../../assets/data/service-schema/en/spatials.json'

/*
import * as spatials_de from '../../../../../assets/data/service-schema/de/spatials.json'
import * as spatials_el from '../../../../../assets/data/service-schema/el/spatials.json'
import * as spatials_lv from '../../../../../assets/data/service-schema/lv/spatials.json'
import * as spatials_it from '../../../../../assets/data/service-schema/it/spatials.json'
*/

@Component({
  selector: 'add-catalogue',
  templateUrl: './add-catalogue.component.html',
  styleUrls: ['./add-catalogue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddCatalogueComponent implements OnInit {

  @Input() value: CatalogueEntry;
  @Output() editedValue = new EventEmitter<unknown>();
  competentAuthority: string;
  catalogueID: string = 'ID';
  lastRefresh
  country: string;
  category: string;
  homePage: string;
  apiEndpoint: string;
  active: boolean;
  refresh: any;
  name: string;
  description: string;
  status: string = "inactive"
  type: string;
  authenticated: boolean = false;
  oAuth2Endpoint: string;
  clientID: string;
  clientSecret: string;
  filteredCountryOptions$: Observable<string[]>;
  countries : string[] = spatials.enum//Countries.countries
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
    oAuth2Endpoint: this.translate.instant('general.catalogues.oauth2_endpoint')
  }
  //countries: string[] = Object.keys(Countries).filter(value => isNaN(Number(value)) === false && JSON.stringify(value) != '0').map(key => Countries[key]);
  private appConfig: AppConfig;
  iconURL: any;

  constructor(
    private http: HttpClient,
    protected ref: NbDialogRef<AddCatalogueComponent>,
    private toastrService: NbToastrService,
    private errorService: ErrorDialogCatalogueService,
    private availableCatalogueService: AvailableCataloguesService,
    private availableServicesService: AvailableServicesService,
    private translate: TranslateService,
    private configService: NgxConfigureService
  ) {
    this.appConfig = this.configService.config as AppConfig
  }

  cancel(): void {
    this.ref.close();
  }

  ngOnInit(): void {
    if (this.value) {
      if (this.value.name) this.name = this.value.name
      if (this.value.description) this.description = this.value.description
      if (this.value.status) this.status = this.value.status
      if (this.value.competentAuthority) this.competentAuthority = this.value.competentAuthority
      if (this.value.active!=undefined) this.active = this.value.active
      if (this.value.apiEndpoint) this.apiEndpoint = this.value.apiEndpoint
      if (this.value.authenticated) this.authenticated = this.value.authenticated
      if (this.value.catalogueID) this.catalogueID = this.value.catalogueID
      if (this.value.category) this.category = this.value.category
      if (this.value.clientID) this.clientID = this.value.clientID
      if (this.value.clientSecret) this.clientSecret = this.value.clientSecret
      if (this.value.country) this.country = this.value.country
      if (this.value.homePage) this.homePage = this.value.homePage
      if (this.value.lastRefresh) this.homePage = this.value.lastRefresh
      if (this.value.iconURL) this.iconURL = this.value.iconURL
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

  onFileChanged(event: Event): void {
    this.editedValue.emit(this.value);
  }

  onCountryChange(country: string) {
    this.filteredCountryOptions$ = of(this.filterCountry(country));
    this.country = country
  }

  private filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  confirm() {
    try {
      this.onSubmit()
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
    }
  }

  toggle(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  completedServicesCount(servicesCountByStatus) {
    for (let status of  servicesCountByStatus)
      if (status.status == "COMPLETED")
        return status.count
    return 0
  }

  async onSubmit() {
    let services

    try {
      let name = this.name,
        catalogueID = new String(Date.now()) + JSON.stringify(Math.random() * 999999999999999) + name,
        competentAuthority = this.competentAuthority,
        country = this.country,
        category = this.category,
        homePage = this.homePage,
        iconURL=this.iconURL,
        apiEndpoint = this.apiEndpoint,
        active = this.active,
        refresh,
        description = this.description,
        type = this.type,
        authenticated = this.authenticated,
        oAuth2Endpoint = this.oAuth2Endpoint,
        clientSecret = this.clientSecret,
        clientID = this.clientID,
        lastRefresh = Date.now();

      switch (this.refresh) {
        case 'Every day': refresh = 86400000; break;
        case 'Every week': refresh = 604800000; break;
        case 'Every month': refresh = 2629800000; break;
        default: refresh = 604800000; break;
      }

      try {
        //let servicesCountByStatus = await this.availableServicesService.getRemoteServicesCount(catalogueID)
        let servicesCountByStatus = await this.availableServicesService.getRemoteServicesCount(catalogueID)
        services = this.completedServicesCount(servicesCountByStatus)
      }
      catch (error) {
        console.error(error.message)
        services = 0;
      }

      await this.availableCatalogueService.saveCatalogue((({
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
      } as unknown)) as CatalogueEntry);

      this.ref.close();
      this.editedValue.emit(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_added_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.name) errors.push(this.errorTemplate("name"))
      if (!this.apiEndpoint) errors.push(this.errorTemplate("apiEndpoint"))
      if (!this.authenticated) errors.push(this.errorTemplate("authenticated"))
      if (this.active===undefined) errors.push(this.errorTemplate("active"))
      if (!this.refresh) errors.push(this.errorTemplate("refresh"))

      console.log("error:", "\n", error)

      if (error.status && error.status == 400 && error.error && error.error.status == "Catalogue already exists") {
        this.errorService.openErrorDialog({
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

        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }
    }
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


