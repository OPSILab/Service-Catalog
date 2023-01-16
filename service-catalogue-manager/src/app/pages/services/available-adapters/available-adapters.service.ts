import { Injectable } from '@angular/core';
import { AdapterEntry } from '../../../model/adapter/adapterEntry';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../../model/appConfig';

@Injectable({
  providedIn: 'root'
})
export class AvailableAdaptersService {
  private serviceRegistryUrl: string;
  private config: AppConfig;

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
  }
  getAdapters(): AdapterEntry[] | Promise<AdapterEntry[]> {
    try {
      return this.http.get<AdapterEntry[]>(`${this.serviceRegistryUrl}/api/v2/adapters`).toPromise();
    }
    catch (error) {
      console.log("AvailableAdaptersService: adapters not found")
    }
  }
}
