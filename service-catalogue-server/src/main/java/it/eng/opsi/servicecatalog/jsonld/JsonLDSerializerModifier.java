package it.eng.opsi.servicecatalog.jsonld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.ser.BeanSerializerModifier;
import com.fasterxml.jackson.databind.ser.std.BeanSerializerBase;

@Component
public class JsonLDSerializerModifier extends BeanSerializerModifier {

	@Value("${jsonldContextURIs}")
	private String[] jsonldContextURIs;

	@Value("${cpsvContextURIs}")
	private String[] cpsvContextURIs;

	@Autowired
	public JsonLDSerializerModifier() {
	}

	@Override
	public JsonSerializer<?> modifySerializer(SerializationConfig config, BeanDescription beanDesc,
			JsonSerializer<?> serializer) {
		if (serializer instanceof BeanSerializerBase) {
			return new JsonLDSerializer((BeanSerializerBase) serializer, jsonldContextURIs, cpsvContextURIs);
		} else {
			return serializer;
		}
	}
}
