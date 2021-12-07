package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.ResponseEntity;


import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface IServiceCatalogController {

	public abstract ResponseEntity<List<ServiceModel>> getServices() throws ServiceNotFoundException;

	public abstract ResponseEntity<ServiceModel> getServiceById(String serviceId) throws ServiceNotFoundException;

	public abstract ResponseEntity<String> getServicesCount();

	public abstract ResponseEntity<ServiceModel> createService(ServiceModel service);

	public abstract ResponseEntity<ServiceModel> updateService(String serviceId, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException;

	public abstract ResponseEntity<Object> deleteService(String serviceId) throws ServiceNotFoundException;

	public abstract ResponseEntity<String> getServiceByIdJsonLd(String serviceId)
			throws ServiceNotFoundException, IOException;


	public abstract ResponseEntity<String> getServiceHasInfoByIdJsonLd(String serviceId)
			throws ServiceNotFoundException, IOException;
	
	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountBySector();
	
	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByThematicArea();
	
	public abstract ResponseEntity<List<HashMap<String, Object>>> getCountByGroupedBy();
	
}
