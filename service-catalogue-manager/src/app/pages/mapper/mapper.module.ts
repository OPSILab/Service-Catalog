import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapperComponent } from './mapper.component';
import { NbAccordionModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbToggleModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { MapperRoutingModule } from './mapper-routing.module';
import { ImportComponent } from './import/import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DMMRoutingModule } from '../data-model-mapper/dmm-routing.module';



@NgModule({
  declarations: [MapperComponent, ImportComponent],
  imports: [
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    FormsModule,
    CommonModule,
    MapperRoutingModule,
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
  ]
})
export class MapperModule { }
