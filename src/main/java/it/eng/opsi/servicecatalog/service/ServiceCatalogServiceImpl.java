package it.eng.opsi.servicecatalog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.repository.ServiceModelRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ServiceCatalogServiceImpl implements IServiceCatalogService {

	@Autowired
	private ServiceModelRepository serviceModelRepo;

	@Override
	public List<ServiceModel> getServices() throws ServiceNotFoundException {

		log.info("Reading all Service Models");
		return serviceModelRepo.findAll();
	}

	@Override
	public ServiceModel getServiceById(String serviceId) throws ServiceNotFoundException {

		log.info("Finding Service Models");
		return serviceModelRepo.findById(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId));
	}

	@Override
	public String getServicesCount() {

		log.info("Getting Service Count");
		return Long.valueOf(serviceModelRepo.count()).toString();
	}

	@Override
	public ServiceModel createService(ServiceModel service) {

		log.info("Creating new Service Model");
		return serviceModelRepo.save(service);
	}

	@Override
	public ServiceModel updateService(String serviceId, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException {

		log.info("Updating Service Model");

		return serviceModelRepo.findByServiceId(serviceId).map(oldService -> {

			if (oldService.getServiceId().equals(service.getServiceId()))
				return serviceModelRepo.save(service);
			else
				throw new ServiceNotFoundException("The Service Model to be updated was not found");
		}).orElseThrow(() -> new ServiceNotFoundException("The Service Model to be updated was not found"));

	}

	@Override
	public void deleteService(String serviceId) throws ServiceNotFoundException {
		
		if (serviceModelRepo.deleteServiceModelByServiceId(serviceId) == 0L)
			throw new ServiceNotFoundException("No Service description found for Service Id: " + serviceId);

	}

}
