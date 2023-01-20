package it.eng.opsi.servicecatalog.repository;

import java.util.HashMap;
import java.util.List;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.Connector;

public interface ConnectorModelRepository extends MongoRepository<Connector, String>, ConnectorModelCustomRepository {

	public Connector findByconnectorId(String connectorId);

	@Query(value = "{ 'connectorId': { $in: ?0}}")
	public List<Connector> findConnectorByconnectorIds(Object[] ids);

	public Long deleteConnectorModelByconnectorId(String connectorId);

	@Aggregation(pipeline = {
			" {$group:{'_id':'_','publicConnectors':{$sum:{$cond:['$isPublicConnector',1,0]}},'privateConnectors':{$sum:{$cond:['$isPublicConnector',0,1]}}}}",
			"{$project:{'_id':0,'publicConnectors':1,'privateConnectors':1,'total':{$sum:['$publicConnectors','$privateConnectors']}}}" })
	public HashMap<String, Object> getTotalCount();

	public Connector deleteConnector(String connectorId);

}
