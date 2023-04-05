import { Observable, of } from 'rxjs';
import { StatusCardComponent } from './../../../dashboard/status-card/status-card.component';
import { Description } from './../../../../model/services/description';
import { FormControl } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AvailableAdaptersService } from '../available-adapters.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { AdapterEntry } from '../../../../model/adapter/adapterEntry'
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogAdapterService } from '../../../error-dialog/error-dialog-adapter.service';
import { ServiceModelSchema } from '../../../../model/services/serviceModelSchema'
import { AppConfig } from '../../../../model/appConfig';
import { map, startWith, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
  selector: 'add-adapter',
  templateUrl: './add-adapter.component.html',
  styleUrls: ['./add-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddAdapterComponent implements OnInit {
  //[x: string]: any;
  @Input() value: any;
  @Output() editedValue = new EventEmitter<unknown>();
  //http: HttpClient;
  //configService: NgxConfigureService;
  inputItemNgModel;
  adapterId: string
  name: string
  description: string
  status: string = "inactive"
  type: string = "MODEL"
  context: string = "IMPORT"
  url: string
  //mapper: string
  //adapterModel: string
  textareaItemNgModel;
  inputItemFormControl;
  textareaItemFormControl;
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  loaded = false
  private appConfig: AppConfig;
  mappers

  mapperIDs: string[] = [];
  validURL = true

  options: string[] = [];
  filteredControlOptions$: Observable<string[]>;
  filteredNgModelOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  inputFormControl2: FormControl;

  filteredControlOptions2$: Observable<string[]>;
  filteredNgModelOptions2$: Observable<string[]>;
  options2: string[] = [];
  mapperNames: string[] = [];
  //value: string;
  //filteredControlOptions$
  //inputFormControl: FormControl;
  //filteredOptions$: Observable<string[]>;
  //options$ : Observable<string[]>
  //filteredNgModelOptions$: Observable<string[]>;
  //value

  //@ViewChild('autoInput') input;

  constructor(
    private http: HttpClient,
    protected ref: NbDialogRef<AddAdapterComponent>,
    private toastrService: NbToastrService,
    private errorService: ErrorDialogAdapterService,
    private availableAdapterService: AvailableAdaptersService,
    private translate: TranslateService,
    private configService: NgxConfigureService
  ) {
    this.appConfig = this.configService.config as AppConfig
    //this.options$ = this.options.valueChanges();
    //this.adapterModel = this.appConfig.data_model_mapper.default_data_model_ID
    //this.mapper = this.appConfig.data_model_mapper.default_map_ID
  }

  cancel(): void {
    this.ref.close();
  }

  async loadMappers(): Promise<void> {
    console.log("loadmappers")
    if (this.url)
      try {
        this.mappers = await this.http.post<any>(this.url, {
          "getMapperList": true
        }).toPromise();
        for (let mapper of this.mappers) {
          this.mapperIDs.push(mapper.id);
          this.mapperNames.push(mapper.name);
        }
        this.loaded = true
        this.validURL = true
      }
      catch (error) {
        console.log("Cannot get response from remote url")
        console.log(error)
        this.validURL = false
      }
    else this.validURL = false
    this.options = this.mapperIDs;
    this.options2 = this.mapperNames;
    console.log(this.validURL)
    console.log(this.mapperIDs)
    console.log(this.mapperNames)
    this.filteredControlOptions$ = of(this.options);
    this.filteredControlOptions2$ = of(this.options2);
  }

  ngOnInit(): void {

    this.loaded = false
    this.url = this.appConfig.data_model_mapper.default_mapper_url
    this.loadMappers()
    this.options = this.mapperIDs;
    this.options2 = this.mapperNames;
    this.filteredControlOptions$ = of(this.options);
    this.filteredControlOptions2$ = of(this.options2);
    console.log(this.options2, "-------", this.options)
    this.inputFormControl = new FormControl();
    this.inputFormControl2 = new FormControl();
    this.filteredControlOptions$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
    this.filteredControlOptions2$ = this.inputFormControl2.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );

    /*this.filteredControlOptions$ = of(this.options);
    this.filteredNgModelOptions$ = of(this.options);
    this.filteredOptions$ = of(this.options);
    this.inputFormControl = new FormControl();
    this.filteredControlOptions$ = this.inputFormControl.valueChanges

      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );*/
    //this.filteredNgModelOptions$ = of(this.options);
    try {
      this.inputItemFormControl = new FormControl();
      this.textareaItemFormControl = new FormControl();
      /*
      if (this.type == "MODEL" && this.context == "IMPORT") {
        this.adapterId = this.appConfig.data_model_mapper.default_map_ID;
        //adapterModel = this.appConfig.data_model_mapper.default_data_model_ID
      }else*/
      if (this.value && this.value.adapterId) this.adapterId = this.value.adapterId
      this.url = this.appConfig.data_model_mapper.default_mapper_url
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
    }

  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  /*
  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }*/

  onAdapterIDChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
    this.adapterId = value
  }

  onNameChange(value2: string) {
    this.filteredNgModelOptions2$ = of(this.filter2(value2));
    this.name = value2
  }

  onFileChanged(event: Event): void {
    try {
      this.selectedFile = (<HTMLInputElement>event.target).files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile, 'UTF-8');
      fileReader.onload = () => {
        try {
          this.json = JSON.parse(fileReader.result as string) as Record<string, unknown>;
        } catch (error) {
          this.errorService.openErrorDialog(error);
          console.log("error:<\n", error, ">\n")
          //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
          //else if (error.message) console.log("message:<\n", error.message, ">\n")
          this.ref.close();
        }
      };

      fileReader.onerror = (error) => {
        this.errorService.openErrorDialog(error);
      };
    } catch (error) {
      //console.log("error:<\n", error, ">\n")
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
      this.errorService.openErrorDialog(error);
    }
  }

  confirm() {
    try {
      this.onSubmit()
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
    }
  }

  async onSubmit() {
    console.log("value", this.value)
    try {

      let name = this.name,
        description = this.description,
        status = this.status,
        adapterId = this.adapterId ? this.adapterId : this.value ? this.value : null,
        type = this.type,
        url = this.url,
        context = this.context//,
      //mapper,
      //adapterModel;

      if (type == "MODEL" && context == "IMPORT") {
        adapterId = this.appConfig.data_model_mapper.default_map_ID;
        //adapterModel = this.appConfig.data_model_mapper.default_data_model_ID
      } else {
        adapterId = this.adapterId ? this.adapterId : this.value ? this.value : null;
        //adapterModel = this.adapterModel
      }

      if (adapterId == '' || adapterId == null) {
        console.log("dialog-add-new-prompt.component.ts.onSubmit(): Adapter ID must be set");
        console.log("adapterId\n", this.adapterId, "\nnvalue\n", this.value, "adapterId", adapterId)
        throw new Error("Adapter ID must be set");
      }

      await this.availableAdapterService.saveAdapter(((
        type == "MODEL" ?
          { name, description, status, adapterId, type, url, context } as unknown :
          { name, description, status, adapterId, type, url } as unknown)) as AdapterEntry);

      this.ref.close();
      this.editedValue.emit(this.value);
      this.showToast('primary', this.translate.instant('general.adapters.adapter_added_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.adapterId) errors.push({
        "path": "root.adapterId",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.name) errors.push({
        "path": "root.name",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.description) errors.push({
        "path": "root.description",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.url) errors.push({
        "path": "root.url",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (!this.type) errors.push({
        "path": "root.type",
        "property": "minLength",
        "message": "Value required",
        "errorcount": 1
      })
      if (this.type == "MODEL" && !this.context) errors.push({
        "path": "root.context",
        "property": "minLength",
        "message": "Value required for adapter type model",
        "errorcount": 1
      })

      console.log("error:", "\n", error)
      if (error.message == "Adapter ID must be set") {
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.adapterId",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });
      }
      else if (error.status && error.status == 400) {
        if (error.error.status == "Adapter already exists")
          this.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.adapterId",
                "property": "minLength",
                "message": "A adapter with adapter ID < " + this.adapterId + " > already exists",
                "errorcount": 1
              }
            ]
          });
        else this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2500,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    } as Partial<NbToastrConfig>;

    this.toastrService.show(body, title, config);
  }
}

