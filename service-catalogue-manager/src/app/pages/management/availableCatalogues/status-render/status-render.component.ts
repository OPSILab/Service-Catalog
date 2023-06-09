import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status-render',
  template: `
    <div *ngIf="active===true">
      <button nbButton ghost shape="rectangle" size="small" status="success">
        <i class="material-icons">check_circle</i>
      </button>
    </div>

    <div *ngIf="active===false">
      <button nbButton ghost nbTooltip="Under Development" shape="rectangle" size="small" status="warning">
        <i class="material-icons">check_circle</i>
      </button>
    </div>

    <div *ngIf="active=='unknown'">
      <button nbButton ghost nbTooltip="Under Development" shape="rectangle" size="small" status="danger">
        <i class="material-icons">check_circle</i>
      </button>
    </div>
  `,
  styleUrls: ['../../../services/availableServices/availableServices.component.scss'],
})
export class StatusRenderComponent implements OnInit {
  active: boolean | string = false;

  @Input() value;

  ngOnInit() {
    if (this.value.__zone_symbol__value != undefined) this.value = this.value.__zone_symbol__value
    //else this.active = this.value
    this.active = this.value == "unknown" ? this.value : (this.value == "active" || this.value == true)
  }
}

