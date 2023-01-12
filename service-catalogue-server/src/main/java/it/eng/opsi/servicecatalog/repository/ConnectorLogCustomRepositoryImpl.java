package it.eng.opsi.servicecatalog.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import it.eng.opsi.servicecatalog.model.ConnectorLog;

public class ConnectorLogCustomRepositoryImpl implements ConnectorLogCustomRepository {

	@Autowired
	MongoTemplate template;

	public Optional<ConnectorLog> updateConnectorLog(String connectorId, ConnectorLog connectorLog) {

		ConnectorLog updatedConnectorLog = template.findAndReplace(query(where("connectorId").is(connectorId)),
				connectorLog);

		return Optional.ofNullable(updatedConnectorLog);

	}

	@Override
	public ConnectorLog deleteConnectorLog(String connectorId) {

		template.findAllAndRemove(query(where("connectorId").is(connectorId)), connectorId);
		return null;
	}
}