import { AvailableCataloguesService } from './../../management/availableCatalogues/availableCatalogues.service';
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxConfigureService } from 'ngx-configure';
import { ServiceModel } from '../../../model/services/serviceModel';
import { AppConfig } from '../../../model/appConfig';
import { Subject } from 'rxjs';



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
  @Input() value: ServiceModel;
  @Input() selectedCatalogueName: string;
  @Input() availableServices: ServiceModel[];
  @Output() updateResult = new EventEmitter<unknown>();

  public settings: Record<string, unknown>;
  public source: LocalDataSource = new LocalDataSource();
  private unsubscribe: Subject<void> = new Subject();

  catalogues;
  serviceRegistryUrl: string;
  private config: AppConfig;

  constructor(
    private availableCataloguesService: AvailableCataloguesService,
    private configService: NgxConfigureService,
  ) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
  }




  async ngOnInit(): Promise<void> {
    this.catalogues = await this.availableCataloguesService.getCatalogues()
    this.catalogues.push({name:'Local Service Catalogue', apiEndpoint:this.serviceRegistryUrl})
    if (!this.selectedCatalogueName) this.selectedCatalogueName = 'Local Service Catalogue'
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
