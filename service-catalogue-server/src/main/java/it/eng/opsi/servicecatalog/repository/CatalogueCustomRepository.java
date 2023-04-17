package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.Catalogue;

public interface CatalogueCustomRepository {

	public Optional<Catalogue> updateCatalogue(String catalogueID, Catalogue catalogue);

	public Catalogue deleteCatalogue(String catalogueID);
}
