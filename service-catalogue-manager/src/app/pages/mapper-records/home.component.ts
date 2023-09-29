import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxConfigureService } from 'ngx-configure';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { System, AppConfig } from '../../model/appConfig';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { DMMService } from '../data-model-mapper/dmm.service';
import { Router } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { StatusComponent } from './status/status.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  @Input() value;
  @Output() updateResult = new EventEmitter<unknown>();
  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemConfig: System;
  private systemLocale: string;
  private config: AppConfig;
  public serviceId: string;
  public connectorId: string;
  public serviceName: string;
  public readOnly = false;
  private recordLabel: string;
  private descriptionLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;
  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private mapRecords: any[];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private errorService: ErrorDialogService,
    private dmmService: DMMService,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private dialogService: NbDialogService
  ) {
    this.config = this.configService.config as AppConfig;
    this.systemConfig = this.config.system;
    this.systemLocale = this.config.i18n.locale;
    this.settings = this.loadTableSettings();
    this.locale = (this.configService.config as AppConfig).i18n.locale; // TODO change with user language preferences
    this.schemaDir =
      (this.systemConfig.sdkUrl.includes('localhost') ? '' : this.systemConfig.sdkUrl) +
      this.systemConfig.editorSchemaPath +
      '/' +
      this.systemLocale +
      '/' +
      this.systemConfig.editorSchemaName;
    this.loading = true;
  }

  async ngOnInit() {
    try {
      this.mapRecords = await this.dmmService.getMaps();
      void this.source.load(this.mapRecords);
    } catch (error) {
      console.error(error)
      if (error.status == 0 || error.error.status == 0){
        error.statusText = undefined
        error.message = error.error.message = "Unable to reach server"
      }
      this.errorService.openErrorDialog(error);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      this.router.navigate(['/pages/dmm-editor'])
    }
    catch (error) {
      console.error("error in addNew")
      console.error("error:<\n", error, ">\n")
      this.errorService.openErrorDialog(error);
    }
  }

  loadTableSettings(): Record<string, unknown> {
    this.recordLabel = this.translate.instant('general.dmm.record') as string;
    this.descriptionLabel = this.translate.instant('general.dmm.description') as string;
    this.actionsLabel = this.translate.instant('general.dmm.actions') as string;
    this.detailsLabel = this.translate.instant('general.dmm.details') as string;
    this.statusLabel = this.translate.instant('general.dmm.status') as string;

    return {
      mode: 'external',
      attr: {
        class: 'table table-bordered',
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        editService: false
      },
      columns: {
        name: {
          title: this.recordLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row) => row.name,
        },
        description: {
          title: this.descriptionLabel,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row) => row.description,
        },
        /*
        details: {
          title: this.detailsLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row) => row,
          renderComponent: DetailsComponent,
        },*/
        status: {
          title: this.statusLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row) => row.status,
          renderComponent: StatusComponent,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row) => row,
          renderComponent: ActionsComponent,
          onComponentInitFunction: (instance) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            instance?.updateResult?.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.ngOnInit());
          },
        }
      },
    };
  }

  resetfilters(): void {
    this.source.reset();
  }
}
