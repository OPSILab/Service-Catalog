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

	// @Query(value = "{ $and:[{ 'serviceId': ?0}, {
	// 'serviceInstance.cert':{$ne:null}}]}")
	// public Optional<Connector> findRegisteredByServiceId(String serviceId);

	// @Query(value = "{ 'serviceInstance.cert':{$ne:null}}")
	// public List<Connector> findAllRegisteredConnectors();

	// @Query(value = "{ name: { $regex : ?0, $options: i}}", fields = "{
	// 'serviceDescriptionSignature' : ?1, 'serviceInstance.cert' : ?2}")
	// public Optional<Connector> findByServiceName(String serviceName, Boolean
	// withSignature, Boolean withCertificate);

	// @Query(value = "{ identifier: ?0}")
	// public Optional<Connector> findByServiceUrl(String serviceUrl);

	// @Query(value = "{ 'serviceInstance.serviceProvider.businessId': ?0}")
	// public List<Connector> findByServiceProviderBusinessId(String businessId);

	// @Query(value = "{ $and:[{ 'serviceInstance.serviceProvider.businessId': ?0},
	// { 'serviceInstance.cert':{$ne:null}}]}")
	// public List<Connector>
	// findRegisteredConnectorsByServiceProviderBusinessId(String businessId);

	@Query(value = "{ 'connectorId': { $in: ?0}}")
	public List<Connector> findConnectorByconnectorIds(Object[] ids);

	@Query(value = "{ 'isPersonalDataHandling': { $exists: true, $not: {$size: 0} } }", count = true)
	public List<Connector> findConnectorsIsPersonalDataHandling();

	@Query(value = "{ 'isPersonalDataHandling': { $exists: true, $not: {$size: 0} } }", count = true)
	public Long countConnectorsIsPersonalDataHandling();

	public Long deleteConnectorModelByconnectorId(String connectorId); // deleteConnectorModelByServiceId

	// @Aggregation(pipeline = { "{ $match: { 'serviceId' : $0}}", "{ $unwind:
	// '$isDescribedAt'}",
	// "{ $match: { 'isDescribedAt.datasetId' : $1}}", "{ $unwind :
	// '$isDescribedAt.dataMapping' }",
	// "{ $replaceRoot: { 'newRoot' : '$isDescribedAt.dataMapping'}}" })
	// public Optional<List<DataMapping>>
	// getDatasetDataMappingByServiceIdAndDatasetId(String service, String
	// datasetId);

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

	public Connector deleteConnector(String connectorId);

	// public List<Connector> findByserviceIds(Object[] array);

	// public Connector findByIdentifier(String serviceId);

}
