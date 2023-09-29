import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbDialogService, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { DMMService } from '../../data-model-mapper/dmm.service';
import { StatusComponent } from '../status/status.component';
import { TransformComponent } from '../transform/transform.component';
import { DMMComponent } from '../../data-model-mapper/dmm.component';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {

  @Input() value;
  @Output() updateResult = new EventEmitter<unknown>();
  @Input() editedValue;
  @Output() outValue = new EventEmitter<unknown>();
  name
  description
  status
  map
  dataModel
  id
  ref
  dialogRef
  service;
  services: any[]
  adapters: AdapterEntry[]
  adaptersTypeModel: AdapterEntry[] = []

  private unsubscribe: Subject<void> = new Subject();
  actions: NbMenuItem[];

  @ViewChild('confirmDeleteDialog', { static: false }) confirmDeleteDialogTemplate: TemplateRef<unknown>;
  @ViewChild('confirmRegisterDialog', { static: false }) confirmRegisterDialog: TemplateRef<unknown>;
  @ViewChild('confirmDeRegisterDialog', { static: false }) confirmDeRegisterDialog: TemplateRef<unknown>;
  @ViewChild('edit', { static: false }) editDialog: TemplateRef<unknown>;
  @ViewChild('infoModal', { static: true }) recordInfoModalRef: TemplateRef<unknown>;

  constructor(
    private errorService: ErrorDialogService,
    private dmmService: DMMService,
    private menuService: NbMenuService,
    private modalService: NbDialogService,
    private router: Router,
    private translate: TranslateService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private translateService: TranslateService,
  ) { }

  get registered(): boolean {
    return this.value.status == StatusComponent.Enum.COMPLETED ? true : false;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.name = this.value.name
      this.description = this.value.description
      this.id = this.value.id
      this.map = this.value.map
      this.dataModel = this.value.dataModel
      this.status = this.value.status
      if (this.ref) this.ref.close()
      this.actions = this.translatedActionLabels();
      this.menuService
        .onItemClick()
        .pipe(takeUntil(this.unsubscribe))
        .pipe(filter(({ tag }) => tag == 'service-context-menu' + this.value.id))
        .subscribe((event) => {
          switch (event.item.data) {
            case 'edit':
              this.router.navigate(['/pages/dmm-editor', { inputID: this.value.id }])
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
            case 'view record':
              this.router.navigate(['/pages/dmm-editor', { inputID: this.value.id, readOnly: true }])
              break;
            case 'transform':
              this.dialogService
                .open(TransformComponent, {
                  context: { inputID: this.value.id, dialog : true },
                })
            default:
              console.log("default")
              break;
          }
        });
    }
    catch (error) {
      console.error(error)
    }

  }

  showRecordInfoModal(): void {
    if (this.value) {
      this.dialogRef = this.modalService.open(this.recordInfoModalRef, {
        context: {
          modalHeader: this.value.name,
          description: this.value.description,
          id: this.value.id,
          map: this.value.map,
          dataModel: this.value.dataModel,
          status: this.value.status
        },
        hasScroll: true,
      });
    }
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
    if (this.registered)
      return [
        {
          title: this.translate.instant('general.dmm.transform') as string,
          data: 'transform',
        },
        {
          title: this.translate.instant('general.dmm.deregister') as string,
          data: 'deregister',
        }
      ]
    return [
      {
        title: this.translate.instant('general.dmm.edit') as string,
        data: 'edit',
      },
      {
        title: this.translate.instant('general.dmm.register') as string,
        data: 'register',
      },
      {
        title: this.translate.instant('general.dmm.delete') as string,
        data: 'delete',
      }
    ];
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
        if (confirm) void this.onRegister();
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
        if (confirm) void this.onDeRegister();
      });
  }

  onRegister = async (): Promise<void> => {
    try {
      this.value.status = this.value.status == "Completed" ? "Under development" : "Completed";
      this.value = await this.dmmService.updateMap({ status: this.value.status, description: this.description, name: this.name, adapterId: this.value.id }, this.value.status, this.description, this.value.map, this.value.dataModel, this.value.sourceDataType, this.value.config, this.value.sourceDataURL, this.value.dataModelURL, this.value.dataModelID, this.value.sourceData, this.value.sourceDataID, this.value.path)
      this.showToast('primary', this.translate.instant('general.dmm.record_registered_message', { recordName: this.value.name }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      this.errorDialogService.openErrorDialog(error);
    }
  };

  onDeRegister = async (): Promise<void> => {
    try {
      this.value.status = this.value.status == "Completed" ? "Under development" : "Completed";
      this.value = await this.dmmService.updateMap({ status: this.value.status, description: this.description, name: this.name, adapterId: this.value.id }, this.value.status, this.description, this.value.map, this.value.dataModel, this.value.sourceDataType, this.value.config, this.value.sourceDataURL, this.value.dataModelURL, this.value.dataModelID, this.value.sourceData, this.value.sourceDataID, this.value.path)
      this.showToast('primary', this.translate.instant('general.dmm.record_deregistered_message', { recordName: this.value.name }), '');
      this.updateResult.emit(this.value);
    } catch (error) {
      this.errorDialogService.openErrorDialog(error);
    }
  };

  openDeleteFromRegistryDialog(): void {
    const ref = this.dialogService.open(this.confirmDeleteDialogTemplate, {
      context: {
        serviceName: this.value.name,
        callback: async () => {
          try {
            await this.dmmService.deleteMap(this.value.id);
            this.showToast(
              'primary',
              this.translateService.instant('general.dmm.record_deleted_message', { recordName: this.value.name }),
              ''
            );
            ref.close();
            this.updateResult.emit(this.value.id);
          } catch (error) {
            this.errorDialogService.openErrorDialog(error);
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
