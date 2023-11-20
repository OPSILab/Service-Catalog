
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
  NbMenuItem,
  NbDialogRef
} from '@nebular/theme';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { LoginService } from '../../../../auth/login/login.service';
import { AdapterStatusEnum } from '../../../../model/services/adapter';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../../../model/appConfig';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { AvailableServicesService } from '../../../services/availableServices/availableServices.service'
import { AvailableCataloguesService } from '../../availableCatalogues/availableCatalogues.service';
import { CatalogueDataset } from '../../../../model/catalogue/catalogueDataset';
import { ManageConfigurationsService } from '../manage-configurations.service';
import { ErrorDialogCatalogueService } from '../../../error-dialog/error-dialog-catalogue/error-dialog-catalogue.service';

@Component({
  selector: 'add-remote-catalogue-dataset',
  templateUrl: './add-remote-catalogue-dataset.component.html',
  styleUrls: ['./add-remote-catalogue-dataset.component.scss']
})
export class AddRemoteCatalogueDatasetComponent implements OnInit, OnDestroy {

  @Input() value: CatalogueDataset;
  @Output() editedValue = new EventEmitter<unknown>();
  catalogueDatasetID: string;
  authenticationMethod: string;
  password: string;
  name: string;
  username: string;
  type: string = 'Service Catalogue';
  portalURL: string;
  clientID: string;
  clientSecret: string;
  URL;
  placeholders = {
    URL: this.translate.instant('general.catalogues.dataset.URL'),
    authenticationMethod: this.translate.instant('general.catalogues.dataset.authentication_method'),
    password: this.translate.instant('general.catalogues.dataset.password'),
    username: this.translate.instant('general.catalogues.dataset.username'),
    clientID: this.translate.instant('general.catalogues.dataset.client_ID'),
    clientSecret: this.translate.instant('general.catalogues.dataset.client_secret'),
    name: this.translate.instant('general.catalogues.dataset.name'),
    type: this.translate.instant('general.catalogues.dataset.type'),
    portalURL: this.translate.instant('general.catalogues.dataset.portal_URL')
  }
  private appConfig: AppConfig;
  private unsubscribe: Subject<void> = new Subject();

  validURL: boolean;

  constructor(
    private availableCataloguesDatasetService: ManageConfigurationsService,
    private http: HttpClient,
    private ref: NbDialogRef<AddRemoteCatalogueDatasetComponent>,
    private toastrService: NbToastrService,
    private errorService: ErrorDialogCatalogueService,
    private availableCatalogueService: AvailableCataloguesService,
    private availableServicesService: AvailableServicesService,
    private translate: TranslateService,
    private configService: NgxConfigureService


  ) {
    this.appConfig = this.configService.config as AppConfig
  }


  ngOnInit(): void {
    this.catalogueDatasetID = this.value?.catalogueDatasetID
    this.authenticationMethod = this.value?.authenticationMethod
    this.password = this.value?.password
    this.clientID = this.value?.clientID
    this.clientSecret = this.value?.clientSecret
    this.portalURL = this.value?.portalURL
    this.name = this.value?.name
    this.username = this.value?.username
    this.type = this.value?.type || 'Service Catalogue'
  }

  getRef() {
    return this.ref
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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

      await this.availableCataloguesDatasetService.saveCatalogueDataset((({
        name: this.name,
        catalogueDatasetID: new String(Date.now()) + JSON.stringify(Math.random() * 999999999999999) + this.name,
        type: this.type,
        clientSecret: this.clientSecret,
        clientID: this.clientID,
        username: this.username,
        password: this.password,
        URL: this.URL,
        portalURL: this.portalURL,
        authenticationMethod: this.authenticationMethod
      } as unknown)) as CatalogueDataset);
      this.editedValue.emit(this.value);
      this.ref.close()
      this.showToast('primary', this.translate.instant('general.catalogues.dataset.dataset_added_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.name) errors.push(this.errorTemplate("name"))
      if (!this.type) errors.push(this.errorTemplate("type"))
      if (!this.URL) errors.push(this.errorTemplate("URL"))

      console.error("error:", "\n", error)

      if (error.status && error.status == 400 && error.error && error.error.status == "Catalogue already exists") {
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.catalogueID",
              "property": "minLength",
              "message": "A catalogue with catalogue ID < " + this.catalogueDatasetID + " > already exists",
              "errorcount": 1
            }
          ]
        });
      }

      else {
        if (error.status && error.status == 404)
          errors.push({
            "path": "apiEndpoint",
            "property": "not found",
            "message": "Api endpoint returned page not found",
            "errorcount": 1
          })
        else
          errors.push({
            "path": "apiEndpoint",
            "property": "not found",
            "message": error.name,
            "errorcount": 1
          })
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }
      //else
      //this.errorService.openErrorDialog(error);


    }
  }

  confirm() {
    try {
      this.onSubmit()
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
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

