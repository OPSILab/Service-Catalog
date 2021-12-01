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


/**
 * Jackson module which provides support for JSON-LD serialization
 */
public class JsonLDModule extends SimpleModule {

    public JsonLDModule() {
        super();
        
        setSerializerModifier(new JsonLDSerializerModifier());
        
        addSerializer(XMLGregorianCalendar.class, new XMLGregorianCalendarSerializer());
        addDeserializer(XMLGregorianCalendar.class, new XMLGregorianCalendarDeserializer());
        addSerializer(BigDecimal.class, new BigDecimalSerializer());

//        addSerializer(UriOrModelClass.class, new UriOrModelClassSerializer());

        addSerializer(URI.class, new UriSerializer());
    }

}
