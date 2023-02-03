/* eslint-disable @typescript-eslint/no-unsafe-call */
import { LocalDataSource } from 'ng2-smart-table';
import { AvailableAdaptersService } from './available-adapters.service';
import { AdapterInfoRenderComponent } from './adapter-info-render/adapter-info-render.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig, System } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActionsAdapterMenuRenderComponent } from './actions-adapter-menu-render/actions-adapter-menu-render.component';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
import { AddAdapterComponent } from './add-adapter/add-adapter.component';
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { ConnectorStatusRenderComponent } from '../availableConnectors/custom-status-render.component';

@Component({
  selector: 'available-adapters-smart-table',
  templateUrl: './available-adapters.component.html',
  styleUrls: ['./available-adapters.component.scss'],
})

export class AvailableAdaptersComponent implements OnInit, OnDestroy {
  @Input() value: AdapterEntry;
  @Output() updateResult = new EventEmitter<unknown>();

  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemConfig: System;
  private systemLocale: string;
  private config: AppConfig;
  public serviceId: string;
  public adapterId: string;
  public serviceName: string;
  public readOnly = false;
  private adapterLabel: string;
  private descriptionLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;
  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private availableAdapters: AdapterEntry[];
  private unsubscribe: Subject<void> = new Subject();
  errorService: ErrorDialogService;

  constructor(
    private availableAdaptersService: AvailableAdaptersService,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private dialogService: NbDialogService
  ) {
    this.config = this.configService.config as AppConfig;
    this.systemConfig = this.config.system;
    this.systemLocale = this.config.i18n.locale;
    this.settings = this.loadTableSettings();
    this.locale = (this.configService.config as AppConfig).i18n.locale; // TODO change with user language preferences
    this.schemaDir =
      (this.systemConfig.serviceEditorUrl.includes('localhost') ? '' : this.systemConfig.serviceEditorUrl) +
      this.systemConfig.editorSchemaPath +
      '/' +
      this.systemLocale +
      '/' +
      this.systemConfig.editorSchemaName;
    this.loading = true;
  }

  async ngOnInit() {
    try {
      this.availableAdapters = await this.availableAdaptersService.getAdapters();
      void this.source.load(this.availableAdapters);
    } catch (error) {
      console.log("error:<\n", error, ">\n")
      if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      else if (error.message) console.log("message:<\n", error.message, ">\n")
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      this.dialogService.open(AddAdapterComponent).onClose.subscribe(() => {
        void console.log("confirm ok", this.ngOnInit());
      });
      this.updateResult.emit(this.value);
      this.ngOnInit()
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")
      if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      else if (error.message) console.log("message:<\n", error.message, ">\n")
      this.errorService.openErrorDialog(error);
    }
  }

  loadTableSettings(): Record<string, unknown> {
    this.adapterLabel = this.translate.instant('general.adapters.adapter') as string;
    this.descriptionLabel = this.translate.instant('general.adapters.description') as string;
    this.actionsLabel = this.translate.instant('general.adapters.actions') as string;
    this.detailsLabel = this.translate.instant('general.adapters.details') as string;
    this.statusLabel = this.translate.instant('general.adapters.status') as string;

    return {
      mode: 'external',
      attr: {
        class: 'table table-bordered',
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        editService: false
      },

      columns: {
        id: {
          title: this.adapterLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: AdapterEntry) => row.name,
        },
        description: {
          title: this.descriptionLabel,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row: AdapterEntry) => row.description,
        },
        details: {
          title: this.detailsLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: AdapterEntry) => row,
          renderComponent: AdapterInfoRenderComponent,
        },
        status: {
          title: this.statusLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: AdapterEntry) => row.status,
          renderComponent: ConnectorStatusRenderComponent,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: AdapterEntry) => row,
          renderComponent: ActionsAdapterMenuRenderComponent,
          onComponentInitFunction: (instance) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            instance.updateResult.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.ngOnInit());
          },
        },
      },
    };
  }

  resetfilters(): void {
    this.source.reset();
  }
}
