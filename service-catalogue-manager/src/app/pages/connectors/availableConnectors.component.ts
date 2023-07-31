import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { TranslateService } from "@ngx-translate/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgxConfigureService } from "ngx-configure";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LoginService } from "../../auth/login/login.service";
import { System, AppConfig } from "../../model/appConfig";
import { ConnectorEntry } from "../../model/connector/connectorEntry";
import { ErrorDialogService } from "../error-dialog/error-dialog.service";
import { ActionsConnectorMenuRenderComponent } from "./actionsConnectorMenuRender.component";
import { DialogAddNewPromptComponent } from "./addConnector/dialog-add-new-prompt.component";
import { AvailableConnectorsService } from "./availableConnectors.service";
import { ConnectorInfoRenderComponent } from "./connectorInfoRender.component";
import { ConnectorStatusRenderComponent } from "./custom-status-render.component";


@Component({
  selector: 'available-connectors-smart-table',
  templateUrl: './availableConnectors.component.html',
  styleUrls: ['./availableConnectors.component.scss'],
})

export class AvailableConnectorsComponent implements OnInit, OnDestroy {
  @Input() value: ConnectorEntry;
  @Output() updateResult = new EventEmitter<unknown>();
  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemConfig: System;
  private systemLocale: string;
  private config: AppConfig;
  public serviceId: string;
  public connectorId: string;
  public serviceName: string;
  public readOnly = false;
  private connectorLabel: string;
  private descriptionLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;
  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private availableConnectors: ConnectorEntry[];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private errorService: ErrorDialogService,
    private loginService: LoginService,
    private availableConnectorsService: AvailableConnectorsService,
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
      this.availableConnectors = await this.availableConnectorsService.getConnectors();
      void this.source.load(this.availableConnectors);
    } catch (error) {
      console.error("error:<\n", error, ">\n")

      if (error.statusCode === '401' || error.status == 401)
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error))
      this.errorService.openErrorDialog(error);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      this.dialogService.open(DialogAddNewPromptComponent).onClose.subscribe(() => {
        void console.log("confirm ok", this.ngOnInit());
      });
      this.updateResult.emit(this.value);
      //this.ngOnInit()
    }
    catch (error) {
      console.error("error in addNew")
      console.error("error:<\n", error, ">\n")
      if (error.statusCode === '401' || error.status == 401) {
        void this.loginService.logout().catch((error) => this.errorService.openErrorDialog(error));
      }
      this.errorService.openErrorDialog(error);
    }
  }

  loadTableSettings(): Record<string, unknown> {
    this.connectorLabel = this.translate.instant('general.connectors.connector') as string;
    this.descriptionLabel = this.translate.instant('general.connectors.description') as string;
    this.actionsLabel = this.translate.instant('general.connectors.actions') as string;
    this.detailsLabel = this.translate.instant('general.connectors.details') as string;
    this.statusLabel = this.translate.instant('general.connectors.status') as string;

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
        name: {
          title: this.connectorLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.name,
        },
        description: {
          title: this.descriptionLabel,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.description,
        },
        details: {
          title: this.detailsLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row,
          renderComponent: ConnectorInfoRenderComponent,
        },/*
        status: {
          title: this.statusLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'text',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.status,
        },*/
        status: {
          title: this.statusLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.status,
          renderComponent: ConnectorStatusRenderComponent,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row,
          renderComponent: ActionsConnectorMenuRenderComponent,
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
