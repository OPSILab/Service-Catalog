
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

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({

        "name",
        "description",
        "status",
        "connectorId",
        "serviceId",
        "url"
})
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
    public Connector(String name, String description, String status, String connectorId, String serviceId, String url) {
        super();
        this.name = name;
        this.description = description;
        this.status = status;
        try {
            this.connectorId = connectorId;
            System.out.println(connectorModelRepo.findByconnectorId(connectorId));
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

    @Override
    public int hashCode() {
        int result = 1;
        result = ((result * 31) + ((this.name == null) ? 0 : this.name.hashCode()));
        result = ((result * 31) + ((this.description == null) ? 0 : this.description.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Connector) == false) {
            return false;
        }
        Connector rhs = ((Connector) other);
        return (((this.name == rhs.name)
                || ((this.name != null) && this.name.equals(rhs.name)))
                && ((this.description == rhs.description)
                        || ((this.description != null) && this.description.equals(rhs.description))));
    }
}
