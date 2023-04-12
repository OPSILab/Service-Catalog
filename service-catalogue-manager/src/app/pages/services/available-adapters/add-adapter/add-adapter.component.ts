import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AvailableAdaptersService } from '../available-adapters.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { AdapterEntry } from '../../../../model/adapter/adapterEntry'
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogAdapterService } from '../../../error-dialog/error-dialog-adapter.service';
import { AppConfig } from '../../../../model/appConfig';
import { map, startWith, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Mapper } from '../../../../model/adapter/mapper';

@Component({
  selector: 'add-adapter',
  templateUrl: './add-adapter.component.html',
  styleUrls: ['./add-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddAdapterComponent implements OnInit {

  @Input() value: any;
  @Output() editedValue = new EventEmitter<unknown>();
  adapterId: string
  name: string = ''
  description: string = ''
  status: string = "inactive"
  type: string = "MODEL"
  context: string = "IMPORT"
  url: string
  inputItemFormControl: FormControl;
  textareaItemFormControl: FormControl;
  selectedFile: File;
  json: Record<string, unknown>;
  selectedItem = 'Json';
  loaded = false
  mappers: Mapper[];
  validURL = true
  IDs: string[] = [];
  filteredControlIDOptions$: Observable<string[]>;
  filteredIDOptions$: Observable<string[]>;
  IDFormControl: FormControl;
  NameFormControl: FormControl;
  filteredControlNameOptions$: Observable<string[]>;
  filteredNameOptions$: Observable<string[]>;
  names: string[] = [];
  private appConfig: AppConfig;

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
  }

  cancel(): void {
    this.ref.close();
  }

  async loadMappers(): Promise<void> {
    this.IDs = []
    this.names = []
    if (this.url)
      try {
        this.mappers = await this.http.post<any>(this.url, {
          "getMapperList": true
        }).toPromise();
        for (let mapper of this.mappers) {
          this.IDs.push(mapper.id);
          this.names.push(mapper.name);
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
  }

  ngOnInit(): void {

    this.loaded = false
    this.url = this.appConfig.data_model_mapper.default_mapper_url
    this.loadMappers()
    this.filteredControlIDOptions$ = of(this.IDs);
    this.filteredControlNameOptions$ = of(this.names);
    this.IDFormControl = new FormControl();
    this.NameFormControl = new FormControl();
    this.filteredControlIDOptions$ = this.IDFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filterID(filterString)),
      );
    this.filteredControlNameOptions$ = this.NameFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filterID(filterString)),
      );
    try {
      this.inputItemFormControl = new FormControl();
      this.textareaItemFormControl = new FormControl();
      if (this.value && this.value.adapterId) this.adapterId = this.value.adapterId
      this.url = this.appConfig.data_model_mapper.default_mapper_url
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")
    }
  }

  private filterID(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.IDs.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterName(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterID(filterString)),
    );
  }

  onAdapterIDChange(ID: string) {
    this.filteredIDOptions$ = of(this.filterID(ID));
    this.adapterId = ID
    this.name = this.names[this.IDs.indexOf(ID)]
  }

  onNameChange(name: string) {
    this.filteredNameOptions$ = of(this.filterName(name));
    this.name = name
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
    try {

      let name = this.name,
        description = this.description,
        status = this.status,
        adapterId = this.adapterId ? this.adapterId : this.value ? this.value : null,
        type = this.type,
        url = this.url,
        context = this.context

      if (adapterId == '' || adapterId == null)
        throw new Error("Adapter ID must be set");

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
      console.log("name : ", this.name)
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

