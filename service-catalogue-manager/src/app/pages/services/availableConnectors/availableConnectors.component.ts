/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AvailableConnectorsService } from './availableConnectors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectorInfoRenderComponent } from './connectorInfoRender.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { AppConfig, System } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '../../../auth/login/login.service';
import { ActionsConnectorMenuRenderComponent } from './actionsConnectorMenuRender.component';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';

import { DialogAddNewPromptComponent } from './dialog-import-prompt/dialog-import-prompt.component';
import { NbDialogService } from '@nebular/theme';
import { JSONEditor } from '@json-editor/json-editor/dist/jsoneditor.js';
import * as $ from 'jquery';
import { ServiceModel } from '../../../model/services/serviceModel';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { AvailableServicesService } from '../availableServices/availableServices.service';

import { Connector } from '../../../model/services/connector';

@Component({
  selector: 'available-connectors-smart-table',
  templateUrl: './availableConnectors.component.html',
  styleUrls: ['./availableConnectors.component.scss'],
})
export class AvailableConnectorsComponent implements OnInit, OnDestroy {
  //private editor: any;
  private serviceData: ServiceModel;
  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemConfig: System;
  private systemLocale: string;
  private config: AppConfig;
  public serviceId: string;
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
    @Inject(DOCUMENT) private document: Document,

    private availablesServicesService: AvailableServicesService,
    private availableConnectorsService: AvailableConnectorsService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private loginService: LoginService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService,

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

  async ngOnInit(): Promise<void> {
    //this.serviceId = this.route.snapshot.params['serviceId'] as string;
    //this.initializeEditor(this.serviceData);
    //this.readOnly = <boolean>this.route.snapshot.params['readOnly'];

    //this.serviceData = await this.availablesServicesService.getService(this.serviceId);
    //per servicedata sono arrivato alla corrispondenza della riga 86
    /*
    if (this.serviceId) {
      this.serviceData = await this.availablesServicesService.getService(this.serviceId);
      this.serviceName= this.serviceData.title
    } else {
      this.isNew = true;
    }
    */

    try {
      this.availableConnectors = await this.availableConnectorsService.getConnectors();
      void this.source.load(this.availableConnectors);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.error.statusCode === '401') {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else
        this.errorDialogService.openErrorDialog(error);
      console.log(error)
    }

    // Open a Toastr if there is a message in input query
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.toastrMessage)
      this.toastrService.primary('', queryParams.toastrMessage, {
        position: NbGlobalLogicalPosition.BOTTOM_END,
        duration: 3500,
      });

    //this.initializeEditor(this.serviceData);

  }
  /*
    initializeEditor(serviceData: ServiceModel): void {
      const elem = this.document.getElementById('editor');

      const editor = new JSONEditor(elem, {
        ajax: true,
        schema: { $ref: this.schemaDir },
        startval: serviceData,
        theme: 'bootstrap4',
        iconlib: 'fontawesome5',
        no_additional_properties: true,
        disable_properties: true,
        prompt_before_delete: true,
        required_by_default: true
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      //this.editor = editor;
      let isFirstChange = true;
      // Hook up the validation indicator to update its status whenever the editor changes
      editor.on('change', function () {
        if (!isFirstChange) sessionStorage.setItem('isTouched', 'true');
        else isFirstChange = false;
        // Get an array of errors from the validator
        // const errors = editor.validate();
        // const indicator = document.getElementById('valid_indicator');
        // watcher on concepts fields
        const watcherCallback = function (path) {
          const value = JSON.stringify(this.getEditor(path).getValue() as Record<string, unknown>);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log(`field with path: [${path as string}] changed to [${JSON.stringify(this.getEditor(path).getValue())}]`);

          if (value !== '"undefined"' && value !== '""') {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            const e = $('select[name="' + this.getEditor(path).formname + '"]');
            const nameValue = e[0].options[e[0].selectedIndex].text;
            //console.log(path.substr(0, path.lastIndexOf(".") + 1) + ".name");
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.getEditor(path.substr(0, path.lastIndexOf('.') + 1) + 'name').setValue(nameValue);
          }
        };

        const rootHasInfoWhatcher = function (path) {
          const value = this.getEditor(path).getValue() as string;

          if ((path as string) === 'root.identifier') this.getEditor('root.hasInfo.identifier').setValue(value);
          if ((path as string) === 'root.hasInfo.identifier') this.getEditor('root.identifier').setValue(value);

          if ((path as string) === 'root.title') this.getEditor('root.hasInfo.title').setValue(value);
          if ((path as string) === 'root.hasInfo.title') this.getEditor('root.title').setValue(value);
        };
        for (const key in editor.editors) {
          const regex = '.conceptId';

          if (Object.prototype.hasOwnProperty.call(editor.editors, key) && RegExp(regex).exec(key)) {
            editor.watch(key, watcherCallback.bind(editor, key));
          } else if (
            Object.prototype.hasOwnProperty.call(editor.editors, key) &&
            (key == 'root.identifier' || key == 'root.title' || key == 'root.hasInfo.identifier' || key == 'root.hasInfo.title')
          ) {
            editor.watch(key, rootHasInfoWhatcher.bind(editor, key));
          }
        }
      });

      //editor.on('ready', this.closeSpinner);

      editor.on('ready', () => {
        editor.getEditor('root.createdByUserId').setValue(localStorage.getItem('accountId'));
        this.loading = false;
        $('nb-spinner').remove();
        if (sessionStorage.getItem('readOnly') === 'true') editor.disable();

        if (!this.isNew) {
          editor.getEditor('root.identifier').disable();
          editor.getEditor('root.hasInfo.identifier').disable();
        }
      });
    }*/

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addNew(): void {
    this.dialogService.open(DialogAddNewPromptComponent).onClose.subscribe((result: { content: unknown; format: string }) => {
      if (result.content) {
        //this.editor.getEditor('root.createdByUserId').setValue(localStorage.getItem('accountId'));

        if (result.format == 'Cpsv') {
          //this.editor.getEditor('root.hasInfo').setValue(result.content);
          //this.editor.getEditor('root.identifier').setValue(this.editor.getEditor('root.hasInfo.identifier').getValue());
          //this.editor.getEditor('root.title').setValue(this.editor.getEditor('root.hasInfo.title').getValue());
        } //else this.editor.setValue(result.content);

        this.serviceId = result.content['identifier'] as string;
      }
    }
    );
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
        },
        status: {
          title: this.statusLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'text',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.status,
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
            instance.updateResult.pipe(takeUntil(this.unsubscribe)).subscribe((updatedServiceData: unknown) => this.ngOnInit());
          },
        },
      },
    };
  }

  resetfilters(): void {
    this.source.reset();
  }
}
