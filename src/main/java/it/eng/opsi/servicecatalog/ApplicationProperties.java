package it.eng.opsi.servicecatalog;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Configuration
@ConfigurationProperties
@Validated
public class ApplicationProperties {

	@Getter
	@Setter
	@NoArgsConstructor
	public class Cors {

		private String[] allowedOriginPatterns;
		private String[] allowedOrigins;

	}

}
