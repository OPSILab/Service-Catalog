package it.eng.opsi.servicecatalog.repository;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.CatalogueDataset;

public interface CatalogueDatasetRepository
		extends MongoRepository<CatalogueDataset, String>, CatalogueDatasetCustomRepository {

	@Query(value = "{ 'catalogueDatasetID': { $in: ?0}}")
	public List<CatalogueDataset> findCatalogueDatasetBycatalogueDatasetIDs(Object[] ids);

	public Long deleteCatalogueDatasetBycatalogueDatasetID(String catalogueDatasetID); // deleteCatalogueDatasetModelByServiceId

	public CatalogueDataset deleteCatalogueDataset(String connectorId);

	// public long deleteCatalogueDatasetBycatalogueDatasetID(String
	// decodedConnectorConnectorId);

	public CatalogueDataset findBycatalogueDatasetID(String catalogueDatasetID);

	@Aggregation(pipeline = {
			" {$group:{'_id':'_','publicCatalogueDatasets':{$sum:{$cond:['$isPublicCatalogueDataset',1,0]}},'privateCatalogueDatasets':{$sum:{$cond:['$isPublicCatalogueDataset',0,1]}}}}",
			"{$project:{'_id':0,'publicCatalogueDatasets':1,'privateCatalogueDatasets':1,'total':{$sum:['$publicCatalogueDatasets','$privateCatalogueDatasets']}}}" })
	public HashMap<String, Object> getTotalCount();

	public List<CatalogueDataset> findBytype(String type);
}
