package it.eng.opsi.servicecatalog.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import it.eng.opsi.servicecatalog.exception.ServiceNotEditableException;
import it.eng.opsi.servicecatalog.exception.ServiceNotFoundException;
import it.eng.opsi.servicecatalog.model.ServiceModel;

public interface FederatedIServiceCatalogController {

	public abstract ResponseEntity<String> getServices(String name, String location, String[] keywords,
			String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException;

	public abstract ResponseEntity<?> getServiceById(String identifier, String remoteCatalogueURL)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<?> getServiceByIds(HttpServletRequest request, String remoteCatalogueID,
			List<String> identifier)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<String> getCountBySector(String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException;

	public abstract ResponseEntity<String> getServicesCount(String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException;

	public abstract ResponseEntity<String> getCountByThematicArea(String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException;

	public abstract ResponseEntity<String> getCountByGroupedBy(String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException;

	public abstract ResponseEntity<String> getCountByLocation(String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException;

	public abstract ResponseEntity<?> getServiceIsPersonalDataHandling(String remoteCatalogueID,
			HttpServletRequest request)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<String> getServicesIsPersonalDataHandlingCount(String remoteCatalogueID)
			throws ServiceNotFoundException, URISyntaxException;

	public abstract ResponseEntity<String> getServiceByLocation(HttpServletRequest request, String remoteCatalogueID,
			String location)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<String> getServiceByKeywords(HttpServletRequest request, String remoteCatalogueID,
			String[] keywords)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<String> getServiceByTitle(HttpServletRequest request, String remoteCatalogueID,
			String title)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<?> getServiceCost(String serviceId, String remoteCatalogueID)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<?> getServiceTime(String remoteCatalogueID, String serviceId)
			throws ServiceNotFoundException, IOException, URISyntaxException;

	public abstract ResponseEntity<?> getStatus(String catalogueID);

}