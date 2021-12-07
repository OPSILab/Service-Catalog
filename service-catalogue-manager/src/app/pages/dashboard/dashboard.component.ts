import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { AvailableServicesService } from '../services/availableServices/availableServices.service';
import { TranslateService } from '@ngx-translate/core';
import { AuditLog } from '../../model/auditlogs/auditlogs.model';
import { AvailableConnectorsService } from '../services/availableConnectors/availableConnectors.service';


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
  public recordServiceSector:Record<string,number>={};
  public recordThematicArea:Record<string,number>={};
  public recordLifeEvent:Record<string,number>={};
  public recordBusinessEvent:Record<string,number>={};

  constructor(
    
    private servicesService: AvailableServicesService,
    private connectorsService: AvailableConnectorsService,
    private router: Router,
    private translateService: TranslateService,
    private loginService: LoginService,
    private errorDialogService: ErrorDialogService,
        
  ) {}

  async ngOnInit(): Promise<void> {
    const onlyRegistered = true;
   
    this.recordServiceSector["aa"]=3;
    this.recordServiceSector["bbb"]=7;
    this.recordServiceSector["ccc"]=5;
    this.recordServiceSector["dd"]=5;

    this.recordThematicArea=this.recordServiceSector;
    this.recordLifeEvent=this.recordServiceSector;
    this.recordBusinessEvent=this.recordServiceSector;


    try {
      
      
        this.auditCardSet = [
          {
            title: this.translateService.instant('general.dashboard.services') as string,
            iconClass: 'nb-grid-b-outline',
            type: 'primary',
            value: (await this.servicesService.getServicesCount()).toString(),
          },
          {
            title: this.translateService.instant('general.dashboard.connectors') as string,
            iconClass: 'nb-power',
            type: 'success',
            value: "1" /*(await this.connectorsService.getConnectorsCount()).toString()*/,
          },
          {
            title: this.translateService.instant('general.dashboard.publicServices') as string,
            iconClass: 'nb-home',
            type: 'info',
            value: "2" /*(await this.connectorsService.getConnectorsCount()).toString()*/,
          },
          {
            title: this.translateService.instant('general.dashboard.privateServices') as string,
            iconClass: 'nb-e-commerce',
            type: 'warning',
            value: "1" /*(await this.connectorsService.getConnectorsCount()).toString()*/,
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



