package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.HeadersBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.service.IServiceCatalogService;
import lombok.extern.slf4j.Slf4j;

/*
@OpenAPIDefinition(info = @Info(title = "Service Catalog API", description = "Service Catalog APIs used to manage CRUD for Fedareted Service Model descriptions.", version = "1.0"), tags = {
		@Tag(name = "Fedareted Service Model", description = "Fedareted Service Model Description APIs to get and manage Fedareted Service Model descriptions.") })
*/
@RestController
@RequestMapping("/api/v2/federated")
@Slf4j
public class FederatedServiceCatalogController implements FederatedIServiceCatalogController {

	@Autowired
	IServiceCatalogService catalogService;

	@Autowired
	IServiceCatalogController catalogController;

	@Value("${uriBasePath}")
	private String uriBasePath;

	@Override
	@Operation(summary = "Get all the Federated Fedareted Service Model descriptions.", description = "Get all the Federated Fedareted Service Model descriptions saved in the Service Catalog.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the list of all federated Fedareted Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getServices(@RequestParam(required = false) String name,
			@RequestParam(required = false) String location, @RequestParam(required = false) String[] keywords,
			@RequestParam(required = false) boolean completed,
			@RequestParam(required = true) String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException {

		if (name != null || location != null || keywords != null || completed) {

			System.out.println("completed");// TODO debug

			String stringifiedParams = "?";

			if (completed) {
				System.out.println("completed");// TODO debug
				stringifiedParams = stringifiedParams.concat("completed=".concat("true"));
			}

			System.out.println(stringifiedParams);// TODO debug

			if (name != null)
				stringifiedParams = stringifiedParams.concat(completed ? "&name=".concat(name) : "name=".concat(name));

			if (location != null)
				stringifiedParams = stringifiedParams
						.concat(name != null || completed ? "&".concat("location=".concat(location))
								: "location".concat(location));

			if (keywords != null) {
				String keywordsStringified = name != null || completed || location != null ? "&" : "";
				for (String keyword : keywords)
					keywordsStringified = keywordsStringified.concat("keywords=").concat(keyword).concat("&");
				stringifiedParams = stringifiedParams.concat(keywordsStringified);
			}

			return ResponseEntity
					.ok(catalogService.getFederatedServices(remoteCatalogueID, keywords == null ? stringifiedParams
							: stringifiedParams.substring(0, stringifiedParams.length() - 1)));
		}

		return ResponseEntity.ok(catalogService.getFederatedServices(remoteCatalogueID, ""));
	}

	@Override
	@Operation(summary = "Get the Fedareted Service Model description by Service Id.", description = "Get the Fedareted Service Model description by Service Id.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Fedareted Service Model description.", responseCode = "200") })
	@GetMapping(value = "/services/json/**", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceById(@RequestParam("identifier") String identifier,
			@RequestParam("remoteCatalogueID") String remoteCatalogueID)
			throws ServiceNotFoundException, IOException, URISyntaxException {
		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/json?identifier=".concat(identifier)));
	}

	@Operation(summary = "Get Service Cost  by serviceId. ", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Get Service Cost records  by serviceId.", responseCode = "200") })
	@Override
	@GetMapping(value = "/services/cost", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceCost(@RequestParam("serviceId") String serviceId,
			@RequestParam("remoteCatalogueID") String remoteCatalogueID)
			throws ServiceNotFoundException, IOException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/cost?serviceId=".concat(serviceId)));
	}

	public HeadersBuilder<?> NotFound() {
		return ResponseEntity.notFound();
	}

	@Operation(summary = "Get Service time  by serviceId.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "The (estimated) time needed for executing a Public Service using the ISO8601 syntax for durations: P(n)Y(n)M(n)DT(n)H(n)M(n)S).", responseCode = "200") })
	@Override
	@GetMapping(value = "/services/time", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceTime(@RequestParam("remoteCatalogueID") String remoteCatalogueID,
			@RequestParam("serviceId") String serviceId)
			throws ServiceNotFoundException, IOException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/time?serviceId=".concat(serviceId)));
	}

	@Override
	@Operation(summary = "Get the Fedareted Service Model descriptions by specified Service Ids.", description = "Get the Fedareted Service Model descriptions by specified Service Id.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Fedareted Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services/specified/**", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceByIds(HttpServletRequest request,
			@RequestParam("remoteCatalogueID") String remoteCatalogueID,
			@RequestParam("identifier") List<String> identifiers)
			throws ServiceNotFoundException, IOException, URISyntaxException {
		String identifiersStringified = "";
		for (String identifier : identifiers)
			identifiersStringified = identifiersStringified.concat("identifier=").concat(identifier).concat("&");
		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/specified?"
						.concat(identifiersStringified.substring(0, identifiersStringified.length() - 1))));
	}

	@Override
	@Operation(summary = "Get the Fedareted Service Model descriptions by specified Service Location.", description = "Get the Fedareted Service Model descriptions by specified Service Location.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Fedareted Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services/specified/location", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getServiceByLocation(HttpServletRequest request,
			@RequestParam("remoteCatalogueID") String remoteCatalogueID, @RequestParam("location") String location)
			throws ServiceNotFoundException, IOException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID,
						"/specified/location?location=".concat(location)));

	}

	@Override
	@Operation(summary = "Get the Fedareted Service Model descriptions by specified Service Keywords.", description = "Get the Fedareted Service Model descriptions by specified Service Keywords.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Fedareted Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services/specified/keyword", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getServiceByKeywords(HttpServletRequest request,
			@RequestParam("remoteCatalogueID") String remoteCatalogueID, @RequestParam("keywords") String[] keywords)
			throws ServiceNotFoundException, IOException, URISyntaxException {
		String keywordsStringified = "?";

		for (String keyword : keywords)
			keywordsStringified = keywordsStringified.concat("keywords=").concat(keyword.replaceAll(" ", "%20"))
					.concat("&");

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/specified/keyword"
						.concat(keywordsStringified.substring(0, keywordsStringified.length() - 1))));

	}

	@Override
	@Operation(summary = "Get the Fedareted Service Model descriptions by specified Service Title.", description = "Get the Fedareted Service Model descriptions by specified Service Title.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Fedareted Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services/specified/title", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getServiceByTitle(HttpServletRequest request,
			@RequestParam("remoteCatalogueID") String remoteCatalogueID, @RequestParam("title") String title)
			throws ServiceNotFoundException, IOException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/specified/title?title=".concat(title)));

	}

	@Override
	@Operation(summary = "Get the Fedareted Service Model descriptions is handling personal data", description = "Get the Fedareted Service Model descriptions is handling personal data.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the requested Fedareted Service Model descriptions.", responseCode = "200") })
	@GetMapping(value = "/services/isPersonalDataHandling", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getServiceIsPersonalDataHandling(
			@RequestParam("remoteCatalogueID") String remoteCatalogueID, HttpServletRequest request)
			throws ServiceNotFoundException, IOException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/isPersonalDataHandling"));

	}

	@Override
	@Operation(summary = "Get the count of the  Fedareted Service Model descriptions is personal data handling.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Returns the count.", responseCode = "200") })
	@GetMapping(value = "/services/isPersonalDataHandling/count", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getServicesIsPersonalDataHandlingCount(
			@RequestParam("remoteCatalogueID") String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/isPersonalDataHandling/count"));
	}

	@Override
	@Operation(summary = "Get the Fedareted Service Models count grouped by Sector.", description = "Get the Fedareted Service Models count grouped by Sector.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each sector.", responseCode = "200") })
	@GetMapping(value = "/services/count/sector", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getCountBySector(@RequestParam("remoteCatalogueID") String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/count/sector"));
	}

	@Override
	@Operation(summary = "Get the Fedareted Service Models count grouped by Thematic Area.", description = "Get the Fedareted Service Models count grouped by Thematic Area.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each sector.", responseCode = "200") })
	@GetMapping(value = "/services/count/thematicArea", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getCountByThematicArea(@RequestParam("remoteCatalogueID") String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/count/thematicArea"));
	}

	@Override
	@Operation(summary = "Get the Fedareted Service Models count grouped by GroupedBy.", description = "Get the Fedareted Service Models count grouped by GroupedBy.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each sector.", responseCode = "200") })
	@GetMapping(value = "/services/count/groupedBy", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getCountByGroupedBy(@RequestParam("remoteCatalogueID") String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/count/groupedBy"));
	}

	@Override
	@Operation(summary = "Get the Fedareted Service Models count grouped by Spatial.", description = "Get the Fedareted Service Models count grouped by Spatial.", tags = {
			"Fedareted Service Model" }, responses = {
					@ApiResponse(description = "Return an object with count for each location.", responseCode = "200") })
	@GetMapping(value = "/services/count/location", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getCountByLocation(@RequestParam("remoteCatalogueID") String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException {

		return ResponseEntity
				.ok(catalogService.getFederatedServices(remoteCatalogueID, "/count/location"));
	}
}