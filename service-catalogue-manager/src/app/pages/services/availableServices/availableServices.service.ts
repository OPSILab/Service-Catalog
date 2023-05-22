import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import { ServiceModel } from '../../../model/services/serviceModel';
import { AppConfig } from '../../../model/appConfig';
import { ServicesCount } from '../../../model/services/servicesCount';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';

@Injectable({ providedIn: 'root' })
export class AvailableServicesService {
  private serviceRegistryUrl: string;
  private config: AppConfig;
  private sdkUrl: string;
  private dataMapEnumUrl: string;

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
    this.sdkUrl = this.config.system.sdkUrl;
    this.dataMapEnumUrl = this.config.system.dataMapEnumUrl;
  }

  getServices(): Promise<ServiceModel[]> {
    try {
      return this.http.get<ServiceModel[]>(`${this.serviceRegistryUrl}/api/v2/services`).toPromise();
    }
    catch (error) {
      console.log("No services found ", error)
    }
  }

  getRemoteServices(catalogueURL): Promise<ServiceModel[]> {
    if (catalogueURL==this.serviceRegistryUrl) return this.getServices();
    try {
      return this.http.get<ServiceModel[]>(`${this.serviceRegistryUrl}/api/v2/federated/services?remoteCatalogueURL=${catalogueURL}`).toPromise();
    }
    catch (error) {
      console.log("No services found ", error)
    }
  }

  getServicesCount(): Promise<ServicesCount> {
    return this.http.get<ServicesCount>(`${this.serviceRegistryUrl}/api/v2/services/count`).toPromise();
  }

  getRemoteServicesCount(url : string): Promise<ServicesCount> {
    return this.http.get<ServicesCount>(`${url}/api/v2/services/count`).toPromise();
  }

  getServicesIsPersonalDataHandlingCount(): Promise<String> {
    return this.http.get<String>(`${this.serviceRegistryUrl}/api/v2/services/isPersonalDataHandling/count`).toPromise();
  }

  getServicesCountBySector(): Promise<Record<string, number>[]> {
    return this.http.get<Record<string, number>[]>(`${this.serviceRegistryUrl}/api/v2/services/count/sector`).toPromise();
  }

  getServicesCountByThematicArea(): Promise<Record<string, number>[]> {
    return this.http.get<Record<string, number>[]>(`${this.serviceRegistryUrl}/api/v2/services/count/thematicArea`).toPromise();
  }

  getServicesCountByGroupedBy(): Promise<Record<string, number>[]> {
    return this.http.get<Record<string, number>[]>(`${this.serviceRegistryUrl}/api/v2/services/count/groupedBy`).toPromise();
  }

  getServicesCountByLocation(): Promise<Record<string, number>[]> {
    return this.http.get<Record<string, number>[]>(`${this.serviceRegistryUrl}/api/v2/services/count/location`).toPromise();
  }

  getService(serviceId: string): Promise<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/json?identifier=${serviceId}`).toPromise();
  }

  getJsonldService(serviceId: string): Promise<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.serviceRegistryUrl}/api/v2/services/json/jsonld?identifier=${serviceId}`).toPromise();
  }

  getCpsvService(serviceId: string): Promise<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.serviceRegistryUrl}/api/v2/services/json/cpsv/jsonld?identifier=${serviceId}`).toPromise();
  }
  saveService(service: ServiceModel): Promise<ServiceModel> {
    return this.http.post<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services`, service).toPromise();
  }

  registerService(service: ServiceModel, serviceId: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services?identifier=${serviceId}`, service).toPromise();
  }

  deregisterService(service: ServiceModel, serviceId: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services?identifier=${serviceId}`, service).toPromise();
  }

  updateService(service: ServiceModel, serviceId: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services?identifier=${serviceId}`, service).toPromise();
  }

  deleteService(serviceId: string): Promise<ServiceModel> {
    return this.http.delete<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services?identifier=${serviceId}`).toPromise();
  }

  findService(name: string): Promise<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/specified/title?title=${name}`).toPromise();
  }

  getDataMapEnum(): Promise<string[]> {
    return this.http.get<string[]>(`${this.dataMapEnumUrl}`).toPromise();
  }

  getAdaptedService(type, source, adapter: AdapterEntry): Promise<ServiceModel[]> {
    return this.http.post<ServiceModel[]>(adapter.url, {
      "sourceDataType": type,
      "sourceData": source,
      "adapterID": adapter.adapterId,
      "csvDelimiter": ";"
    }).toPromise();
  }
}
