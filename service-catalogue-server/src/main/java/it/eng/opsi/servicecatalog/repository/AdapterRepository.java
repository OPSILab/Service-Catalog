package it.eng.opsi.servicecatalog.repository;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.Adapter;

public interface AdapterRepository extends MongoRepository<Adapter, String>, AdapterCustomRepository {

	@Query(value = "{ 'adapterId': { $in: ?0}}")
	public List<Adapter> findAdapterByadapterIds(Object[] ids);

	public Long deleteAdapterModelByadapterId(String connectorId); // deleteAdapterModelByServiceId

	public Adapter deleteAdapter(String connectorId);

	public long deleteAdapterByadapterId(String decodedConnectorConnectorId);

	public Adapter findByadapterId(String adapterId);

	@Aggregation(pipeline = {
			" {$group:{'_id':'_','publicAdapters':{$sum:{$cond:['$isPublicAdapter',1,0]}},'privateAdapters':{$sum:{$cond:['$isPublicAdapter',0,1]}}}}",
			"{$project:{'_id':0,'publicAdapters':1,'privateAdapters':1,'total':{$sum:['$publicAdapters','$privateAdapters']}}}" })
	public HashMap<String, Object> getTotalCount();

	public List<Adapter> findBytype(String type);
}
