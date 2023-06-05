
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../../../model/appConfig';
import { CatalogueDataset } from '../../../model/catalogue/catalogueDataset';
//import { CatalogueDatasetLog } from '../../../model/catalogueDataset/catalogueDatasetEntryLog';

@Injectable({
  providedIn: 'root'
})
export class ManageConfigurationsService {
  private serviceRegistryUrl: string;
  private config: AppConfig;

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
  }
  getCatalogueDatasets(): CatalogueDataset[] | Promise<CatalogueDataset[]> {
    try {
      return this.http.get<CatalogueDataset[]>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets/public`).toPromise();
    }
    catch (error) {
      console.error("AvailableCatalogueDatasetsService: catalogueDatasets not found")
      console.error("error:<\n", error, ">\n")
    }
  }

  getCatalogueDatasetsCount(): Promise<{ total: number, publicCatalogueDatasets, privateCatalogueDatasets }> {
    return this.http.get<{ total: number, publicCatalogueDatasets, privateCatalogueDatasets }>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets/count`).toPromise();
  }

  getCatalogueDataset(catalogueDatasetID: string): Promise<CatalogueDataset> {
    return this.http.get<CatalogueDataset>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets/json?catalogueDatasetID=${catalogueDatasetID}`).toPromise();
  }

  saveCatalogueDataset(catalogueDataset: CatalogueDataset): Promise<CatalogueDataset> {
    try {
      return this.http.post<CatalogueDataset>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets`, catalogueDataset).toPromise();
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
      console.error("message:<\n", error.error.message, ">\n")
    }
  }

  registerCatalogueDataset(catalogueDataset: CatalogueDataset): Promise<CatalogueDataset> {
    return this.http.put<CatalogueDataset>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets?catalogueDatasetID=${catalogueDataset.catalogueDatasetID}`, catalogueDataset).toPromise();
  }

  deregisterCatalogueDataset(catalogueDataset: CatalogueDataset): Promise<CatalogueDataset> {
    return this.http.put<CatalogueDataset>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets?catalogueDatasetID=${catalogueDataset.catalogueDatasetID}`, catalogueDataset).toPromise();
  }

  updateCatalogueDataset(catalogueDataset: CatalogueDataset, catalogueDatasetID: string): Promise<CatalogueDataset> {
    return this.http.put<CatalogueDataset>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets?catalogueDatasetID=${catalogueDataset.catalogueDatasetID}`, catalogueDataset).toPromise();
  }

  deleteCatalogueDataset(catalogueDatasetID: string): Promise<CatalogueDataset> {
    return this.http.delete<CatalogueDataset>(`${this.serviceRegistryUrl}/api/v2/catalogueDatasets?catalogueDatasetID=${catalogueDatasetID}`).toPromise();
  }
}

