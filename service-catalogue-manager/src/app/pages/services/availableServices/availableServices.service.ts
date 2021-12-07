import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import { ServiceModel } from '../../../model/services/serviceModel';
import { AppConfig } from '../../../model/appConfig';

@Injectable({ providedIn: 'root' })
export class AvailableServicesService {
  private serviceRegistryUrl: string;
  private config: AppConfig;
  private sdkUrl: string;

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
    this.sdkUrl = this.config.system.sdkUrl;
  }

  getServices(): Promise<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(`${this.serviceRegistryUrl}/api/v2/services`).toPromise();
  }

  getServicesCount(): Promise<number> {
    return this.http.get<number>(`${this.serviceRegistryUrl}/api/v2/services/count`).toPromise();
  }

  getService(serviceId: string): Promise<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/${serviceId}`).toPromise();
  }

  saveService(service: ServiceModel): Promise<ServiceModel> {
    return this.http.post<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services`, service).toPromise();
  }

  registerService(serviceId: string): Promise<ServiceModel> {
    return this.http
      .post<ServiceModel>(`${this.sdkUrl}/api/v2/services/${serviceId}`, '', { headers: { 'Content-Type': 'application/json' } })
      .toPromise();
  }

  deregisterService(serviceId: string): Promise<ServiceModel> {
    return this.http.delete<ServiceModel>(`${this.sdkUrl}/api/v2/services/${serviceId}`).toPromise();
  }

  updateService(service: ServiceModel, serviceId: string): Promise<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/${serviceId}`, service).toPromise();
  }

  deleteService(serviceId: string): Promise<ServiceModel> {
    return this.http.delete<ServiceModel>(`${this.serviceRegistryUrl}/api/v2/services/${serviceId}`).toPromise();
  }
}
