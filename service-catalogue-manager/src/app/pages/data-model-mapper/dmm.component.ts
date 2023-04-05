/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
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

import * as JSONEditor  from '../../../../node_modules/jsoneditor/dist/jsoneditor.js';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './dmm.component.html',
  styleUrls: ['./dmm.component.scss']
})
export class DMMComponent implements OnInit {

private editor :any;
container:any ;
container2:any ;
container3:any ;
selectBox:any;
inputType:any;
public isNew = false;
separatorItem="semiColon";

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
  
constructor( @Inject(DOCUMENT) private document: Document) { 
    
  } 
  
  

  ngOnInit(): void {
    this.container = this.document.getElementById('jsoneditor');
    this.container2 = this.document.getElementById('jsoneditor2');
    this.container3 = this.document.getElementById('jsoneditor3');
    this.selectBox = <HTMLInputElement>this.document.getElementById('input-type');
    
    const options2 = {
      mode: 'tree',
      modes: ['tree', 'code','view', 'preview'], // allowed modes
      onModeChange: function (newMode, oldMode) {
        
      }
    }

    const json2 = {
      "root1": "",
      "root2": "",
      "root3": {
        "level1_1": "",
        "level1_2": {
          "level2_1": "",
          "level2_2": ""
        },
        "level1_3": ""
      },
      "root4": "",
      "targetDataModel": "NestedModel"
    }

    const editor2 = new JSONEditor(this.container2, options2, json2)

  

    var selectedValue = "csv";

      

    const options = {
      mode: 'view',
      modes: ['view', 'preview'], // allowed modes
      onModeChange: function (newMode, oldMode) {

      },

    }

    const json = {

    }

    const editor = new JSONEditor(this.container, options, json)
    
   

    const options3 = {
      mode: 'view',
      modes: ['view', 'preview'], // allowed modes
      onModeChange: function (newMode, oldMode) {

      },

    }

    const json3 = [
      {
        "root1": "r1",
        "root2": "r2",
        "root3": {
          "level1_1": "r3",
          "level1_2": { "level2_1": ["tag1", "tag2", "tag3"], "level2_2": "22" },
          "level1_3": "13"
        },
        "root4": "4"
      }
    ]

    const editor3 = new JSONEditor(this.container3, options3, json3)
 

   
  }


  getAllNestedProperties(obj) {
    let properties = [];

    for (let key in obj) {
      properties.push(key);
      if (typeof obj[key] === 'object') {
        let nestedProps = this.getAllNestedProperties(obj[key]);
        properties = properties.concat(nestedProps.map(prop => key + '.' + prop));
      }
    }
    return properties;
  }

  

  onUpdateInputType(event){
    console.log(event);
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

  
}
