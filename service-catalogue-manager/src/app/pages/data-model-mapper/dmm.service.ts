import { Injectable } from '@angular/core';
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../model/appConfig';
import { AdapterEntry } from '../../model/adapter/adapterEntry';
var urlencode = require('urlencode');
const multiPartOptions = {
  headers: new HttpHeaders({
   "Content-Type": "multipart/form-data" // 👈
  })
}

@Injectable({
  providedIn: 'root',
})
export class DMMService {

  private config: AppConfig;

  constructor(configService: NgxConfigureService, private http: HttpClient) {
    this.config = configService.config as AppConfig;

  }

  getSchemas(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/dataModels").toPromise();

  }

  getMaps(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/maps").toPromise();
  }

  getSources(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/sources").toPromise();
  }

  getConfig(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/config").toPromise();
  }

  getBackupConfig(): any {
    return this.http.get<any[]>("assets/transformConfig.json").toPromise();
  }

  getSource(id): any {
    return this.http.get<any>(this.config.data_model_mapper.default_mapper_base_url + "/source?id=" + id).toPromise();
  }

  getMap(id): any {
    return this.http.get<any>(this.config.data_model_mapper.default_mapper_base_url + "/map?id=" + id).toPromise();
  }

  getSchema(id): any {
    return this.http.get<any>(this.config.data_model_mapper.default_mapper_base_url + "/dataModel?id=" + id).toPromise();
  }

  deleteMap(id: any) {
    return this.http.delete<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map?id=" + urlencode(id)).toPromise();
  }

  refParse(schema) {
    console.log("wait backend")
    if (Array.isArray(schema)) schema = schema[0]
    return this.http.post<any>(this.config.data_model_mapper.default_mapper_base_url + "/dereferenceSchema", schema).toPromise();
  }

  getRemoteSource(url, type) {
    return type == "csv" ?
      this.http.get<any>(url, { responseType: 'text' as 'json' }).toPromise() :
      this.http.get<any>(url).toPromise()
  }

  saveMap(adapter: Partial<AdapterEntry>, status, description, map, schema, sourceDataType, config, sourceDataURL, dataModelURL, dataModelID, sourceData, sourceDataID, path): any {
    if (schema?.$id) schema.$id = undefined
    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map/register",
    this.formDataBuilder(
    {
      id: adapter.adapterId,
      name: adapter.name,
      status: status,
      description: description,
      map: map,
      dataModel: schema ? schema[0] ? schema[0] : schema : schema,
      sourceDataType: sourceDataType,
      config: config,
      sourceDataURL,
      sourceDataID,
      dataModelURL,
      path,
      dataModelID,
      sourceData
    })).toPromise();
  }

  formDataBuilder(body) {
    const file = JSON.stringify(body);
    const formData = new FormData();
    formData.append('file', file);
    return formData
  }

  saveSchema(adapter: Partial<AdapterEntry>, status, description, schema): any {
    if (schema?.$id) schema.$id = undefined

    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/dataModel",this.formDataBuilder( {
      id: adapter.adapterId,
      name: adapter.name,
      status: status,
      description: description,
      dataModel: schema ? schema[0] ? schema[0] : schema : schema
    })).toPromise();
  }

  updateSource(adapter, status: any, description: any, sourceData: any, path) {
    return this.http.put<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/source", this.formDataBuilder({
      id: adapter.adapterId,
      name: adapter.name,
      status: status,
      description: description,
      path,
      source: sourceData
    })).toPromise();
  }
  saveSource(adapter, status: any, description: any, sourceData: any, path) {
    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/source",this.formDataBuilder( {
      id: adapter.adapterId,
      name: adapter.name,
      status: status,
      path,
      description: description,
      source: sourceData
    })).toPromise();
  }


  updateMap(adapter: Partial<AdapterEntry>, status, description, map, schema, sourceDataType, config, sourceDataURL, dataModelURL, dataModelID, sourceData, sourceDataID, path): any {
    if (schema?.$id) schema.$id = undefined

    return this.http.put<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map", this.formDataBuilder({
      id: adapter.adapterId,
      name: adapter.name,
      status: status,
      description: description,
      map: map,
      dataModel: schema ? schema[0] ? schema[0] : schema : schema,
      sourceDataType,
      config,
      sourceDataURL,
      dataModelURL,
      dataModelID,
      sourceDataID,
      path,
      sourceData
    })).toPromise();
  }

  updateSchema(adapter: Partial<AdapterEntry>, status, description, schema): any {
    if (schema?.$id) schema.$id = undefined

    return this.http.put<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/dataModel", this.formDataBuilder({
      id: adapter.adapterId,
      name: adapter.name,
      status: status,
      description: description,
      dataModel: schema ? schema[0] ? schema[0] : schema : schema
    })).toPromise();
  }


  test(type: string, source, mapper, schema, config): Promise<any[]> {
    if (schema && schema[0] && !schema.properties && !schema.allOf)
      schema = schema[0]
    if (schema?.$id) schema.$id = undefined

    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_url,
      this.formDataBuilder({
      "sourceDataType": type,
      "sourceData": source.url ? undefined : source,
      sourceDataURL: source.url ? source.url : undefined,
      "mapData": mapper,
      "dataModel": schema,
      "config": config
    })).toPromise();
  }
}
