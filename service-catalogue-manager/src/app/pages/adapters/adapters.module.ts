import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbCardModule, NbSelectModule, NbAccordionModule, NbButtonModule, NbSpinnerModule, NbIconModule, NbToastrModule, NbContextMenuModule, NbInputModule, NbCheckboxModule, NbTagModule, NbRadioModule, NbTabsetModule, NbAutocompleteModule } from "@nebular/theme";
import { TranslateModule } from "@ngx-translate/core";
import { Ng2SmartTableModule } from "ng2-smart-table";

import { AdaptersRoutingModule } from "./adapters-routing.module";
import { ActionsAdapterMenuRenderComponent } from "./actions-adapter-menu-render/actions-adapter-menu-render.component";
import { AdapterInfoRenderComponent } from "./adapter-info-render/adapter-info-render.component";
import { AddAdapterComponent } from "./add-adapter/add-adapter.component";
import { AvailableAdaptersComponent } from "./available-adapters.component";
import { AvailableAdaptersService } from "./available-adapters.service";


@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    NbButtonModule,
    AdaptersRoutingModule,
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
  ],
  declarations: [
    AvailableAdaptersComponent,
    AddAdapterComponent,
    ActionsAdapterMenuRenderComponent,
    AdapterInfoRenderComponent,
  ],
  providers: [AvailableAdaptersService],
  entryComponents: [
  ],
})
export class AdaptersModule {}
