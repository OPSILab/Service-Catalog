/* eslint-disable @typescript-eslint/no-unsafe-call */
import { LocalDataSource } from 'ng2-smart-table';
//import { CatalogueInfoRenderComponent } from './catalogue-info-render/catalogue-info-render.component';//TODO
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CatalogueDataset } from '../../../../model/catalogue/catalogueDataset';
import { ManageConfigurationsService } from '../../manage-configurations/manage-configurations.service';

@Component({
  selector: 'remote-catalogues-select',
  templateUrl: './remote-catalogues-select.component.html',
  styleUrls: ['./remote-catalogues-select.component.css']
})
export class RemoteCataloguesSelectComponent implements OnInit, OnChanges {
  @Input() selectedDatasetName: string;
  @Output() updateResult = new EventEmitter<unknown>();

  //selectedDatasetName: string;

  schemaDir: string;
  loading = false;
  public isNew = false;
  private systemLocale: string;
  public serviceId: string;
  public catalogueID: string;
  public serviceName: string;
  public readOnly = false;
  private nameLabel: string;
  private countryLabel: string;
  private actionsLabel: string;
  private infoLabel: string;
  private statusLabel: string;
  private activeLabel: string;
  private servicesLabel: string;
  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private unsubscribe: Subject<void> = new Subject();
  homePageLabel: string;
  datasets: CatalogueDataset[];


  constructor(
    private availableCatalogueDatasetsService: ManageConfigurationsService,

  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes ", changes)
  }




  async ngOnInit() {

    this.datasets = await this.availableCatalogueDatasetsService.getCatalogueDatasets()

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}



