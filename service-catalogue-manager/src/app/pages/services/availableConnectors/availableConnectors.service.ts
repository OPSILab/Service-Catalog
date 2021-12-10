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

  constructor(private configService: NgxConfigureService, private http: HttpClient) {
    this.config = this.configService.config as AppConfig;
    this.serviceRegistryUrl = this.config.serviceRegistry.url;
    this.sdkUrl = this.config.system.sdkUrl;
  }

  getConnectors(): Promise<ConnectorEntry[]> {
    //return this.http.get<ServiceEntry[]>(`${this.serviceRegistryUrl}/api/v2/services?withCertificate=true`).toPromise();
    return this.http.get<ConnectorEntry[]>(`http://localhost:81/assets/data/examples/connectors.json`).toPromise();
  }

  getConnectorsCount(): Promise<number> {
    return this.http.get<number>(`${this.serviceRegistryUrl}/api/v2/services/connectors/count`).toPromise();
  }

  getConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.get<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/services/connectors/${connectorId}`).toPromise();
  }

  saveConnector(connector: ConnectorEntry): Promise<ConnectorEntry> {
    return this.http.post<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/services/connectors`, connector).toPromise();
  }

  registerConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http
      .post<ConnectorEntry>(`${this.sdkUrl}/api/v2/services/connectors/${connectorId}`, '', { headers: { 'Content-Type': 'application/json' } })
      .toPromise();
  }

  deregisterConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.delete<ConnectorEntry>(`${this.sdkUrl}/api/v2/services/connectors/${connectorId}`).toPromise();
  }

  updateConnector(connector: ConnectorEntry, connectorId: string): Promise<ConnectorEntry> {
    return this.http.put<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/services/connectors/${connectorId}`, connector).toPromise();
  }

  deleteConnector(connectorId: string): Promise<ConnectorEntry> {
    return this.http.delete<ConnectorEntry>(`${this.serviceRegistryUrl}/api/v2/services/connectors/${connectorId}`).toPromise();
  }

  getConnectorLogs(connectorId: string): Promise<ConnectorEntryLog[]> {
    return this.http.get<ConnectorEntryLog[]>(`${this.serviceRegistryUrl}/api/v2/services/connectors/${connectorId}`).toPromise();
  }
}
