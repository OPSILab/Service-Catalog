import { Injectable } from '@angular/core';
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../model/appConfig';
import { AdapterEntry } from '../../model/adapter/adapterEntry';

@Injectable({
  providedIn: 'root',
})
export class DMMService {

  private config: AppConfig;

  private dmmUrl: string;

  constructor(configService: NgxConfigureService, private http: HttpClient) {
    this.config = configService.config as AppConfig;

  }

  getSchemas(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/dataModels").toPromise();

  }

  getMaps(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/maps").toPromise();
  }

  saveMap(adapter: Partial<AdapterEntry>, map, schema): any {

    if (!schema) {
      throw new Error("Schema required")
    }

    if (!map) {
      throw new Error("Map required")
    }

    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map/register", {
      id: adapter.adapterId,
      name: adapter.name,
      map: map,
      dataModel: schema[0]
    }).toPromise();
  }

  updateMap(adapter: Partial<AdapterEntry>, map, schema): any {
    console.debug(adapter)

    if (!schema) {
      throw new Error("Schema required")
    }

    if (!map) {
      throw new Error("Map required")
    }

    return this.http.put<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map", {
      id: adapter.adapterId,
      name: adapter.name,
      map: map,
      dataModel: schema[0]
    }).toPromise();
  }


  test(type: string, source: string, mapper, schema, delimiter): Promise<any[]> {
    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_url, {
      "sourceDataType": type,
      "sourceData": source,
      "mapData": mapper,
      "dataModel": schema,
      "config": {
        "delimiter": delimiter,
        "NGSI_entity": false
      }
    }).toPromise();
  }


}
