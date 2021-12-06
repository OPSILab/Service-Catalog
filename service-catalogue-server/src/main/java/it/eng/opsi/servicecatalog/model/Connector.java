
package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "connectorEndpoint",
    "publicKey"
})
public class Connector {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connectorEndpoint")
    @Valid
    @NotNull
    private ConnectorEndpoint connectorEndpoint;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("publicKey")
    @Valid
    @NotNull
    private PublicKey publicKey;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Connector() {
    }

    /**
     * 
     * @param publicKey
     * @param connectorEndpoint
     */
    public Connector(ConnectorEndpoint connectorEndpoint, PublicKey publicKey) {
        super();
        this.connectorEndpoint = connectorEndpoint;
        this.publicKey = publicKey;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connectorEndpoint")
    public ConnectorEndpoint getConnectorEndpoint() {
        return connectorEndpoint;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connectorEndpoint")
    public void setConnectorEndpoint(ConnectorEndpoint connectorEndpoint) {
        this.connectorEndpoint = connectorEndpoint;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("publicKey")
    public PublicKey getPublicKey() {
        return publicKey;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("publicKey")
    public void setPublicKey(PublicKey publicKey) {
        this.publicKey = publicKey;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Connector.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("connectorEndpoint");
        sb.append('=');
        sb.append(((this.connectorEndpoint == null)?"<null>":this.connectorEndpoint));
        sb.append(',');
        sb.append("publicKey");
        sb.append('=');
        sb.append(((this.publicKey == null)?"<null>":this.publicKey));
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
        result = ((result* 31)+((this.connectorEndpoint == null)? 0 :this.connectorEndpoint.hashCode()));
        result = ((result* 31)+((this.publicKey == null)? 0 :this.publicKey.hashCode()));
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
        return (((this.connectorEndpoint == rhs.connectorEndpoint)||((this.connectorEndpoint!= null)&&this.connectorEndpoint.equals(rhs.connectorEndpoint)))&&((this.publicKey == rhs.publicKey)||((this.publicKey!= null)&&this.publicKey.equals(rhs.publicKey))));
    }

}
