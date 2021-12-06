package it.eng.opsi.servicecatalog.jsonld;

import com.fasterxml.jackson.databind.module.SimpleModule;

//import de.fraunhofer.iais.eis.util.UriOrModelClass;
import it.eng.opsi.servicecatalog.jsonld.custom.BigDecimalSerializer;
//import it.eng.opsi.servicecatalog.jsonld.custom.UriOrModelClassSerializer;
import it.eng.opsi.servicecatalog.jsonld.custom.XMLGregorianCalendarDeserializer;
import it.eng.opsi.servicecatalog.jsonld.custom.XMLGregorianCalendarSerializer;

import java.math.BigDecimal;
import java.net.URI;

import javax.xml.datatype.XMLGregorianCalendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


/**
 * Jackson module which provides support for JSON-LD serialization
 */
@Component
public class JsonLDModule extends SimpleModule {


	@Autowired
    public JsonLDModule(JsonLDSerializerModifier jsonldSerializerModifier
	) {
        super();
        
        setSerializerModifier(jsonldSerializerModifier);
        
        addSerializer(XMLGregorianCalendar.class, new XMLGregorianCalendarSerializer());
        addDeserializer(XMLGregorianCalendar.class, new XMLGregorianCalendarDeserializer());
        addSerializer(BigDecimal.class, new BigDecimalSerializer());

//        addSerializer(UriOrModelClass.class, new UriOrModelClassSerializer());

        addSerializer(URI.class, new UriSerializer());
    }

}
