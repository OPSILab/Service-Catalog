package it.eng.opsi.servicecatalog.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import it.eng.opsi.servicecatalog.model.Catalogue;

public class CatalogueCustomRepositoryImpl implements CatalogueCustomRepository {

	@Autowired
	MongoTemplate template;

	public Optional<Catalogue> updateCatalogue(String catalogueID, Catalogue catalogue) {

		Catalogue updatedCatalogue = template.findAndReplace(query(where("catalogueID").is(catalogueID)),
				catalogue);

		return Optional.ofNullable(updatedCatalogue);

	}

	@Override
	public Catalogue deleteCatalogue(String catalogueID) {

		template.findAllAndRemove(query(where("catalogueID").is(catalogueID)), catalogueID);
		return null;
	}
}