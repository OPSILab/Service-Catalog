package it.eng.opsi.servicecatalog.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.ConnectorLog;

public interface ConnectorLogRepository extends MongoRepository<ConnectorLog, String>, ConnectorLogCustomRepository {

	public List<ConnectorLog> findByconnectorId(String connectorId);

	@Query(value = "{ 'connectorId': { $in: ?0}}")
	public List<ConnectorLog> findConnectorLogByconnectorIds(Object[] ids);

	public Long deleteConnectorLogModelByconnectorId(String connectorId); // deleteConnectorLogModelByServiceId

	public ConnectorLog deleteConnectorLog(String connectorId);

	public long deleteConnectorLogByconnectorId(String decodedConnectorConnectorId);
}
