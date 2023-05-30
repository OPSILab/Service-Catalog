import { AvailableCataloguesService } from './../../management/availableCatalogues/availableCatalogues.service';
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxConfigureService } from 'ngx-configure';
import { ServiceModel } from '../../../model/services/serviceModel';
import { AppConfig } from '../../../model/appConfig';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import { InfoRenderRemoteCatalogueComponent } from '../../management/remote-catalogues/info-render-remote-catalogue/info-render-remote-catalogue.component';



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
  //@Input()
  selectedCatalogueCountry: string = "Italy";
  selectedCatalogue;
  @Input() availableServices: ServiceModel[];
  @Output() updateResult = new EventEmitter<unknown>();

  public settings: Record<string, unknown>;
  public source: LocalDataSource = new LocalDataSource();
  private unsubscribe: Subject<void> = new Subject();

  catalogues;
  serviceRegistryUrl: string;
  private config: AppConfig;

  constructor(
    private translate: TranslateService,
    private availableCataloguesService: AvailableCataloguesService,
    private configService: NgxConfigureService,
    private dialogService: NbDialogService
  ) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
  }

  getSelectLabel() {
    return this.translate.instant('general.catalogues.select') as string;
  }

  getCountryLabel() {
    return this.translate.instant('general.catalogues.country') as string;
  }

  showCatalogueInfoModal() {
    this.dialogService.open(InfoRenderRemoteCatalogueComponent.prototype.catalogueInfoModalRef).onClose.subscribe(() => {
      void console.log("confirm ok", this.ngOnInit());
    });
  }

  changeCountry($event:any) {
    console.log($event)
    this.selectedCatalogueCountry = $event.country || "Italy"
  }

  async changes(name) {
    //if (name != this.selectedCatalogueName) this.selectedCatalogueCountry = (await this.availableCataloguesService.getCatalogueByName(name))?.country || "Italy"
    return name
  }

  async log() {
    console.log("click")
    //this.selectedCatalogueCountry = (await this.availableCataloguesService.getCatalogueByName(this.selectedCatalogueName))?.country || "Italy"
  }

  async ngOnInit(): Promise<void> {
    this.catalogues = await this.availableCataloguesService.getCatalogues()
    this.catalogues.push({ name: this.translate.instant('general.services.local') as string, catalogueID: "local" })
    if (!this.selectedCatalogueName) this.selectedCatalogueName = this.translate.instant('general.services.local') as string
    this.selectedCatalogue= this.catalogues[0]
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
