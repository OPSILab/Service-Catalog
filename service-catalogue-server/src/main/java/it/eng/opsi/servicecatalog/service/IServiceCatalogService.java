package it.eng.opsi.servicecatalog.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;


import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.HasInfo;
import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface IServiceCatalogService {

	public abstract List<ServiceModel> getServices() throws ServiceNotFoundException;

	public abstract ServiceModel getServiceById(String serviceId) throws ServiceNotFoundException;

	public abstract HasInfo getHasInfoById(String serviceId) throws ServiceNotFoundException;

	public abstract String getHasInfoByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException;

	
	public abstract String getServiceByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException;

	public abstract String getServicesCount();

	public abstract ServiceModel createService(ServiceModel service);

	public abstract ServiceModel updateService(String serviceId, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException;

	public abstract void deleteService(String serviceId) throws ServiceNotFoundException;

	public abstract List<HashMap<String, Object>> getCountBySector();
}
