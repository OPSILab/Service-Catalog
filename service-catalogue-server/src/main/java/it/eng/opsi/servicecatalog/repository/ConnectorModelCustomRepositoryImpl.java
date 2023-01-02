package it.eng.opsi.servicecatalog.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import it.eng.opsi.servicecatalog.model.Connector;

public class ConnectorModelCustomRepositoryImpl implements ConnectorModelCustomRepository {

	@Autowired
	MongoTemplate template;

	public Optional<Connector> updateConnector(String connectorId, Connector connector) {

		Connector updatedConnector = template.findAndReplace(query(where("serviceId").is(connectorId)), connector);

		return Optional.ofNullable(updatedConnector);

	}

	@Override
	public Connector deleteConnector(String serviceId) {
		// TODO Auto-generated method stub
		template.findAllAndRemove(query(where("serviceId").is(serviceId)), serviceId);
		return null;
	}

}