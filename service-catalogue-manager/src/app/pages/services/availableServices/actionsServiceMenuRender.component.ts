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
import { AvailableServicesService } from './availableServices.service';
import { AvailableServiceRow } from './availableServices.component';
import { LoginService } from '../../../auth/login/login.service';
import { ServiceModelStatusEnum } from '../../../model/services/serviceModel';
import { DialogExportPromptComponent } from '../service-editor/dialog-export-prompt/dialog-export-prompt.component';
import * as transformJSON from 'json-to-json-transformer/lib/transformJSON.js';
import { ThisReceiver } from '@angular/compiler';
@Component({
  template: `
    <button nbButton outline status="basic" [nbContextMenu]="actions" nbContextMenuTag="service-context-menu{{ value.identifier }}">
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
    <!-- Export Service modal ng-template -->
    <ng-template #confirmExportDialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header class="d-flex justify-content-between">
          <h5>{{ 'general.services.export' | translate }}</h5>
          <button nbButton ghost shape="rectangle" size="tiny" (click)="ref.close()">
            <i class="material-icons">close</i>
          </button>
        </nb-card-header>
        <nb-card-body
          class="p-5 text-center"
          [innerHTML]="'general.services.export_service_message' | translate: { serviceName: data.serviceName }"
        ></nb-card-body>
        <nb-card-footer class="d-flex justify-content-center">
          <button nbButton status="danger" size="small" (click)="data.callback()">
            {{ 'general.editor.export' | translate }}
          </button>
          <button nbButton class="ml-2" ghost shape="rectangle" status="primary" (click)="ref.close()">
            {{ 'general.cancel' | translate }}
          </button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
  `,
})
export class ActionsServiceMenuRenderComponent implements OnInit, OnDestroy {
  @Input() value: AvailableServiceRow | any;
  @Output() updateResult = new EventEmitter<unknown>();

  private unsubscribe: Subject<void> = new Subject();
  actions: NbMenuItem[];

  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  // @ViewChild('confirmExportDialog', { static: false }) confirmExportDialog: TemplateRef<unknown>;

  constructor(
    private availableServicesService: AvailableServicesService,
    private menuService: NbMenuService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private loginService: LoginService
  ) {}

  get registered(): boolean {
    return this.value.status == ServiceModelStatusEnum.Completed ? true : false;
  }

  ngOnInit(): void {
    this.actions = this.translatedActionLabels();
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.identifier))
      .subscribe((event) => {
        switch (event.item.data) {
          case 'edit':
            this.onEdit(this.value.identifier);
            break;
          case 'delete':
            this.openDeleteFromRegistryDialog();
            break;
          case 'register':
            this.openRegisterDialog();
            break;
          case 'consents':
            this.viewConsents(this.value.identifier);
            break;
          case 'deregister':
            this.openDeRegisterDialog();
            break;
          case 'export':
            this.saveAsFile();
            break;
        }
      });
  }

  saveAsFile(): void {
    this.dialogService
      .open(DialogExportPromptComponent)
      .onClose.subscribe((result) => result && this.saveFile(result.name, result.exportFormat, this.value.identifier));
  }

  async saveFile(name: string, exportFormat: string, serviceId: string): Promise<void> {
    this.errorDialogService;
    let model: Record<string, unknown>;

    try {
      switch (exportFormat) {
        case 'cpsv':
          model = await this.availableServicesService.getCpsvService(serviceId);
          break;
        case 'sdg':
          break;

        case 'json-ld':
          model = await this.availableServicesService.getJsonldService(serviceId);
          break;

        default:
          model = (this.value as unknown) as Record<string, unknown>;
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.errorDialogService.openErrorDialog(error);
    }
    const filename = `${name}.json`,
      blob = new Blob([JSON.stringify(model, null, 2)], {
        type: 'application/json;charset=utf-8',
      });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      a.download = filename;
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');

      a.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false,
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translatedActionLabels(): NbMenuItem[] {
    if (this.value.remote) {
      return [
        {
          title: this.translate.instant('general.editor.export') as string,
          data: 'export',
        }
      ];
    }
    else if (this.registered) {
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
          title: this.translate.instant('general.editor.export') as string,
          data: 'export',
        },
        {
          title: this.translate.instant('general.editor.publish') as string,
          data: 'publish',
        },
        {
          title: this.translate.instant('general.connectors.connector') as string,
          data: 'connectors',
        },
      ];
    } else {
      return [
        {
          title: this.translate.instant('general.services.edit') as string,
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
          title: this.translate.instant('general.editor.export') as string,
          data: 'export',
        },
        {
          title: this.translate.instant('general.services.publish') as string,
          data: 'publish',
        },
        {
          title: this.translate.instant('general.services.connector') as string,
          data: 'connectors',
        },
      ];
    }
  }

  onEdit(serviceId: string): void {
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
          serviceName: this.value.title,
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
          serviceName: this.value.title,
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) void this.onDeRegisterService();
      });
  }

  onRegisterService = async (): Promise<void> => {

    try {
     //JSON TO JSON TRANSFORMATION
     // var newObj = transformJSON.transform(this.value, /*to add modelmapping*/ this.value);
     //console.log(newObj);
     //TO-DO service registry invocation
     // this.value = (await this.availableServicesService.registerService(this.value.identifier)) as AvailableServiceRow;
     this.value.status=ServiceModelStatusEnum.Completed;
     await this.availableServicesService.registerService(this.value, this.value.identifier);
     this.showToast('primary', this.translate.instant('general.services.service_registered_message', { serviceName: this.value.title }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegisterService = async (): Promise<void> => {
    try {
      this.value.status=ServiceModelStatusEnum.UnderDevelopment;
      await this.availableServicesService.deregisterService(this.value, this.value.identifier);

      this.showToast('primary', this.translate.instant('general.services.service_deregistered_message', { serviceName: this.value.title }), '');
      //this.value.hasServiceInstance.connector.publicKey = null;//G: property publickey does not exists on type connector anymore
      this.updateResult.emit(this.value);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  openDeleteFromRegistryDialog(): void {
    const ref = this.dialogService.open(this.confirmDeleteDialogTemplate, {
      context: {
        serviceName: this.value.title,
        callback: async () => {
          try {
            await this.availableServicesService.deleteService(this.value.identifier);
            this.showToast(
              'primary',
              this.translateService.instant('general.services.service_deleted_message', { serviceName: this.value.title }),
              ''
            );
            ref.close();
            this.updateResult.emit(this.value.identifier);
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error.statusCode === '401'||error.status==401)  {
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
