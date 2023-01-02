
package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "name",
        "description",
        "status",
        "serviceId",
        "url"
})
public class Connector {

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

    @JsonProperty("serviceId")
    @Valid
    @NotNull
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
    public Connector(String name, String description, String status, String serviceId, String url) {
        super();
        this.name = name;
        this.description = description;
        this.status = status;
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
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceId")
    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceId")
    public String getServiceId() {
        return this.serviceId;
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
