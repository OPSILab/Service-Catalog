package it.eng.opsi.servicecatalog.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
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
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ServiceModel.ServiceDescriptionStatus;
import it.eng.opsi.servicecatalog.repository.ServiceModelRepository;
import it.eng.opsi.servicecatalog.repository.ConnectorModelRepository;
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

	@Autowired
	private ConnectorModelRepository connectorModelRepo;

	@Override
	public List<ServiceModel> getServices() throws ServiceNotFoundException {

		// log.info("Reading all Service Models");
		return serviceModelRepo.findAll();
	}

	@Override
	public ServiceModel getServiceById(String serviceId) throws ServiceNotFoundException {

		// log.info("Finding Service Models");
		return serviceModelRepo.findByIdentifier(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId));
	}

	@Override
	public HashMap<String, Integer> getServicesCount() {

		// log.info("Getting Service Count");
		return serviceModelRepo.getTotalCount();
	}

	@Override
	public ServiceModel createService(ServiceModel service) {

		service.setStatus(ServiceDescriptionStatus.UNDER_DEVELOPMENT);
		// log.info("Creating new Service Model");
		// If identifier is blank, set as the Service Id
		if (StringUtils.isBlank(service.getIdentifier()))
			service.setIdentifier(uriBasePath + service.getIdentifier());

		return serviceModelRepo.save(service);
	}

	public Connector createConnector(Connector connector) {

		// connector.setStatus(ConnectorDescriptionStatus.UNDER_DEVELOPMENT); //TODO ?
		// log.info("Creating new Service Model");
		// If identifier is blank, set as the Service Id
		// if (StringUtils.isBlank(connector.getIdentifier()))//TODO ?
		// connector.setIdentifier(uriBasePath + connector.getIdentifier());//TODO ?

		return connectorModelRepo.save(connector);
	}

	@Override
	public ServiceModel updateService(String serviceId, ServiceModel service)
			throws ServiceNotFoundException, ServiceNotEditableException {

		// log.info("Updating Service Model");
		// If identifier is blank, set as the Service Id
		if (StringUtils.isBlank(service.getIdentifier()))
			service.setIdentifier(uriBasePath + service.getIdentifier());

		if (!serviceId.equals(service.getIdentifier()))
			throw new ServiceNotEditableException("ServiceId in the path and the one in the body mismatch.");

		return serviceModelRepo.updateService(serviceId, service).orElseThrow(
				() -> new ServiceNotFoundException("No Service description found for Service Id: " + serviceId));

	}

	@Override
	public Connector updateConnector(String serviceId, Connector connector)
			throws ServiceNotFoundException, ServiceNotEditableException {
		return connector;

		// log.info("Updating Service Model");
		// If identifier is blank, set as the Service Id
		// G
		/*
		 * if (StringUtils.isBlank(service.getIdentifier()))
		 * service.setIdentifier(uriBasePath + service.getIdentifier());
		 * 
		 * if (!serviceId.equals(service.getIdentifier()))
		 * throw new
		 * ServiceNotEditableException("ServiceId in the path and the one in the body mismatch."
		 * );
		 * 
		 * return serviceModelRepo.updateService(serviceId, service).orElseThrow(
		 * () -> new
		 * ServiceNotFoundException("No Service description found for Service Id: " +
		 * serviceId));
		 */
		// G
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
	public HasInfo getHasInfoById(String serviceId) throws ServiceNotFoundException {

		return serviceModelRepo.getHasInfoByIdentifier(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId))
				.getHasInfo();
	}

	@Override
	public String getHasInfoByIdJsonLd(String serviceId) throws ServiceNotFoundException, IOException {

		HasInfo serviceHasInfo = serviceModelRepo.getHasInfoByIdentifier(serviceId)
				.orElseThrow(() -> new ServiceNotFoundException("No Service found with Service Id: " + serviceId))
				.getHasInfo();

		return jsonldSerializer.serialize(serviceHasInfo);
	}

	@Override
	public List<HashMap<String, Object>> getCountBySector() {

		return serviceModelRepo.getCountBySector();
	}

	@Override
	public List<HashMap<String, Object>> getCountByThematicArea() {
		return serviceModelRepo.getCountByThematicArea();
	}

	@Override
	public List<HashMap<String, Object>> getCountByGroupedBy() {

		return serviceModelRepo.getCountByGroupedBy();
	}

	@Override
	public List<HashMap<String, Object>> getCountByLocation() {
		// TODO Auto-generated method stub
		return serviceModelRepo.getCountByLocation();
	}

	@Override
	public List<ServiceModel> getServicesbyIds(List<String> ids) throws ServiceNotFoundException {
		// TODO Auto-generated method stub

		return serviceModelRepo.findByServicebyIds(
				ids.stream().map(p -> java.net.URLDecoder.decode(p, StandardCharsets.UTF_8)).toArray());
	}

	@Override
	public List<ServiceModel> getServicesIsPersonaDataHandling() throws ServiceNotFoundException {
		// TODO Auto-generated method stub
		return serviceModelRepo.findServicesIsPersonalDataHandling();
	}

	@Override
	public Long getServicesIsPersonaDataHandlingCount() {
		// TODO Auto-generated method stub
		return serviceModelRepo.countServicesIsPersonalDataHandling();
	}

	@Override
	public List<Connector> getConnectors() {
		// TODO Auto-generated method stub
		return connectorModelRepo.findAll();
	}

}
