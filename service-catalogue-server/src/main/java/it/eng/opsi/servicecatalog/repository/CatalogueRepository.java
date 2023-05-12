package it.eng.opsi.servicecatalog.repository;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.Catalogue;

public interface CatalogueRepository extends MongoRepository<Catalogue, String>, CatalogueCustomRepository {

	@Query(value = "{ 'catalogueID': { $in: ?0}}")
	public List<Catalogue> findCatalogueBycatalogueIDs(Object[] ids);

	public Long deleteCatalogueBycatalogueID(String catalogueID); // deleteCatalogueModelByServiceId

	public Catalogue deleteCatalogue(String connectorId);

	// public long deleteCatalogueBycatalogueID(String decodedConnectorConnectorId);

	public Catalogue findBycatalogueID(String catalogueID);

	@Aggregation(pipeline = {
			" {$group:{'_id':'_','publicCatalogues':{$sum:{$cond:['$isPublicCatalogue',1,0]}},'privateCatalogues':{$sum:{$cond:['$isPublicCatalogue',0,1]}}}}",
			"{$project:{'_id':0,'publicCatalogues':1,'privateCatalogues':1,'total':{$sum:['$publicCatalogues','$privateCatalogues']}}}" })
	public HashMap<String, Integer> getTotalCount();

	public List<Catalogue> findBytype(String type);

	public Catalogue findByname(String name);

	public List<Catalogue> findBycountry(String country);
}
