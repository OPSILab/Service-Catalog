package it.eng.opsi.servicecatalog.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.ServiceModel.ServiceDescriptionStatus;
import it.eng.opsi.servicecatalog.repository.ServiceModelRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ServiceCatalogServiceImpl implements IServiceCatalogService {

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
		return serviceModelRepo.findByServiceId(serviceId)
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
			service.setIdentifier(uriBasePath + service.getServiceId());

		return serviceModelRepo.save(service);
	}

	@Override
	public ServiceModel updateService(String serviceId, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException {

//		log.info("Updating Service Model");
		// If identifier is blank, set as the Service Id
		if (StringUtils.isBlank(service.getIdentifier()))
			service.setIdentifier(uriBasePath + service.getServiceId());

		if (!serviceId.equals(service.getServiceId()))
			throw new ServiceNotEditableException("ServiceId in the path and the one in the body mismatch.");
		
		return serviceModelRepo.updateService(serviceId, service).orElseThrow(
				() -> new ServiceNotFoundException("No Service description found for Service Id: " + serviceId));

	}

	@Override
	public void deleteService(String serviceId) throws ServiceNotFoundException {

		if (serviceModelRepo.deleteServiceModelByServiceId(serviceId) == 0L)
			throw new ServiceNotFoundException("No Service description found for Service Id: " + serviceId);

	}

}
