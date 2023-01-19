import { Description } from './../../../model/services/description';
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
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { AvailableConnectorsService } from './availableConnectors.service';
import { DialogAddNewPromptComponent } from './addConnector/dialog-add-new-prompt.component';

import { LoginService } from '../../../auth/login/login.service';
import { ConnectorStatusEnum } from '../../../model/services/connector';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';
@Component({
  selector: 'actionsConnectorMenuRender',
  templateUrl:'actionsConnectorMenuRender.component.html', //``,
  styleUrls: ['actionsConnectorMenuRender.component.scss'],
})
export class ActionsConnectorMenuRenderComponent implements OnInit, OnDestroy, OnChanges {

  @Input() value: ConnectorEntry;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue: ConnectorEntry;
  @Output() outValue = new EventEmitter<unknown>();
  name
  description
  status
  serviceId
  url
  ref

  private unsubscribe: Subject<void> = new Subject();
  actions: NbMenuItem[];

  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  @ViewChild('addOrEditConnector', { static: false }) addOrEditConnector: TemplateRef<unknown>;

  constructor(
    private availableConnectorsService: AvailableConnectorsService,
    private menuService: NbMenuService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private availableConnectorService: AvailableConnectorsService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateResult.emit(this.value.id);
  }

  get registered(): boolean {
    return this.value.status == ConnectorStatusEnum.Active ? true : false;
  }

  ngOnChange() {
    this.updateResult.emit(this.value.id);
  }

  ngOnInit(): void {
    this.actions = this.translatedActionLabels();
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.unsubscribe))
      .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.connectorId))
      .subscribe((event) => {
        switch (event.item.data) {
          case 'edit':
            //this.onEdit();
            this.openAddEditConnector();
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
          case 'edit service':
            this.onEditService(this.value.serviceId);
            break;
        }
      });
  }

  async ngOnUpdate(): Promise<void> {
    console.log("actionConnectorMenuRender.component.ts.ngOnUpdate()")
    this.value = await this.availableConnectorsService.getConnector(this.value.connectorId);
    this.updateResult.emit(this.value);
    this.ngOnInit()
  }

  cancel(): void {
    console.log(this.ref.Subscriber.closed=true)
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translatedActionLabels(): NbMenuItem[] {
    if (this.registered) {
      return [
        {
          title: this.translate.instant('general.connectors.deregister') as string,
          data: 'deregister',
        },
        {
          title: this.translate.instant('general.connectors.editService') as string,
          data: 'edit service',
        },
      ];
    }
    if (this.value.serviceId) {
      return [
        {
          title: this.translate.instant('general.connectors.edit') as string,
          data: 'edit',
        },
        {
          title: this.translate.instant('general.connectors.register') as string,
          data: 'register',
        },
        {
          title: this.translate.instant('general.connectors.delete') as string,
          data: 'delete',
        },
        {
          title: this.translate.instant('general.services.view_service') as string,
          data: 'view service',
        },
      ];
    }
    return [
      {
        title: this.translate.instant('general.connectors.edit') as string,
        data: 'edit',
      },
      {
        title: this.translate.instant('general.connectors.register') as string,
        data: 'register',
      },
      {
        title: this.translate.instant('general.connectors.delete') as string,
        data: 'delete',
      }
    ];
  }

  async onEdit() {
    DialogAddNewPromptComponent.formType = 'edit';
    this.dialogService.open(DialogAddNewPromptComponent).onClose.subscribe((confirm) => {
      if (confirm) void this.updateResult.emit(this.value.id);
    });
    this.updateResult.emit(this.value.id);
    this.ngOnInit()
  }

  onEditService(serviceId: string): void {
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
        if (confirm) void this.onRegisterConnector();
      });
  }

  onEditV2(){
    let name = this.name, description = this.description, status = this.value.status, connectorId = this.value.connectorId, serviceId = this.serviceId, url = this.url;
    this.availableConnectorService.updateConnector((({ name, description, status, connectorId, serviceId, url } as unknown)) as ConnectorEntry, connectorId);//as unknown)) as ConnectorEntry were VisualStudioCode tips
    //this.ref.close({ content: this.json, format: this.selectedItem });
    //this.editedValue.emit(this.value);
    this.updateResult.emit(this.value.id);
  }
  openAddEditConnector(): void {
    this.ref=this.dialogService
      .open(this.addOrEditConnector, {
        hasScroll: false,
        context: {
          serviceName: this.value.name,
        },
      })
      .onClose.subscribe()//(confirm) => {if (true) void this.onEditV2();});
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
        if (confirm) void this.onDeRegisterConnector();
      });
  }

  onRegisterConnector = async (): Promise<void> => {
    try {
      console.log("register")
      this.value.status = this.value.status == "active" ? "inactive" : "active";
      this.value = await this.availableConnectorsService.registerConnector(this.value);
      this.showToast('primary', this.translate.instant('general.connectors.connector_registered_message', { connectorName: this.value.name }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.error.statusCode === '401') {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegisterConnector = async (): Promise<void> => {
    try {
      this.value.status = this.value.status == "active" ? "inactive" : "active";
      this.value = await this.availableConnectorsService.deregisterConnector(this.value);
      this.showToast('primary', this.translate.instant('general.connectors.connector_deregistered_message', { connectorName: this.value.name }), '');
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
        serviceName: this.value.name,
        callback: async () => {
          try {
            await this.availableConnectorsService.deleteConnector(this.value.connectorId);
            this.showToast(
              'primary',
              this.translateService.instant('general.connectors.connector_deleted_message', { connectorName: this.value.name }),
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
