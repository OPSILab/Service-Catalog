
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

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "adapterId",
        "url",
        "name",
        "description",
        "status",
        "type"
})
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

    @JsonProperty("type")
    @Valid
    @NotNull
    private String type;// TODO enum

    public Adapter(AdapterRepository adapterRepo, String adapterId, String url, String name, String description,
            String status, String type) {
        this.adapterRepo = adapterRepo;
        this.adapterId = adapterId;
        this.url = url;
        this.name = name;
        this.description = description;
        this.status = status;
        this.type = type;
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

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
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

    public Adapter type(String type) {
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
            System.out.println(adapterRepo.findByadapterId(adapterId));
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

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Adapter)) {
            return false;
        }
        Adapter adapter = (Adapter) o;
        return Objects.equal(adapterRepo, adapter.adapterRepo) && Objects.equal(adapterId, adapter.adapterId);
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
