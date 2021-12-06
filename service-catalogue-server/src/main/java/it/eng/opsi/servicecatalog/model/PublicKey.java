
package it.eng.opsi.servicecatalog.model;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "keyType",
    "keyValue"
})
public class PublicKey {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyType")
    @NotNull
    private String keyType;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyValue")
    @Valid
    @NotNull
    private List<String> keyValue = new ArrayList<String>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public PublicKey() {
    }

    /**
     * 
     * @param keyValue
     * @param keyType
     */
    public PublicKey(String keyType, List<String> keyValue) {
        super();
        this.keyType = keyType;
        this.keyValue = keyValue;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyType")
    public String getKeyType() {
        return keyType;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyType")
    public void setKeyType(String keyType) {
        this.keyType = keyType;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyValue")
    public List<String> getKeyValue() {
        return keyValue;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyValue")
    public void setKeyValue(List<String> keyValue) {
        this.keyValue = keyValue;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(PublicKey.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("keyType");
        sb.append('=');
        sb.append(((this.keyType == null)?"<null>":this.keyType));
        sb.append(',');
        sb.append("keyValue");
        sb.append('=');
        sb.append(((this.keyValue == null)?"<null>":this.keyValue));
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
        result = ((result* 31)+((this.keyType == null)? 0 :this.keyType.hashCode()));
        result = ((result* 31)+((this.keyValue == null)? 0 :this.keyValue.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof PublicKey) == false) {
            return false;
        }
        PublicKey rhs = ((PublicKey) other);
        return (((this.keyType == rhs.keyType)||((this.keyType!= null)&&this.keyType.equals(rhs.keyType)))&&((this.keyValue == rhs.keyValue)||((this.keyValue!= null)&&this.keyValue.equals(rhs.keyValue))));
    }

}
