package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.model.Connector;
import it.eng.opsi.servicecatalog.service.IServiceCatalogService;
import it.eng.opsi.servicecatalog.service.ServiceCatalogServiceImpl;
import lombok.extern.slf4j.Slf4j;

@OpenAPIDefinition(info = @Info(title = "Service Catalog API", description = "Service Catalog APIs used to manage CRUD for Service Model descriptions.", version = "1.0"), tags = {
		@Tag(name = "Service Model", description = "Service Model Description APIs to get and manage service model descriptions.") })
@RestController
@RequestMapping("/api/v2")
@Slf4j
public class ServiceCatalogController implements IServiceCatalogController {

	@Autowired
	IServiceCatalogService catalogService;

	@Autowired
	IServiceCatalogController catalogController;

	@Value("${uriBasePath}")
	private String uriBasePath;

	@Override
	@Operation(summary = "Get all the Service Model descriptions.", description = "Get all the Service Model descriptions saved in the Service Catalog.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Returns the list of all registered Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ServiceModel>> getServices() throws ServiceNotFoundException {

		return ResponseEntity.ok(catalogService.getServices());
	}

	@Override
	@Operation(summary = "Get the Service Model description by Service Id.", description = "Get the Service Model description by Service Id.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Service Model description.", responseCode = "200") })
	@GetMapping(value = "/services/json/**", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceById(HttpServletRequest request, @RequestParam("identifier") String identifier)
			throws ServiceNotFoundException, IOException {

		String serviceIdentifier = request.getRequestURI().split(request.getContextPath() + "/api/v2/services/")[1];

		if (StringUtils.isBlank(serviceIdentifier))
			throw new IllegalArgumentException("Illegal Service Identifier in input");

		String decodedServiceIdentifier = java.net.URLDecoder.decode(identifier, StandardCharsets.UTF_8);
		if (serviceIdentifier.startsWith("jsonld"))
			return getServiceByIdJsonLd(decodedServiceIdentifier);

		else if (serviceIdentifier.startsWith("cpsv/jsonld"))
			return getServiceHasInfoByIdJsonLd(decodedServiceIdentifier);
		else
			return ResponseEntity.ok(catalogService.getServiceById(decodedServiceIdentifier));

	}

	@Override
	@Operation(summary = "Get the Service Model descriptions by specified Service Ids.", description = "Get the Service Model descriptions by specified Service Id.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services/specified/**", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceByIds(HttpServletRequest request,
			@RequestParam("identifier") List<String> identifier) throws ServiceNotFoundException, IOException {

		return ResponseEntity.ok(catalogService.getServicesbyIds(identifier));

	}

	@Override
	@Operation(summary = "Get the Service Model descriptions is handling personal data", description = "Get the Service Model descriptions is handling personal data.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services/isPersonalDataHandling", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceIsPersonalDataHandling(HttpServletRequest request)
			throws ServiceNotFoundException, IOException {

		return ResponseEntity.ok(catalogService.getServicesIsPersonaDataHandling());

	}

	@Override
	@Operation(summary = "Get the count of the  Service Model descriptions is personal data handling.", tags = {
			"Service Model" }, responses = { @ApiResponse(description = "Returns the count.", responseCode = "200") })
	@GetMapping(value = "/services/isPersonalDataHandling/count", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getServicesIsPersonalDataHandlingCount() {

		return ResponseEntity.ok(catalogService.getServicesIsPersonaDataHandlingCount().toString());
	}

	@Override
	@Operation(summary = "Get the count of the registered Service Model descriptions (total, public and private services).", tags = {
			"Service Model" }, responses = { @ApiResponse(description = "Returns the count.", responseCode = "200") })
	@GetMapping(value = "/services/count", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HashMap<String, Integer>> getServicesCount() {

		return ResponseEntity.ok(catalogService.getServicesCount());
	}

	@Operation(summary = "Create a new Service Model description.", tags = { "Service Model" }, responses = {
			@ApiResponse(description = "Returns 201 Created with the created Service Model.", responseCode = "201", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ServiceModel.class))) })
	@Override
	@PostMapping(value = "/services")
	public ResponseEntity<ServiceModel> createService(@RequestBody @Valid ServiceModel service) {

		ServiceModel result = catalogService.createService(service);
		return ResponseEntity.created(URI.create(uriBasePath + result.getIdentifier().replaceAll("\\s+", "")))
				.body(result);
	}

	@Override
	@PostMapping(value = "/connectors")
	public ResponseEntity<Connector> createConnector(@RequestBody @Valid Connector connector) {

		Connector result = catalogService.createConnector(connector);
		// return ResponseEntity.created(URI.create(uriBasePath +
		// result.getIdentifier().replaceAll("\\s+", ""))).body(result);
		return ResponseEntity.created(URI.create(uriBasePath)).body(result);// G
	}

	@Operation(summary = "Update Service Model description, by replacing the existing one", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Returns the Model Service Entry.", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ServiceModel.class))) })
	@Override
	@PutMapping(value = "/services", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ServiceModel> updateService(@RequestParam("identifier") String identifier,
			@RequestBody @Valid ServiceModel service) throws ServiceNotFoundException, ServiceNotEditableException {

		// String serviceIdentifier =
		// request.getRequestURI().split(request.getContextPath() +
		// "/api/v2/services/")[1];

		if (StringUtils.isBlank(identifier))
			throw new IllegalArgumentException("Illegal Service Identifier in input");

		String decodedServiceIdentifier = java.net.URLDecoder.decode(identifier, StandardCharsets.UTF_8);

		return ResponseEntity.ok(catalogService.updateService(decodedServiceIdentifier, service));
	}

	@Operation(summary = "Update Connector Model description, by replacing the existing one", tags = {
			"Connector Model" }, responses = {
					@ApiResponse(description = "Returns the Model Connector Entry.", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Connector.class))) })
	@Override
	@PutMapping(value = "/connectors", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateConnector(@RequestParam("identifier") String identifier,
			@RequestBody @Valid Connector connector) throws ServiceNotFoundException, ServiceNotEditableException {

		// String serviceIdentifier =
		// request.getRequestURI().split(request.getContextPath() +
		// "/api/v2/services/")[1];

		if (StringUtils.isBlank(identifier))
			throw new IllegalArgumentException("Illegal Service Identifier in input");

		String decodedServiceIdentifier = java.net.URLDecoder.decode(identifier, StandardCharsets.UTF_8);

		return ResponseEntity.ok(catalogService.updateConnector(decodedServiceIdentifier, connector));
	}

	@Operation(summary = "Delete Service Model description by Service Id.", tags = { "Service Model" }, responses = {
			@ApiResponse(description = "Returns No Content.", responseCode = "204") })
	@Override
	@DeleteMapping(value = "/services")
	public ResponseEntity<Object> deleteService(@RequestParam("identifier") String identifier)
			throws ServiceNotFoundException {

		// String serviceIdentifier =
		// request.getRequestURI().split(request.getContextPath() +
		// "/api/v2/services/")[1];

		if (StringUtils.isBlank(identifier))
			throw new IllegalArgumentException("Illegal Service Identifier in input");

		String decodedServiceIdentifier = java.net.URLDecoder.decode(identifier, StandardCharsets.UTF_8);

		catalogService.deleteService(decodedServiceIdentifier);

		return ResponseEntity.noContent().build();

	}

	// @Override
	// @Operation(summary = "Get the Service Model description by Service Id,
	// serialized as Json-LD.", description = "Get the Service Model description by
	// Service Id, serialized as Json-LD.", tags = {
	// "Service Model | JSON-LD" }, responses = {
	// @ApiResponse(description = "Returns the JSON-LD of the requested Service
	// Model description.", responseCode = "200") })
	// @GetMapping(value = "/services/jsonld/{serviceId}", produces =
	// MediaType.APPLICATION_JSON_VALUE)

	public ResponseEntity<String> getServiceByIdJsonLd(String serviceIdentifier)
			throws ServiceNotFoundException, IOException {

		// String serviceIdentifier = request.getRequestURI()
		// .split(request.getContextPath() + "/api/v2/services/")[1];
		//
		if (StringUtils.isBlank(serviceIdentifier))
			throw new IllegalArgumentException("Illegal Service Identifier in input");

		return ResponseEntity.ok(catalogService.getServiceByIdJsonLd(serviceIdentifier));

	}

	// @Operation(summary = "Get the hasInfo part of Service Model description by
	// Service Id, serialized as Json-LD according to CPSV-AP specification.",
	// description = "Get the Service Model description by Service Id, serialized as
	// Json-LD.", tags = {
	// "Service Model | JSON-LD" }, responses = {
	// @ApiResponse(description = "Returns the JSON-LD of the requested Service
	// Model description.", responseCode = "200") })
	// @GetMapping(value = "/services/cpsv/jsonld/{serviceId}", produces =
	// MediaType.APPLICATION_JSON_VALUE)
	// @Override
	public ResponseEntity<String> getServiceHasInfoByIdJsonLd(String serviceIdentifier)
			throws ServiceNotFoundException, IOException {

		// String serviceIdentifier = request.getRequestURI()
		// .split(request.getContextPath() + "/api/v2/services/")[1];
		//
		if (StringUtils.isBlank(serviceIdentifier))
			throw new IllegalArgumentException("Illegal Service Identifier in input");

		return ResponseEntity.ok(catalogService.getHasInfoByIdJsonLd(serviceIdentifier));
	}

	@Override
	@Operation(summary = "Get the Service Models count grouped by Sector.", description = "Get the Service Models count grouped by Sector.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each sector.", responseCode = "200") })
	@GetMapping(value = "/services/count/sector", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<HashMap<String, Object>>> getCountBySector() {

		return ResponseEntity.ok(catalogService.getCountBySector());
	}

	@Override
	@Operation(summary = "Get the Service Models count grouped by Thematic Area.", description = "Get the Service Models count grouped by Thematic Area.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each sector.", responseCode = "200") })
	@GetMapping(value = "/services/count/thematicArea", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<HashMap<String, Object>>> getCountByThematicArea() {

		return ResponseEntity.ok(catalogService.getCountByThematicArea());
	}

	@Override
	@Operation(summary = "Get the Service Models count grouped by GroupedBy.", description = "Get the Service Models count grouped by GroupedBy.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each sector.", responseCode = "200") })
	@GetMapping(value = "/services/count/groupedBy", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<HashMap<String, Object>>> getCountByGroupedBy() {

		return ResponseEntity.ok(catalogService.getCountByGroupedBy());
	}

	@Override
	@Operation(summary = "Get the Service Models count grouped by Spatial.", description = "Get the Service Models count grouped by Spatial.", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each location.", responseCode = "200") })
	@GetMapping(value = "/services/count/location", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<HashMap<String, Object>>> getCountByLocation() {

		return ResponseEntity.ok(catalogService.getCountByLocation());
	}

}