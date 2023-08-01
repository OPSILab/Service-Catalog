package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import it.eng.opsi.servicecatalog.repository.CatalogueDatasetRepository;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "catalogueDatasetID",
        "name",
        "authenticationMethod",
        "username",
        "password",
        "URL",
        "portalURL",
        "type",
        "clientID",
        "clientSecret",
})

@Data
public class CatalogueDataset {

    @Autowired
    private CatalogueDatasetRepository catalogueDatasetRepo;

    @JsonProperty("catalogueDatasetID")
    @Valid
    // @NotNull
    private String catalogueDatasetID;

    @JsonProperty("name")
    @Valid
    @NotNull
    private String name;

    @JsonProperty("authenticationMethod")
    @Valid
    // @NotNull
    private String authenticationMethod;

    @JsonProperty("URL")
    @Valid
    @NotNull
    private String URL;

    @JsonProperty("portalURL")
    @Valid
    // @NotNull
    private String portalURL;

    @JsonProperty("username")
    @Valid
    // @NotNull
    private String username;

    @JsonProperty("password")
    @Valid
    // @NotNull
    private String password;

    @JsonProperty("type")
    @Valid
    // @NotNull
    private String type;

    @JsonProperty("clientID")
    @Valid
    // @NotNull
    private String clientID;

    @JsonProperty("clientSecret")
    @Valid
    // @NotNull
    private String clientSecret;

}