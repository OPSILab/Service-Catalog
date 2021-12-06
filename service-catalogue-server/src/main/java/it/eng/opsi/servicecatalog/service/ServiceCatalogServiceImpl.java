package it.eng.opsi.servicecatalog.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.jsonld.Serializer;
import it.eng.opsi.servicecatalog.model.HasInfo;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.ServiceModel.ServiceDescriptionStatus;
import it.eng.opsi.servicecatalog.repository.ServiceModelRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ServiceCatalogServiceImpl implements IServiceCatalogService {

	@Autowired
	private Serializer jsonldSerializer;

	@Value("${uriBasePath}")
	private String uriBasePath;

	@Autowired
	private ServiceModelRepository serviceModelRepo;

	@Override
	public List<ServiceModel> getServices() throws ServiceNotFoundException {

//		log.info("Reading all Service Models");
		return serviceModelRepo.findAll();
	}

	@Override
	public ServiceModel getServiceById(String serviceId) throws ServiceNotFoundException {

//		log.info("Finding Service Models");
		return serviceModelRepo.findByIdentifier(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId));
	}

	@Override
	public String getServicesCount() {

//		log.info("Getting Service Count");
		return Long.valueOf(serviceModelRepo.count()).toString();
	}

	@Override
	public ServiceModel createService(ServiceModel service) {

		service.setStatus(ServiceDescriptionStatus.UNDER_DEVELOPMENT);
//		log.info("Creating new Service Model");
		// If identifier is blank, set as the Service Id
		if (StringUtils.isBlank(service.getIdentifier()))
			service.setIdentifier(uriBasePath + service.getIdentifier());

		return serviceModelRepo.save(service);
	}

	@Override
	public ServiceModel updateService(String serviceId, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException {

//		log.info("Updating Service Model");
		// If identifier is blank, set as the Service Id
		if (StringUtils.isBlank(service.getIdentifier()))
			service.setIdentifier(uriBasePath + service.getIdentifier());

		if (!serviceId.equals(service.getIdentifier()))
			throw new ServiceNotEditableException("ServiceId in the path and the one in the body mismatch.");

		return serviceModelRepo.updateService(serviceId, service).orElseThrow(
				() -> new ServiceNotFoundException("No Service description found for Service Id: " + serviceId));

	}

	@Override
	public void deleteService(String serviceId) throws ServiceNotFoundException {

		if (serviceModelRepo.deleteServiceModelByIdentifier(serviceId) == 0L)
			throw new ServiceNotFoundException("No Service description found for Service Id: " + serviceId);

	}

	@Override
	public String getServiceByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException {
		ServiceModel service = serviceModelRepo.findByIdentifier(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId));

		return jsonldSerializer.serialize(service);
	}

	@Override
	public List<HashMap<String, Object>> getCountBySector() {

		return serviceModelRepo.getCountBySector();
	}

	@Override
	public HasInfo getHasInfoById(String serviceId) throws ServiceNotFoundException {

		return serviceModelRepo.getHasInfoByIdentifier(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId)).getHasInfo();
	}
	
	@Override
	public String getHasInfoByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException {

		HasInfo serviceHasInfo = serviceModelRepo.getHasInfoByIdentifier(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId)).getHasInfo();

		return jsonldSerializer.serialize(serviceHasInfo);
	}


}
