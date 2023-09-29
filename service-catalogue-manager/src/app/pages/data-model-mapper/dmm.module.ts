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
import { TranslateModule } from '@ngx-translate/core';
import { DMMComponent } from './dmm.component';
import { DialogImportComponent } from './dialog-import/dialog-import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DMMService } from './dmm.service';
import { DialogDataMapComponent } from './dialog-dataMap/dialog-dataMap.component';
import { CreateMapComponent } from './create-map/create-map.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ExportFileComponent } from './export-file/export-file.component';
import { DialogComponent } from './create-map/dialog/dialog.component';

@NgModule({
  imports: [
    Ng2SmartTableModule,
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
  declarations: [DialogImportComponent,DialogDataMapComponent, CreateMapComponent, ExportFileComponent, DMMComponent, DialogComponent],
  providers: [DMMService],
  entryComponents: [
    DialogImportComponent,
    DialogDataMapComponent

  ]
})
export class DMMModule {}
