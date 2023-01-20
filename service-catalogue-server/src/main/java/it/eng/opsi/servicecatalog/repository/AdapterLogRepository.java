package it.eng.opsi.servicecatalog.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.eng.opsi.servicecatalog.model.AdapterLog;

public interface AdapterLogRepository extends MongoRepository<AdapterLog, String>, AdapterLogCustomRepository {

	public List<AdapterLog> findByadapterId(String adapterId);

	@Query(value = "{ 'adapterId': { $in: ?0}}")
	public List<AdapterLog> findAdapterLogByadapterIds(Object[] ids);

	public Long deleteAdapterLogModelByadapterId(String adapterId); // deleteAdapterLogModelByServiceId

	public AdapterLog deleteAdapterLog(String adapterId);

	public long deleteAdapterLogByadapterId(String decodedAdapterAdapterId);
}
