package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.Connector;

public interface ConnectorModelCustomRepository {

	public Optional<Connector> updateConnector(String connectorId, Connector connector);

	public Connector deleteConnector(String connectorId);

	// public Connector getConnector(String serviceId);

}
