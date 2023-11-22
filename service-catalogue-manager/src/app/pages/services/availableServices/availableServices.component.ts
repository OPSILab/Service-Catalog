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
import { CatalogueEntry } from '../../../model/catalogue/catalogueEntry';



export interface AvailableServiceRow extends ServiceModel {
  remote?: any;
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

  catalogues: any[] = [];
  activeCatalogues: any[] = [];
  serviceRegistryUrl: string;
  private config: AppConfig;
  remote: boolean;

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

  changeCountry($event: any) {
    this.selectedCatalogueCountry = $event.country || "Italy"
    this.selectedCatalogue = $event
  }

  async changes(name) {
    //if (name != this.selectedCatalogueName) this.selectedCatalogueCountry = (await this.availableCataloguesService.getCatalogueByName(name))?.country || "Italy"
    return name
  }

  async ngOnInit(): Promise<void> {
    //this.catalogues = await
    this.availableCataloguesService.getCatalogues()
      .then(catalogues => this.catalogues = catalogues)
      .catch(error => console.error(error.message))
    this.activeCatalogues = this.catalogues
    this.activeCatalogues.push({ name: this.translate.instant('general.services.local') as string, catalogueID: "local", country: this.config.system.country, active: 'active' })
    if (!this.selectedCatalogueName) this.selectedCatalogueName = this.translate.instant('general.services.local') as string
    this.selectedCatalogue = { name: this.translate.instant('general.services.local') as string, catalogueID: "local", country: this.config.system.country }
  }

  getActiveCatalogues() {
    let remoteActiveCatalogues = []
    for (let catalogue of this.activeCatalogues)
      if (catalogue.catalogueID != "local") remoteActiveCatalogues.push(catalogue)
    return remoteActiveCatalogues
  }

  async toggle(remote: boolean) {
    if (!remote) this.selectedCatalogueName = this.translate.instant('general.services.local') as string
    this.remote = remote;
    if (this.remote)
      await this.ngOnInit()
  }

  async ngOnDestroy(): Promise<void> {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
