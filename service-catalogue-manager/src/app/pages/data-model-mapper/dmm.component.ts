import { Mapper } from './../../model/adapter/mapper';
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, Inject, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { DMMService } from './dmm.service';
import {
  NbDialogService,
  NbWindowService,
  NbDialogRef,
  NbToastrService,
  NbComponentStatus,
  NbToastrConfig,
  NbGlobalPhysicalPosition,
  NbWindowRef,
} from '@nebular/theme';
import { Validators, FormControl, FormGroup, ValidationErrors, FormArray, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Account, AccountNotificationEnum } from '../../model/account/account.model';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../model/appConfig';
import * as _ from "lodash"

import * as JSONEditor from '../../../../node_modules/jsoneditor/dist/jsoneditor.js';

import { DOCUMENT } from '@angular/common';
import { DialogImportComponent } from './dialog-import/dialog-import.component';
import { DialogDataMapComponent } from './dialog-dataMap/dialog-dataMap.component';
import { AvailableServicesService } from '../services/availableServices/availableServices.service';
import { AddAdapterComponent } from '../services/available-adapters/add-adapter/add-adapter.component';
import { CreateMapAndAdapterComponent } from './create-map-and-adapter/create-map-and-adapter.component';

let map, mapperEditor, mapOptions: string[]
@Component({
  selector: 'app-root',
  templateUrl: './dmm.component.html',
  styleUrls: ['./dmm.component.scss'],
})

export class DMMComponent implements OnInit, OnChanges {
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  sourceEditor: any;
  //editor2:any;
  sourceEditorContainer: any;
  mapperEditorContainer: any;
  outputEditorContainer: any;
  selectBox: any;
  inputType: any;
  public isNew = false;
  separatorItem = ';';
  csvSourceData: string;
  sourceRef: string = '';
  typeSource: string;

  flipped = false;
  csvtable: any;
  sourceRefFormat: string;
  //mapOptions: string[];
  paths: string[];
  mapperEditor: any;
  maps: any;
  mapper
  schemas
  selectedSchema
  //selectedPath

  schemaJson: any[];
  outputEditor: any;
  outputEditorOptions: any;
  //json2
  sourceJson: any;
  schemaFromFile

  toggleView() {
    this.flipped = !this.flipped;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    protected dialogService: NbDialogService,
    private windowService: NbWindowService,
    private availableServicesService: AvailableServicesService,
    private dmmService: DMMService,
  ) { }

  schemaChanged($event) {
    //console.debug($event)
    if (this.selectedSchema)
      this.schemaJson = [
        this.schema()
      ];
    //if (!this.outputEditor) this.outputEditor = new JSONEditor(this.outputEditorContainer, this.outputEditorOptions, this.schemaJson);
    //else this.outputEditor.update(this.schemaJson)
    map = this.getAllNestedProperties(this.schemaJson[0]);
    //console.debug("Line 88",editor2)
    mapperEditor.update(map)
    //this.onUpdatePathForDataMap("");
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.debug(changes);
  }

  setSchemaFromFile($event) {
    this.schemaFromFile = $event
    this.schemaJson = [
      this.schemaFromFile
    ]
    //if (!this.outputEditor) this.outputEditor = new JSONEditor(this.outputEditorContainer, this.outputEditorOptions, this.schemaJson);
    //else this.outputEditor.update(this.schemaJson)
    map = this.getAllNestedProperties(this.schemaJson[0]);
    //console.debug("Line 88",editor2)
    mapperEditor.update(map)
  }



  async ngOnInit(): Promise<void> {
    this.sourceEditorContainer = this.document.getElementById('jsoneditor');
    this.mapperEditorContainer = this.document.getElementById('jsoneditor2');
    this.outputEditorContainer = this.document.getElementById('jsoneditor3');
    this.selectBox = <HTMLInputElement>this.document.getElementById('input-type');
    this.csvtable = this.document.getElementById('csv-table');

    //await this.loadMapperList()
    await this.loadSchemaList()

    //var selectedValue = 'csv';

    const options = {
      mode: 'view',
      modes: ['view', 'code'], // allowed modes
      onModeChange: function (newMode, oldMode) { },
    };

    this.sourceJson = {
      first: "first",
      second: 2,
      third: [1, 2, 3],
      fourth: ["a", "b", "c"],
      fith: {
        first: "first",
        second: 2,
        third: [1, 2, 3],
        fourth: ["a", "b", "c"]
      }
    }

    //if (this.sourceJson)
    this.sourceEditor = new JSONEditor(this.sourceEditorContainer, options, this.sourceJson);

    this.outputEditorOptions = {
      mode: 'view',
      modes: ['view', 'preview'], // allowed modes
      onModeChange: function (newMode, oldMode) { },
    };

    if (this.selectedSchema)
      this.schemaJson = [
        this.schema()
      ];

    //if (this.schemaJson) this.outputEditor = new JSONEditor(this.outputEditorContainer, this.outputEditorOptions, this.schemaJson);

  }

  schema() {
    return this.schemas.filter(filteredSchema => filteredSchema.id == this.selectedSchema)[0].dataModel
  }

  async loadMapperList() {
    this.maps = await this.dmmService.getMaps();
  }

  async loadSchemaList() {
    this.schemas = await this.dmmService.getSchemas();
  }

  async testAdapter() {
    console.log("THIS IS THE OUTPUT\n\n\n\n")
    let m = JSON.parse(mapperEditor.getText())
    m["targetDataModel"] = "DataModelTemp"
    let output = await this.dmmService.test("json", JSON.parse(this.sourceEditor.getText()), m, this.schemaJson[0], ";")
    if (!this.outputEditor) this.outputEditor = new JSONEditor(this.outputEditorContainer, this.outputEditorOptions, output);
    else this.outputEditor.update(output)
  }

  getAllNestedProperties(obj) {
    let properties = {};

    //console.debug("TYPE")
    //console.debug(obj.type)
    //console.debug("PROPERTIES")
    //console.debug(obj.properties)

    if (obj.properties)
      for (let key in obj.properties) {

        //console.debug("KEY")
        //console.debug(key)
        //console.debug("PROPERTIES")
        //console.debug(obj.properties)
        //console.debug("TYPEOF")
        //console.debug(typeof obj[key])
        //console.debug("OBJ KEY")
        //console.debug(obj[key])

        if (typeof obj.properties[key] == 'object' || (obj.properties[key] && obj.properties[key].properties)) //{
          properties[key] = this.getAllNestedProperties(obj.properties[key]);
        else
          properties[key] = "";
        //properties = properties.concat(nestedProps.map((prop) => prop));
        //}
      }

    else
      return ""
    //console.debug(properties)
    return properties;


  }

  //skipArrays:Ignore the array part
  //keepObjKeys:Whether to keep the parent object keys

  getKeys(obj, keepObjKeys, skipArrays, keys = [], scope = []) {

    if (Array.isArray(obj)) {
      /*if (!skipArrays) scope.push('[' + obj.length + ']');
      obj.forEach((o) => this.getKeys(o, keepObjKeys, skipArrays, keys, scope), keys);*/
    } else if (obj && typeof obj === 'object' && obj.constructor === Object) {
      Object.keys(obj).forEach((k) => {
        if ((!Array.isArray(obj[k]) && !(typeof obj[k] === 'object')) || keepObjKeys) {
          let path = scope.concat(k).join('.').replace(/\.\[/g, '[');
          if (!keys.includes(path)) keys.push(path);
        }
        this.getKeys(obj[k], keepObjKeys, skipArrays, keys, scope.concat(k));
      }, keys);
    }
    return keys;
  }

  onUpdateInputType(event) {
    //console.log(event);
    const divJsonElement = document.getElementById('json-input');
    const divCSVElement = document.getElementById('csv-input');

    if (event === 'csv') {
      divCSVElement.style.display = 'block';
      divJsonElement.style.display = 'none';
    } else {
      divCSVElement.style.display = 'none';
      divJsonElement.style.display = 'block';
    }
  }

  onUpdatePathForDataMap(event) {
    console.debug("ON UPDATE PATH FOR DATA MAP")
    console.debug("EVENT\n", event);
    console.debug("TYPEOF EVENT\n", typeof event)
    //console.log(this.editor.getText());
    mapOptions = this.selectMapJsonOptions(this.sourceEditor.getText(), event);
    console.log("---------------", mapOptions);
    this.setMapEditor();
  }

  setMapEditor() {

    var dialogService = this.dialogService;
    var mOptions = mapOptions
    console.debug("M OPTIONS, \n", mOptions);

    const options2 = {
      mode: 'tree',
      modes: ['tree', 'code', 'view', 'preview'], // allowed modes
      onModeChange: function (newMode, oldMode) {
      },

      onCreateMenu: function (items, node) {
        const path = node.path
        //console.debug("M OPTIONS\n", mapOptions)
        console.debug("PATH\n", path)

        // log the current items and node for inspection
        //console.log('items:', items, 'node:', node)

        var selectPath = path;
        function pathToMap() {
          //console.debug(this.editor)
          dialogService
            .open(DialogDataMapComponent, {
              context: { mapOptions: mapOptions || mOptions, selectPath: selectPath },
            }).onClose.subscribe((value) => {
              //console.debug("UPDATE MAPPER")
              //console.debug(this)
              updateMapper(selectPath, value)
              //json2[path] = value
              //editor2.update(json2)
            });
        }

        if (path) {
          items.push({
            text: 'Map', // the text for the menu item
            title: 'Put the map with source', // the HTML title attribute
            className: 'example-class',
            click: pathToMap // the function to call when the menu item is clicked
          })
        }

        items.forEach(function (item, index, items) {
          if ("submenu" in item) {
            // if the item has a submenu property, it is a submenu heading
            // and contains another array of menu items. Let's colour
            // that yellow...
            items[index].className += ' submenu-highlight'
          } else {
            // if it's not a submenu heading, let's make it colorful
            items[index].className += ' rainbow'
          }
        })

        // note that the above loop isn't recursive, so it only alters the classes
        // on the top-level menu items. To also process menu items in submenus
        // you should iterate through any "submenu" arrays of items if the item has one.

        // next, just for fun, let's remove any menu separators (again just at the
        // top level menu). A menu separator is an item with a type : 'separator'
        // property
        items = items.filter(function (item) {
          return item.type !== 'separator'
        })

        // finally we need to return the items array. If we don't, the menu
        // will be empty.
        return items
      }
    };

    if (!mapperEditor) mapperEditor = new JSONEditor(this.mapperEditorContainer, options2, map);
    else mapperEditor.update(map)
  }

  saveAsFile(): void {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Window content from template', context: { text: 'some text to pass into template' } },
    );
  }

  saveAdapter() {
    this.dialogService.open(CreateMapAndAdapterComponent, { context: { sourceDataType: this.inputType || "json" } }).onClose.subscribe((adapter) => {
      this.dmmService.saveMap(adapter, JSON.parse(mapperEditor.getText()), this.schemaJson);
    });
  }

  import(field, typeSource: string): void {
    this.typeSource = typeSource;
    this.dialogService
      .open(DialogImportComponent, {
        context: { type: typeSource },
      })
      .onClose.subscribe((result: { content: string; source: string; format: string }) => {
        if (result && result.content) {
          this.sourceRef = result?.source;
          this.sourceRefFormat = result?.format;
          if (typeSource == 'csv') {
            this.csvSourceData = result.content;
            this.displayCSV(this.csvSourceData, this.csvtable, this.separatorItem);
            mapOptions = this.csvSourceData.slice(0, this.csvSourceData.indexOf("\n")).split(this.separatorItem);

          } else if (field=='source') {

            if (!this.sourceEditor)
              this.sourceEditor = new JSONEditor(this.sourceEditorContainer, {
                mode: 'view',
                modes: ['view', 'code'], // allowed modes
                onModeChange: function (newMode, oldMode) { },
              }, JSON.parse(result.content));

            else
              this.sourceEditor.setText(result.content);

            mapOptions = this.selectMapJsonOptions(this.sourceEditor.getText(), "");
            //this.setMapEditor();
            console.debug("----THIS MAP OPTIONS-----\n", mapOptions)
            //mapOptions = this.getAllNestedProperties(JSON.parse(result.content));
            this.paths = this.selectMapJsonOptions(result.content, '')

            //console.log(this.paths);
            this.onUpdatePathForDataMap("")
          }
          else if (field == 'schema'){
            this.setSchemaFromFile(JSON.parse(result.content))
          }
        }
      });
  }



  selectMapJsonOptions(content: string, path: string): string[] {
    //console.debug("CONTENT\n", content)
    //console.debug("PATH\n", path)

    return this.getKeys(_.get(JSON.parse(content), path + '[0]', JSON.parse(content)), true, true)


  }



  displayCSV(csvData: string, element: HTMLElement, separator: string) {
    // Split the CSV data into an array of rows
    var divElement = document.createElement('div');
    divElement.style.overflowY = "auto";
    divElement.style.height = "200px";

    const rows = csvData.split('\n');

    // Create a table element
    var table = document.createElement('table');
    table.className = 'table table-striped';

    // Loop through each row in the CSV data
    rows.forEach((rowData, index) => {
      // Split the row into an array of cells
      const cells = rowData.split(separator);

      // Create a table row element

      const row = document.createElement(index === 0 ? 'thead' : 'tr');

      // Loop through each cell in the row and add it to the table cell element
      cells.forEach((cellData) => {
        const cell = document.createElement(index === 0 ? 'th' : 'td');
        cell.textContent = cellData;
        row.appendChild(cell);
      });

      // Add the row to the table
      table.appendChild(row);
    });

    // Add the table to the document
    divElement.appendChild(table);
    element.appendChild(divElement);
  }


}

function updateMapper(path, value) {
  //console.debug("UPDATE MAPPER")
  map[path] = value
  mapperEditor.update(map)
}
