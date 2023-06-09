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
        "clientSecret",
        "hashedSecret",
        "services",
        "lastRefresh",
        "iconURL"
})

@Data
public class Catalogue {

    @Autowired
    private CatalogueRepository catalogueRepo;

    @JsonProperty("catalogueID")
    @Valid
    // @NotNull
    private String catalogueID;

    @JsonProperty("name")
    @Valid
    @NotNull
    private String name;

    @JsonProperty("competentAuthority")
    @Valid
    // @NotNull
    private String competentAuthority;

    @JsonProperty("country")
    @Valid
    // @NotNull
    private String country;

    @JsonProperty("category")
    @Valid
    // @NotNull
    private String category;

    @JsonProperty("description")
    @Valid
    // @NotNull
    private String description;

    @JsonProperty("homePage")
    @Valid
    // @NotNull
    private String homePage;

    @JsonProperty("apiEndpoint")
    @Valid
    @NotNull
    private String apiEndpoint;

    @JsonProperty("type")
    @Valid
    // @NotNull
    private String type;

    @JsonProperty("active")
    @Valid
    @NotNull
    private boolean active;

    @JsonProperty("refresh")
    @Valid
    @NotNull
    private long refresh;

    @JsonProperty("authenticated")
    @Valid
    @NotNull
    private boolean authenticated;

    @JsonProperty("services")
    @Valid
    @NotNull
    private int services;

    @JsonProperty("oAuth2Endpoint")
    @Valid
    // @NotNull
    private String oAuth2Endpoint;

    @JsonProperty("clientID")
    @Valid
    // @NotNull
    private String clientID;

    @JsonProperty("clientSecret")
    @Valid
    // @NotNull
    private String clientSecret;

    @JsonProperty("iconURL")
    @Valid
    // @NotNull
    private String iconURL;

    @JsonProperty("hashedSecret")
    @Valid
    // @NotNull
    private byte[] hashedSecret;

    @JsonProperty("lastRefresh")
    @Valid
    // @NotNull
    private long lastRefresh;

}