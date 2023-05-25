package it.eng.opsi.servicecatalog.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.token.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
//import org.springframework.security.config.web.server.ServerHttpSecurity.HeaderSpec;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.RequestBodySpec;
import org.springframework.web.reactive.function.client.WebClient.ResponseSpec;
import org.springframework.web.reactive.function.client.WebClient.UriSpec;
import org.springframework.web.servlet.function.ServerRequest.Headers;

import it.eng.opsi.servicecatalog.exception.AdapterLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.AdapterNotEditableException;
import it.eng.opsi.servicecatalog.exception.AdapterNotFoundException;
import it.eng.opsi.servicecatalog.exception.CatalogueDatasetNotEditableException;
import it.eng.opsi.servicecatalog.exception.CatalogueDatasetNotFoundException;
import it.eng.opsi.servicecatalog.exception.CatalogueNotEditableException;
import it.eng.opsi.servicecatalog.exception.CatalogueNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorLogNotFoundException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotEditableException;
import it.eng.opsi.servicecatalog.exception.ConnectorNotFoundException;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.jsonld.Serializer;
import it.eng.opsi.servicecatalog.model.HasInfo;
import it.eng.opsi.servicecatalog.model.HasServiceInstance;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Status;
import it.eng.opsi.servicecatalog.model.Adapter;
import it.eng.opsi.servicecatalog.model.AdapterLog;
import it.eng.opsi.servicecatalog.model.Catalogue;
import it.eng.opsi.servicecatalog.model.CatalogueDataset;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.model.ConnectorLog;
import it.eng.opsi.servicecatalog.model.Endpoint;
import it.eng.opsi.servicecatalog.model.EndpointConnector;
import it.eng.opsi.servicecatalog.model.HasCost;
import it.eng.opsi.servicecatalog.model.ServiceModel.ServiceDescriptionStatus;
import it.eng.opsi.servicecatalog.repository.ServiceModelRepository;
import it.eng.opsi.servicecatalog.security.Encryption;
import it.eng.opsi.servicecatalog.repository.AdapterLogRepository;
import it.eng.opsi.servicecatalog.repository.AdapterRepository;
import it.eng.opsi.servicecatalog.repository.CatalogueDatasetRepository;
import it.eng.opsi.servicecatalog.repository.CatalogueRepository;
import it.eng.opsi.servicecatalog.repository.ConnectorLogRepository;
import it.eng.opsi.servicecatalog.repository.ConnectorModelRepository;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;

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

	@Autowired
	private CatalogueRepository catalogueRepo;

	@Autowired
	private CatalogueDatasetRepository catalogueDatasetRepo;

	@Value("${spring.application.status}")
	private String STATUS;

	@Override
	public List<ServiceModel> getServices() throws ServiceNotFoundException {

		// log.info("Reading all Service Models");
		return serviceModelRepo.findAll();
	}

	public String getFederatedServices(String catalogueID)
			throws ServiceNotFoundException, URISyntaxException {

		Catalogue catalogue = catalogueRepo.findBycatalogueID(catalogueID);

		catalogue.setClientSecret(Encryption.decrypt(catalogue.getClientSecret()));

		// get token

		String accessToken = "";
		try {
			HttpClient client = HttpClient.newHttpClient();

			HttpRequest request = HttpRequest.newBuilder()
					.uri(URI.create("https://idm.cape-suite.eu/auth/realms/Cape/protocol/openid-connect/token"))
					.POST(BodyPublishers.ofString(
							"grant_type=client_credentials&redirect_uri=https://idm.cape-suite.eu/oauth&client_id=ids-usage-control&client_secret=3337d253-eb01-47f8-acb1-cf309b0a3d7b"))
					.setHeader("Content-Type", "application/x-www-form-urlencoded")
					.build();

			HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

			accessToken = response.body().split("\"access_token\":\"")[1].split("\",")[0];
			// System.out.println(accessToken);
			// System.out.println("\n\n\n\n\n\n\n\n\n\n");
		} catch (Exception e) {
			System.out.println(e);
		}

		// get remote services
		/*
		 * accessToken =
		 * "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXZE5weTBrRElLSDNaak5rUmYzQTUtcE1Wbm8xend5RTZtRktmc0Q3bzBRIn0.eyJleHAiOjE2ODUxMDkzNzIsImlhdCI6MTY4NTAyMjk3MiwianRpIjoiNmYxZTBiOTQtMGFmYy00MDdjLWE4ZmItNDhmYTUyMWUxNDdkIiwiaXNzIjoiaHR0cHM6Ly9pZG0uY2FwZS1zdWl0ZS5ldS9hdXRoL3JlYWxtcy9DYXBlIiwiYXVkIjpbImNhcGUtc2VydmljZS1zZGsiLCJjYXBlLXNlcnZlciIsImFjY291bnQiXSwic3ViIjoiM2NjMTQ2MGYtNDg1OS00ZGQzLWEwNDktZGU1NGNhNTI3OTUxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaWRzLXVzYWdlLWNvbnRyb2wiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWNhcGUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJjYXBlLXNlcnZpY2Utc2RrIjp7InJvbGVzIjpbIkRBVEFfQ09OVFJPTExFUiJdfSwiY2FwZS1zZXJ2ZXIiOnsicm9sZXMiOlsiREFUQV9TVUJKRUNUIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMTg1LjE0NC4xMjAuNTAiLCJjbGllbnRJZCI6Imlkcy11c2FnZS1jb250cm9sIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWlkcy11c2FnZS1jb250cm9sIiwiY2xpZW50QWRkcmVzcyI6IjE4NS4xNDQuMTIwLjUwIn0.CjOf0pqOqt_zrzUzgVKr8l7jwG6wid_M_05-h4Ff1b5gplA2mtFxAYnd3loH5_PQdV9s3VWVUYZPTAjfoo_5gvxaQf8Hkl7n8cVyI339qpCPJFnFTyM6wf3-wgMysiUTnrg-Mytzba8iDqn9taFsF6uXy4YNIRIwMTMcZCnZPBonvzvF2WErtH5m24PZYdqJKQjqE4YandigSIhvtV5uKYz_6yqgkOJ4L7rhELXqeh1s4cAy0YHo23xdKbk7lCyk4jTD-uM-n_TPx68OzUDe1YGxi2jgSUeEHxuizxW-IPa-F5cVVCRhm5aSbXxKU9-NrBtQAX1uHT54Xeq4-htPoQ";
		 * WebClient client = WebClient.create();
		 * 
		 * String response = client.get()
		 * .uri(new URI(catalogue.getApiEndpoint()))
		 * .header("Authorization", accessToken)
		 * .accept(MediaType.APPLICATION_JSON)
		 * .retrieve()
		 * .bodyToMono(String.class)
		 * .block();
		 */
		HttpClient client = HttpClient.newBuilder()
				.followRedirects(HttpClient.Redirect.NORMAL)
				.build();

		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("http://localhost:8085/service-catalogue/api/v2/services"))
				.GET()
				.setHeader("Authorization",
						"Bearer ".concat(accessToken))
				// .setHeader("Cookie", "JSESSIONID=4506064D992D94D200B429A2E0FD6D21")
				.build();

		HttpResponse<String> response;
		try {
			response = client.send(request, HttpResponse.BodyHandlers.ofString());
			System.out.println(response.body());
			System.out.println(response.body().toString());
			return response.body().toString();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println(e);
			return (e.getMessage());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			System.out.println(e);
			return (e.getMessage());
		}
		// return "errors";
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
		service.getHasServiceInstance().getEndpointConnector().setConnectorId("");
		this.updateService(serviceId, service);
	}

	@Override
	public Connector updateConnector(String connectorId, Connector connector)
			throws ConnectorNotFoundException, ConnectorNotEditableException {

		if (StringUtils.isBlank(connector.getConnectorId()))
			connector.setConnectorId(uriBasePath + connector.getConnectorId());

		if (!connectorId.equals(connector.getConnectorId()))
			throw new ServiceNotEditableException("ConnectorId in the path and the one in the body mismatch.");

		for (ServiceModel service : serviceModelRepo.findByConnectorID(connectorId))
			this.removeAssignConnector(service.getIdentifier());
		if (connector.getServiceId() != "" && connector.getServiceId() != null)
			this.assignConnector(connector);

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

		List<ServiceModel> services = new ArrayList<ServiceModel>();
		for (String keyword : keywords)
			services.addAll(serviceModelRepo.findByServiceKeywords(keyword));

		return services;
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

		return serviceModelRepo.findByIdentifier(decodedServiceIdentifier).orElseThrow(
				() -> new ServiceNotFoundException("No Service found with Service Id: " + decodedServiceIdentifier))
				.getHasInfo()
				.getHasCost();

	}

	public List<ServiceModel> duplicatesClear(List<ServiceModel> list) {
		List<ServiceModel> servicesClear = new ArrayList<ServiceModel>();
		Set<ServiceModel> hashSetTemp = new HashSet<ServiceModel>();
		hashSetTemp.addAll(list);
		servicesClear.addAll(hashSetTemp);
		return servicesClear;
	}

	@Override
	public List<ServiceModel> getServices(String name, String location, String[] keywords, boolean completed) {
		List<ServiceModel> services = new ArrayList<ServiceModel>();
		List<ServiceModel> servicesByName = new ArrayList<ServiceModel>();
		List<ServiceModel> servicesByKeyword = new ArrayList<ServiceModel>();
		List<ServiceModel> servicesByLocation = new ArrayList<ServiceModel>();
		List<ServiceModel> servicesByStatus = new ArrayList<ServiceModel>();
		if (name != null)
			if (!serviceModelRepo.findByServiceName(name).isEmpty()) {
				servicesByName.addAll(serviceModelRepo.findByServiceName(name));
			} else {
				return services;
			}
		if (location != null)
			if (!serviceModelRepo.findByServiceLocation(location).isEmpty()) {
				servicesByLocation.addAll(serviceModelRepo.findByServiceLocation(location));
			} else {
				return services;
			}
		if (keywords != null)
			if (!this.getServicesbyKeywords(keywords).isEmpty()) {
				servicesByKeyword.addAll(this.getServicesbyKeywords(keywords));
			} else {
				return services;
			}

		if (completed) {
			if (!serviceModelRepo.findByStatus("COMPLETED").isEmpty())
				servicesByStatus.addAll(serviceModelRepo.findByStatus("COMPLETED"));
			else
				return services;
			for (ServiceModel serviceByStatus : servicesByStatus) {
				if (name != null && location != null && keywords != null) {
					if (servicesByName.contains(serviceByStatus) && servicesByLocation.contains(serviceByStatus)
							&& servicesByKeyword.contains(serviceByStatus))
						services.add(serviceByStatus);
				} else if (location != null && keywords != null) {
					if (servicesByLocation.contains(serviceByStatus) && servicesByKeyword.contains(serviceByStatus))
						services.add(serviceByStatus);
				} else if (location != null) {
					if (servicesByLocation.contains(serviceByStatus))
						services.add(serviceByStatus);
				} else if (keywords != null) {
					if (servicesByKeyword.contains(serviceByStatus))
						services.add(serviceByStatus);
				} else
					return this.duplicatesClear(servicesByStatus);
			}
			return this.duplicatesClear(services);
		}

		if (name != null) {
			for (ServiceModel serviceByName : servicesByName) {
				if (location != null && keywords != null) {
					if (servicesByLocation.contains(serviceByName) && servicesByKeyword.contains(serviceByName))
						services.add(serviceByName);
				} else if (location != null) {
					if (servicesByLocation.contains(serviceByName))
						services.add(serviceByName);
				} else if (keywords != null) {
					if (servicesByKeyword.contains(serviceByName))
						services.add(serviceByName);
				} else
					return this.duplicatesClear(servicesByName);
			}
			return this.duplicatesClear(services);
		}

		else if (location != null) {
			for (ServiceModel serviceByLocation : servicesByLocation) {
				if (keywords != null) {
					if (servicesByKeyword.contains(serviceByLocation))
						services.add(serviceByLocation);
				} else
					return this.duplicatesClear(servicesByLocation);
			}
		}

		else if (keywords != null) {
			return this.duplicatesClear(servicesByKeyword);
		}

		return services;
	}

	@Override
	public String getTimeByServiceId(String decodedServiceIdentifier) {

		return serviceModelRepo.findByIdentifier(decodedServiceIdentifier).orElseThrow(
				() -> new ServiceNotFoundException("No Service found with Service Id: " + decodedServiceIdentifier))
				.getHasInfo().getProcessingTime();
	}

	@Override
	public List<ServiceModel> createServices(@Valid List<ServiceModel> services) {

		for (ServiceModel service : services) {
			// service.setStatus(ServiceDescriptionStatus.UNDER_DEVELOPMENT);
			// If identifier is blank, set as the Service Id
			if (StringUtils.isBlank(service.getIdentifier()))
				service.setIdentifier(uriBasePath + service.getIdentifier());
			// log.info("Creating new Service Model");
		}

		return serviceModelRepo.saveAll(services);
	}

	@Override
	public List<Catalogue> getCatalogues() {
		List<Catalogue> catalogues = catalogueRepo.findAll();

		if (catalogues == null)
			return catalogues;

		for (Catalogue catalogue : catalogues) {
			catalogue.setHashedSecret(null);
			catalogue.setClientSecret(null);
		}
		return catalogues;
	}

	@Override
	public Catalogue getCatalogueBycatalogueID(String catalogueID) {
		Catalogue catalogue = catalogueRepo.findBycatalogueID(catalogueID);

		if (catalogue == null)
			return catalogue;
		catalogue.setHashedSecret(null);
		catalogue.setClientSecret(null);

		return catalogue;
	}

	@Override
	public Catalogue createCatalogue(@Valid Catalogue catalogueIn) throws NoSuchAlgorithmException {

		if (catalogueIn.getClientSecret() != null) {
			/*
			 * SecureRandom random = new SecureRandom();
			 * byte[] salt = new byte[16];
			 * random.nextBytes(salt);
			 * MessageDigest md;
			 * md = MessageDigest.getInstance("SHA-512");
			 * md.update(salt);
			 * byte[] hashedPassword =
			 * md.digest(catalogueIn.getClientSecret().getBytes(StandardCharsets.UTF_8));
			 * 
			 * catalogueIn.setHashedSecret(hashedPassword);
			 * catalogueIn.setClientSecret(null);
			 */
			catalogueIn.setClientSecret(Encryption.encrypt(catalogueIn.getClientSecret()));
		}

		Catalogue catalogue = catalogueRepo.save(catalogueIn);
		catalogue.setHashedSecret(null);
		catalogue.setClientSecret(null);
		return catalogue;
	}

	@Override
	public Catalogue updateCatalogue(String decodedCataloguecatalogueID, @Valid Catalogue catalogue,
			boolean secretChanged) {

		if (StringUtils.isBlank(catalogue.getCatalogueID()))
			catalogue.setCatalogueID(uriBasePath + catalogue.getCatalogueID());

		if (!decodedCataloguecatalogueID.equals(catalogue.getCatalogueID()))
			throw new CatalogueNotEditableException("catalogueID in the path and the one in the body mismatch.");

		Catalogue catalogueTemp = catalogueRepo.findBycatalogueID(decodedCataloguecatalogueID);

		if (!secretChanged && catalogueTemp.getHashedSecret() != null) {
			catalogue.setHashedSecret(catalogueTemp.getHashedSecret());
		}

		else if (secretChanged && catalogue.getClientSecret() != null) {
			/*
			 * SecureRandom random = new SecureRandom();
			 * byte[] salt = new byte[16];
			 * random.nextBytes(salt);
			 * MessageDigest md;
			 * try {
			 * md = MessageDigest.getInstance("SHA-512");
			 * md.update(salt);
			 * byte[] hashedPassword =
			 * md.digest(catalogue.getClientSecret().getBytes(StandardCharsets.UTF_8));
			 * catalogue.setHashedSecret(hashedPassword);
			 * } catch (NoSuchAlgorithmException e) {
			 * System.out.println(e);
			 * }
			 */
			catalogue.setClientSecret(Encryption.encrypt(catalogue.getClientSecret()));
		}

		// catalogue.setHashedSecret(hashedPassword);

		Catalogue catalogueUpdated = catalogueRepo.updateCatalogue(decodedCataloguecatalogueID, catalogue)
				.orElseThrow(
						() -> new CatalogueNotFoundException(
								"No Catalogue description found for Catalogue Id: " + decodedCataloguecatalogueID));

		catalogueUpdated.setHashedSecret(null);
		catalogueUpdated.setClientSecret(null);
		return catalogueUpdated;
	}

	@Override
	public void deleteCatalogue(String decodedCataloguecatalogueID) {

		if (catalogueRepo.deleteCatalogueBycatalogueID(decodedCataloguecatalogueID) == 0L)
			throw new ServiceNotFoundException(
					"No Catalogue description found for Catalogue Id: " + decodedCataloguecatalogueID);
	}

	@Override
	public List<CatalogueDataset> getCatalogueDatasets() {
		return catalogueDatasetRepo.findAll();
	}

	@Override
	public CatalogueDataset createCatalogueDataset(@Valid CatalogueDataset catalogueDataset) {

		return catalogueDatasetRepo.save(catalogueDataset);

	}

	@Override
	public CatalogueDataset updateCatalogueDataset(String decodedCatalogueDatasetID,
			@Valid CatalogueDataset catalogueDatasetIn) {
		if (StringUtils.isBlank(catalogueDatasetIn.getCatalogueDatasetID()))
			catalogueDatasetIn.setCatalogueDatasetID(uriBasePath + catalogueDatasetIn.getCatalogueDatasetID());

		if (!decodedCatalogueDatasetID.equals(catalogueDatasetIn.getCatalogueDatasetID()))
			throw new CatalogueDatasetNotEditableException("catalogueID in the path and the one in the body mismatch.");

		return catalogueDatasetRepo
				.updateCatalogueDataset(decodedCatalogueDatasetID, catalogueDatasetIn).orElseThrow(
						() -> new CatalogueDatasetNotFoundException(
								"No Catalogue description found for Catalogue Id: " + decodedCatalogueDatasetID));

	}

	@Override
	public CatalogueDataset deleteCatalogueDataset(String decodedCatalogueDatasetID) {

		if (catalogueDatasetRepo.deleteCatalogueDatasetBycatalogueDatasetID(decodedCatalogueDatasetID) == 0L)
			throw new ServiceNotFoundException(
					"No Catalogue description found for Catalogue Id: " + decodedCatalogueDatasetID);
		return catalogueDatasetRepo.deleteCatalogueDataset(decodedCatalogueDatasetID);
	}

	@Override
	public CatalogueDataset getCatalogueDatasetBycatalogueDatasetID(String catalogueDatasetID) {

		return catalogueDatasetRepo.findBycatalogueDatasetID(catalogueDatasetID);
	}

	@Override
	public Catalogue getCatalogueByName(String name) {
		Catalogue catalogue = catalogueRepo.findByname(name);
		if (catalogue == null)
			return catalogue;

		catalogue.setHashedSecret(null);
		catalogue.setClientSecret(null);
		return catalogue;
	}

	@Override
	public CatalogueDataset getCatalogueDatasetByName(String name) {
		return catalogueDatasetRepo.findByname(name);

	}

	@Override
	public HashMap<String, Integer> getCataloguesCount() {
		return catalogueRepo.getTotalCount();
	}

	@Override
	public HashMap<String, Integer> getCatalogueDatasetsCount() {
		return catalogueDatasetRepo.getTotalCount();
	}

	@Override
	public Status getStatus() {
		Status status = new Status();
		status.setStatus(STATUS);
		return status;
	}

	@Override
	public List<Catalogue> getCatalogueBycountry(String country) {
		List<Catalogue> catalogues = catalogueRepo.findBycountry(country);
		if (catalogues == null)
			return catalogues;

		for (Catalogue catalogue : catalogues) {
			catalogue.setHashedSecret(null);
			catalogue.setClientSecret(null);
		}
		return catalogues;
	}

	@Override
	public String getFederatedServices(String name, String location, String[] keywords, boolean completed,
			String remoteCatalogue) {
		// TODO remote catalogue call
		throw new UnsupportedOperationException("Unimplemented method 'getServices'");
	}
}
