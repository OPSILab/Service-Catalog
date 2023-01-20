package it.eng.opsi.servicecatalog.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import it.eng.opsi.servicecatalog.model.AdapterLog;

public class AdapterLogCustomRepositoryImpl implements AdapterLogCustomRepository {

	@Autowired
	MongoTemplate template;

	public Optional<AdapterLog> updateAdapterLog(String adapterId, AdapterLog adapterLog) {

		AdapterLog updatedAdapterLog = template.findAndReplace(query(where("adapterId").is(adapterId)),
				adapterLog);

		return Optional.ofNullable(updatedAdapterLog);

	}

	@Override
	public AdapterLog deleteAdapterLog(String adapterId) {

		template.findAllAndRemove(query(where("adapterId").is(adapterId)), adapterId);
		return null;
	}
}