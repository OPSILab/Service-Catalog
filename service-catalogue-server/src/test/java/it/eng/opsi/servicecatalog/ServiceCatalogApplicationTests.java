////package it.eng.opsi.servicecatalog;
//
//import java.io.IOException;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import it.eng.opsi.servicecatalog.jsonld.Serializer;
//import it.eng.opsi.servicecatalog.model.ServiceModel;
//import it.eng.opsi.servicecatalog.service.IServiceCatalogService;
//import lombok.extern.slf4j.Slf4j;
//
//@SpringBootTest
//@Slf4j
////class ServiceCatalogApplicationTests {
//
////	@Test
////	void contextLoads() {
////	}
//
////	@Autowired
////	IServiceCatalogService service;
////
////	@Test
////	public void serializeJsonLD() throws IOException {
////
////		ServiceModel model = service.getServiceById("occaecat laboris");
////
////		Serializer jsonLdSerializer = new Serializer();
////		
////		String modelJsonLd = jsonLdSerializer.serialize(model);
////
////		log.info(modelJsonLd);
////	}
//
//}
