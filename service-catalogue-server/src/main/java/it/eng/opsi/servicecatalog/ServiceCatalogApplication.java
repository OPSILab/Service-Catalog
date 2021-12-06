package it.eng.opsi.servicecatalog;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import it.eng.opsi.servicecatalog.model.ServiceModel;
import it.eng.opsi.servicecatalog.repository.ZonedDateTimeReadConverter;
import it.eng.opsi.servicecatalog.repository.ZonedDateTimeWriteConverter;

@SpringBootApplication
public class ServiceCatalogApplication {

	@Value("${spring.profiles.active:Unknown}")
	private String activeProfile;

	@Value("${cors.allowed-origin-patterns}")
	private String[] corsAllowedOriginPatterns;

	@Value("${cors.allowed-origins}")
	private String[] corsAllowedOrigins;

	public static void main(String[] args) {
		SpringApplication.run(ServiceCatalogApplication.class, args);
	}

	@Bean
	public MongoCustomConversions customConversions() {
		List<Converter<?, ?>> converters = new ArrayList<>();
		converters.add(new ZonedDateTimeReadConverter());
		converters.add(new ZonedDateTimeWriteConverter());
		return new MongoCustomConversions(converters);
	}

	@Bean
	public ObjectMapper getObjectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());
		objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
		objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		return objectMapper;
	}

//	@Bean
//	public OpenAPI customOpenAPI(@Value("${server.servlet.context-path}") String contextPath,
//			@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}") String issuerUri) {
//		return new OpenAPI().addServersItem(new Server().url(contextPath))
//				.components(new Components()
//						.addSecuritySchemes("openid-connect",
//								new SecurityScheme().type(SecurityScheme.Type.OPENIDCONNECT)
//										.openIdConnectUrl(issuerUri + "/.well-known/openid-configuration"))
//						.addSecuritySchemes("bearer-jwt",
//								new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer")
//										.bearerFormat("JWT")))
//				.addSecurityItem(new SecurityRequirement().addList("bearer-jwt", Arrays.asList("read", "write")))
//				.addSecurityItem(new SecurityRequirement().addList("openid-connect", Arrays.asList("read", "write")));
//	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
						.allowedOriginPatterns(corsAllowedOriginPatterns).allowedOrigins(corsAllowedOrigins)
						.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
						.allowCredentials(true).maxAge(3600);
			}
		};
	}

}
