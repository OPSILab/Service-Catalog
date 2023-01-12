package it.eng.opsi.servicecatalog.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.HasInfo;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.HasInfoOnly;
import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface ConnectorModelRepository extends MongoRepository<Connector, String>, ConnectorModelCustomRepository {

	public Connector findByconnectorId(String connectorId);

	public Optional<HasInfoOnly> getHasInfoByconnectorId(String connectorId);

	@Query(value = "{ 'connectorId': { $in: ?0}}")
	public List<Connector> findConnectorByconnectorIds(Object[] ids);

	public Long deleteConnectorModelByconnectorId(String connectorId); // deleteConnectorModelByServiceId

	@Aggregation(pipeline = {
			" {$group:{'_id':'_','publicConnectors':{$sum:{$cond:['$isPublicService',1,0]}},'privateConnectors':{$sum:{$cond:['$isPublicService',0,1]}}}}",
			"{$project:{'_id':0,'publicConnectors':1,'privateConnectors':1,'total':{$sum:['$publicConnectors','$privateConnectors']}}}" })
	public HashMap<String, Object> getTotalCount();

	public Connector deleteConnector(String connectorId);

}
