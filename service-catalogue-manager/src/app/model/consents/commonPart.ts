/**
 * SDK Service API
 * SDK Service API for integration with cape
 *
 * The version of the OpenAPI document: 2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DataController } from '../services/dataController';
import { Description } from '../services/description';
import { RSDescription } from './rSDescription';
import { UsageRules } from './usageRules';

export interface CommonPart {
  jurisdiction: string;
  iat: string;
  mat: string;
  nbf?: string;
  exp?: string;
  dataOperatorId: string;
  version: string;
  cr_id: string;
  cr_pair_id?: string;
  surrogate_id: string;
  source_surrogate_id?: string;
  slr_id: string;
  source_slr_id?: string;
  subject_id: string;
  subject_name: string;
  subject_humanreadable_descriptions: Array<Description>;
  source_subject_id?: string;
  source_subject_name?: string;
  source_subject_humanreadable_descriptions?: Array<Description>;
  service_description_version: string;
  service_description_signature?: string;
  source_service_description_version?: string;
  source_service_description_signature?: string;
  service_provider_business_id: string;
  rs_description: RSDescription;
  usage_rules: UsageRules;
  data_controller: DataController;
  collection_operator_id?: string;
  requester_service_id: string;
  consent_status: CommonPartConsentStatusEnum;
  consent_statuses_signature?: Record<string, unknown>;
}
export enum CommonPartConsentStatusEnum {
  Active = 'Active',
  Disabled = 'Disabled',
  Withdrawn = 'Withdrawn',
}
