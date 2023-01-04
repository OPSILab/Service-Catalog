import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgxConfigureService } from 'ngx-configure';
import { ConnectorEntry } from '../../../model/connector/connectorEntry';
import { ConnectorEntryLog } from '../../../model/connector/connectorEntryLog';
import { AppConfig } from '../../../model/appConfig';

@Injectable({ providedIn: 'root' })
export class AvailableConnectorsService {
  private serviceRegistryUrl: string;
  private config: AppConfig;
  private sdkUrl: string;
  private serviceManagerUrl: String;

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
    this.sdkUrl = this.config.system.sdkUrl;
    this.serviceManagerUrl = (this.config.system.serviceEditorUrl.includes('localhost') ? '' : this.config.system.serviceEditorUrl)
  }

  getConnectors(): Promise<ConnectorEntry[]> {
    return this.http.get<ConnectorEntry[]>(`${this.serviceRegistryUrl}/api/v2/connectors`).toPromise();
    //return this.http.get<ConnectorEntry[]>(`${this.serviceManagerUrl}/assets/data/examples/connectors.json`).toPromise();
  }

  getConnectorsCount(): Promise<number> {
    return this.http.get<number>(`${this.serviceRegistryUrl}/api/v2/connectors/count`).toPromise();
  }

  getConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.get<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors/${connectorId}`).toPromise();
  }

  saveConnector(connector: ConnectorEntry): Promise<ConnectorEntry> {
    console.log(`${this.serviceRegistryUrl}/api/v2/connectors`)
    return this.http.post<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors`, connector).toPromise();
  }

  registerConnector(connector: ConnectorEntry): Promise<ConnectorEntry> {
    //return this.http
      //.post<ConnectorEntry>(`${this.sdkUrl}/api/v2/connectors/${connectorId}`, '', { headers: { 'Content-Type': 'application/json' } })
      //.toPromise();
      return this.http.put<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?serviceId=${connector.serviceId}`, connector).toPromise();
  }

  deregisterConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.delete<ConnectorEntry>(`${this.sdkUrl}/api/v2/connectors/${connectorId}`).toPromise();
  }

  updateConnector(connector: ConnectorEntry, connectorId: string): Promise<ConnectorEntry> {
    return this.http.put<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?serviceId=${connectorId}`, connector).toPromise();
  }

  deleteConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.delete<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?serviceId=${connectorId}`).toPromise();
  }

  getConnectorLogs(connectorId: string): Promise<ConnectorEntryLog[]> {
    return this.http.get<ConnectorEntryLog[]>(`${this.serviceRegistryUrl}/api/v2/connectors/${connectorId}`).toPromise();
  }
}
