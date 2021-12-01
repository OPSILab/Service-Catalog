package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.util.List;

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

	public abstract ResponseEntity<Object> deleteService(String serviceId)
			throws ServiceNotFoundException;

	public abstract ResponseEntity<String> getServiceByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException;
	
}
