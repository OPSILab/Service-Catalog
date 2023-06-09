import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'status-render',
  template: `
    <div *ngIf="active===true">
      <button nbButton ghost shape="rectangle" size="small" status="success" (click)="showStatus()">
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

    <ng-template #showStatusDialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header class="d-flex justify-content-between">
          <h5>{{ 'general.catalogues.status' | translate }}</h5>
        </nb-card-header>
        <nb-card-body
          class="p-5 text-center"
          [innerHTML]="'general.catalogues.status' | translate : data.status"
        ></nb-card-body>
        <nb-card-footer class="d-flex justify-content-center">
          <button nbButton class="ml-2" ghost shape="rectangle" status="primary" (click)="ref.close()">
            {{ 'general.close' | translate }}
          </button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
  `,
  styleUrls: ['../../../services/availableServices/availableServices.component.scss'],
})
export class StatusRenderComponent implements OnInit {
  active: boolean | string = false;

  @Input() value;
  @ViewChild('showStatusDialog', { static: false }) showStatusDialog: TemplateRef<unknown>;

  constructor( private dialogService: NbDialogService,){}

  ngOnInit() {
    if (this.value.__zone_symbol__value != undefined) this.value = this.value.__zone_symbol__value
    //else this.active = this.value
    this.active = this.value == "unknown" ? this.value : (this.value == "active" || this.value == true)
  }

  showStatus(): void {
    this.dialogService
      .open(this.showStatusDialog, {
        hasScroll: false,
        context: {
          status: this.value,
        },
      })
      .onClose.subscribe((confirm) => {
        //if (confirm) void this.onRegisterService();
      });
  }
}

