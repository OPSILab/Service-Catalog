package it.eng.opsi.servicecatalog.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Service;

import it.eng.opsi.servicecatalog.exception.AdapterLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.AdapterNotEditableException;
import it.eng.opsi.servicecatalog.exception.AdapterNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotEditableException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotFoundException;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.jsonld.Serializer;
import it.eng.opsi.servicecatalog.model.HasInfo;
import it.eng.opsi.servicecatalog.model.HasServiceInstance;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Adapter;
import it.eng.opsi.servicecatalog.model.AdapterLog;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ConnectorLog;
import it.eng.opsi.servicecatalog.model.Endpoint;
import it.eng.opsi.servicecatalog.model.EndpointConnector;
import it.eng.opsi.servicecatalog.model.HasCost;
import it.eng.opsi.servicecatalog.model.ServiceModel.ServiceDescriptionStatus;
import it.eng.opsi.servicecatalog.repository.ServiceModelRepository;
import it.eng.opsi.servicecatalog.repository.AdapterLogRepository;
import it.eng.opsi.servicecatalog.repository.AdapterRepository;
import it.eng.opsi.servicecatalog.repository.ConnectorLogRepository;
import it.eng.opsi.servicecatalog.repository.ConnectorModelRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ServiceCatalogServiceImpl implements IServiceCatalogService {

	@Autowired
	private Serializer jsonldSerializer;

	@Autowired
	MongoTemplate mongoTemplate;

	@Value("${uriBasePath}")
	private String uriBasePath;

	@Autowired
	private ServiceModelRepository serviceModelRepo;

	@Autowired
	private ConnectorModelRepository connectorModelRepo;

	@Autowired
	private ConnectorLogRepository connectorLogRepo;

	@Autowired
	private AdapterLogRepository adapterLogRepo;

	@Autowired
	private AdapterRepository adapterRepo;

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
	public HashMap<String, Object> getConnectorsCount() {
		return connectorModelRepo.getTotalCount();
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
		System.out.println(connector.getServiceId());
		if (connector.getServiceId() != "" && connector.getServiceId() != null)
			this.assignConnector(connector);

		return connectorModelRepo.save(connector);
	}

	public void assignConnector(Connector connector) {
		ServiceModel service = this.getServiceById(connector.getServiceId());
		if (service.getHasServiceInstance().getEndpointConnector().getConnectorId() != ""
				&& service.getHasServiceInstance().getEndpointConnector().getConnectorId() != null
				&& this.getConnectorByserviceId(connector.getServiceId()) != null)
			this.removeAssignConnectorFromConnectorCollection(this.getConnectorByserviceId(connector.getServiceId()));

		/*
		 * HasServiceInstance serviceInstance = new HasServiceInstance();
		 * EndpointConnector endpointConnector = new EndpointConnector();
		 * endpointConnector.setConnectorId(connector.getConnectorId());
		 * serviceInstance.setEndpointConnector(endpointConnector);
		 * service.setHasServiceInstance(serviceInstance);
		 */

		service.getHasServiceInstance().getEndpointConnector().setConnectorId(connector.getConnectorId());

		this.updateService(connector.getServiceId(), service);
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

	public void removeAssignConnectorFromConnectorCollection(Connector connector) {
		connector.setServiceId("");
		this.updateConnector(connector.getConnectorId(), connector);
	}

	public void removeAssignConnector(String serviceId) {
		ServiceModel service = this.getServiceById(serviceId);
		HasServiceInstance serviceInstance = new HasServiceInstance();
		EndpointConnector endpointConnector = new EndpointConnector();
		endpointConnector.setConnectorId("");
		serviceInstance.setEndpointConnector(endpointConnector);
		service.setHasServiceInstance(serviceInstance);
		this.updateService(serviceId, service);
	}

	@Override
	public Connector updateConnector(String connectorId, Connector connector)
			throws ConnectorNotFoundException, ConnectorNotEditableException {

		if (StringUtils.isBlank(connector.getConnectorId()))
			connector.setConnectorId(uriBasePath + connector.getConnectorId());

		if (!connectorId.equals(connector.getConnectorId()))
			throw new ServiceNotEditableException("ConnectorId in the path and the one in the body mismatch.");

		if (connector.getServiceId() != "" && connector.getServiceId() != null) {
			for (ServiceModel service : serviceModelRepo.findByConnectorID(connectorId))
				this.removeAssignConnector(service.getIdentifier());
			this.assignConnector(connector);
		}

		/*
		 * if (this.getConnectorByconnectorId(connectorId).getServiceId() != ""
		 * && this.getConnectorByconnectorId(connectorId).getServiceId() != null)
		 * this.removeAssignConnector(this.getConnectorByconnectorId(connectorId).
		 * getServiceId());
		 */

		return connectorModelRepo.updateConnector(connectorId, connector).orElseThrow(
				() -> new ServiceNotFoundException("No Connector description found for Service Id: " + connectorId));
	}

	@Override
	public void deleteService(String serviceId) throws ServiceNotFoundException {

		if (serviceModelRepo.deleteServiceModelByIdentifier(serviceId) == 0L)
			throw new ServiceNotFoundException("No Service description found for Service Id: " + serviceId);

	}

	@Override
	public Connector deleteConnector(String connectorId) throws ConnectorNotFoundException {

		if (connectorModelRepo.deleteConnectorModelByconnectorId(connectorId) == 0L)
			throw new ServiceNotFoundException("No Connector description found for Connector Id: " + connectorId);

		return connectorModelRepo.deleteConnector(connectorId);
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
		return serviceModelRepo.getCountByLocation();
	}

	@Override
	public List<ServiceModel> getServicesbyIds(List<String> ids) throws ServiceNotFoundException {

		return serviceModelRepo.findByServicebyIds(
				ids.stream().map(p -> java.net.URLDecoder.decode(p, StandardCharsets.UTF_8)).toArray());
	}

	@Override
	public List<ServiceModel> getServicesbyLocation(String location) throws ServiceNotFoundException {
		return serviceModelRepo.findByServiceLocation(
				location);
	}

	@Override
	public List<ServiceModel> getServicesbyKeywords(String[] keywords) throws ServiceNotFoundException {

		/*
		 * List<String> keywordsList = new ArrayList<String>();
		 * keywordsList.add(keywords);
		 * return serviceModelRepo.findByServiceKeywords(keywords.split(","));
		 */
		return serviceModelRepo.findByServiceKeywords(keywords);
	}

	@Override
	public List<ServiceModel> getServicesbyTitle(String title) throws ServiceNotFoundException {

		return serviceModelRepo.findByServiceName(
				title);
	}

	@Override
	public List<ServiceModel> getServicesIsPersonaDataHandling() throws ServiceNotFoundException {
		return serviceModelRepo.findServicesIsPersonalDataHandling();
	}

	@Override
	public Long getServicesIsPersonaDataHandlingCount() {
		// TODO Auto-generated method stub
		return serviceModelRepo.countServicesIsPersonalDataHandling();
	}

	@Override
	public List<Connector> getConnectors() throws ConnectorNotFoundException {

		return connectorModelRepo.findAll();
	}

	@Override
	public Connector getConnectorByconnectorId(String connectorId) throws ConnectorNotFoundException {

		return connectorModelRepo.findByconnectorId(connectorId);
	}

	@Override
	public Connector getConnectorByserviceId(String serviceId) throws ConnectorNotFoundException {

		return connectorModelRepo.findByserviceId(serviceId);
	}

	@Override
	public List<ConnectorLog> getConnectorLogs() throws ConnectorLogNotFoundException {

		return connectorLogRepo.findAll();
	}

	@Override
	public List<ConnectorLog> getConnectorLogsByconnectorId(String decodedConnectorConnectorId)
			throws ConnectorLogNotFoundException {

		return connectorLogRepo.findByconnectorId(decodedConnectorConnectorId);
	}

	@Override
	public ConnectorLog createConnectorLog(@Valid ConnectorLog connectorLog) {

		return connectorLogRepo.save(connectorLog);
	}

	@Override
	public ConnectorLog deleteConnectorLog(String decodedConnectorConnectorId) throws ConnectorLogNotFoundException {

		if (connectorLogRepo.deleteConnectorLogByconnectorId(decodedConnectorConnectorId) == 0L)
			throw new ConnectorLogNotFoundException(
					"No Connector log description found for Connector Id: " + decodedConnectorConnectorId);

		return connectorLogRepo.deleteConnectorLog(decodedConnectorConnectorId);
	}

	@Override
	public List<Adapter> getAdapters() {

		return adapterRepo.findAll();

	}

	@Override
	public Adapter getAdapterByadapterId(String decodedAdapterAdapterId) {
		return adapterRepo.findByadapterId(decodedAdapterAdapterId);
	}

	@Override
	public HashMap<String, Object> getAdaptersCount() {
		return adapterRepo.getTotalCount();
	}

	@Override
	public Adapter updateAdapter(String adapterId, @Valid Adapter adapter)
			throws AdapterNotFoundException, AdapterNotEditableException {
		if (StringUtils.isBlank(adapter.getAdapterId()))
			adapter.setAdapterId(uriBasePath + adapter.getAdapterId());

		if (!adapterId.equals(adapter.getAdapterId()))
			throw new AdapterNotEditableException("AdapterId in the path and the one in the body mismatch.");

		return adapterRepo.updateAdapter(adapterId, adapter).orElseThrow(
				() -> new AdapterNotFoundException("No Adapter description found for Adapter Id: " + adapterId));
	}

	@Override
	public Object deleteAdapter(String decodedAdapterAdapterId) throws AdapterNotFoundException {
		if (adapterRepo.deleteAdapterByadapterId(decodedAdapterAdapterId) == 0L)
			throw new AdapterNotFoundException(
					"No Adapter description found for Adapter Id: " + decodedAdapterAdapterId);

		return adapterRepo.deleteAdapter(decodedAdapterAdapterId);
	}

	@Override
	public Adapter createAdapter(@Valid Adapter adapter) {
		return adapterRepo.save(adapter);

	}

	@Override
	public List<AdapterLog> getAdapterLogs() throws AdapterLogNotFoundException {
		return adapterLogRepo.findAll();
	}

	@Override
	public List<AdapterLog> getAdapterLogsByadapterId(String decodedAdapterAdapterId)
			throws AdapterLogNotFoundException {
		return adapterLogRepo.findByadapterId(decodedAdapterAdapterId);
	}

	@Override
	public Object deleteAdapterLog(String decodedAdapterAdapterId) {
		if (adapterLogRepo.deleteAdapterLogByadapterId(decodedAdapterAdapterId) == 0L)
			throw new AdapterLogNotFoundException(
					"No Adapter log found for Adapter Id: " + decodedAdapterAdapterId);

		return adapterLogRepo.deleteAdapterLog(decodedAdapterAdapterId);

	}

	@Override
	public AdapterLog createAdapterLog(@Valid AdapterLog adapterLog) {
		return adapterLogRepo.save(adapterLog);
	}

	@Override
	public List<Adapter> getAdapterbytype(String type) {
		return adapterRepo.findBytype(type);
	}

	@Override
	public List<HasCost> getCostByServiceId(String decodedServiceIdentifier) {

		return serviceModelRepo.findByIdentifier(decodedServiceIdentifier).get().getHasInfo()
				.getHasCost();

	}

	@Override
	public List<ServiceModel> getServices(String name, String location, String[] keywords) {
		List<ServiceModel> services = new ArrayList<ServiceModel>();
		if (name != null)
			services.addAll(serviceModelRepo.findByServiceName(name));
		if (location != null)
			services.addAll(serviceModelRepo.findByServiceLocation(location));
		if (keywords != null)
			services.addAll(this.getServicesbyKeywords(keywords));
		return services;
	}

	@Override
	public String getTimeByServiceId(String decodedServiceIdentifier) {
		return serviceModelRepo.findByIdentifier(decodedServiceIdentifier).get().getHasInfo().getProcessingTime();
	}
}
