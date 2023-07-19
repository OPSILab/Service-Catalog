import { Component, Inject, OnInit } from '@angular/core';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { ImportComponent } from './import/import.component';
import { DOCUMENT } from '@angular/common';
import { AvailableServicesService } from '../services/availableServices/availableServices.service';
import { DmmService } from './mapper.service';
import { SaveMapAndadapterComponent } from './save-map-andadapter/save-map-andadapter.component';

let map = {}, mapperEditor, mapOptions: string[]
@Component({
  selector: 'mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.scss']
})
export class MapperComponent implements OnInit {

  sourceEditor: any;
  //editor2:any;
  sourceEditorContainer: any;
  mapperEditorContainer: any;
  outputEditorContainer: any;
  selectBox: any;
  inputType: any;
  isNew = false;
  separatorItem = ';';
  csvSourceData: string;
  sourceRef: string = '';
  typeSource: string;
  adapter
  mapObject
  //table
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
  //divElement;

  constructor(@Inject(DOCUMENT) private document: Document,
  protected dialogService: NbDialogService,
  private windowService: NbWindowService,
  private availableServicesService: AvailableServicesService,
  private dmmService: DmmService,) { }

  toggleView() {
    this.flipped = !this.flipped;
  }

  ngOnInit(): void {
    console.log("MAPPER")
  }

  testAdapter(){

  }

  updateAdapter() {
    this.dialogService.open(SaveMapAndadapterComponent, { context: { value: this.adapter } }).onClose.subscribe(async (adapter) => {
      if (adapter) {
        this.adapter = adapter;
        this.mapObject = await this.dmmService.updateMap(adapter, JSON.parse(mapperEditor.getText()), this.schemaJson);
      }
    });
  }

  import(field, typeSource: string): void {
    this.dialogService.open(ImportComponent)
  }

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

  schema() {
    return this.schemas.filter(filteredSchema => filteredSchema.id == this.selectedSchema)[0].dataModel
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

  saveAdapter() {
    this.dialogService.open(SaveMapAndadapterComponent, { context: { sourceDataType: this.inputType || "json" } }).onClose.subscribe(async (adapter) => {
      this.adapter = adapter;
      this.mapObject = await this.dmmService.saveMap(adapter, JSON.parse(mapperEditor.getText()), this.schemaJson);
      this.isNew = true
    });
  }

}
