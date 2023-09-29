import { DMMComponent } from './../../data-model-mapper/dmm.component';
import { Component, OnInit, TemplateRef, ViewChild, Inject, OnChanges, SimpleChanges } from '@angular/core';
import {
  NbDialogRef,
  NbDialogService,
  NbWindowService,
} from '@nebular/theme';
import * as _ from "lodash"
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../../model/appConfig';
import { CreateMapComponent } from '../../data-model-mapper/create-map/create-map.component';
import { DialogDataMapComponent } from '../../data-model-mapper/dialog-dataMap/dialog-dataMap.component';
import { DialogImportComponent } from '../../data-model-mapper/dialog-import/dialog-import.component';
import { DMMService } from '../../data-model-mapper/dmm.service';
import { ExportFileComponent } from '../../data-model-mapper/export-file/export-file.component';
import { ErrorDialogAdapterService } from '../../error-dialog/error-dialog-adapter.service';
import * as JSONEditor from '../../../../../node_modules/jsoneditor/dist/jsoneditor.js';
import { ImportComponent } from '../import/import.component';


let mapOptionsGl, mapGl = "Set your mapping fields here", mapperEditor

//let map = {}, mapperEditor, mapOptions: string[]
@Component({
  selector: 'transform',
  //templateUrl: './transform.component.html',
  templateUrl: '../../data-model-mapper/dmm.component.html',
  styleUrls: ['./transform.component.scss'],
})

export class TransformComponent extends DMMComponent implements OnInit, OnChanges {

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public dialogService: NbDialogService,
    public windowService: NbWindowService,
    public errorService: ErrorDialogAdapterService,
    public dmmService: DMMService,
    public route: ActivatedRoute,
    public configService: NgxConfigureService,
    public ref: NbDialogRef<TransformComponent>,
  ) {
    super(document, dialogService, windowService, errorService, dmmService, route, configService)
    this.config = configService.config as AppConfig;
    this.emptySource = true
  }

  import(field, typeSource: string): void {
    this.typeSource = typeSource;
    this.dialogService
      .open(ImportComponent, field == "map" ? { context: { map: true } } : { context: { type: typeSource } })
      .onClose.subscribe(async (result: { content: string; source: string; format: string; mapSettings }) => {
        if (result?.mapSettings)
          this.mapChanged(false, result.mapSettings)
        else if (result && result?.content) {
          if (typeSource == 'csv') {
            this.sourceRef = result?.source;
            this.sourceRefFormat = result?.format;
            if (this.sourceRefFormat == "url")
              this.sourceDataURL = result.source
            this.csvSourceData = result.content;
            this.displayCSV(this.csvSourceData, this.csvtable, this.separatorItem);
            mapOptionsGl = this.csvSourceData.slice(0, this.csvSourceData.indexOf("\n")).split(this.separatorItem);
            if (this.selectedSource) this.selectedSource = undefined
            //sourceEditorCodeMode = true
            this.importedSource = this.csvSourceData
          }
          else if (field == 'source') {
            this.sourceRef = result?.source;
            this.sourceRefFormat = result?.format;
            if (this.sourceRefFormat == "url") {
              this.sourceDataURL = result.source
              if (this.selectedSource) this.selectedSource = undefined
            }
            if (!this.sourceEditor) {
              this.sourceEditor = new JSONEditor(this.sourceEditorContainer, this.sourceOptions, JSON.parse(result.content));
              this.importedSource = JSON.parse(result.content)
            }
            else
              try {
                this.sourceEditor.setText(result.content);
                if (this.selectedSource) this.selectedSource = undefined
                //sourceEditorCodeMode = true
                this.importedSource = JSON.parse(result.content)
              }
              catch (error) {
                this.handleError(error, false, false)
                this.sourceEditor.update({ message: "you must import a valid json" })
              }

            try {
              mapOptionsGl = this.selectMapJsonOptions(this.sourceEditor.getText(), "");
              this.paths = this.selectMapJsonOptions(result.content, '')
            }
            catch (error) {
              this.handleError(error, false, false)
            }

            this.onUpdatePathForDataMap("", true)
          }
          else if (field == 'schema') {
            this.schemaRef = result?.source;
            this.schemaRefFormat = result?.format;
            if (this.sourceRefFormat == "url") {
              this.dataModelURL = result.source
              this.selectedSchema = "---select schema---"
            }
            try {
              this.tempSchema = JSON.parse(result.content)
            }
            catch (error) {
              this.handleError(error, false, false)
              this.schemaJson = { "error": "import a valid schema" }
            }
            this.schemaChanged(this.getSchema(), "url")
          }
        }
      });
  }
}


