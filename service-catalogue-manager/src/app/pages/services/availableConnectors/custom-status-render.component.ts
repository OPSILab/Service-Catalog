import { ConnectorEntry } from '../../../model/connector/connectorEntry';
import { Component, Input, OnInit } from '@angular/core';
import { AvailableServiceRow } from '../availableServices/availableServices.component';

@Component({
  template: `
    <div *ngIf="active; else notActive">
      <button nbButton ghost shape="rectangle" size="small" status="success">
        <i class="material-icons">check_circle</i>
      </button>
    </div>

    <ng-template #notActive>
      <button nbButton ghost nbTooltip="Under Development" shape="rectangle" size="small" status="warning">
        <i class="material-icons">check_circle</i>
      </button>
    </ng-template>
  `,
  styleUrls: ['../availableServices/availableServices.component.scss'],
})
export class ConnectorStatusRenderComponent implements OnInit {
  active: boolean = false;

  @Input() value: ConnectorEntry;

  ngOnInit() {
    console.log ("this.value.status == active", this.value)
    this.active = this.value.status == "active";
  }
}
