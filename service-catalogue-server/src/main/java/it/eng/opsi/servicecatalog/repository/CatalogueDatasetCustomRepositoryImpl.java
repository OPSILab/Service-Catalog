package it.eng.opsi.servicecatalog.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import it.eng.opsi.servicecatalog.model.CatalogueDataset;

public class CatalogueDatasetCustomRepositoryImpl implements CatalogueDatasetCustomRepository {

	@Autowired
	MongoTemplate template;

	public Optional<CatalogueDataset> updateCatalogueDataset(String catalogueDatasetID,
			CatalogueDataset catalogueDataset) {

		CatalogueDataset updatedCatalogueDataset = template.findAndReplace(
				query(where("catalogueDatasetID").is(catalogueDatasetID)),
				catalogueDataset);

		return Optional.ofNullable(updatedCatalogueDataset);

	}

	@Override
	public CatalogueDataset deleteCatalogueDataset(String catalogueDatasetID) {

		template.findAllAndRemove(query(where("catalogueDatasetID").is(catalogueDatasetID)), catalogueDatasetID);
		return null;
	}
}