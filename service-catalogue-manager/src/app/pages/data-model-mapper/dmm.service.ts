import { Injectable } from '@angular/core';
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../model/appConfig';

@Injectable()
export class DMMService {

  private config: AppConfig;

  private dmmUrl: string;

  constructor(configService: NgxConfigureService, private http: HttpClient) {
    this.config = configService.config as AppConfig;

  }

  getSchemas(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url+"/dataModels").toPromise();

  }
  getMaps(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url+"/maps").toPromise();
  }

  /*
  getAdaptedService(type: string, source: string, adapter: AdapterEntry): Promise<ServiceModel[]> {
    return this.http.post<ServiceModel[]>(adapter.url, {
      "sourceDataType": type,
      "sourceData": source,
      "adapterID": adapter.adapterId,
      "config": {
        "delimiter": ";",
        "NGSI_entity" : false
      }
    }).toPromise();
  }*/


}
