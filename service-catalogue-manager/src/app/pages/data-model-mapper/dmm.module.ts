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
  ],
  declarations: [DMMComponent,DialogImportComponent,],
  providers: [DMMService],
  entryComponents: [
    DialogImportComponent,
    
  ]
})
export class DMMModule {}
