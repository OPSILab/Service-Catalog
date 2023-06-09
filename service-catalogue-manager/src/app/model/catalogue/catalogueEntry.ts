export interface CatalogueEntry {
  federated: boolean
  catalogueID : string
  name : string
  country : string
  services : number
  status : string
  active : boolean
  description :string
  competentAuthority : string
  category : string
  homePage : string
  apiEndpoint : string
  type : string
  refresh
  authenticated : boolean
  clientSecret : string
  clientID : string
  oAuth2Endpoint : string,
  lastRefresh,
  iconURL
}
