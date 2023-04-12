package it.eng.opsi.servicecatalog.model;

import java.util.Objects;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import it.eng.opsi.servicecatalog.repository.CatalogueRepository;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "catalogueID",
        "name",
        "competentAuthority",
        "country",
        "category",
        "description",
        "homePage",
        "apiEndpoint",
        "type",
        "active",
        "refresh",
        "authenticated",
        "oAuth2Endpoint",
        "clientID",
        "clientSecret"
})

@Data
public class Catalogue {

    @Autowired
    private CatalogueRepository catalogueRepo;

    @JsonProperty("catalogueID")
    @Valid
    @NotNull
    private String catalogueID;

    @JsonProperty("name")
    @Valid
    @NotNull
    private String name;

    @JsonProperty("competentAuthority")
    @Valid
    @NotNull
    private String competentAuthority;

    @JsonProperty("country")
    @Valid
    @NotNull
    private String country;

    @JsonProperty("category")
    @Valid
    @NotNull
    private String category;

    @JsonProperty("description")
    @Valid
    @NotNull
    private String description;

    @JsonProperty("homePage")
    @Valid
    @NotNull
    private String homePage;

    @JsonProperty("apiEndpoint")
    @Valid
    @NotNull
    private String apiEndpoint;

    @JsonProperty("type")
    @Valid
    @NotNull
    private String type;

    @JsonProperty("active")
    @Valid
    @NotNull
    private String active;

    @JsonProperty("refresh")
    @Valid
    @NotNull
    private String refresh;

    @JsonProperty("authenticated")
    @Valid
    @NotNull
    private boolean authenticated;

    @JsonProperty("oAuth2Endpoint")
    @Valid
    // @NotNull
    private String oAuth2Endpoint;

    @JsonProperty("clientID")
    @Valid
    // @NotNull
    private String clientID;

    public Catalogue() {
    }

    public Catalogue(CatalogueRepository catalogueRepo, String catalogueID, String name, String competentAuthority,
            String country, String category, String description, String homePage, String apiEndpoint, String type,
            String active, String refresh, boolean authenticated, String oAuth2Endpoint, String clientID,
            String clientSecret) {
        this.catalogueRepo = catalogueRepo;
        this.catalogueID = catalogueID;
        this.name = name;
        this.competentAuthority = competentAuthority;
        this.country = country;
        this.category = category;
        this.description = description;
        this.homePage = homePage;
        this.apiEndpoint = apiEndpoint;
        this.type = type;
        this.active = active;
        this.refresh = refresh;
        this.authenticated = authenticated;
        this.oAuth2Endpoint = oAuth2Endpoint;
        this.clientID = clientID;
        this.clientSecret = clientSecret;
    }

    public CatalogueRepository getCatalogueRepo() {
        return this.catalogueRepo;
    }

    public void setCatalogueRepo(CatalogueRepository catalogueRepo) {
        this.catalogueRepo = catalogueRepo;
    }

    public String getCatalogueID() {
        return this.catalogueID;
    }

    public void setCatalogueID(String catalogueID) {
        this.catalogueID = catalogueID;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompetentAuthority() {
        return this.competentAuthority;
    }

    public void setCompetentAuthority(String competentAuthority) {
        this.competentAuthority = competentAuthority;
    }

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHomePage() {
        return this.homePage;
    }

    public void setHomePage(String homePage) {
        this.homePage = homePage;
    }

    public String getApiEndpoint() {
        return this.apiEndpoint;
    }

    public void setApiEndpoint(String apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getActive() {
        return this.active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getRefresh() {
        return this.refresh;
    }

    public void setRefresh(String refresh) {
        this.refresh = refresh;
    }

    public boolean isAuthenticated() {
        return this.authenticated;
    }

    public boolean getAuthenticated() {
        return this.authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public String getOAuth2Endpoint() {
        return this.oAuth2Endpoint;
    }

    public void setOAuth2Endpoint(String oAuth2Endpoint) {
        this.oAuth2Endpoint = oAuth2Endpoint;
    }

    public String getClientID() {
        return this.clientID;
    }

    public void setClientID(String clientID) {
        this.clientID = clientID;
    }

    public String getClientSecret() {
        return this.clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public Catalogue catalogueRepo(CatalogueRepository catalogueRepo) {
        setCatalogueRepo(catalogueRepo);
        return this;
    }

    public Catalogue catalogueID(String catalogueID) {
        setCatalogueID(catalogueID);
        return this;
    }

    public Catalogue name(String name) {
        setName(name);
        return this;
    }

    public Catalogue competentAuthority(String competentAuthority) {
        setCompetentAuthority(competentAuthority);
        return this;
    }

    public Catalogue country(String country) {
        setCountry(country);
        return this;
    }

    public Catalogue category(String category) {
        setCategory(category);
        return this;
    }

    public Catalogue description(String description) {
        setDescription(description);
        return this;
    }

    public Catalogue homePage(String homePage) {
        setHomePage(homePage);
        return this;
    }

    public Catalogue apiEndpoint(String apiEndpoint) {
        setApiEndpoint(apiEndpoint);
        return this;
    }

    public Catalogue type(String type) {
        setType(type);
        return this;
    }

    public Catalogue active(String active) {
        setActive(active);
        return this;
    }

    public Catalogue refresh(String refresh) {
        setRefresh(refresh);
        return this;
    }

    public Catalogue authenticated(boolean authenticated) {
        setAuthenticated(authenticated);
        return this;
    }

    public Catalogue oAuth2Endpoint(String oAuth2Endpoint) {
        setOAuth2Endpoint(oAuth2Endpoint);
        return this;
    }

    public Catalogue clientID(String clientID) {
        setClientID(clientID);
        return this;
    }

    public Catalogue clientSecret(String clientSecret) {
        setClientSecret(clientSecret);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Catalogue)) {
            return false;
        }
        Catalogue catalogue = (Catalogue) o;
        return Objects.equals(catalogueRepo, catalogue.catalogueRepo)
                && Objects.equals(catalogueID, catalogue.catalogueID) && Objects.equals(name, catalogue.name)
                && Objects.equals(competentAuthority, catalogue.competentAuthority)
                && Objects.equals(country, catalogue.country) && Objects.equals(category, catalogue.category)
                && Objects.equals(description, catalogue.description) && Objects.equals(homePage, catalogue.homePage)
                && Objects.equals(apiEndpoint, catalogue.apiEndpoint) && Objects.equals(type, catalogue.type)
                && Objects.equals(active, catalogue.active) && Objects.equals(refresh, catalogue.refresh)
                && authenticated == catalogue.authenticated && Objects.equals(oAuth2Endpoint, catalogue.oAuth2Endpoint)
                && Objects.equals(clientID, catalogue.clientID) && Objects.equals(clientSecret, catalogue.clientSecret);
    }

    @Override
    public int hashCode() {
        return Objects.hash(catalogueRepo, catalogueID, name, competentAuthority, country, category, description,
                homePage, apiEndpoint, type, active, refresh, authenticated, oAuth2Endpoint, clientID, clientSecret);
    }

    @Override
    public String toString() {
        return "{" +
                " catalogueRepo='" + getCatalogueRepo() + "'" +
                ", catalogueID='" + getCatalogueID() + "'" +
                ", name='" + getName() + "'" +
                ", competentAuthority='" + getCompetentAuthority() + "'" +
                ", country='" + getCountry() + "'" +
                ", category='" + getCategory() + "'" +
                ", description='" + getDescription() + "'" +
                ", homePage='" + getHomePage() + "'" +
                ", apiEndpoint='" + getApiEndpoint() + "'" +
                ", type='" + getType() + "'" +
                ", active='" + getActive() + "'" +
                ", refresh='" + getRefresh() + "'" +
                ", authenticated='" + isAuthenticated() + "'" +
                ", oAuth2Endpoint='" + getOAuth2Endpoint() + "'" +
                ", clientID='" + getClientID() + "'" +
                ", clientSecret='" + getClientSecret() + "'" +
                "}";
    }

    @JsonProperty("clientSecret")
    @Valid
    // @NotNull
    private String clientSecret;

    public void setStatus(String string) {
    }
}
