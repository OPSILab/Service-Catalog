import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { AvailableServicesService } from '../services/availableServices/availableServices.service';
import { TranslateService } from '@ngx-translate/core';
import { AvailableConnectorsService } from '../services/availableConnectors/availableConnectors.service';
import { ServicesCount } from '../../model/services/servicesCount';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  value: string;
}

@Component({
  selector: 'ngx-d3',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public auditCardSet: CardSettings[] = [];
  public servicesCountBySector: Record<string, number>;
  public servicesCountByThematicArea: Record<string, number>;
  public servicesCountByGroupedBy: Record<string, number>;
  public servicesCountByLocation: Record<string, number>;
  public servicesCount: ServicesCount;

  constructor(
    private servicesService: AvailableServicesService,
    private connectorsService: AvailableConnectorsService,
    private router: Router,
    private translateService: TranslateService,
    private loginService: LoginService,
    private errorDialogService: ErrorDialogService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.servicesCount = await this.servicesService.getServicesCount();
      this.servicesCountBySector = (await this.servicesService.getServicesCountBySector()).reduce((partial, current) => {
        return {
          ...partial,
          [current['sector']]: current['count'],
        } as Record<string, number>;
      }, {} as Record<string, number>);

      this.servicesCountByThematicArea = (await this.servicesService.getServicesCountByThematicArea()).reduce((partial, current) => {
        return {
          ...partial,
          [current['thematicArea']]: current['count'],
        } as Record<string, number>;
      }, {} as Record<string, number>);
      this.servicesCountByGroupedBy = (await this.servicesService.getServicesCountByGroupedBy()).reduce((partial, current) => {
        return {
          ...partial,
          [current['isGroupedBy']]: current['count'],
        } as Record<string, number>;
      }, {} as Record<string, number>);
      this.servicesCountByLocation = (await this.servicesService.getServicesCountByLocation()).reduce((partial, current) => {
        return {
          ...partial,
          [current['location']]: current['count'],
        } as Record<string, number>;
      }, {} as Record<string, number>);

      this.auditCardSet = [
        {
          title: this.translateService.instant('general.dashboard.services') as string,
          iconClass: 'nb-grid-b-outline',
          type: 'primary',
          value: this.servicesCount.total.toString(),
        },
        {
          title: this.translateService.instant('general.dashboard.connectors') as string,
          iconClass: 'nb-power',
          type: 'success',
          value: '1' /*(await this.connectorsService.getConnectorsCount()).toString()*/,
        },
        {
          title: this.translateService.instant('general.dashboard.publicServices') as string,
          iconClass: 'nb-home',
          type: 'info',
          value: this.servicesCount.publicServices.toString(),
        },
        {
          title: this.translateService.instant('general.dashboard.privateServices') as string,
          iconClass: 'nb-e-commerce',
          type: 'warning',
          value: this.servicesCount.privateServices.toString(),
        },
      ];
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.error.statusCode === '401') {
        this.loginService.logout().catch((error) => this.errorDialogService.openErrorDialog(error));
        // this.router.navigate(['/login']);
      } else this.errorDialogService.openErrorDialog(error);
    }
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
