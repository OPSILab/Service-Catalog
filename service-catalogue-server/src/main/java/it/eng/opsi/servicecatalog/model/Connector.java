
package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.*;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import it.eng.opsi.servicecatalog.repository.ConnectorModelRepository;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({

        "name",
        "description",
        "status",
        "connectorId",
        "serviceId",
        "adapterId",
        "url"
})

@Data
public class Connector {

    @Autowired
    private ConnectorModelRepository connectorModelRepo;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("name")
    @Valid
    @NotNull
    private String name;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    @Valid
    @NotNull
    private String description;

    @JsonProperty("status")
    @Valid
    @NotNull
    private String status;

    @JsonProperty("connectorId")
    @Valid
    @NotNull
    private String connectorId;

    @JsonProperty("serviceId")
    @Valid
    // NotNull
    private String serviceId;

    @JsonProperty("adapterId")
    @Valid
    // NotNull
    private String adapterId;

    public Connector(String adapterId) {
        this.adapterId = adapterId;
    }

    public String getAdapterId() {
        return this.adapterId;
    }

    public void setAdapterId(String adapterId) {
        this.adapterId = adapterId;
    }

    public Connector adapterId(String adapterId) {
        setAdapterId(adapterId);
        return this;
    }

    @JsonProperty("url")
    @Valid
    @NotNull
    private String url;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Connector() {
    }

    /**
     * 
     * @param name
     * @param description
     */
    public Connector(String name, String description, String status, String connectorId, String serviceId,
            String adapterId, String url) {
        super();
        this.name = name;
        this.description = description;
        this.status = status;
        try {
            this.connectorId = connectorId;
            if (connectorModelRepo.findByconnectorId(connectorId).connectorId == connectorId)
                throw new Error("connectorId already exists");
        } catch (Error e) {
            System.out.println(e);
        }
        this.serviceId = serviceId;
        this.url = url;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("name")
    public String getName() {
        return name;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return String return the connectorId
     */
    @JsonProperty("connectorId")
    public String getConnectorId() {
        return connectorId;
    }

    /**
     * @param connectorId the connectorId to set
     */
    @JsonProperty("connectorId")
    public void setConnectorId(String connectorId) {
        this.connectorId = connectorId;
    }

    /**
     * 
     * (Not required)
     * 
     */
    @JsonProperty("serviceId")
    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    /**
     * 
     * (Not required)
     * 
     */
    @JsonProperty("serviceId")
    public String getServiceId() {
        return this.serviceId;
    }

    @JsonProperty("status")
    public String getStatus() {
        return this.status;
    }

    @JsonProperty("status")
    public void setStatus(String status) {
        this.status = status;
    }

    @JsonProperty("url")
    public String getUrl() {
        return this.url;
    }

    @JsonProperty("url")
    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Connector.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this)))
                .append('[');
        sb.append("name");
        sb.append('=');
        sb.append(((this.name == null) ? "<null>" : this.name));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null) ? "<null>" : this.description));
        sb.append(',');
        if (sb.charAt((sb.length() - 1)) == ',') {
            sb.setCharAt((sb.length() - 1), ']');
        } else {
            sb.append(']');
        }
        return sb.toString();
    }
}
