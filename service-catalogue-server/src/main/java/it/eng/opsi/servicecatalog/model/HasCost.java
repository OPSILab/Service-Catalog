
package it.eng.opsi.servicecatalog.model;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "identifier",
    "code",
    "hasCost",
    "description",
    "ifAccessedThrough"
})
public class HasCost {

    @JsonProperty("identifier")
    private String identifier;
    @JsonProperty("code")
    private String code;
    @JsonProperty("hasCost")
    private String hasCost;
    @JsonProperty("description")
    @Valid
    private List<Description__1> description = new ArrayList<Description__1>();
    @JsonProperty("ifAccessedThrough")
    private String ifAccessedThrough;

    /**
     * No args constructor for use in serialization
     * 
     */
    public HasCost() {
    }

    /**
     * 
     * @param identifier
     * @param ifAccessedThrough
     * @param code
     * @param hasCost
     * @param description
     */
    public HasCost(String identifier, String code, String hasCost, List<Description__1> description, String ifAccessedThrough) {
        super();
        this.identifier = identifier;
        this.code = code;
        this.hasCost = hasCost;
        this.description = description;
        this.ifAccessedThrough = ifAccessedThrough;
    }

    @JsonProperty("identifier")
    public String getIdentifier() {
        return identifier;
    }

    @JsonProperty("identifier")
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    @JsonProperty("code")
    public String getCode() {
        return code;
    }

    @JsonProperty("code")
    public void setCode(String code) {
        this.code = code;
    }

    @JsonProperty("hasCost")
    public String getHasCost() {
        return hasCost;
    }

    @JsonProperty("hasCost")
    public void setHasCost(String hasCost) {
        this.hasCost = hasCost;
    }

    @JsonProperty("description")
    public List<Description__1> getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(List<Description__1> description) {
        this.description = description;
    }

    @JsonProperty("ifAccessedThrough")
    public String getIfAccessedThrough() {
        return ifAccessedThrough;
    }

    @JsonProperty("ifAccessedThrough")
    public void setIfAccessedThrough(String ifAccessedThrough) {
        this.ifAccessedThrough = ifAccessedThrough;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(HasCost.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("code");
        sb.append('=');
        sb.append(((this.code == null)?"<null>":this.code));
        sb.append(',');
        sb.append("hasCost");
        sb.append('=');
        sb.append(((this.hasCost == null)?"<null>":this.hasCost));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("ifAccessedThrough");
        sb.append('=');
        sb.append(((this.ifAccessedThrough == null)?"<null>":this.ifAccessedThrough));
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
        result = ((result* 31)+((this.identifier == null)? 0 :this.identifier.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.ifAccessedThrough == null)? 0 :this.ifAccessedThrough.hashCode()));
        result = ((result* 31)+((this.code == null)? 0 :this.code.hashCode()));
        result = ((result* 31)+((this.hasCost == null)? 0 :this.hasCost.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof HasCost) == false) {
            return false;
        }
        HasCost rhs = ((HasCost) other);
        return ((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.ifAccessedThrough == rhs.ifAccessedThrough)||((this.ifAccessedThrough!= null)&&this.ifAccessedThrough.equals(rhs.ifAccessedThrough))))&&((this.code == rhs.code)||((this.code!= null)&&this.code.equals(rhs.code))))&&((this.hasCost == rhs.hasCost)||((this.hasCost!= null)&&this.hasCost.equals(rhs.hasCost))));
    }

}
