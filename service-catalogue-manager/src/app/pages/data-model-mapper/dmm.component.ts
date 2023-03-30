/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
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

import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';


@Component({
  selector: 'app-root',
  template: '<json-editor [options]="editorOptions" [data]="data"></json-editor>',
  styleUrls: ['./dmm.component.css']
})
export class DMMComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  constructor() { 
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
      
      this.data = {"products":[{"name":"car","product":[{"name":"honda","model":[{"id":"civic","name":"civic"},{"id":"accord","name":"accord"},{"id":"crv","name":"crv"},{"id":"pilot","name":"pilot"},{"id":"odyssey","name":"odyssey"}]}]}]}
  } 
  
  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
