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
      console.log("AvailableCataloguesService: catalogues not found")
      console.log("error:<\n", error, ">\n")
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
    }
  }

  getRemoteCatalogues(url): CatalogueEntry[] | Promise<CatalogueEntry[]> {
    try {
      console.debug("get remote  catalogues\n", url)
      return this.http.get<CatalogueEntry[]>(url+"/api/v2/catalogues/public").toPromise();
    }
    catch (error) {
      console.log("AvailableCataloguesService: catalogues not found")
      console.log("error:<\n", error, ">\n")
      //if (error.error) if (error.error.message) console.log("message:<\n", error.error.message, ">\n")
      //else if (error.message) console.log("message:<\n", error.message, ">\n")
    }
  }

  getCataloguesCount(): Promise<{ total: number, publicCatalogues, privateCatalogues }> {
    return this.http.get<{ total: number, publicCatalogues, privateCatalogues }>(`${this.serviceRegistryUrl}/api/v2/catalogues/count`).toPromise();
  }

  getCatalogue(catalogueID: string): Promise<CatalogueEntry> {
    return this.http.get<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues/json?catalogueID=${catalogueID}`).toPromise();
  }

  saveCatalogue(catalogue: CatalogueEntry): Promise<CatalogueEntry> {
    try {
      return this.http.post<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues`, catalogue).toPromise();
    }
    catch (error) {
      console.log("error:<\n", error, ">\n")
      console.log("message:<\n", error.error.message, ">\n")
    }
  }

  registerCatalogue(catalogue: CatalogueEntry): Promise<CatalogueEntry> {
    return this.http.put<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogue.catalogueID}`, catalogue).toPromise();
  }

  deregisterCatalogue(catalogue: CatalogueEntry): Promise<CatalogueEntry> {
    return this.http.put<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogue.catalogueID}`, catalogue).toPromise();
  }

  updateCatalogue(catalogue: CatalogueEntry, catalogueID: string): Promise<CatalogueEntry> {
    return this.http.put<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogue.catalogueID}`, catalogue).toPromise();
  }

  deleteCatalogue(catalogueID: string): Promise<CatalogueEntry> {
    return this.http.delete<CatalogueEntry>(`${this.serviceRegistryUrl}/api/v2/catalogues?catalogueID=${catalogueID}`).toPromise();
  }
}

