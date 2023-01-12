package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ConnectorLog;

public interface ConnectorLogCustomRepository {

	public Optional<ConnectorLog> updateConnectorLog(String connectorId, ConnectorLog connectorLog);

	public ConnectorLog deleteConnectorLog(String connectorId);

	// public Connector getConnector(String serviceId);

}
