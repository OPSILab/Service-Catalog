package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.ResponseEntity;

import com.github.andrewoma.dexx.collection.internal.adapter.Adapters;

import it.eng.opsi.servicecatalog.exception.AdapterLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.AdapterNotEditableException;
import it.eng.opsi.servicecatalog.exception.AdapterNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotEditableException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotFoundException;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Adapter;
import it.eng.opsi.servicecatalog.model.AdapterLog;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ConnectorLog;

public interface IServiceCatalogController {

	public abstract ResponseEntity<List<ServiceModel>> getServices(String name, String location, String[] keywords)
			throws ServiceNotFoundException;

	public abstract ResponseEntity<List<Adapter>> getAdapters(String type) throws AdapterNotFoundException;

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

	public abstract ResponseEntity<ServiceModel> createService(ServiceModel service);

	public abstract ResponseEntity<Connector> createConnector(Connector connector);

	public abstract ResponseEntity<Adapter> createAdapter(Adapter adapter);

	public abstract ResponseEntity<ConnectorLog> createConnectorLog(ConnectorLog connectorLog);

	public abstract ResponseEntity<AdapterLog> createAdapterLog(AdapterLog adapterLog);

	public abstract ResponseEntity<ServiceModel> updateService(String identifier, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException;

	public abstract ResponseEntity<Connector> updateConnector(String connectorId, Connector connector)
			throws ConnectorNotFoundException, ConnectorNotEditableException;

	public abstract ResponseEntity<Adapter> updateAdapter(String adapterId, Adapter adapter)
			throws AdapterNotFoundException, AdapterNotEditableException;

	public abstract ResponseEntity<Object> deleteService(String identifier) throws ServiceNotFoundException;

	public abstract ResponseEntity<Object> deleteConnector(String connectorId) throws ConnectorNotFoundException;

	public abstract ResponseEntity<Object> deleteConnectorLog(String connectorId) throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<Object> deleteAdapterLog(String adapterId) throws AdapterLogNotFoundException;

	public abstract ResponseEntity<Object> deleteAdapter(String identifier) throws AdapterNotFoundException;

	public abstract ResponseEntity<?> getConnector(String serviceId) throws ConnectorNotFoundException;

	public abstract ResponseEntity<?> getAdapter(String serviceId) throws AdapterNotFoundException;

	public abstract ResponseEntity<List<ConnectorLog>> getConnectorLogsByconnectorId(String connectorId)
			throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<List<AdapterLog>> getAdapterLogsByadapterId(String adapterId)
			throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountBySector();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByThematicArea();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByGroupedBy();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByLocation();

	public abstract ResponseEntity<?> getServiceIsPersonalDataHandling(HttpServletRequest request)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<String> getServicesIsPersonalDataHandlingCount();

	public abstract ResponseEntity<List<ServiceModel>> getServiceByLocation(HttpServletRequest request, String location)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<List<ServiceModel>> getServiceByKeyword(HttpServletRequest request, String keyword)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<List<ServiceModel>> getServiceByTitle(HttpServletRequest request, String title)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getServiceCost(String serviceId) throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getServiceTime(String serviceId) throws ServiceNotFoundException, IOException;

}