import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule,
  NbSpinnerModule,
  NbIconModule,
  NbToastrModule,
  NbContextMenuModule,
  NbInputModule,
  NbTabsetModule,
  NbCheckboxModule,
  NbRadioModule,
  NbTagModule,
  NbAutocompleteModule,
  NbTooltipModule,
} from '@nebular/theme';
import { AvailableCataloguesComponent } from './availableCatalogues/availableCatalogues.component';
import { AvailableCataloguesService } from './availableCatalogues/availableCatalogues.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementRoutingModule } from './management-routing.module';
import { AddCatalogueComponent } from './availableCatalogues/add-catalogue/add-catalogue.component';
import { ActionsCatalogueMenuRenderComponent } from './availableCatalogues/actions-catalogue-menu-render/actions-catalogue-menu-render.component';
import { StatusRenderComponent } from './availableCatalogues/status-render/status-render.component';
import { RemoteCataloguesComponent } from './remote-catalogues/remote-catalogues.component';
import { ManageConfigurationsComponent } from './manage-configurations/manage-configurations.component';
import { AddRemoteCatalogueDatasetComponent } from './manage-configurations/add-remote-catalogue-dataset/add-remote-catalogue-dataset.component';
import { ActionsMenuRenderComponent } from './manage-configurations/actions-menu-render/actions-menu-render.component';
import { RemoteCataloguesSelectComponent } from './remote-catalogues/remote-catalogues-select/remote-catalogues-select.component';
import { ActionsFederateComponent } from './remote-catalogues/remote-catalogues-select/actions-federate/actions-federate.component';
import { InfoRenderRemoteCatalogueComponent } from './remote-catalogues/info-render-remote-catalogue/info-render-remote-catalogue.component';
import { IconComponent } from './availableCatalogues/iconRender/icon.component';
import { ActiveRenderComponent } from './availableCatalogues/active-render/active-render.component';


@NgModule({
  imports: [
    CommonModule,
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
    NbAutocompleteModule,
    ManagementRoutingModule,
    NbTooltipModule
  ],
  declarations: [
    AvailableCataloguesComponent,
    AddCatalogueComponent,
    ActionsCatalogueMenuRenderComponent,
    StatusRenderComponent,
    RemoteCataloguesComponent,
    ManageConfigurationsComponent,
    AddRemoteCatalogueDatasetComponent,
    ActionsMenuRenderComponent,
    RemoteCataloguesSelectComponent,
    ActionsFederateComponent,
    InfoRenderRemoteCatalogueComponent,
    IconComponent,
    ActiveRenderComponent
  ],
  providers: [AvailableCataloguesService],
  entryComponents: [
  ],
})
export class ManagementModule {}
