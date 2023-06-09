import { Injectable } from '@angular/core';
import { CatalogueEntry } from '../../../model/catalogue/catalogueEntry';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../../../model/appConfig';
//import { CatalogueEntryLog } from '../../../model/catalogue/catalogueEntryLog';

@Injectable({
  providedIn: 'root'
})
export class AvailableCataloguesService {

  private serviceRegistryUrl: string;
  private config: AppConfig;

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
  }
  getCatalogues(): CatalogueEntry[] | Promise<CatalogueEntry[]> {
    try {
      return this.http.get<CatalogueEntry[]>(`${this.serviceRegistryUrl}/api/v2/catalogues/public`).toPromise();
    }
    catch (error) {
      console.error("AvailableCataloguesService: catalogues not found")
      console.error("error:<\n", error, ">\n")
    }
  }

  getRemoteCatalogues(url): CatalogueEntry[] | Promise<CatalogueEntry[]> {
    try {
      return this.http.get<CatalogueEntry[]>(url + "/api/v2/catalogues/public").toPromise();
    }
    catch (error) {
      console.error("AvailableCataloguesService: catalogues not found")
      console.error("error:<\n", error, ">\n")
    }
  }

  getCataloguesFromFile(URL: any): CatalogueEntry[] | PromiseLike<CatalogueEntry[]> {
    try {
      return this.http.get<CatalogueEntry[]>(URL).toPromise();
    }
    catch (error) {
      console.error("AvailableCataloguesService: catalogues not found")
      console.error("error:<\n", error, ">\n")
    }
  }

  getCatalogueByURL(apiEndpoint: string): CatalogueEntry | Promise<CatalogueEntry> {
    return this.http.get<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues/json?apiEndpoint=${apiEndpoint}`).toPromise();
  }

  getCataloguesCount(): Promise<{ total: number, publicCatalogues, privateCatalogues }> {
    return this.http.get<{ total: number, publicCatalogues, privateCatalogues }>(`${this.serviceRegistryUrl}/api/v2/catalogues/count`).toPromise();
  }

  getCatalogue(catalogueID: string): Promise<any> {
    return this.http.get<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues/json?catalogueID=${catalogueID}`).toPromise();
  }

  getCatalogueByName(name: string): Promise<any> {
    return this.http.get<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues/json?name=${name}`).toPromise();
  }

  saveCatalogue(catalogue: CatalogueEntry): Promise<CatalogueEntry> {
    try {
      return this.http.post<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues`, catalogue).toPromise();
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
      console.error("message:<\n", error.error.message, ">\n")
    }
  }

  registerCatalogue(catalogue: CatalogueEntry): Promise<CatalogueEntry> {
    return this.http.put<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogue.catalogueID}&secretChanged=${false}`, catalogue).toPromise();
  }

  deregisterCatalogue(catalogue: CatalogueEntry): Promise<CatalogueEntry> {
    return this.http.put<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogue.catalogueID}&secretChanged=${false}`, catalogue).toPromise();
  }

  updateCatalogue(catalogue: CatalogueEntry, catalogueID: string, secretChanged): Promise<CatalogueEntry> {
    return this.http.put<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogue.catalogueID}&secretChanged=${secretChanged}`, catalogue).toPromise();
  }

  deleteCatalogue(catalogueID: string): Promise<CatalogueEntry> {
    return this.http.delete<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogueID}`).toPromise();
  }

  getStatus(catalogueID: string) {
    return this.http.get<any>(`${this.serviceRegistryUrl}/api/v2/federated/status?catalogueID=${catalogueID}`).toPromise();
  }
}

