/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AfterContentInit, ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JSONEditor } from '@json-editor/json-editor/dist/jsoneditor.js';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import { NbDialogService } from '@nebular/theme';
import { DialogExportPromptComponent } from './dialog-export-prompt/dialog-export-prompt.component';
import { DialogImportPromptComponent } from './dialog-import-prompt/dialog-import-prompt.component';
import { ActivatedRoute } from '@angular/router';
import { AvailableServicesService } from '../availableServices/availableServices.service';
import { NgxConfigureService } from 'ngx-configure';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';

import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig, System } from '../../../model/appConfig';
import { ServiceModel } from '../../../model/services/serviceModel';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Description } from '../../../model/services/description';
import * as _ from "lodash"

@Component({
  selector: 'ngx-spinner-color',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, AfterContentInit, OnDestroy {
  private editor: any;
  public serviceId: string;
  public serviceName: string;
  private serviceData: ServiceModel;
  loading = false;
  public readOnly = false;
  private config: AppConfig;
  private systemConfig: System;
  private locale: string;
  apiRoot: string;
  schemaDir: string;
  public isNew = false;

  flipped = false;
  dataMapEnum: string[];

  toggleView() {
    this.flipped = !this.flipped;
  }

  @ViewChild('confirmSaveDialog', { static: false }) confirmSaveDialogTemplate: TemplateRef<any>;
  @ViewChild('confirmUpdateDialog', { static: false }) confirmUpdateDialogTemplate: TemplateRef<any>;
  @ViewChild('confirmOverwriteDialog', { static: false }) confirmOverwriteDialogTemplate: TemplateRef<any>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private availablesServicesService: AvailableServicesService,
    private configService: NgxConfigureService,
    private errorDialogService: ErrorDialogService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.config = this.configService.config as AppConfig;
    this.systemConfig = this.config.system;
    this.locale = this.translateService.currentLang;
    this.schemaDir =
      (this.systemConfig.serviceEditorUrl.includes('localhost') ? '' : this.systemConfig.serviceEditorUrl) +
      this.systemConfig.editorSchemaPath +
      '/' +
      this.locale +
      '/' +
      this.systemConfig.editorSchemaName;
    this.loading = true;
  }

  ngAfterContentInit(): void {
    if (this.readOnly) sessionStorage.setItem('readOnly', 'true');
  }

  async ngOnInit(): Promise<void> {
    try {
      this.serviceId = this.route.snapshot.params['serviceId'] as string;
      this.readOnly = <boolean>this.route.snapshot.params['readOnly'];
      sessionStorage.removeItem('isTouched');
      if (this.serviceId) {
        this.serviceData = await this.availablesServicesService.getService(this.serviceId);
        this.serviceName = this.serviceData.title;
      } else {
        this.isNew = true;
      }

     

      this.initializeEditor(this.serviceData);

      this.translateService.onLangChange.subscribe(() =>  this.reloadLocaleEditor());

      // this.loading = true;
    } catch (error) {
      this.router.navigate(['/services']);
      console.log(error);
      this.errorDialogService.openErrorDialog(error);
    }
  }

  ngOnDestroy(): void {
    if (this.readOnly) sessionStorage.removeItem('readOnly');
    sessionStorage.removeItem('isTouched');
  }

  readSessionStorageValue(key: string): string {
    return sessionStorage.getItem(key);
  }

  getLocalizedDescription(availableServiceDescr: ServiceModel): Description[] {
    return availableServiceDescr.hasInfo.description.reduce((filtered: Description[], description: Description) => {
      if (this.translateService.currentLang !== 'en' && description.locale === this.translateService.currentLang) filtered = [description, ...filtered];
      else if (description.locale === 'en') filtered = [...filtered, description];
      return filtered;
    }, []);
  }

  initializeEditor(serviceData: ServiceModel): void {
    const elem = this.document.getElementById('editor');
    var serviceService = this.availablesServicesService;
    var locale = this.translateService.currentLang;

    JSONEditor.defaults.callbacks = {
      autocomplete: {
        search_services: function search(editor, input) {
          return new Promise(function (resolve) {
            if (input.length < 0) {
              return resolve([]);
            }

            serviceService
              .findService(input)
              .then(function (response) {
                return response;
              })
              .then(function (data) {
                resolve(data);
              });
          });
        },
        getResultValue_services: function getResultValue(editor, result) {
          return result.title;
        },
        renderResult_services: function (editor, result, props) {
          console.log(locale)
          var description = result.hasInfo.description.reduce((filtered: Description[], description: Description) => {
            if (locale !== 'en' && description.locale === locale) filtered = [description, ...filtered];
            else if (description.locale === 'en') filtered = [...filtered, description];
            return filtered;
          }, []);
          return [
            '<li ' + props + '>',
            '<div >' + result.title + '</div>',
            '<div><small>[' + result.hasInfo.spatial + '] ' + description[0]?.description + '<small></div>',
            '</li>',
          ].join('');
        },
      },
    };


    // Custom validators must return an array of errors or an empty array if valid
JSONEditor.defaults.custom_validators.push((schema, value, path) => {
  const errors = [];
  if (path==="root.hasInfo.processingTime" && value.trim()!=="") {

      if (!/^P(?=\d+[YMWD])(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/.test(value)) {
        // Errors must be an object with `path`, `property`, and `message`
        errors.push({
          path: path,
          property: 'format',
          message: 'Duration must be in the ISO8601 syntax for durations: P(n)Y(n)M(n)W(n)DT(n)H(n)M(n)S'
        });
      }
}
  return errors;
});

    const editor = new JSONEditor(elem, {
      ajax: true,
      schema: { $ref: this.schemaDir },
      startval: serviceData,
      theme: 'bootstrap4',
      iconlib: 'fontawesome5',
      no_additional_properties: true,
      disable_properties: true,
      prompt_before_delete: true,
      required_by_default: true,
    });


    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.editor = editor;


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
        // console.log(`field with path: [${path as string}] changed to [${JSON.stringify(this.getEditor(path).getValue())}]`);

        if (value !== '"undefined"' /*&& value !== '""'*/) {
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
  }

 


  reloadLocaleEditor(): void {
   
    var currentData=this.editor.getValue();
    this.editor.destroy();
    this.schemaDir =
    (this.systemConfig.serviceEditorUrl.includes('localhost') ? '' : this.systemConfig.serviceEditorUrl) +
    this.systemConfig.editorSchemaPath +
    '/' +
    this.translateService.currentLang +
    '/' +
    this.systemConfig.editorSchemaName;
          this.initializeEditor(currentData);
          
  }

  closeSpinner(): void {
    console.log('closing');
    this.loading = false;
    $('nb-spinner').remove();
  }

  saveAsFile(): void {
    this.dialogService.open(DialogExportPromptComponent).onClose.subscribe((result) => {
      void this.saveFile(result.name, result.exportFormat, this.serviceId);
    });
  }

  importAsFile(): void {

    this.dialogService.open(DialogImportPromptComponent).onClose.subscribe((result: { content: unknown; format: string }) => {
      if (result?.content) {
        this.editor.getEditor('root.createdByUserId').setValue(localStorage.getItem('accountId'));
        if (result.format == 'Cpsv') {
          this.editor.getEditor('root.hasInfo').setValue(result.content);
          this.editor.getEditor('root.identifier').setValue(this.editor.getEditor('root.hasInfo.identifier').getValue());
          this.editor.getEditor('root.title').setValue(this.editor.getEditor('root.hasInfo.title').getValue());
        }
        else //if (result.format=="csv" || result.format=="Json")
          this.editor.getEditor('root').setValue(result.content)
        //else this.editor.setValue(result.content);

        this.serviceId = result.content['identifier'] as string;
      }
    });
  }

  async saveFile(name: string, exportFormat: string, serviceId: string): Promise<void> {
    this.errorDialogService;
    let model: Record<string, unknown>;

    try {
      switch (exportFormat) {
        case 'cpsv':
          model = await this.availablesServicesService.getCpsvService(serviceId);
          break;
        case 'sdg':
          break;

        case 'json-ld':
          model = await this.availablesServicesService.getJsonldService(serviceId);
          break;

        default:
          model = this.editor.getValue() as Record<string, unknown>;
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

  stopLoading(): void {
    console.log(this.loading);
    this.loading = false;
  }

  openSaveToRegistryDialog(): void {
    const payload = this.editor.getValue() as ServiceModel;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const validationErrors = this.editor.validate();

    if (validationErrors.length > 0)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.errorDialogService.openErrorDialog({ error: 'EDITOR_VALIDATION_ERROR', validationErrors: validationErrors });
    else {
      const ref = this.dialogService.open(this.confirmSaveDialogTemplate, {
        context: {
          name: payload.title,
          callback: async () => {
            try {
              await this.availablesServicesService.saveService(payload);
              this.isNew = false;
              this.showToast(
                'success',
                this.translateService.instant('general.editor.save_success', {
                  name: payload.title,
                }),
                ''
              );
              this.isNew = false;
              sessionStorage.removeItem('isTouched');
              ref.close();
            } catch (error) {
              ref.close();
              if (error.error.error === 'org.springframework.dao.DuplicateKeyException') this.openOverwriteToRegistryDialog();
              else this.errorDialogService.openErrorDialog(error);
            }
          },
        },
      });
    }
  }

  openUpdateToRegistryDialog(): void {
    const payload = this.editor.getValue() as ServiceModel;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const validationErrors = this.editor.validate();

    if (validationErrors.length > 0)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.errorDialogService.openErrorDialog({ error: 'EDITOR_VALIDATION_ERROR', validationErrors: validationErrors });
    else {
      const ref = this.dialogService.open(this.confirmUpdateDialogTemplate, {
        context: {
          name: payload.title,
          callback: async () => {
            try {
              await this.availablesServicesService.updateService(payload, payload.identifier);
              sessionStorage.removeItem('isTouched');
              this.showToast(
                'success',
                this.translateService.instant('general.editor.update_success', {
                  name: payload.title,
                }),
                ''
              );
              ref.close();
            } catch (error) {
              this.errorDialogService.openErrorDialog(error);
            }
          },
        },
      });
    }
  }

  openOverwriteToRegistryDialog(): void {
    const payload = this.editor.getValue() as ServiceModel;
    const ref = this.dialogService.open(this.confirmOverwriteDialogTemplate, {
      context: {
        name: payload.title,
        callback: async () => {
          try {
            await this.availablesServicesService.updateService(payload, payload.identifier);
            this.showToast(
              'success',
              this.translateService.instant('general.editor.update_success', {
                name: payload.title,
              }),
              ''
            );
            ref.close();
            this.isNew = false;
            sessionStorage.removeItem('isTouched');
          } catch (error) {
            this.errorDialogService.openErrorDialog(error);
          }
        },
      },
    });
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    // const config = {
    //   status: type,
    //   destroyByClick: true,
    //   duration: 2500,
    //   hasIcon: false,
    //   position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    //   preventDuplicates: true,
    // } as Partial<NbToastrConfig>;

    this.toastrService.show(body, title);
  }
}
