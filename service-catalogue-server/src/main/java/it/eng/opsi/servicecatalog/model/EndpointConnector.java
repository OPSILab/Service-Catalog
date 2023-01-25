
package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "endpoint",
    "connectorId"
})
public class EndpointConnector {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpoint")
    @Valid
    @NotNull
    private Endpoint endpoint;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connectorId")
    @NotNull
    private String connectorId;

    /**
     * No args constructor for use in serialization
     * 
     */
    public EndpointConnector() {
    }

    /**
     * 
     * @param endpoint
     * @param connectorId
     */
    public EndpointConnector(Endpoint endpoint, String connectorId) {
        super();
        this.endpoint = endpoint;
        this.connectorId = connectorId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpoint")
    public Endpoint getEndpoint() {
        return endpoint;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpoint")
    public void setEndpoint(Endpoint endpoint) {
        this.endpoint = endpoint;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connectorId")
    public String getConnectorId() {
        return connectorId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connectorId")
    public void setConnectorId(String connectorId) {
        this.connectorId = connectorId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(EndpointConnector.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("endpoint");
        sb.append('=');
        sb.append(((this.endpoint == null)?"<null>":this.endpoint));
        sb.append(',');
        sb.append("connectorId");
        sb.append('=');
        sb.append(((this.connectorId == null)?"<null>":this.connectorId));
        sb.append(',');
        if (sb.charAt((sb.length()- 1)) == ',') {
            sb.setCharAt((sb.length()- 1), ']');
        } else {
            sb.append(']');
        }
        return sb.toString();
    }

    @Override
    public int hashCode() {
        int result = 1;
        result = ((result* 31)+((this.endpoint == null)? 0 :this.endpoint.hashCode()));
        result = ((result* 31)+((this.connectorId == null)? 0 :this.connectorId.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof EndpointConnector) == false) {
            return false;
        }
        EndpointConnector rhs = ((EndpointConnector) other);
        return (((this.endpoint == rhs.endpoint)||((this.endpoint!= null)&&this.endpoint.equals(rhs.endpoint)))&&((this.connectorId == rhs.connectorId)||((this.connectorId!= null)&&this.connectorId.equals(rhs.connectorId))));
    }

}
