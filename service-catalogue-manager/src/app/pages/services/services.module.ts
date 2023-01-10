import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AvailableServicesComponent } from './availableServices/availableServices.component';
import { AvailableConnectorsComponent } from './availableConnectors/availableConnectors.component';
import { AvailableServicesService } from './availableServices/availableServices.service';
import { ServicesRoutingModule } from './services-routing.module';
import { ServiceInfoRenderComponent } from './availableServices/serviceInfoRender.component';
import { ConnectorInfoRenderComponent } from './availableConnectors/connectorInfoRender.component';
import { EditorComponent } from './service-editor/editor.component';
import { DialogExportPromptComponent } from './service-editor/dialog-export-prompt/dialog-export-prompt.component';
import { DialogImportPromptComponent } from './service-editor/dialog-import-prompt/dialog-import-prompt.component';
import { DialogAddNewPromptComponent } from './availableConnectors/addConnector/dialog-add-new-prompt.component';
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
} from '@nebular/theme';
import { ActionsServiceMenuRenderComponent } from './availableServices/actionsServiceMenuRender.component';
import { ActionsConnectorMenuRenderComponent } from './availableConnectors/actionsConnectorMenuRender.component';
//import { FormsModule } from '@angular/forms';
import { AvailableConnectorsService } from './availableConnectors/availableConnectors.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    NbButtonModule,
    ServicesRoutingModule,
    NbSpinnerModule,
    NbIconModule,
    NbToastrModule,
    NbContextMenuModule,
    NbInputModule,
    NbCheckboxModule,
    NbRadioModule,
    NbTabsetModule,
    TranslateModule.forChild({}),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AvailableServicesComponent,
    ServiceInfoRenderComponent,
    AvailableConnectorsComponent,
    ConnectorInfoRenderComponent,
    EditorComponent,
    DialogExportPromptComponent,
    DialogImportPromptComponent,
    DialogAddNewPromptComponent,
    ActionsConnectorMenuRenderComponent,
    ActionsServiceMenuRenderComponent,
  ],
  providers: [AvailableServicesService, AvailableConnectorsService],
  entryComponents: [
    ActionsServiceMenuRenderComponent,
    ActionsConnectorMenuRenderComponent,
    ServiceInfoRenderComponent,
    ConnectorInfoRenderComponent,
    DialogImportPromptComponent,
    DialogAddNewPromptComponent,
    DialogExportPromptComponent,
  ],
})
export class ServicesModule {}
