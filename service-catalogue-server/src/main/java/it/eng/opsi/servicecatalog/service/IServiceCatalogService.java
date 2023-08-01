package it.eng.opsi.servicecatalog.service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import javax.validation.Valid;

import it.eng.opsi.servicecatalog.exception.AdapterLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.AdapterNotEditableException;
import it.eng.opsi.servicecatalog.exception.AdapterNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotEditableException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotFoundException;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.HasInfo;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Status;
import it.eng.opsi.servicecatalog.model.Adapter;
import it.eng.opsi.servicecatalog.model.AdapterLog;
import it.eng.opsi.servicecatalog.model.Catalogue;
import it.eng.opsi.servicecatalog.model.CatalogueDataset;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ConnectorLog;
import it.eng.opsi.servicecatalog.model.HasCost;

public interface IServiceCatalogService {

      public abstract List<ServiceModel> getServices() throws ServiceNotFoundException;

      public abstract String getFederatedServices(String remoteCatalogueID, String relativeURL)
                  throws ServiceNotFoundException, URISyntaxException;

      public abstract List<Adapter> getAdapters() throws AdapterNotFoundException;

      public abstract List<ServiceModel> getServicesbyIds(List<String> ids) throws ServiceNotFoundException;

      public abstract List<ServiceModel> getServicesIsPersonaDataHandling() throws ServiceNotFoundException;

      public abstract Long getServicesIsPersonaDataHandlingCount();

      public abstract ServiceModel getServiceById(String serviceId) throws ServiceNotFoundException;

      public abstract Connector getConnectorByconnectorId(String connectorId) throws ConnectorNotFoundException;

      public abstract Connector getConnectorByserviceId(String connectorId) throws ConnectorNotFoundException;

      public abstract HasInfo getHasInfoById(String serviceId) throws ServiceNotFoundException;

      public abstract String getHasInfoByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException;

      public abstract String getServiceByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException;

      public abstract HashMap<String, Integer> getServicesCount();

      public abstract ServiceModel createService(ServiceModel service);

      public abstract Connector createConnector(Connector connector);

      public abstract ServiceModel updateService(String serviceId, ServiceModel service)
                  throws ServiceNotFoundException, ServiceNotEditableException;

      public abstract void deleteService(String serviceId) throws ServiceNotFoundException;

      public abstract List<HashMap<String, Object>> getCountBySector();

       public abstract List<HashMap<String, Object>> getServicesCountByStatus();

      public abstract List<HashMap<String, Object>> getCountByThematicArea();

      public abstract List<HashMap<String, Object>> getCountByGroupedBy();

      public abstract List<HashMap<String, Object>> getCountByLocation();

      public abstract Connector updateConnector(String decodedConnectorIdentifier, @Valid Connector connector)
                  throws ConnectorNotFoundException, ConnectorNotEditableException;

      public abstract List<Connector> getConnectors() throws ConnectorNotFoundException;

      public abstract Connector deleteConnector(String decodedConnectorConnectorId) throws ConnectorNotFoundException;

      public abstract HashMap<String, Object> getConnectorsCount();

      public abstract List<ConnectorLog> getConnectorLogs() throws ConnectorLogNotFoundException;

      public abstract List<AdapterLog> getAdapterLogs() throws AdapterLogNotFoundException;

      public abstract List<ConnectorLog> getConnectorLogsByconnectorId(String decodedConnectorConnectorId)
                  throws ConnectorLogNotFoundException;

      public abstract List<AdapterLog> getAdapterLogsByadapterId(String decodedAdapterAdapterId)
                  throws AdapterLogNotFoundException;

      public abstract ConnectorLog createConnectorLog(@Valid ConnectorLog connectorLog);

      public abstract ConnectorLog deleteConnectorLog(String decodedConnectorConnectorId)
                  throws ConnectorLogNotFoundException;

      public abstract Adapter getAdapterByadapterId(String decodedAdapterAdapterId);

      public abstract HashMap<String, Object> getAdaptersCount();

      public abstract Adapter updateAdapter(String decodedAdapterAdapterId, @Valid Adapter adapter)
                  throws AdapterNotFoundException, AdapterNotEditableException;

      public abstract Object deleteAdapter(String decodedAdapterAdapterId) throws AdapterNotFoundException;

      public abstract Adapter createAdapter(@Valid Adapter adapter);

      public abstract Object deleteAdapterLog(String decodedAdapterAdapterId);

      public abstract AdapterLog createAdapterLog(@Valid AdapterLog adapterLog);

      public abstract List<ServiceModel> getServicesbyLocation(String location) throws ServiceNotFoundException;

      public abstract List<ServiceModel> getServicesbyKeywords(String[] keywords) throws ServiceNotFoundException;

      public abstract List<ServiceModel> getServicesbyTitle(String title) throws ServiceNotFoundException;

      public abstract List<Adapter> getAdapterbytype(String type);

      public abstract List<HasCost> getCostByServiceId(String decodedServiceIdentifier);

      public abstract List<ServiceModel> getServices(String name, String location, String[] keywords,
                  boolean completed);

      public abstract String getFederatedServices(String name, String location, String[] keywords,
                  boolean completed, String remoteCatalogueID);

      public abstract Object getTimeByServiceId(String decodedServiceIdentifier);

      public abstract List<ServiceModel> createServices(@Valid List<ServiceModel> services);

      public abstract List<Catalogue> getCatalogues();

      public abstract List<CatalogueDataset> getCatalogueDatasets();

      public abstract Catalogue getCatalogueBycatalogueID(String catalogueID);

      public abstract Catalogue getCatalogueByName(String name);

      public abstract CatalogueDataset getCatalogueDatasetBycatalogueDatasetID(String catalogueDatasetID);

      public abstract CatalogueDataset getCatalogueDatasetByName(String name);

      public abstract Catalogue createCatalogue(@Valid Catalogue catalogue) throws NoSuchAlgorithmException;

      public abstract CatalogueDataset createCatalogueDataset(@Valid CatalogueDataset catalogueDataset);

      public abstract Catalogue updateCatalogue(String decodedCataloguecatalogueID, @Valid Catalogue catalogue,
                  boolean secretChanged);

      public abstract void deleteCatalogue(String decodedCataloguecatalogueID);

      public abstract CatalogueDataset updateCatalogueDataset(String decodedCatalogueDatasetID,
                  @Valid CatalogueDataset catalogueDataset);

      public abstract CatalogueDataset deleteCatalogueDataset(String decodedCatalogueDatasetID);

      public abstract HashMap<String, Integer> getCataloguesCount();

      public abstract HashMap<String, Integer> getCatalogueDatasetsCount();

      public abstract Status getStatus();

      public abstract String getFederatedStatus(String catalogueID);

      public abstract List<Catalogue> getCatalogueBycountry(String country);

      public abstract Catalogue getCatalogueByApiEndpoint(String apiEndpoint);
}