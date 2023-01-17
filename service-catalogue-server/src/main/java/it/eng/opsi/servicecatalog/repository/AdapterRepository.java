package it.eng.opsi.servicecatalog.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.Adapter;

public interface AdapterRepository extends MongoRepository<Adapter, String>, AdapterCustomRepository {

	@Query(value = "{ 'adapterId': { $in: ?0}}")
	public List<Adapter> findAdapterByadapterIds(Object[] ids);

	public Long deleteAdapterModelByadapterId(String connectorId); // deleteAdapterModelByServiceId

	public Adapter deleteAdapter(String connectorId);

	public long deleteAdapterByadapterId(String decodedConnectorConnectorId);

	public Adapter findByadapterId(String adapterId);
}
