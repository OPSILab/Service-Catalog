package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface ServiceModelCustomRepository {

	public Optional<ServiceModel> updateService(String serviceId, ServiceModel service);

	
	
	
}
