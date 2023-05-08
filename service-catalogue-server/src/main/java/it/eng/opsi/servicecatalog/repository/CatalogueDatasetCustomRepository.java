package it.eng.opsi.servicecatalog.repository;

import java.util.Optional;

import it.eng.opsi.servicecatalog.model.Catalogue;
import it.eng.opsi.servicecatalog.model.CatalogueDataset;

public interface CatalogueDatasetCustomRepository {

	public Optional<CatalogueDataset> updateCatalogueDataset(String catalogueDatasetID,
			CatalogueDataset catalogueDataset);

	public CatalogueDataset deleteCatalogueDataset(String catalogueDatasetID);
}
