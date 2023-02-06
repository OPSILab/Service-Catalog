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

import { LoginService } from '../../../auth/login/login.service';
import { ConnectorStatusEnum } from '../../../model/services/connector';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';
import { AvailableServiceRow } from '../availableServices/availableServices.component';
import { AvailableServicesService } from '../availableServices/availableServices.service';
import { ErrorDialogConnectorService } from '../../error-dialog/error-dialog-connector.service';
import { ServiceModel } from '../../../model/services/serviceModel';
@Component({
  selector: 'actionsConnectorMenuRender',
  templateUrl: 'actionsConnectorMenuRender.component.html', //``,
  styleUrls: ['actionsConnectorMenuRender.component.scss'],
})
export class ActionsConnectorMenuRenderComponent implements OnInit, OnDestroy {

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
  dialogRef
  service: AvailableServiceRow;
  services: ServiceModel[]

  private unsubscribe: Subject<void> = new Subject();
  actions: NbMenuItem[];

  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  @ViewChild('editConnector', { static: false }) editConnector: TemplateRef<unknown>;
  @ViewChild('availableServiceInfoModal', { static: true }) serviceInfoModalRef: TemplateRef<unknown>;

  constructor(
    private errorService: ErrorDialogConnectorService,
    private availableConnectorsService: AvailableConnectorsService,
    private availableServicesService: AvailableServicesService,
    private menuService: NbMenuService,
    private modalService: NbDialogService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private availableConnectorService: AvailableConnectorsService,
  ) { }

  get registered(): boolean {
    return this.value.status == ConnectorStatusEnum.Active ? true : false;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.name = this.value.name
      this.description = this.value.description
      this.url = this.value.url
      this.serviceId = this.value.serviceId
      if (this.ref) this.ref.close()
      this.actions = this.translatedActionLabels();
      this.menuService
        .onItemClick()
        .pipe(takeUntil(this.unsubscribe))
        .pipe(filter(({ tag }) => tag === 'service-context-menu' + this.value.connectorId))
        .subscribe((event) => {
          switch (event.item.data) {
            case 'edit':
              this.openEditConnector();
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
            case 'view service':
              //this.showServiceInfoModal();
              this.router.navigate(['/pages/services/service-editor', { serviceId: this.value.serviceId, readOnly: true }]);
              break;
          }
        });
    }
    catch (error) {
      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error));
      }
    }

  }

  showServiceInfoModal(): void {
    if (this.service) {
      this.dialogRef = this.modalService.open(this.serviceInfoModalRef, {
        context: {
          modalHeader: this.service.title,
          description: this.service.hasInfo.description.description,
          sector: this.service.hasInfo.sector,
          event: this.service.hasInfo.isGroupedBy,
          thematicArea: this.service.hasInfo.thematicArea,
          serviceId: this.service.identifier,
          serviceUri: this.service.identifier,
          publicService: this.service.isPublicService,
          iconUrl: this.service.serviceIconUrl !== '' ? this.service.serviceIconUrl : 'favicon.png',
          provider: this.service.hasServiceInstance.serviceProvider.name,
          processings: this.service.isPersonalDataHandling,
          channel: this.service.hasInfo.hasChannel,
          language: this.service.hasInfo.language,
          location: this.service.hasInfo.spatial,
          locale: this.service.locale,
          competentAuthority: this.service.hasInfo.hasCompetentAuthority,
        },
        hasScroll: true,
      });
    }
    else this.errorDialogService.openErrorDialog({
      error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
        {
          "path": "root.serviceId",
          "property": "minLength",
          "message": "No service with id < " + this.value.serviceId + " > does exists",
          "errorcount": 1
        }
      ]
    });
  }

  cancel(): void {
    if (this.ref) this.ref.close()
    this.ref.Subscriber.closed = true
  }

  ngOnDestroy(): void {
    if (this.ref) this.ref.closed = true
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translatedActionLabels(): NbMenuItem[] {
    if (this.ref) this.ref.closed = true
    if (this.registered) {
      if (this.value.serviceId) {
        return [
          {
            title: this.translate.instant('general.connectors.deregister') as string,
            data: 'deregister',
          },
          {
            title: this.translate.instant('general.services.view_service') as string,
            data: 'view service',
          },
        ];
      }
      else
        return [
          {
            title: this.translate.instant('general.connectors.deregister') as string,
            data: 'deregister',
          }
        ]
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
    try {
      let name = this.name, description = this.description, status = this.value.status, connectorId = this.value.connectorId, serviceId = this.serviceId, url = this.url;
      await this.availableConnectorService.updateConnector((({ name, description, status, connectorId, serviceId, url } as unknown)) as ConnectorEntry, connectorId);//as unknown)) as ConnectorEntry were VisualStudioCode tips
      this.updateResult.emit(this.value);
      this.showToast('primary', this.translate.instant('general.connectors.connector_edited_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.value.connectorId) errors.push({
        "path": "root.connectorId",
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

      console.log("error:", "\n", error)
      if (error.message == "Connector ID must be set") {
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.connectorId",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });
      }
      else if (error.status && error.status == 400) {
        if (error.error.status == "Connector already exists")
          this.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.connectorId",
                "property": "minLength",
                "message": "A connector with connector ID < " + this.value.connectorId + " > already exists",
                "errorcount": 1
              }
            ]
          });
        else this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }
    }
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

  async openEditConnector(): Promise<void> {
    this.services = await this.availableServicesService.getServices();
    this.ref = this.dialogService
      .open(this.editConnector, {
        hasScroll: false,
        context: {
          serviceName: this.value.name,
        },
      })
      .onClose.subscribe()
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
      this.value.status = this.value.status == "active" ? "inactive" : "active";
      this.value = await this.availableConnectorsService.registerConnector(this.value);
      this.showToast('primary', this.translate.instant('general.connectors.connector_registered_message', { connectorName: this.value.name }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
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
      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
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
            if (error.statusCode === '401'||error.status==401)  {
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
