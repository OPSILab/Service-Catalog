/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, OnInit, OnDestroy,EventEmitter } from '@angular/core';
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
import { CustomKeywordRenderComponent } from './custom-keyword-render.component';
import { CustomStatusRenderComponent } from './custom-status-render.component';
import { Description } from '../../../model/services/description';



export interface AvailableServiceRow extends ServiceModel {
  locale?: string;
  spatial?: string;
  description?: string;
  keywords?: string[];
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
  private spatialLabel: string;
  private keywords: string;

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
   // this.locale = (this.configService.config as AppConfig).i18n.locale;    // TODO change with user language preferences
   this.locale=this.translate.currentLang;


  }




  async ngOnInit(): Promise<void> {

      this.loadSource();
      this.translate.onLangChange.subscribe(() =>{
        this.loadSource();
       });
  }

  private getLocalizedDescription(availableServiceDescr: ServiceModel): Description[] {
    return availableServiceDescr.hasInfo.description.reduce((filtered: Description[], description: Description) => {
      if (this.locale !== 'en' && description.locale === this.locale) filtered = [description, ...filtered];
      else if (description.locale === 'en') filtered = [...filtered, description];
      return filtered;
    }, []);
  }

  private async loadSource(): Promise<void> {
    try {
      this.locale=this.translate.currentLang;
      this.availableServices = await this.availableServicesService.getServices();
       this.source.load(
        this.availableServices.map((availableServiceDescr) => {
          /* Get Localized Human readable description of the Service, default en */
           availableServiceDescr.hasInfo.description= this.getLocalizedDescription(availableServiceDescr);

          /* Get Localized Purposes descriptions, default en */
          // availableServiceDescr.isPersonalDataHandling = this.getLocalizedPurposesDescription(availableServiceDescr);

          return {
            ...availableServiceDescr,
            locale: this.locale,
            spatial: availableServiceDescr.hasInfo.spatial,
            description: availableServiceDescr.hasInfo.description[0]?.description,
            keywords:availableServiceDescr.hasInfo.keyword,
          } as AvailableServiceRow;
        })
      );

    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

      if (error.statusCode === '401'||error.status==401)  {
        void this.loginService.logout().catch((error) => console.log(error));
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
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadTableSettings(): Record<string, unknown> {
    this.serviceLabel = this.translate.instant('general.services.service') as string;
    this.descriptionLabel = this.translate.instant('general.services.description') as string;
    this.actionsLabel = this.translate.instant('general.services.actions') as string;
    this.detailsLabel = this.translate.instant('general.services.details') as string;
    this.statusLabel = this.translate.instant('general.services.status') as string;
    this.spatialLabel = this.translate.instant('general.services.location') as string;
    this.keywords = this.translate.instant('general.services.keywords') as string;



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
        title: {
          title: this.serviceLabel,
          type: 'text',
          width: '15%',
          valuePrepareFunction: (cell, row: AvailableServiceRow) => row.title,
        },
      spatial: {
        title: this.spatialLabel,
        type: 'text',
        width: '15%',
      },

      description: {
        title: this.descriptionLabel,
        editor: {
          type: 'textarea',
        },
        width: '55%',
      },
      keywords: {
        title: "Keywords",
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: AvailableServiceRow) => row,
        renderComponent: CustomKeywordRenderComponent,

      },

      status: {
        title: this.statusLabel,
        sort: false,
        filter: false,
        width: '5%',
        type: 'custom',
        valuePrepareFunction: (cell, row: AvailableServiceRow) => row.status,
        renderComponent: CustomStatusRenderComponent,
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
