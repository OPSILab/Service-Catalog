import { Component, Input, Output, OnInit, TemplateRef, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
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
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { AvailableConnectorsService } from './availableConnectors.service';
import { DialogAddNewPromptComponent } from './dialog-import-prompt/dialog-import-prompt.component';

import { LoginService } from '../../../auth/login/login.service';
import { ConnectorStatusEnum } from '../../../model/services/connector';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';
@Component({
  template: `
    <button nbButton outline status="basic" [nbContextMenu]="actions" nbContextMenuTag="service-context-menu{{ value.serviceId }}">
      <nb-icon icon="settings-2"></nb-icon>
    </button>
    <!-- Register Service modal ng-template -->
    <ng-template #confirmRegisterDialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header class="d-flex justify-content-between">
          <h5>{{ 'general.services.register_service' | translate }}</h5>
          <button nbButton ghost shape="rectangle" size="tiny" (click)="ref.close()">
            <i class="material-icons">close</i>
          </button>
        </nb-card-header>
        <nb-card-body
          class="p-5 text-center"
          [innerHTML]="'general.services.register_service_message' | translate: { serviceName: data.serviceName }"
        ></nb-card-body>
        <nb-card-footer class="d-flex justify-content-center">
          <button nbButton status="primary" size="small" (click)="ref.close(true)">
            {{ 'general.services.register' | translate }}
          </button>
          <button nbButton class="ml-2" ghost shape="rectangle" status="primary" (click)="ref.close()">
            {{ 'general.close' | translate }}
          </button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
    <!-- DeRegister Service modal ng-template -->
    <ng-template #confirmDeRegisterDialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header class="d-flex justify-content-between">
          <h5>{{ 'general.services.deregister_service' | translate }}</h5>
          <button nbButton ghost shape="rectangle" size="tiny" (click)="ref.close()">
            <i class="material-icons">close</i>
          </button>
        </nb-card-header>
        <nb-card-body
          class="p-5 text-center"
          [innerHTML]="'general.services.deregister_service_message' | translate: { serviceName: data.serviceName }"
        ></nb-card-body>
        <nb-card-footer class="d-flex justify-content-center">
          <button nbButton status="primary" size="small" (click)="ref.close(true)">
            {{ 'general.services.deregister' | translate }}
          </button>
          <button nbButton class="ml-2" ghost shape="rectangle" status="primary" (click)="ref.close()">
            {{ 'general.close' | translate }}
          </button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
    <!-- Delete Service modal ng-template -->
    <ng-template #confirmDeleteDialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header class="d-flex justify-content-between">
          <h5>{{ 'general.services.delete_service' | translate }}</h5>
          <button nbButton ghost shape="rectangle" size="tiny" (click)="ref.close()">
            <i class="material-icons">close</i>
          </button>
        </nb-card-header>
        <nb-card-body
          class="p-5 text-center"
          [innerHTML]="'general.services.delete_service_message' | translate: { serviceName: data.serviceName }"
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
})
export class ActionsConnectorMenuRenderComponent implements OnInit, OnDestroy {

  @Input() value: ConnectorEntry;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue: ConnectorEntry;
  @Output() outValue= new EventEmitter<unknown>();

  private unsubscribe: Subject<void> = new Subject();
  actions: NbMenuItem[];

  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;

  constructor(
    private availableConnectorsService: AvailableConnectorsService,
    private menuService: NbMenuService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private loginService: LoginService
  ) { }

  get registered(): boolean {
    return this.value.status == ConnectorStatusEnum.Active ? true : false;
  }

  ngOnInit(): void {
    console.log("ngoninit")
    this.actions = this.translatedActionLabels();
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.serviceId))
      .subscribe((event) => {
        console.log(event);
        console.log("pre-switch")
        switch (event.item.data) {
          case 'edit':
            this.onEdit();//this.value.serviceId
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
          case 'consents':
            this.viewConsents(this.value.id);
            break;
          case 'deregister':
            this.openDeRegisterDialog();
            break;
          case 'edit service':
            this.onEditService(this.value.serviceId);
            break;
          default:
            console.log("default");
            break;
        }
      });
  }

  async ngOnUpdate(): Promise<void>{
    console.log("ngOnUpdate")
    this.value = await this.availableConnectorsService.getConnector(this.value.serviceId);
    this.updateResult.emit(this.value);
      this.ngOnInit()
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translatedActionLabels(): NbMenuItem[] {
    if (this.registered) {
      return [
        {
          title: this.translate.instant('general.services.deregister') as string,
          data: 'deregister',
        },
        {
          title: this.translate.instant('general.services.consents') as string,
          data: 'consents',
        },
        {
          title: this.translate.instant('general.connectors.editService') as string,
          data: 'edit service',
        },
      ];
    } else {
      return [
        {
          title: this.translate.instant('general.connectors.edit') as string,
          data: 'edit',
        },
        {
          title: this.translate.instant('general.services.register') as string,
          data: 'register',
        },
        {
          title: this.translate.instant('general.services.delete') as string,
          data: 'delete',
        },
        {
          title: this.translate.instant('general.connectors.editService') as string,
          data: 'edit service',
        },
      ];
    }
  }

  async onEdit() {
    console.log("onedit called")
    DialogAddNewPromptComponent.edit = true;
    this.dialogService.open(DialogAddNewPromptComponent).onClose.subscribe((result: { content: unknown; format: string }) => {
      //if (result.content) {
        //this.editor.getEditor('root.createdByUserId').setValue(localStorage.getItem('accountId'));

        //if (result.format == 'Cpsv') {
          //this.editor.getEditor('root.hasInfo').setValue(result.content);
          //this.editor.getEditor('root.identifier').setValue(this.editor.getEditor('root.hasInfo.identifier').getValue());
          //this.editor.getEditor('root.title').setValue(this.editor.getEditor('root.hasInfo.title').getValue());
        //} //else this.editor.setValue(result.content);

        //this.value.serviceId = result.content['serviceId'] as string;
      //}
    }
    );
    //this.value = await this.availableConnectorsService.getConnector(this.value.serviceId);;
    //this.value= quello preso dalla form
    DialogAddNewPromptComponent.edit = false;
    this.updateResult.emit(this.value);
    console.log("onedit finished")
    this.ngOnUpdate()
    this.value=this.editedValue
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
          serviceName: this.value.name,
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) void this.onRegisterService();
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
        if (confirm) void this.onDeRegisterService();
      });
  }

  onRegisterService = async (): Promise<void> => {
    try {
      console.log("register")
      this.value.status = this.value.status == "active" ? "inactive" : "active";
      this.value = await this.availableConnectorsService.registerConnector(this.value);
      this.showToast('primary', this.translate.instant('general.services.service_registered_message', { serviceName: this.value.name }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.error.statusCode === '401') {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegisterService = async (): Promise<void> => {
    try {
      console.log("deregister")
      this.value.status = this.value.status == "active" ? "inactive" : "active";
      this.value = await this.availableConnectorsService.deregisterConnector(this.value);
      this.showToast('primary', this.translate.instant('general.services.service_deregistered_message', { serviceName: this.value.name }), '');
      this.updateResult.emit(this.value);//G: commentandolo smette di aggiornarsi il menu
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
        serviceName: this.value.name,
        callback: async () => {
          try {
            await this.availableConnectorsService.deleteConnector(this.value.serviceId);
            this.showToast(
              'primary',
              this.translateService.instant('general.services.service_deleted_message', { serviceName: this.value.name }),
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
