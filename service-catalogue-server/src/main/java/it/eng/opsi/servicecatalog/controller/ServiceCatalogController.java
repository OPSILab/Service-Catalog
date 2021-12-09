package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

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
	@GetMapping(value = "/services/{serviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ServiceModel> getServiceById(@PathVariable String serviceId) throws ServiceNotFoundException {
		return ResponseEntity.ok(catalogService.getServiceById(serviceId));
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

	@Operation(summary = "Update Service Model description, by replacing the existing one", tags = {
			"Service Model" }, responses = {
					@ApiResponse(description = "Returns the Model Service Entry.", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ServiceModel.class))) })
	@Override
	@PutMapping(value = "/services/{serviceId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ServiceModel> updateService(@PathVariable String serviceId,
			@RequestBody @Valid ServiceModel service) throws ServiceNotFoundException, ServiceNotEditableException {

		return ResponseEntity.ok(catalogService.updateService(serviceId, service));
	}

	@Operation(summary = "Delete Service Model description by Service Id.", tags = { "Service Model" }, responses = {
			@ApiResponse(description = "Returns No Content.", responseCode = "204") })
	@Override
	@DeleteMapping(value = "/services/{serviceId}")
	public ResponseEntity<Object> deleteService(@PathVariable String serviceId) throws ServiceNotFoundException {

		catalogService.deleteService(serviceId);

		return ResponseEntity.noContent().build();

	}

	@Override
	@Operation(summary = "Get the Service Model description by Service Id, serialized as Json-LD.", description = "Get the Service Model description by Service Id, serialized as Json-LD.", tags = {
			"Service Model | JSON-LD" }, responses = {
					@ApiResponse(description = "Returns the JSON-LD of the requested Service Model description.", responseCode = "200") })
	@GetMapping(value = "/services/jsonld/{serviceId}", produces = MediaType.APPLICATION_JSON_VALUE)

	public ResponseEntity<String> getServiceByIdJsonLd(@PathVariable String serviceId)
			throws ServiceNotFoundException, IOException {

		return ResponseEntity.ok(catalogService.getServiceByIdJsonLd(serviceId));

	}

	@Operation(summary = "Get the hasInfo part of Service Model description by Service Id, serialized as Json-LD according to CPSV-AP specification.", description = "Get the Service Model description by Service Id, serialized as Json-LD.", tags = {
			"Service Model | JSON-LD" }, responses = {
					@ApiResponse(description = "Returns the JSON-LD of the requested Service Model description.", responseCode = "200") })
	@GetMapping(value = "/services/cpsv/jsonld/{serviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<String> getServiceHasInfoByIdJsonLd(@PathVariable String serviceId)
			throws ServiceNotFoundException, IOException {

		return ResponseEntity.ok(catalogService.getHasInfoByIdJsonLd(serviceId));
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

}
