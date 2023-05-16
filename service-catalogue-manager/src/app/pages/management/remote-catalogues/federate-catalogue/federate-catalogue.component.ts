import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { Observable, of } from 'rxjs';
import { AppConfig } from '../../../../model/appConfig';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry';
import { AvailableServicesService } from '../../../services/availableServices/availableServices.service';
import { AddCatalogueComponent } from '../../availableCatalogues/add-catalogue/add-catalogue.component';
import { Countries } from '../../availableCatalogues/add-catalogue/countries';
import { AvailableCataloguesService } from '../../availableCatalogues/availableCatalogues.service';
import { ErrorDialogCatalogueService } from '../../../error-dialog/error-dialog-catalogue/error-dialog-catalogue.service';

@Component({
  selector: 'federate-catalogue',
  templateUrl: './federate-catalogue.component.html',
  styleUrls: ['./federate-catalogue.component.css']
})
export class FederateCatalogueComponent implements OnInit {


  @Input() value: CatalogueEntry;
  @Output() editedValue = new EventEmitter<unknown>();

  /*
  @Input() value: CatalogueEntry;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue: CatalogueEntry;
  @Output() outValue = new EventEmitter<unknown>();
  */

  competentAuthority: string;
  catalogueID: string = 'ID';
  lastRefresh
  country: string;
  category: string;
  homePage: string;
  apiEndpoint: string;
  active: string;
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
  countries: string[] = Countries.countries
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
      if (this.value.active) this.active = this.value.active
      if (this.value.apiEndpoint) this.apiEndpoint = this.value.apiEndpoint
      if (this.value.authenticated) this.authenticated = this.value.authenticated
      if (this.value.catalogueID) this.catalogueID = this.value.catalogueID
      if (this.value.category) this.category = this.value.category
      if (this.value.clientID) this.clientID = this.value.clientID
      if (this.value.clientSecret) this.clientSecret = this.value.clientSecret
      if (this.value.country) this.country = this.value.country
      if (this.value.homePage) this.homePage = this.value.homePage
      if (this.value.lastRefresh) this.homePage = this.value.lastRefresh
    }
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
      console.log("error:<\n", error, ">\n")
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
    }
  }

  toggle(authenticated: boolean) {
    this.authenticated = authenticated;
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

  async onSubmit() {
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
        services = (await this.availableServicesService.getRemoteServicesCount(apiEndpoint)).total,
        lastRefresh = Date.now();

      switch (this.refresh) {
        case 'Every day': refresh = 86400000; break;
        case 'Every week': refresh = 604800000; break;
        case 'Every month': refresh = 2629800000; break;
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
      if (!this.active) errors.push(this.errorTemplate("active"))
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
