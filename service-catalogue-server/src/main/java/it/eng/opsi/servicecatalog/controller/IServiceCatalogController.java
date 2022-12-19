package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.ResponseEntity;

import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Connector;

public interface IServiceCatalogController {

	public abstract ResponseEntity<List<ServiceModel>> getServices() throws ServiceNotFoundException;

	public abstract ResponseEntity<?> getServiceById(HttpServletRequest request, String identifier)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<?> getServiceByIds(HttpServletRequest request, List<String> identifier)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<HashMap<String, Integer>> getServicesCount();

	public abstract ResponseEntity<ServiceModel> createService(ServiceModel service);

	public abstract ResponseEntity<Connector> createConnector(Connector connector);

	public abstract ResponseEntity<ServiceModel> updateService(String identifier, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException;

	public abstract ResponseEntity<Object> updateConnector(String identifier, Connector connector)
			throws ServiceNotFoundException, ServiceNotEditableException; // TODO G: throws ControllerNotFoundException,
																			// ControllerNotEditableException

	public abstract ResponseEntity<Object> deleteService(String identifier) throws ServiceNotFoundException;

	// public abstract ResponseEntity<String>
	// getServiceByIdJsonLd(HttpServletRequest request)
	// throws ServiceNotFoundException, IOException;
	//
	//
	// public abstract ResponseEntity<String>
	// getServiceHasInfoByIdJsonLd(HttpServletRequest request)
	// throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountBySector();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByThematicArea();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByGroupedBy();

	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByLocation();

	public abstract ResponseEntity<?> getServiceIsPersonalDataHandling(HttpServletRequest request)
			throws ServiceNotFoundException, IOException;

	public abstract ResponseEntity<String> getServicesIsPersonalDataHandlingCount();

}