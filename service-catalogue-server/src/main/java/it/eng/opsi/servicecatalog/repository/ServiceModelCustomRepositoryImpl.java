package it.eng.opsi.servicecatalog.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.ArrayList;
import java.util.List;
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

	@Override
	public List<ServiceModel> findByServiceKeywords(String[] keywords) {

		List<ServiceModel> services = new ArrayList<ServiceModel>();
		for (String keyword : keywords)
			services.addAll(template.find(query(where("hasInfo.keyword").is(keyword)), ServiceModel.class));
		return services;
	}

	@Override
	public List<ServiceModel> findByConnectorID(String connectorId) {

		List<ServiceModel> services = new ArrayList<ServiceModel>();
		services.addAll(template.find(query(where("hasServiceInstance.endpointConnector.connectorId").is(connectorId)),
				ServiceModel.class));
		return services;
	}
}