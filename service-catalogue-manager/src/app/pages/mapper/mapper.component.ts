import { Component, Inject, OnInit } from '@angular/core';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { ImportComponent } from './import/import.component';
import { DOCUMENT } from '@angular/common';
import { AvailableServicesService } from '../services/availableServices/availableServices.service';
import { DmmService } from './mapper.service';

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

  import(field, typeSource: string): void {
    this.dialogService.open(ImportComponent)
  }

}
