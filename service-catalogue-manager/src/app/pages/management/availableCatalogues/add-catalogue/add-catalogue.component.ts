import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AvailableCataloguesService } from '../availableCatalogues.service'
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { CatalogueEntry } from '../../../../model/catalogue/catalogueEntry'
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//import { ErrorDialogCatalogueService } from '../../../error-dialog/error-dialog-catalogue.service';//TODO
import { AppConfig } from '../../../../model/appConfig';
import { map, startWith, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
  selector: 'add-catalogue',
  templateUrl: './add-catalogue.component.html',
  styleUrls: ['./add-catalogue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddCatalogueComponent implements OnInit {

  @Input() value: any;
  @Output() editedValue = new EventEmitter<unknown>();
  catalogueId: string
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
    protected ref: NbDialogRef<AddCatalogueComponent>,
    private toastrService: NbToastrService,
    //private errorService: ErrorDialogCatalogueService,//TODO
    private availableCatalogueService: AvailableCataloguesService,
    private translate: TranslateService,
    private configService: NgxConfigureService
  ) {
    this.appConfig = this.configService.config as AppConfig
  }

  cancel(): void {
    this.ref.close();
  }

  ngOnInit(): void {

    this.loaded = false
    this.url = this.appConfig.data_model_mapper.default_mapper_url
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
      if (this.value && this.value.catalogueId) this.catalogueId = this.value.catalogueId
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

  onCatalogueIDChange(ID: string) {
    this.filteredIDOptions$ = of(this.filterID(ID));
    this.catalogueId = ID
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
          //this.errorService.openErrorDialog(error);//TODO
          console.log("error:<\n", error, ">\n")
          //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
          //else if (error.message) console.log("message:<\n", error.message, ">\n")
          this.ref.close();
        }
      };

      fileReader.onerror = (error) => {
        //this.errorService.openErrorDialog(error);//TODO
      };
    } catch (error) {
      //console.log("error:<\n", error, ">\n")
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
      //this.errorService.openErrorDialog(error);//TODO
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
        catalogueId = this.catalogueId ? this.catalogueId : this.value ? this.value : null,
        type = this.type,
        url = this.url,
        context = this.context

      if (catalogueId == '' || catalogueId == null)
        throw new Error("Catalogue ID must be set");

      await this.availableCatalogueService.saveCatalogue(((
        type == "MODEL" ?
          { name, description, status, catalogueId, type, url, context } as unknown :
          { name, description, status, catalogueId, type, url } as unknown)) as CatalogueEntry);

      this.ref.close();
      this.editedValue.emit(this.value);
      this.showToast('primary', this.translate.instant('general.catalogues.catalogue_added_message'), '');
    }
    catch (error) {
      let errors: Object[] = []

      if (!this.catalogueId) errors.push({
        "path": "root.catalogueId",
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
        "message": "Value required for catalogue type model",
        "errorcount": 1
      })

      console.log("error:", "\n", error)
      if (error.message == "Catalogue ID must be set") {
        console.log(error)
        /*TODO this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            {
              "path": "root.catalogueId",
              "property": "minLength",
              "message": "Value required",
              "errorcount": 1
            }
          ]
        });*/
      }/*
      else if (error.status && error.status == 400) {
        if (error.error.status == "Catalogue already exists")
          TODOthis.errorService.openErrorDialog({
            error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
              {
                "path": "root.catalogueId",
                "property": "minLength",
                "message": "A catalogue with catalogue ID < " + this.catalogueId + " > already exists",
                "errorcount": 1
              }
            ]
          });
        else this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
        });
      }*/
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


