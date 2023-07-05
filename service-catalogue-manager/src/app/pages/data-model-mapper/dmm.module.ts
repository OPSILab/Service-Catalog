import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule,
  NbIconModule,
  NbTabsetModule,
  NbToggleModule,
  NbInputModule,
  NbRadioModule,
  NbWindowModule,
  NbCheckboxModule,
  NbUserModule,
  NbAutocompleteModule,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { DMMRoutingModule } from './dmm-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DMMComponent } from './dmm.component';
import { DialogImportComponent } from './dialog-import/dialog-import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DMMService } from './dmm.service';
import { HttpClient } from '@angular/common/http';
import { DialogDataMapComponent } from './dialog-dataMap/dialog-dataMap.component';
import { CreateMapAndAdapterComponent } from './create-map-and-adapter/create-map-and-adapter.component';



@NgModule({
  imports: [
    CommonModule,
    DMMRoutingModule,
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbToggleModule,
    NbIconModule,
    NbTabsetModule,
    NbToggleModule,
    FormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NbSelectModule,
    NbInputModule,
    NbRadioModule,
    ReactiveFormsModule,
    NbWindowModule.forChild(),
    NbCheckboxModule,
    NbUserModule,
    TranslateModule.forChild({}),
    NbAutocompleteModule
  ],
  declarations: [DMMComponent,DialogImportComponent,DialogDataMapComponent, CreateMapAndAdapterComponent,],
  providers: [DMMService],
  entryComponents: [
    DialogImportComponent,
    DialogDataMapComponent

  ]
})
export class DMMModule {}
