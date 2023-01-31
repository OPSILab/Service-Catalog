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
import { AdapterStatusEnum } from '../../../../model/services/adapter';
import { AdapterEntry } from '../../../../model/adapter/adapterEntry';

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
  name
  description
  status
  type
  url
  ref
  dialogRef

  private unsubscribe: Subject<void> = new Subject();
  actions: NbMenuItem[];

  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  @ViewChild('editAdapter', { static: false }) editAdapter: TemplateRef<unknown>;
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

  get registered(): boolean {
    return this.value.status == AdapterStatusEnum.Active ? true : false;
  }

  ngOnInit(): void {
    this.name=this.value.name
    this.description=this.value.description
    this.url=this.value.url
    this.type=this.value.type
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
      let name = this.name, description = this.description, status = this.value.status, adapterId = this.value.adapterId, url = this.url, type = this.type;
      await this.availableAdaptersService.updateAdapter((({ name, description, status, adapterId, type, url } as unknown)) as AdapterEntry, adapterId);//as unknown)) as AdapterEntry were VisualStudioCode tips
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

      console.log("error:", "\n", error)
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
          //console.log("error:<\n", error, ">\n")
          this.errorDialogService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
          });
          if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
          else if (error.message) console.log("message:<\n", error.message, ">\n")
          else if (error.error) console.log("error.error:<\n", error.error, ">\n")
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
      if (error.error.statusCode === '401') {
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
      if (error.error.statusCode === '401') {
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
            if (error.error.statusCode === '401') {
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

