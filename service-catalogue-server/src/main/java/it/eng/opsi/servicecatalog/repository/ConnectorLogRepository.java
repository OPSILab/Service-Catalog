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
import it.eng.opsi.servicecatalog.model.ConnectorLog;
import it.eng.opsi.servicecatalog.model.HasInfoOnly;
import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface ConnectorLogRepository extends MongoRepository<ConnectorLog, String>, ConnectorLogCustomRepository {

	public List<ConnectorLog> findByconnectorId(String connectorId);

	public Optional<HasInfoOnly> getHasInfoByconnectorId(String connectorId);

	@Query(value = "{ 'connectorId': { $in: ?0}}")
	public List<ConnectorLog> findConnectorLogByconnectorIds(Object[] ids);

	@Query(value = "{ 'isPersonalDataHandling': { $exists: true, $not: {$size: 0} } }", count = true)
	public List<ConnectorLog> findConnectorLogsIsPersonalDataHandling();

	@Query(value = "{ 'isPersonalDataHandling': { $exists: true, $not: {$size: 0} } }", count = true)
	public Long countConnectorLogsIsPersonalDataHandling();

	public Long deleteConnectorLogModelByconnectorId(String connectorId); // deleteConnectorLogModelByServiceId

	@Aggregation(pipeline = { "{$unwind: '$hasInfo.isGroupedBy'}",
			"{'$group':{'_id':'$hasInfo.isGroupedBy','count':{$sum:1}}}",
			"{$project:{'_id':0,'isGroupedBy':'$_id','count':'$count'}}" })
	public List<HashMap<String, Object>> getCountByGroupedBy();

	@Aggregation(pipeline = { "{$unwind: '$hasInfo.thematicArea'}",
			"{'$group':{'_id':'$hasInfo.thematicArea','count':{$sum:1}}}",
			"{$project:{'_id':0,'thematicArea':'$_id','count':'$count'}}" })
	public List<HashMap<String, Object>> getCountByThematicArea();

	@Aggregation(pipeline = { "{$unwind: '$hasInfo.sector'}", "{'$group':{'_id':'$hasInfo.sector','count':{$sum:1}}}",
			"{$project:{'_id':0,'sector':'$_id','count':'$count'}}" })
	public List<HashMap<String, Object>> getCountBySector();

	@Aggregation(pipeline = {
			" {$group:{'_id':'_','publicConnectors':{$sum:{$cond:['$isPublicService',1,0]}},'privateConnectors':{$sum:{$cond:['$isPublicService',0,1]}}}}",
			"{$project:{'_id':0,'publicConnectors':1,'privateConnectors':1,'total':{$sum:['$publicConnectors','$privateConnectors']}}}" })
	public HashMap<String, Object> getTotalCount();

	@Aggregation(pipeline = { "{$unwind: '$hasInfo.spatial'}", "{'$group':{'_id':'$hasInfo.spatial','count':{$sum:1}}}",
			"{$project:{'_id':0,'location':'$_id','count':'$count'}}" })
	public List<HashMap<String, Object>> getCountByLocation();

	public ConnectorLog deleteConnectorLog(String connectorId);

	public long deleteConnectorLogByconnectorId(String decodedConnectorConnectorId);

}
