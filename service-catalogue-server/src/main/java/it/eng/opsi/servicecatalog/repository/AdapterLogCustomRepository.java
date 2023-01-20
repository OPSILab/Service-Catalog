package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.AdapterLog;

public interface AdapterLogCustomRepository {

	public Optional<AdapterLog> updateAdapterLog(String adapterId, AdapterLog adapterLog);

	public AdapterLog deleteAdapterLog(String adapterId);
}
