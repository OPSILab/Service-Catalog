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
import { AvailableAdaptersService } from '.././available-adapters.service';
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../../auth/login/login.service';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
import { Mapper } from '../../../model/adapter/mapper';
import { AppConfig } from '../../../model/appConfig';
import { AdapterStatusEnum } from '../../../model/services/adapter';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';

@Component({
  selector: 'actions-adapter-menu-render',
  templateUrl: 'actions-adapter-menu-render.component.html',
  styleUrls: ['actions-adapter-menu-render.component.scss']

})
export class ActionsAdapterMenuRenderComponent implements OnInit, OnDestroy {

  @Input() value: AdapterEntry;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue: AdapterEntry;
  @Output() outValue = new EventEmitter<unknown>();
  name: string;
  description: string;
  status: string;
  type: string;
  url: string;
  context: string;
  adapterId: string;
  mappers: Mapper[];
  sourceDataType: string
  loaded: boolean = false
  inputItemFormControl: FormControl;
  textareaItemFormControl: FormControl;
  IDs: string[] = [];
  filteredControlIDOptions$: Observable<string[]>;
  filteredIDOptions$: Observable<string[]>;
  IDFormControl: FormControl;
  NameFormControl: FormControl;
  filteredControlNameOptions$: Observable<string[]>;
  filteredNameOptions$: Observable<string[]>;
  names: string[] = [];
  mapperNames: string[] = [];
  actions: NbMenuItem[];
  placeholders = {
    adapterId : this.translate.instant('general.adapters.adapterId'),
    status: this.translate.instant('general.adapters.status'),
    url : this.translate.instant('general.adapters.status'),
    sourceDataType : this.translate.instant('general.adapters.source_data_type' ),
    description: this.translate.instant('general.adapters.description'),
    type: this.translate.instant('general.adapters.type'),
    context: this.translate.instant('general.adapters.context'),
  }
  private appConfig: AppConfig;
  private unsubscribe: Subject<void> = new Subject();

  ref;


  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  @ViewChild('editAdapter', { static: false }) editAdapter: TemplateRef<unknown>;
  validURL: boolean;
  previousUrl: string;

  constructor(
    private http: HttpClient,
    private availableAdaptersService: AvailableAdaptersService,
    private menuService: NbMenuService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private configService: NgxConfigureService

  ) {
    this.appConfig = this.configService.config as AppConfig
    this.adapterId = this.appConfig.data_model_mapper.default_map_ID
  }

  get registered(): boolean {
    return this.value.status == AdapterStatusEnum.Active ? true : false;
  }

  async loadMappers(): Promise<void> {
    if (this.url && (this.url != this.previousUrl) && this.appConfig.data_model_mapper.connect)
      try {
        this.mappers = await this.http.post<any>(this.url, {
          "getMapperList": true
        }).toPromise();
        for (let mapper of this.mappers) {
          this.IDs.push(mapper.id);
          this.names.push(mapper.name);
        }
        this.loaded = true
        this.validURL = true
      }
      catch (error) {
        console.error("Cannot get response from remote url")
        console.error(error)
        this.validURL = false
      }
    else this.validURL = false
    this.previousUrl=this.url
  }

  private filterID(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.IDs.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterName(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.loaded = false
    this.adapterId = this.value.adapterId
    this.name = this.value.name
    this.context = this.value.context
    this.description = this.value.description
    this.sourceDataType = this.value.sourceDataType
    this.url = this.value.url
    this.type = this.value.type
    this.loadMappers()
    this.filteredControlIDOptions$ = of(this.IDs);
    this.filteredControlNameOptions$ = of(this.names);
    this.IDFormControl = new FormControl();
    this.NameFormControl = new FormControl();
    this.filteredControlIDOptions$ = this.IDFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filterID(filterString)),
      );
    this.filteredControlNameOptions$ = this.NameFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filterID(filterString)),
      );
    this.inputItemFormControl = new FormControl();
    this.textareaItemFormControl = new FormControl();
    this.status = this.value.status
    this.actions = this.translatedActionLabels();
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.adapterId))
      .subscribe((event) => {
        switch (event.item.data) {
          case 'edit':
            this.openEditAdapter();
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

  openEditAdapter(): void {
    this.ref = this.dialogService
      .open(this.editAdapter, {
        hasScroll: false,
        context: {
          serviceName: this.value.name,
        },
      })
      .onClose.subscribe()
  }

  onAdapterIDChange(ID: string) {
    this.filteredIDOptions$ = of(this.filterID(ID));
    this.adapterId = ID
    this.name = this.names[this.IDs.indexOf(ID)]
  }

  onNameChange(name: string) {
    this.filteredNameOptions$ = of(this.filterName(name));
    this.name = name
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translatedActionLabels(): NbMenuItem[] {
    if (this.registered) {
      return [
        {
          title: this.translate.instant('general.adapters.deregister') as string,
          data: 'deregister',
        }
      ];
    } else {
      return [
        {
          title: this.translate.instant('general.adapters.edit') as string,
          data: 'edit',
        },
        {
          title: this.translate.instant('general.adapters.register') as string,
          data: 'register',
        },
        {
          title: this.translate.instant('general.adapters.delete') as string,
          data: 'delete',
        }
      ];
    }
  }

  async onEdit() {
    try {
      let name = this.name,
        description = this.description,
        status = this.status,
        adapterId = this.adapterId,
        type = this.type,
        url = this.url,
        context = this.context,
        sourceDataType=this.sourceDataType;

      if (adapterId == '' || adapterId == null)
        throw new Error("Adapter ID must be set");

      await this.availableAdaptersService.updateAdapter(((
        type == "MODEL" ?
          { name, description, status, adapterId, type, url, context, sourceDataType } as unknown :
          { name, description, status, adapterId, type, url, sourceDataType } as unknown)) as AdapterEntry, adapterId);
      this.updateResult.emit(this.value);
      this.showToast('primary', this.translate.instant('general.adapters.adapter_edited_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.value.adapterId) errors.push({
        "path": "root.adapterId",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
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
      if (!this.url) errors.push({
        "path": "root.url",
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
      if (this.type == "MODEL" && !this.context) errors.push({
        "path": "root.context",
        "property": "minLength",
        "message": "Value required for adapter type model",
        "errorcount": 1
      })

      console.error("error:", "\n", error)
      if (error.message == "Adapter ID must be set") {
        this.errorDialogService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.adapterId",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });
      }
      else if (error.status && error.status == 400) {
        if (error.error.status == "Adapter already exists")
          this.errorDialogService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.adapterId",
                "property": "minLength",
                "message": "A adapter with adapter ID < " + this.value.adapterId + " > already exists",
                "errorcount": 1
              }
            ]
          });
        else {
          this.errorDialogService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
          });
        }
      }
    }
  }

  viewConsents(serviceId: string): void {
    void this.router.navigate(['/pages/consents/register', { serviceId: serviceId }]);
  }

  openRegisterDialog(): void {
    this.dialogService
      .open(this.confirmRegisterDialog, {
        hasScroll: false,
        context: {
          serviceName: this.value.adapterId,
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) void this.onRegisterAdapter();
      });
  }

  openDeRegisterDialog(): void {
    this.dialogService
      .open(this.confirmDeRegisterDialog, {
        hasScroll: false,
        context: {
          serviceName: this.value.adapterId,
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) void this.onDeRegisterAdapter();
      });
  }

  onRegisterAdapter = async (): Promise<void> => {
    try {
      this.value.status = this.value.status == "active" ? "inactive" : "active";
      this.value = await this.availableAdaptersService.registerAdapter(this.value);
      this.showToast('primary', this.translate.instant('general.adapters.adapter_registered_message', { adapterName: this.value.adapterId }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegisterAdapter = async (): Promise<void> => {
    try {
      this.value.status = this.value.status == "active" ? "inactive" : "active";
      this.value = await this.availableAdaptersService.deregisterAdapter(this.value);
      this.showToast('primary', this.translate.instant('general.adapters.adapter_deregistered_message', { adapterName: this.value.adapterId }), '');
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
        serviceName: this.value.adapterId,
        callback: async () => {
          try {
            await this.availableAdaptersService.deleteAdapter(this.value.adapterId);
            this.showToast(
              'primary',
              this.translateService.instant('general.adapters.adapter_deleted_message', { adapterName: this.value.adapterId }),
              ''
            );
            ref.close();
            this.updateResult.emit(this.value.id);
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

