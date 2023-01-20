package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.Adapter;

public interface AdapterCustomRepository {

	public Optional<Adapter> updateAdapter(String adapterId, Adapter adapter);

	public Adapter deleteAdapter(String adapterId);
}
