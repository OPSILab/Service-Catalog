
package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.*;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.github.jsonldjava.shaded.com.google.common.base.Objects;

import it.eng.opsi.servicecatalog.repository.AdapterRepository;
import it.eng.opsi.servicecatalog.repository.ConnectorModelRepository;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "adapterId",
        "url",
        "name",
        "description",
        "status",
        "type",
        "context",
        "mapper",
        "adapterModel"
})

@Data
public class Adapter {

    @Autowired
    private AdapterRepository adapterRepo;

    @JsonProperty("adapterId")
    @Valid
    @NotNull
    private String adapterId;

    @JsonProperty("url")
    @Valid
    @NotNull
    private String url;

    @JsonProperty("name")
    @Valid
    @NotNull
    private String name;

    @JsonProperty("description")
    @Valid
    @NotNull
    private String description;

    @JsonProperty("status")
    @Valid
    @NotNull
    private String status;

    enum Type {
        MODEL,
        DATA
    }

    @JsonProperty("type")
    @Valid
    // @NotNull
    private Type type;

    enum Context {
        IMPORT,
        EXPORT
    }

    @JsonProperty("context")
    @Valid
    // @NotNull
    // private Context context;
    private Context context;

    @JsonProperty("mapper")
    @Valid
    // @NotNull
    private String mapper;

    @JsonProperty("adapterModel")
    @Valid
    // @NotNull
    private Object adapterModel;

    public Adapter(AdapterRepository adapterRepo, String adapterId, String url, String name, String description,
            String status, Type type, Context context, String mapper, Object adapterModel) {
        this.adapterRepo = adapterRepo;
        this.adapterId = adapterId;
        this.url = url;
        this.name = name;
        this.description = description;
        this.status = status;
        this.type = type;
        this.context = context;
        this.mapper = mapper;
        this.adapterModel = adapterModel;
    }

    public AdapterRepository getAdapterRepo() {
        return this.adapterRepo;
    }

    public void setAdapterRepo(AdapterRepository adapterRepo) {
        this.adapterRepo = adapterRepo;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Type getType() {
        return this.type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Adapter adapterRepo(AdapterRepository adapterRepo) {
        setAdapterRepo(adapterRepo);
        return this;
    }

    public Adapter url(String url) {
        setUrl(url);
        return this;
    }

    public Adapter name(String name) {
        setName(name);
        return this;
    }

    public Adapter description(String description) {
        setDescription(description);
        return this;
    }

    public Adapter status(String status) {
        setStatus(status);
        return this;
    }

    public Adapter type(Type type) {
        setType(type);
        return this;
    }

    public Adapter() {
    }

    /**
     * 
     * @param name
     * @param description
     */
    public Adapter(String adapterId) {
        super();
        try {
            this.adapterId = adapterId;
            if (adapterRepo.findByadapterId(adapterId).adapterId == adapterId)
                throw new Error("connectorId already exists");
        } catch (Error e) {
            System.out.println(e);
        }

    }

    public String getAdapterId() {
        return this.adapterId;
    }

    public void setAdapterId(String adapterId) {
        this.adapterId = adapterId;
    }

    public Adapter adapterId(String adapterId) {
        setAdapterId(adapterId);
        return this;
    }

    /*
     * @Override
     * public int hashCode() {
     * return Objects.hash(adapterRepo, adapterId);
     * }
     */

    @Override
    public String toString() {
        return "{" +
                ", adapterId='" + getAdapterId() + "'" +
                "}";
    }
}
