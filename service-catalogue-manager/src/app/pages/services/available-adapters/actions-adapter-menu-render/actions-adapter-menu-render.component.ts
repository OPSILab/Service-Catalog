import { Component, Input, Output, OnInit, OnChanges, TemplateRef, EventEmitter, OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  NbMenuService,
  NbToastrService,
  NbDialogService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrConfig,
  NbMenuItem,
} from '@nebular/theme';
import { ErrorDialogService } from '../../../error-dialog/error-dialog.service';
import { AvailableAdaptersService } from '.././available-adapters.service';
import { AddAdapterComponent } from '.././add-adapter/add-adapter.component';

import { LoginService } from '../../../../auth/login/login.service';
//import { AdapterStatusEnum } from '../../../../model/services/adapter';
import { AdapterEntry } from '../../../../model/adapter/adapterEntry';

@Component({
  selector: 'actions-adapter-menu-render',
  template: `
  <button nbButton outline status="basic" [nbContextMenu]="actions" nbContextMenuTag="service-context-menu{{ value.adapterId }}" >
  <nb-icon icon="settings-2" ></nb-icon>
</button>
<!-- Register Adapter modal ng-template -->
<ng-template #confirmRegisterDialog let-data let-ref="dialogRef">
  <nb-card>
    <nb-card-header class="d-flex justify-content-between">
      <h5>{{ 'general.adapters.register_adapter' | translate: { adapterName: value.name } }}</h5>
      <button nbButton ghost shape="rectangle" size="tiny" (click)="ref.close()">
        <i class="material-icons">close</i>
      </button>
    </nb-card-header>
    <nb-card-body
      class="p-5 text-center"
      [innerHTML]="'general.adapters.register_adapter_message' | translate: { adapterName: value.name }"
    ></nb-card-body>
    <nb-card-footer class="d-flex justify-content-center">
      <button nbButton status="primary" size="small" (click)="ref.close(true)">
        {{ 'general.adapters.register' | translate }}
      </button>
      <button nbButton class="ml-2" ghost shape="rectangle" status="primary" (click)="ref.close()">
        {{ 'general.close' | translate }}
      </button>
    </nb-card-footer>
  </nb-card>
</ng-template>
<!-- DeRegister Adapter modal ng-template -->
<ng-template #confirmDeRegisterDialog let-data let-ref="dialogRef">
  <nb-card>
    <nb-card-header class="d-flex justify-content-between">
      <h5>{{'general.adapters.deregister_adapter' | translate: {adapterName: value.name} }}</h5>
      <button nbButton ghost shape="rectangle" size="tiny" (click)="ref.close()">
        <i class="material-icons">close</i>
      </button>
    </nb-card-header>
    <nb-card-body
      class="p-5 text-center"
      [innerHTML]="'general.adapters.deregister_adapter_message' | translate: { adapterName: value.name }"
    ></nb-card-body>
    <nb-card-footer class="d-flex justify-content-center">
      <button nbButton status="primary" size="small" (click)="ref.close(true)">
        {{ 'general.adapters.deregister' | translate }}
      </button>
      <button nbButton class="ml-2" ghost shape="rectangle" status="primary" (click)="ref.close()">
        {{ 'general.close' | translate }}
      </button>
    </nb-card-footer>
  </nb-card>
</ng-template>
<!-- Delete Adapter modal ng-template -->
<ng-template #confirmDeleteDialog let-data let-ref="dialogRef">
  <nb-card>
    <nb-card-header class="d-flex justify-content-between">
      <h5>{{ 'general.adapters.delete_adapter' | translate: {adapterName: value.name} }}</h5>
      <button nbButton ghost shape="rectangle" size="tiny" (click)="ref.close()">
        <i class="material-icons">close</i>
      </button>
    </nb-card-header>
    <nb-card-body
      class="p-5 text-center"
      [innerHTML]="'general.adapters.delete_adapter_message' | translate: {adapterName: value.name}"
    ></nb-card-body>
    <nb-card-footer class="d-flex justify-content-center">
      <button nbButton status="danger" size="small" (click)="data.callback()">
        {{ 'general.editor.delete' | translate }}
      </button>
      <button nbButton class="ml-2" ghost shape="rectangle" status="primary" (click)="ref.close()">
        {{ 'general.cancel' | translate }}
      </button>
    </nb-card-footer>
  </nb-card>
</ng-template>
`,
  styleUrls: ['./actions-adapter-menu-render.component.scss']

})
export class ActionsAdapterMenuRenderComponent implements OnInit, OnDestroy, OnChanges {

  @Input() value: AdapterEntry;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue: AdapterEntry;
  @Output() outValue = new EventEmitter<unknown>();

  private unsubscribe: Subject<void> = new Subject();
  actions: NbMenuItem[];

  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  //@ViewChild('adapter',{ static: false }) addAdapter: AddAdapterComponent;

  constructor(
    private availableAdaptersService: AvailableAdaptersService,
    private menuService: NbMenuService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private loginService: LoginService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("actionsAdapterMenuRender.component.ts.ngOnChanges")
    this.updateResult.emit(this.value.id);
  }

  ngOnChange() {
    this.updateResult.emit(this.value.id);
  }

  ngOnInit(): void {
    console.log("actionAdapterMenuRender.component.ts.ngOnInit()")
    this.actions = this.translatedActionLabels();
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.adapterId))
      .subscribe((event) => {
        console.log(event);
        console.log("pre-switch")
        switch (event.item.data) {
          case 'edit':
            this.onEdit();
            console.log("edit");
            break;
          case 'delete':
            console.log("delete");
            this.openDeleteFromRegistryDialog();
            break;
          case 'register':
            console.log("register");
            this.openRegisterDialog();
            break;
          case 'deregister':
            this.openDeRegisterDialog();
            break;
          case 'edit service':
            this.onEditService(this.value.adapterId);
            break;
          default:
            console.log("default");
            break;
        }
      });
  }

  async ngOnUpdate(): Promise<void> {
    console.log("actionAdapterMenuRender.component.ts.ngOnUpdate()")
    //TODO this.value = await this.availableAdaptersService.getAdapter(this.value.adapterId);
    this.updateResult.emit(this.value);
    this.ngOnInit()
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translatedActionLabels(): NbMenuItem[] {
    /* if (this.registered) {
       return [
         {
           title: this.translate.instant('general.adapters.deregister') as string,
           data: 'deregister',
         },
         {
           title: this.translate.instant('general.adapters.editService') as string,
           data: 'edit service',
         },
       ];
     } else {*/
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
      },
      {
        title: this.translate.instant('general.adapters.editService') as string,
        data: 'edit service',
      },
    ];
    //}
  }

  async onEdit() {
    console.log("onedit called")
    AddAdapterComponent.formType = 'edit';
    this.dialogService.open(AddAdapterComponent).onClose.subscribe((confirm) => {
      if (confirm) void this.updateResult.emit(this.value.id);
    });
    this.updateResult.emit(this.value.id);
    console.log("onedit finished")
    console.log(this.value)
    this.ngOnInit()
  }

  onEditService(serviceId: string): void {
    console.log("onEdit")
    void this.router.navigate(['/pages/services/service-editor', { serviceId: serviceId }]);
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
      console.log("register")
      // this.value.status = this.value.status == "active" ? "inactive" : "active";
      //this.value = await this.availableAdaptersService.registerAdapter(this.value);
      this.showToast('primary', this.translate.instant('general.adapters.adapter_registered_message', { adapterName: this.value.adapterId }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.error.statusCode === '401') {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegisterAdapter = async (): Promise<void> => {
    try {
      console.log("deregister")
      //this.value.status = this.value.status == "active" ? "inactive" : "active";
      //this.value = await this.availableAdaptersService.deregisterAdapter(this.value);
      this.showToast('primary', this.translate.instant('general.adapters.adapter_deregistered_message', { adapterName: this.value.adapterId }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.error.statusCode === '401') {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  openDeleteFromRegistryDialog(): void {
    const ref = this.dialogService.open(this.confirmDeleteDialogTemplate, {
      context: {
        serviceName: this.value.adapterId,
        callback: async () => {
          try {
            //TODO await this.availableAdaptersService.deleteAdapter(this.value.adapterId);
            this.showToast(
              'primary',
              this.translateService.instant('general.adapters.adapter_deleted_message', { adapterName: this.value.adapterId }),
              ''
            );
            ref.close();
            this.updateResult.emit(this.value.id);
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error.error.statusCode === '401') {
              void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
              // this.router.navigate(['/login']);
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

