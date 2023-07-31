import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbCardModule, NbSelectModule, NbAccordionModule, NbButtonModule, NbSpinnerModule, NbIconModule, NbToastrModule, NbContextMenuModule, NbInputModule, NbCheckboxModule, NbTagModule, NbRadioModule, NbTabsetModule, NbAutocompleteModule } from "@nebular/theme";
import { TranslateModule } from "@ngx-translate/core";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { AvailableConnectorsService } from "./availableConnectors.service";
import { ActionsConnectorMenuRenderComponent } from "./actionsConnectorMenuRender.component";
import { DialogAddNewPromptComponent } from "./addConnector/dialog-add-new-prompt.component";
import { AvailableConnectorsComponent } from "./availableConnectors.component";
import { ConnectorInfoRenderComponent } from "./connectorInfoRender.component";
import { ConnectorStatusRenderComponent } from "./custom-status-render.component";
import { ConnectorsRoutingModule } from "./connectors-routing.module";



@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    NbButtonModule,
    ConnectorsRoutingModule,
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
    AvailableConnectorsComponent,
    ConnectorInfoRenderComponent,
    DialogAddNewPromptComponent,
    ActionsConnectorMenuRenderComponent,
    ConnectorStatusRenderComponent,
  ],
  providers: [AvailableConnectorsService],
  entryComponents: [
    AvailableConnectorsComponent,
    ConnectorInfoRenderComponent,
    DialogAddNewPromptComponent,
    ActionsConnectorMenuRenderComponent,
    ConnectorStatusRenderComponent,
  ],
})
export class ConnectorsModule {}
