/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AvailableConnectorsService } from './availableConnectors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectorInfoRenderComponent } from './connectorInfoRender.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { AppConfig } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '../../../auth/login/login.service';
import { ActionsConnectorMenuRenderComponent } from './actionsConnectorMenuRender.component';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';

@Component({
  selector: 'available-connectors-smart-table',
  templateUrl: './availableConnectors.component.html',
  styleUrls: ['./availableConnectors.component.scss'],
})
export class AvailableConnectorsComponent implements OnInit, OnDestroy {
  private connectorLabel: string;
  private descriptionLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;

  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private availableConnectors: ConnectorEntry[];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private availableConnectorsService: AvailableConnectorsService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private loginService: LoginService,
    private errorDialogService: ErrorDialogService,
    private toastrService: NbToastrService
  ) {
    this.settings = this.loadTableSettings();
    this.locale = (this.configService.config as AppConfig).i18n.locale; // TODO change with user language preferences
  }

  async ngOnInit(): Promise<void> {
    try {
      this.availableConnectors = await this.availableConnectorsService.getConnectors();
      void this.source.load(this.availableConnectors);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.error.statusCode === '401') {
        void this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }

    // Open a Toastr if there is a message in input query
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.toastrMessage)
      this.toastrService.primary('', queryParams.toastrMessage, {
        position: NbGlobalLogicalPosition.BOTTOM_END,
        duration: 3500,
      });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadTableSettings(): Record<string, unknown> {
    this.connectorLabel = this.translate.instant('general.connectors.connector') as string;
    this.descriptionLabel = this.translate.instant('general.connectors.description') as string;
    this.actionsLabel = this.translate.instant('general.connectors.actions') as string;
    this.detailsLabel = this.translate.instant('general.connectors.details') as string;
    this.statusLabel = this.translate.instant('general.connectors.status') as string;

    return {
      mode: 'external',
      attr: {
        class: 'table table-bordered',
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        name: {
          title: this.connectorLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.name,
        },
        description: {
          title: this.descriptionLabel,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.description,
        },
        details: {
          title: this.detailsLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row,
          renderComponent: ConnectorInfoRenderComponent,
        },
        status: {
          title: this.statusLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'text',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row.status,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: ConnectorEntry) => row,
          renderComponent: ActionsConnectorMenuRenderComponent,
          onComponentInitFunction: (instance) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            instance.updateResult.pipe(takeUntil(this.unsubscribe)).subscribe((updatedServiceData: unknown) => this.ngOnInit());
          },
        },
      },
    };
  }

  resetfilters(): void {
    this.source.reset();
  }
}
