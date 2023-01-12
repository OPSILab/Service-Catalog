package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.ResponseEntity;

import it.eng.opsi.servicecatalog.exception.ConnectorLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotEditableException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotFoundException;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ConnectorLog;

public interface IServiceCatalogController {

	public abstract ResponseEntity<List<ServiceModel>> getServices() throws ServiceNotFoundException;

	public abstract ResponseEntity<List<ConnectorLog>> getConnectorLogs() throws ServiceNotFoundException;// TODO G:
																											// throws

	public abstract ResponseEntity<List<Connector>> getConnectors() throws ServiceNotFoundException;// TODO G: throws
																									// connector not
																									// found exception

	public abstract ResponseEntity<?> getServiceById(HttpServletRequest request, String identifier)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getServiceByIds(HttpServletRequest request, List<String> identifier)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<HashMap<String, Integer>> getServicesCount();

	public abstract ResponseEntity<HashMap<String, Object>> getConnectorsCount();

	public abstract ResponseEntity<ServiceModel> createService(ServiceModel service);

	public abstract ResponseEntity<Connector> createConnector(Connector connector);

	public abstract ResponseEntity<ConnectorLog> createConnectorLog(ConnectorLog connectorLog);

	public abstract ResponseEntity<ServiceModel> updateService(String identifier, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException;

	public abstract ResponseEntity<Connector> updateConnector(String connectorId, Connector connector)
			throws ConnectorNotFoundException, ConnectorNotEditableException;

	// public abstract ResponseEntity<Connector> updateConnectorLog(String
	// connectorId, Connector connector)
	// throws ConnectorNotFoundException, ConnectorNotEditableException;

	public abstract ResponseEntity<Object> deleteService(String identifier) throws ServiceNotFoundException;

	public abstract ResponseEntity<Object> deleteConnector(String connectorId) throws ConnectorNotFoundException;

	public abstract ResponseEntity<Object> deleteConnectorLog(String connectorId) throws ConnectorLogNotFoundException;

	public abstract ResponseEntity<?> getConnector(String serviceId) throws ServiceNotFoundException;

	public abstract ResponseEntity<List<ConnectorLog>> getConnectorLogsByconnectorId(String serviceId)
			throws ServiceNotFoundException;

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountBySector();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByThematicArea();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByGroupedBy();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByLocation();

	public abstract ResponseEntity<?> getServiceIsPersonalDataHandling(HttpServletRequest request)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<String> getServicesIsPersonalDataHandlingCount();

}