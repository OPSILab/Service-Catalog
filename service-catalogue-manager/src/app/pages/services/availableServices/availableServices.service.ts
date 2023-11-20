import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import { ServiceModel } from '../../../model/services/serviceModel';
import { AppConfig } from '../../../model/appConfig';
import { ServicesCount } from '../../../model/services/servicesCount';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
var urlencode = require('urlencode');

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
      console.error("No services found ", error)
    }
  }

  getRemoteServices(catalogueID): Promise<ServiceModel[]> {
    if (catalogueID == "local")
      return this.getServices();
    return this.http.get<ServiceModel[]>(`${this.serviceRegistryUrl}/api/v2/federated/services?remoteCatalogueID=${catalogueID}`).toPromise();
  }

  getServicesCount(): Promise<ServicesCount> {
    return this.http.get<ServicesCount>(`${this.serviceRegistryUrl}/api/v2/services/count`).toPromise();
  }

  getRemoteServicesCount(catalogueID: string): Promise<any[]> {
    return this.http.get<any[]>(`${this.serviceRegistryUrl}/api/v2/federated/services/count?remoteCatalogueID=${catalogueID}`).toPromise();
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
    return this.http.get<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/json?identifier=${urlencode(serviceId)}`).toPromise();
  }

  getJsonldService(serviceId: string): Promise<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.serviceRegistryUrl}/api/v2/services/json/jsonld?identifier=${urlencode(serviceId)}`).toPromise();
  }

  getCpsvService(serviceId: string): Promise<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.serviceRegistryUrl}/api/v2/services/json/cpsv/jsonld?identifier=${urlencode(serviceId)}`).toPromise();
  }
  saveService(service: ServiceModel): Promise<ServiceModel> {
    return this.http.post<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services`, service).toPromise();
  }

  registerService(serviceId: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/register?identifier=${urlencode(serviceId)}`,{}).toPromise();
  }

  deregisterService(serviceId: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/deregister?identifier=${urlencode(serviceId)}`, {}).toPromise();
  }

  updateService(service: ServiceModel, serviceId: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services?identifier=${urlencode(serviceId)}`, service).toPromise();
  }

  deleteService(serviceId: string): Promise<ServiceModel> {
    return this.http.delete<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services?identifier=${urlencode(serviceId)}`).toPromise();
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
      "config": {
        "delimiter": ";",
        "NGSI_entity" : false
      }
    }).toPromise();
  }
}
