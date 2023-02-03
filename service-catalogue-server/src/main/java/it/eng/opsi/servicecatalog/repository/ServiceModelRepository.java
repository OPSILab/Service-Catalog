package it.eng.opsi.servicecatalog.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.HasInfo;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.HasInfoOnly;

public interface ServiceModelRepository extends MongoRepository<ServiceModel, String>, ServiceModelCustomRepository {

	public Optional<ServiceModel> findByIdentifier(String serviceId);

	public Optional<HasInfoOnly> getHasInfoByIdentifier(String serviceId);

	// @Query(value = "{ $and:[{ 'serviceId': ?0}, {
	// 'serviceInstance.cert':{$ne:null}}]}")
	// public Optional<ServiceModel> findRegisteredByServiceId(String serviceId);

	// @Query(value = "{ 'serviceInstance.cert':{$ne:null}}")
	// public List<ServiceModel> findAllRegisteredServices();

	@Query(value = "{ 'title': { $regex : ?0, $options: i}}")
	public List<ServiceModel> findByServiceName(String serviceName);

	@Query(value = "{ 'hasInfo.keyword': { $regex : ?0, $options: i}}")
	public List<ServiceModel> findByServiceKeywords(String keywords);

	@Query(value = "{ 'hasInfo.spatial': { $regex : ?0, $options: i}}")
	public List<ServiceModel> findByServiceLocation(String spatial);

	// @Query(value = "{ identifier: ?0}")
	// public Optional<ServiceModel> findByServiceUrl(String serviceUrl);

	// @Query(value = "{ 'serviceInstance.serviceProvider.businessId': ?0}")
	// public List<ServiceModel> findByServiceProviderBusinessId(String businessId);

	// @Query(value = "{ $and:[{ 'serviceInstance.serviceProvider.businessId': ?0},
	// { 'serviceInstance.cert':{$ne:null}}]}")
	// public List<ServiceModel>
	// findRegisteredServicesByServiceProviderBusinessId(String businessId);

	@Query(value = "{ 'identifier': { $in: ?0}}")
	public List<ServiceModel> findByServicebyIds(Object[] ids);
	/*
	 * @Query(value = "{ ?0: { $in: '$hasInfo.spatial'} }")
	 * public List<ServiceModel> findByServiceLocation(String spatial);
	 * 
	 * 
	 * @Query(value = "{ ?0: { $in: '$hasInfo.keyword'} }")
	 * public List<ServiceModel> findByServiceKeywords(List<String> keywords);
	 * 
	 * @Query(value = "{ ?0: { $in: '$hasInfo.keyword'} }")
	 * public List<ServiceModel> findByServiceKeyword(String keyword);
	 */

	@Query(value = "{ 'isPersonalDataHandling': { $exists: true, $not: {$size: 0} } }", count = true)
	public List<ServiceModel> findServicesIsPersonalDataHandling();

	@Query(value = "{ 'isPersonalDataHandling': { $exists: true, $not: {$size: 0} } }", count = true)
	public Long countServicesIsPersonalDataHandling();

	public Long deleteServiceModelByIdentifier(String serviceId);

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
			" {$group:{'_id':'_','publicServices':{$sum:{$cond:['$isPublicService',1,0]}},'privateServices':{$sum:{$cond:['$isPublicService',0,1]}}}}",
			"{$project:{'_id':0,'publicServices':1,'privateServices':1,'total':{$sum:['$publicServices','$privateServices']}}}" })
	public HashMap<String, Integer> getTotalCount();

	@Aggregation(pipeline = { "{$unwind: '$hasInfo.spatial'}", "{'$group':{'_id':'$hasInfo.spatial','count':{$sum:1}}}",
			"{$project:{'_id':0,'location':'$_id','count':'$count'}}" })
	public List<HashMap<String, Object>> getCountByLocation();
}
