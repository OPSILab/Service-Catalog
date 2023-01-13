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

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
  }

  getConnectors(): Promise<ConnectorEntry[]> {
    return this.http.get<ConnectorEntry[]>(`${this.serviceRegistryUrl}/api/v2/connectors`).toPromise();
  }

  getConnectorsCount(): Promise<{total: number, publicConnectors, privateConnectors}> {
    return this.http.get<{total: number, publicConnectors, privateConnectors}>(`${this.serviceRegistryUrl}/api/v2/connectors/count`).toPromise();
  }

  getConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.get<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?connectorId=${connectorId}`).toPromise();
  }

  saveConnector(connector: ConnectorEntry): Promise<ConnectorEntry> {
    console.log(`${this.serviceRegistryUrl}/api/v2/connectors`)
    return this.http.post<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors`, connector).toPromise();
  }

  registerConnector(connector: ConnectorEntry): Promise<ConnectorEntry> {
    return this.http.put<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?connectorId=${connector.connectorId}`, connector).toPromise();
  }

  deregisterConnector(connector: ConnectorEntry): Promise<ConnectorEntry> {
    return this.http.put<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?connectorId=${connector.connectorId}`, connector).toPromise();
  }

  updateConnector(connector: ConnectorEntry, connectorId: string): Promise<ConnectorEntry> {
    return this.http.put<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?connectorId=${connectorId}`, connector).toPromise();
  }

  deleteConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.delete<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/connectors?connectorId=${connectorId}`).toPromise();
  }

  getConnectorLogs(connectorId: string): Promise<ConnectorEntryLog[]> {
    return this.http.get<ConnectorEntryLog[]>(`${this.serviceRegistryUrl}/api/v2/connectors/logs?connectorId=${connectorId}`).toPromise();
  }
}
