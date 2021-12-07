/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AvailableServicesService } from './availableServices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceInfoRenderComponent } from './serviceInfoRender.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { ServiceModel } from '../../../model/services/serviceModel';
import { ActionsServiceMenuRenderComponent } from './actionsServiceMenuRender.component';
import { AppConfig } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '../../../auth/login/login.service';
import { Description } from '../../../model/services/description';
import { Description2 } from '../../../model/services/description2';
import { IsPersonalDataHandling } from '../../../model/services/isPersonalDataHandling';


export interface AvailableServiceRow extends ServiceModel {
  locale?: string;
}

@Component({
  selector: 'available-services-smart-table',
  templateUrl: './availableServices.component.html',
  styleUrls: ['./availableServices.component.scss'],
})
export class AvailableServicesComponent implements OnInit, OnDestroy {
  private serviceLabel: string;
  private descriptionLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;

  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private availableServices: ServiceModel[];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private availableServicesService: AvailableServicesService,
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
      this.availableServices = await this.availableServicesService.getServices();
      void this.source.load(
        this.availableServices.map((availableServiceDescr) => {
          /* Get Localized Human readable description of the Service, default en */
         // availableServiceDescr.hasInfo.description= this.getLocalizedDescription(availableServiceDescr);

          /* Get Localized Purposes descriptions, default en */
         // availableServiceDescr.isPersonalDataHandling = this.getLocalizedPurposesDescription(availableServiceDescr);

          return {
            ...availableServiceDescr,
            locale: this.locale,
          } as AvailableServiceRow;
        })
      );
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

 /* private getLocalizedPurposesDescription(availableServiceDescr: ServiceModel): IsPersonalDataHandling[] {
    return availableServiceDescr.isPersonalDataHandling.map((IsPersonalDataHandling) => {
      return {
        ...IsPersonalDataHandling,
        description: IsPersonalDataHandling.description.reduce((filtered: Description2[], description: Description2) => {
          if (this.locale !== 'en' && description.locale === this.locale) filtered = [description, ...filtered];
          else if (description.locale === 'en') filtered = [...filtered, description];
          return filtered;
        }, []),
      };
    });
  }*/

  /*private getLocalizedDescription(availableServiceDescr: ServiceModel): Description[] {
    return availableServiceDescr.hasInfo.description.reduce((filtered: Description[], description: Description) => {
      if (this.locale !== 'en' && description.locale === this.locale) filtered = [description, ...filtered];
      else if (description.locale === 'en') filtered = [...filtered, description];
      return filtered;
    }, []);
  }*/

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadTableSettings(): Record<string, unknown> {
    this.serviceLabel = this.translate.instant('general.services.service') as string;
    this.descriptionLabel = this.translate.instant('general.services.description') as string;
    this.actionsLabel = this.translate.instant('general.services.actions') as string;
    this.detailsLabel = this.translate.instant('general.services.details') as string;
    this.statusLabel = this.translate.instant('general.services.status') as string;

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
        serviceName: {
          title: this.serviceLabel,
          type: 'text',
          width: '25%',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row.title,
        },
        humanReadableDescription: {
          title: this.descriptionLabel,
          editor: {
            type: 'textarea',
          },
          width: '65%',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row.hasInfo.description.description,
        },
        details: {
          title: this.detailsLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row,
          renderComponent: ServiceInfoRenderComponent,
        },
        status: {
          title: this.statusLabel,
          filter: false,
          sort: false,
          width: '5%',
          type: 'text',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row.status,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '5%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row,
          renderComponent: ActionsServiceMenuRenderComponent,
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
