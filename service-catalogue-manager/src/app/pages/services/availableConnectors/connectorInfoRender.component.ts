import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';

@Component({
  templateUrl: `./connectorInfoRender.component.html`,
})
export class ConnectorInfoRenderComponent {
  @Input() value: ConnectorEntry;

  @ViewChild('availableConnectorInfoModal', { static: true }) connectorInfoModalRef: TemplateRef<unknown>;

  constructor(private modalService: NbDialogService, private translateService: TranslateService) {}

  showConnectorInfoModal(): void {
    this.modalService.open(this.connectorInfoModalRef, {
      context: {
        modalHeader: this.value.name,
        description: this.value.description,
        serviceId: this.value.serviceId,
        status: this.value.status,
        connectorUrl: this.value.url,
      },
      hasScroll: true,
    });
  }
}
