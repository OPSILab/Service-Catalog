package it.eng.opsi.servicecatalog.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface ServiceModelRepository extends MongoRepository<ServiceModel, String> {

	public Optional<ServiceModel> findByServiceId(String serviceId);

//	@Query(value = "{ $and:[{ 'serviceId': ?0}, { 'serviceInstance.cert':{$ne:null}}]}")
//	public Optional<ServiceModel> findRegisteredByServiceId(String serviceId);

//	@Query(value = "{ 'serviceInstance.cert':{$ne:null}}")
//	public List<ServiceModel> findAllRegisteredServices();

//	@Query(value = "{ name: { $regex : ?0, $options: i}}", fields = "{ 'serviceDescriptionSignature' : ?1, 'serviceInstance.cert' : ?2}")
//	public Optional<ServiceModel> findByServiceName(String serviceName, Boolean withSignature, Boolean withCertificate);

//	@Query(value = "{ identifier: ?0}")
//	public Optional<ServiceModel> findByServiceUrl(String serviceUrl);

//	@Query(value = "{ 'serviceInstance.serviceProvider.businessId': ?0}")
//	public List<ServiceModel> findByServiceProviderBusinessId(String businessId);

//	@Query(value = "{ $and:[{ 'serviceInstance.serviceProvider.businessId': ?0}, { 'serviceInstance.cert':{$ne:null}}]}")
//	public List<ServiceModel> findRegisteredServicesByServiceProviderBusinessId(String businessId);

	public Long deleteServiceModelByServiceId(String serviceId);

//	@Aggregation(pipeline = { "{ $match: { 'serviceId' : $0}}", "{ $unwind: '$isDescribedAt'}",
//			"{ $match: { 'isDescribedAt.datasetId' : $1}}", "{ $unwind : '$isDescribedAt.dataMapping' }",
//			"{ $replaceRoot: { 'newRoot' : '$isDescribedAt.dataMapping'}}" })
//	public Optional<List<DataMapping>> getDatasetDataMappingByServiceIdAndDatasetId(String service, String datasetId);

}
