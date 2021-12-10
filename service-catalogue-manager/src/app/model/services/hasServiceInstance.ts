/**
 * Service Catalog API
 * Service Catalog APIs used to manage CRUD for Service Model descriptions.
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ServiceUrls } from './serviceUrls';
import { Connector } from './connector';
import { DataController } from './dataController';
import { Dataset } from './dataset';
import { ServiceProvider } from './serviceProvider';

export interface HasServiceInstance {
  serviceProvider: ServiceProvider;
  connector: Connector;
  dataset: Array<Dataset>;
  serviceUrls: ServiceUrls;
  dataController: DataController;
}
