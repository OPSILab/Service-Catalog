package it.eng.opsi.servicecatalog.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class JWTSecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${spring.profiles.active:Unknown}")
	private String activeProfile;

	@Value("${enableAuth}")
	private Boolean enableAuth;

	@Override
	public void configure(HttpSecurity http) throws Exception {
		HttpSecurity baseConfig = http.cors().and().csrf().disable().formLogin().disable().headers()
				.httpStrictTransportSecurity().disable().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.ALWAYS).and();

		if (enableAuth)
			baseConfig
					.authorizeRequests(authz -> authz.antMatchers(
							"/swagger-ui.html",
							"/swagger-ui/**",
							"/api-docs/**",
							"/api/v2/catalogues/public/**",
							"/api/v2/catalogues/json/**",
							"/api/v2/catalogueDatasets/json/**",
							"/api/v2/catalogueDatasets/public/**",
							"/api/v2/services/count/**")
							.permitAll().anyRequest().authenticated())
					.oauth2ResourceServer(oauth2 -> oauth2.jwt());
		else
			baseConfig.authorizeRequests(authz -> authz.anyRequest().permitAll());
	}

}
