package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;

import it.eng.opsi.servicecatalog.exception.AdapterLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.AdapterNotEditableException;
import it.eng.opsi.servicecatalog.exception.AdapterNotFoundException;
import it.eng.opsi.servicecatalog.exception.CatalogueDatasetNotEditableException;
import it.eng.opsi.servicecatalog.exception.CatalogueDatasetNotFoundException;
import it.eng.opsi.servicecatalog.exception.CatalogueNotEditableException;
import it.eng.opsi.servicecatalog.exception.CatalogueNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotEditableException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotFoundException;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Adapter;
import it.eng.opsi.servicecatalog.model.AdapterLog;
import it.eng.opsi.servicecatalog.model.Catalogue;
import it.eng.opsi.servicecatalog.model.CatalogueDataset;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ConnectorLog;

public interface IServiceCatalogController {

	public abstract ResponseEntity<List<ServiceModel>> getServices(String name, String location, String[] keywords,
			boolean completed)
			throws ServiceNotFoundException;

	public abstract ResponseEntity<List<Adapter>> getAdapters(String type) throws AdapterNotFoundException;

	public abstract ResponseEntity<List<Catalogue>> getCatalogues() throws CatalogueNotFoundException;

	public abstract ResponseEntity<List<CatalogueDataset>> getCatalogueDatasets()
			throws CatalogueDatasetNotFoundException;

	public abstract ResponseEntity<List<ConnectorLog>> getConnectorLogs() throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<List<AdapterLog>> getAdapterLogs() throws AdapterLogNotFoundException;

	public abstract ResponseEntity<List<Connector>> getConnectors() throws ConnectorNotFoundException;

	public abstract ResponseEntity<?> getServiceById(HttpServletRequest request, String identifier)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getServiceByIds(HttpServletRequest request, List<String> identifier)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<HashMap<String, Integer>> getServicesCount();

	public abstract ResponseEntity<HashMap<String, Object>> getConnectorsCount();

	public abstract ResponseEntity<HashMap<String, Object>> getAdaptersCount();

	public abstract ResponseEntity<HashMap<String, Integer>> getCataloguesCount();

	public abstract ResponseEntity<HashMap<String, Integer>> getCatalogueDatasetsCount();

	public abstract ResponseEntity<ServiceModel> createService(ServiceModel service);

	public abstract ResponseEntity<Catalogue> createCatalogue(Catalogue catalogue);

	public abstract ResponseEntity<CatalogueDataset> createCatalogueDataset(CatalogueDataset catalogue);

	public abstract ResponseEntity<List<ServiceModel>> createServices(List<ServiceModel> services);

	public abstract ResponseEntity<Connector> createConnector(Connector connector);

	public abstract ResponseEntity<Adapter> createAdapter(Adapter adapter);

	public abstract ResponseEntity<ConnectorLog> createConnectorLog(ConnectorLog connectorLog);

	public abstract ResponseEntity<AdapterLog> createAdapterLog(AdapterLog adapterLog);

	public abstract ResponseEntity<ServiceModel> updateService(String identifier, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException;

	public abstract ResponseEntity<Connector> updateConnector(String connectorId, Connector connector)
			throws ConnectorNotFoundException, ConnectorNotEditableException;

	public abstract ResponseEntity<Catalogue> updateCatalogue(String catalogueID, Catalogue catalogue,
			boolean secretChanged)
			throws CatalogueNotFoundException, CatalogueNotEditableException;

	public abstract ResponseEntity<CatalogueDataset> updateCatalogueDataset(String catalogueDatasetID,
			CatalogueDataset catalogue)
			throws CatalogueDatasetNotFoundException, CatalogueDatasetNotEditableException;

	public abstract ResponseEntity<Adapter> updateAdapter(String adapterId, Adapter adapter)
			throws AdapterNotFoundException, AdapterNotEditableException;

	public abstract ResponseEntity<Object> deleteService(String identifier) throws ServiceNotFoundException;

	public abstract ResponseEntity<Object> deleteConnector(String connectorId) throws ConnectorNotFoundException;

	public abstract ResponseEntity<Object> deleteConnectorLog(String connectorId) throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<Object> deleteAdapterLog(String adapterId) throws AdapterLogNotFoundException;

	public abstract ResponseEntity<Object> deleteAdapter(String identifier) throws AdapterNotFoundException;

	public abstract ResponseEntity<Object> deleteCatalogue(String identifier) throws CatalogueNotFoundException;

	public abstract ResponseEntity<Object> deleteCatalogueDataset(String identifier)
			throws CatalogueDatasetNotFoundException;

	public abstract ResponseEntity<?> getConnector(String serviceId) throws ConnectorNotFoundException;

	public abstract ResponseEntity<?> getCatalogue(String catalogueID, String name, String apiEndpoint)
			throws CatalogueNotFoundException;

	public abstract ResponseEntity<?> getCatalogueByCountry(String country) throws CatalogueNotFoundException;

	public abstract ResponseEntity<?> getCatalogueDataset(String catalogueDatasetID, String name)
			throws CatalogueDatasetNotFoundException;

	public abstract ResponseEntity<?> getAdapter(String serviceId) throws AdapterNotFoundException;

	public abstract ResponseEntity<List<ConnectorLog>> getConnectorLogsByconnectorId(String connectorId)
			throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<List<AdapterLog>> getAdapterLogsByadapterId(String adapterId)
			throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountBySector();

		public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByStatus();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByThematicArea();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByGroupedBy();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByLocation();

	public abstract ResponseEntity<?> getServiceIsPersonalDataHandling(HttpServletRequest request)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<String> getServicesIsPersonalDataHandlingCount();

	public abstract ResponseEntity<List<ServiceModel>> getServiceByLocation(HttpServletRequest request, String location)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<List<ServiceModel>> getServiceByKeywords(HttpServletRequest request,
			String[] keywords)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<List<ServiceModel>> getServiceByTitle(HttpServletRequest request, String title)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getServiceCost(String serviceId) throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getServiceTime(String serviceId) throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getStatus();

}