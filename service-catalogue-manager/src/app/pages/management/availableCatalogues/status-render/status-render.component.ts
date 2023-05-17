import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status-render',
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
  styleUrls: ['../../../services/availableServices/availableServices.component.scss'],
})
export class StatusRenderComponent implements OnInit {
  active: boolean = false;

  @Input() value;

  ngOnInit() {
    this.active = this.value == "active" || this.value.__zone_symbol__value == "active";
  }
}

