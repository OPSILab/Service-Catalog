import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import 'rxjs/add/operator/toPromise';
import { AdapterEntry } from '../../model/adapter/adapterEntry';
import { AdapterEntryLog } from '../../model/adapter/adapterEntryLog';
import { AppConfig } from '../../model/appConfig';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableAdaptersService {
  private serviceRegistryUrl: string;
  private config: AppConfig;

  constructor(private configService: NgxConfigureService, private http: HttpClient, private errorService: ErrorDialogService
    ) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
  }
  getAdapters(): AdapterEntry[] | Promise<AdapterEntry[]> {
    try {
      return this.http.get<AdapterEntry[]>(`${this.serviceRegistryUrl}/api/v2/adapters`).toPromise();
    }
    catch (error) {
      console.error("AvailableAdaptersService: adapters not found")
      console.error("error:<\n", error, ">\n")
      this.errorService.openErrorDialog(error);
    }
  }

  getAdaptersCount(): Promise<{ total: number, publicAdapters, privateAdapters }> {
    return this.http.get<{ total: number, publicAdapters, privateAdapters }>(`${this.serviceRegistryUrl}/api/v2/adapters/count`).toPromise();
  }

  getAdapter(adapterId: string): Promise<AdapterEntry> {
    return this.http.get<AdapterEntry>(`${this.serviceRegistryUrl}/api/v2/adapters?adapterId=${adapterId}`).toPromise();
  }

  saveAdapter(adapter: AdapterEntry): Promise<AdapterEntry> {
    try {
      return this.http.post<AdapterEntry>(`${this.serviceRegistryUrl}/api/v2/adapters`, adapter).toPromise();
    }
    catch (error) {
      console.error("error:<\n", error, ">\n")
      console.error("message:<\n", error.error.message, ">\n")
    }
  }

  registerAdapter(adapter: AdapterEntry): Promise<AdapterEntry> {
    return this.http.put<AdapterEntry>(`${this.serviceRegistryUrl}/api/v2/adapters?adapterId=${adapter.adapterId}`, adapter).toPromise();
  }

  deregisterAdapter(adapter: AdapterEntry): Promise<AdapterEntry> {
    return this.http.put<AdapterEntry>(`${this.serviceRegistryUrl}/api/v2/adapters?adapterId=${adapter.adapterId}`, adapter).toPromise();
  }

  updateAdapter(adapter: AdapterEntry, adapterId: string): Promise<AdapterEntry> {
    return this.http.put<AdapterEntry>(`${this.serviceRegistryUrl}/api/v2/adapters?adapterId=${adapterId}`, adapter).toPromise();
  }

  deleteAdapter(adapterId: string): Promise<AdapterEntry> {
    return this.http.delete<AdapterEntry>(`${this.serviceRegistryUrl}/api/v2/adapters?adapterId=${adapterId}`).toPromise();
  }

  getAdapterLogs(adapterId: string): Promise<AdapterEntryLog[]> {
    return this.http.get<AdapterEntryLog[]>(`${this.serviceRegistryUrl}/api/v2/adapters/logs?adapterId=${adapterId}`).toPromise();
  }
}

