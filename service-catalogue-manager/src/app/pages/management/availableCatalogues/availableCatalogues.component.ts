/* eslint-disable @typescript-eslint/no-unsafe-call */
import { LocalDataSource } from 'ng2-smart-table';
import { AvailableCataloguesService } from './availableCatalogues.service';
//import { CatalogueInfoRenderComponent } from './catalogue-info-render/catalogue-info-render.component';//TODO
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig, System } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { ActionsCatalogueMenuRenderComponent } from './actions-catalogue-menu-render/actions-catalogue-menu-render.component';//TODO
import { CatalogueEntry } from '../../../model/catalogue/catalogueEntry';//TODO
//import { AddCatalogueComponent } from './add-catalogue/add-catalogue.component';//TODO
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { ConnectorStatusRenderComponent } from '../../services/availableConnectors/custom-status-render.component';
import { LoginService } from '../../../auth/login/login.service';

@Component({
  selector: 'available-catalogues-smart-table',
  templateUrl: './availableCatalogues.component.html',
  styleUrls: ['./availableCatalogues.component.scss'],
})

export class AvailableCataloguesComponent implements OnInit, OnDestroy {
  @Input() value: CatalogueEntry;
  @Output() updateResult = new EventEmitter<unknown>();

  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemConfig: System;
  private systemLocale: string;
  private config: AppConfig;
  public serviceId: string;
  public catalogueId: string;
  public serviceName: string;
  public readOnly = false;
  private nameLabel: string;
  private countryLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;
  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private availableCatalogues: CatalogueEntry[];
  private unsubscribe: Subject<void> = new Subject();
  errorService: ErrorDialogService;

  constructor(
    private loginService: LoginService,
    private availableCataloguesService: AvailableCataloguesService,
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
      this.availableCatalogues = await this.availableCataloguesService.getCatalogues();
      void this.source.load(this.availableCatalogues);
    } catch (error) {
      console.log("error:<\n", error, ">\n")
      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      }
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      //TODO
      /*
      this.dialogService.open(AddCatalogueComponent).onClose.subscribe(() => {
        void console.log("confirm ok", this.ngOnInit());
      });*/
      this.updateResult.emit(this.value);
      this.ngOnInit()
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")
      //if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")

      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      }
      this.errorService.openErrorDialog(error);
    }
  }

  loadTableSettings(): Record<string, unknown> {
    this.nameLabel = this.translate.instant('general.catalogues.name') as string;
    this.countryLabel = this.translate.instant('general.catalogues.country') as string;
    this.actionsLabel = this.translate.instant('general.catalogues.actions') as string;
    this.detailsLabel = this.translate.instant('general.catalogues.details') as string;
    this.statusLabel = this.translate.instant('general.catalogues.status') as string;

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
          title: this.nameLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row.name,
        },
        description: {
          title: this.countryLabel,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row.description,
        },
        details: {
          title: this.detailsLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row,
          //renderComponent: CatalogueInfoRenderComponent,//TODO
        },
        status: {
          title: this.statusLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row.status,
          renderComponent: ConnectorStatusRenderComponent,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: CatalogueEntry) => row,
          //renderComponent: ActionsCatalogueMenuRenderComponent,//TODO
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
