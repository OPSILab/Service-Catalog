package it.eng.opsi.servicecatalog.service;

import java.util.List;

import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface IServiceCatalogService {

	public abstract List<ServiceModel> getServices() throws ServiceNotFoundException;

	public abstract ServiceModel getServiceById(String serviceId) throws ServiceNotFoundException;

	public abstract String getServicesCount();

	public abstract ServiceModel createService(ServiceModel service);

	public abstract ServiceModel updateService(String serviceId, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException;

	public abstract void deleteService(String serviceId) throws ServiceNotFoundException;

}
