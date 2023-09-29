import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NbAccordionModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { StatusComponent } from './status/status.component';
import { TransformComponent } from './transform/transform.component';
import { ImportComponent } from './import/import.component';



@NgModule({
  declarations: [
    ActionsComponent,
    DetailsComponent,
    StatusComponent,
    TransformComponent,
    ImportComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbToastrModule,
    NbContextMenuModule,
    NbInputModule,
    NbCheckboxModule,
    NbTagModule,
    NbRadioModule,
    NbTabsetModule,
    TranslateModule.forChild({}),
    FormsModule,
    ReactiveFormsModule,
    NbAutocompleteModule
  ]
})
export class HomeModule { }
