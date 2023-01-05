package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.Connector;

public interface ConnectorModelCustomRepository {

	public Optional<Connector> updateConnector(String serviceId, Connector connector);

	public Connector deleteConnector(String serviceId);

	// public Connector getConnector(String serviceId);

}
