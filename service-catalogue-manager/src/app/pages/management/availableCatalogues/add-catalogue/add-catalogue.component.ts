import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AvailableCataloguesService } from '../availableCatalogues.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry'
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//import { ErrorDialogCatalogueService } from '../../../error-dialog/error-dialog-catalogue.service';//TODO
import { AppConfig } from '../../../../model/appConfig';
import { map, startWith, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ViewChild } from '@angular/core';
//import { randomBytes, randomInt } from 'crypto';

@Component({
  selector: 'add-catalogue',
  templateUrl: './add-catalogue.component.html',
  styleUrls: ['./add-catalogue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddCatalogueComponent implements OnInit {

  @Input() value: CatalogueEntry;
  @Output() editedValue = new EventEmitter<unknown>();
  competentAuthority: string ;
  catalogueID: string = 'ID' ;
  country: string ;
  category: string ;
  homePage: string ;
  apiEndpoint: string ;
  active: string ;
  refresh: any;
  name: string ;
  description: string ;
  status: string = "inactive"
  type: string ;
  authenticated: boolean = false;
  oAuth2Endpoint: string ;
  clientID: string  ;
  clientSecret: string ;
  private appConfig: AppConfig;

  constructor(
    private http: HttpClient,
    protected ref: NbDialogRef<AddCatalogueComponent>,
    private toastrService: NbToastrService,
    //private errorService: ErrorDialogCatalogueService,//TODO
    private availableCatalogueService: AvailableCataloguesService,
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
    }
  }

  onFileChanged(event: Event): void {
      this.editedValue.emit(this.value);
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
    console.log(this.authenticated)
  }

  async onSubmit() {
    try {
      console.log(this.catalogueID)
      let name = this.name,
        catalogueID = this.name+ this.competentAuthority+ this.country+ this.category+ this.description+
          this.homePage+ this.apiEndpoint+ this.type+ this.active+ this.refresh+ this.authenticated+ this.oAuth2Endpoint+ this.clientID+ this.clientSecret,
        competentAuthority = this.competentAuthority,
        country = this.country,
        category = this.category,
        homePage = this.homePage,
        apiEndpoint = this.apiEndpoint,
        active = this.active,
        refresh = this.refresh,
        description = this.description,
        type = this.type,
        authenticated = this.authenticated,
        oAuth2Endpoint = this.oAuth2Endpoint,
        clientSecret = this.clientSecret,
        clientID = this.clientID;


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
        oAuth2Endpoint
      } as unknown)) as CatalogueEntry);

      this.ref.close();
      this.editedValue.emit(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_added_message'), '');
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


