package it.eng.opsi.servicecatalog.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;


import it.eng.opsi.servicecatalog.model.ServiceModel;

public class ServiceModelCustomRepositoryImpl implements ServiceModelCustomRepository {

	@Autowired
	MongoTemplate template;

	public Optional<ServiceModel> updateService(String serviceId, ServiceModel service) {

		ServiceModel updatedService = template.findAndReplace(query(where("identifier").is(serviceId)), service);

		return Optional.ofNullable(updatedService);

	}
	
	
	
	
}
