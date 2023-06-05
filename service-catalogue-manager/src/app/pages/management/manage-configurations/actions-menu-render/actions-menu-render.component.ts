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

@Component({
  selector: 'actions-menu-render',
  templateUrl: './actions-menu-render.component.html',
  styleUrls: ['./actions-menu-render.component.scss']
})
export class ActionsMenuRenderComponent implements OnInit, OnDestroy {

  @Input() value: CatalogueDataset;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue: CatalogueEntry;
  @Output() outValue = new EventEmitter<unknown>();
  catalogueDatasetID: string;
  authenticationMethod: string;
  password: string;
  name: string;
  username: string;
  type: string;
  portalURL: string;
  clientID: string;
  clientSecret: string;
  actions: NbMenuItem[];
  URL;
  //countries: string[] = Countries.countries
  placeholders = {
    authenticationMethod: this.translate.instant('general.catalogues.dataset.authentication_method'),
    password: this.translate.instant('general.catalogues.dataset.password'),
    username: this.translate.instant('general.catalogues.dataset.username'),
    clientID: this.translate.instant('general.catalogues.dataset.client_ID'),
    clientSecret: this.translate.instant('general.catalogues.dataset.client_secret'),
    name: this.translate.instant('general.catalogues.dataset.name'),
    type: this.translate.instant('general.catalogues.dataset.type'),
    portalURL: this.translate.instant('general.catalogues.dataset.portalURL')
  }
  private appConfig: AppConfig;
  private unsubscribe: Subject<void> = new Subject();

  ref;


  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  @ViewChild('editCatalogue', { static: false }) editCatalogue: TemplateRef<unknown>;
  validURL: boolean;

  constructor(
    private http: HttpClient,
    private availableCataloguesDatasetService: ManageConfigurationsService,
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

  ngOnInit(): void {
    this.catalogueDatasetID = this.value.catalogueDatasetID
    this.authenticationMethod = this.value.authenticationMethod
    this.password = this.value.password
    this.clientID = this.value.clientID
    this.clientSecret = this.value.clientSecret
    this.portalURL = this.value.portalURL
    this.name = this.value.name
    this.username = this.value.username
    this.type = this.value.type
    this.URL = this.value.URL
    this.actions = this.translatedActionLabels();
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.catalogueDatasetID))
      .subscribe((event) => {
        switch (event.item.data) {
          case 'edit':
            this.openEditCatalogue();
            break;
          case 'delete':
            this.openDeleteFromRegistryDialog();
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
    return [
      {
        title: this.translate.instant('general.catalogues.dataset.edit') as string,
        data: 'edit',
      },
      {
        title: this.translate.instant('general.catalogues.dataset.delete') as string,
        data: 'delete',
      }
    ];
  }

  errorTemplate(value): Object {
    let error = {
      "path": "root",
      "property": "minLength",
      "message": "Value required",
      "errorcount": 1
    }
    error.path =  error.path + "." + value
    return error;
  }

  async onEdit() {
    try {

      await this.availableCataloguesDatasetService.updateCatalogueDataset((({
        catalogueDatasetID : this.catalogueDatasetID,
        name : this.name,
        type : this.type,
        clientSecret : this.clientSecret,
        clientID : this.clientID,
        username : this.username,
        password : this.password,
        URL : this.URL,
        portalURL : this.portalURL,
        authenticationMethod : this.authenticationMethod
      } as unknown)) as CatalogueDataset, this.catalogueDatasetID);
      this.updateResult.emit(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.dataset.dataset_edited_message', {catalogueDatasetName : this.name}), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.name) errors.push(this.errorTemplate("name"))
      if (!this.type) errors.push(this.errorTemplate("apiEndpoint"))
      if (!this.URL) errors.push(this.errorTemplate("authenticated"))

      console.error("error:", "\n", error)

      if (error.status && error.status == 400 && error.error && error.error.status == "Catalogue already exists") {
        this.errorDialogService.openErrorDialog({
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

  openDeleteFromRegistryDialog(): void {
    const ref = this.dialogService.open(this.confirmDeleteDialogTemplate, {
      context: {
        serviceName: this.value.catalogueDatasetID,
        callback: async () => {
          try {
            await this.availableCataloguesDatasetService.deleteCatalogueDataset(this.value.catalogueDatasetID);
            this.showToast(
              'primary',
              this.translateService.instant('general.catalogues.dataset.dataset_deleted_message', { catalogueDatasetName: this.value.name }),
              ''
            );
            ref.close();
            this.updateResult.emit(this.value.catalogueDatasetID);
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
}
