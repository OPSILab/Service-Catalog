
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
    "identifier",
    "type",
    "openingHours",
    "hoursAvailable",
    "hasInput"
})
public class HasChannel {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("identifier")
    @NotNull
    private String identifier;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    @NotNull
    private String type;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("openingHours")
    @NotNull
    private String openingHours;
    @JsonProperty("hoursAvailable")
    private String hoursAvailable;
    @JsonProperty("hasInput")
    @Valid
    private List<String> hasInput = new ArrayList<String>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public HasChannel() {
    }

    /**
     * 
     * @param identifier
     * @param hoursAvailable
     * @param openingHours
     * @param type
     * @param hasInput
     */
    public HasChannel(String identifier, String type, String openingHours, String hoursAvailable, List<String> hasInput) {
        super();
        this.identifier = identifier;
        this.type = type;
        this.openingHours = openingHours;
        this.hoursAvailable = hoursAvailable;
        this.hasInput = hasInput;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("identifier")
    public String getIdentifier() {
        return identifier;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("identifier")
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    public String getType() {
        return type;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    public void setType(String type) {
        this.type = type;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("openingHours")
    public String getOpeningHours() {
        return openingHours;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("openingHours")
    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    @JsonProperty("hoursAvailable")
    public String getHoursAvailable() {
        return hoursAvailable;
    }

    @JsonProperty("hoursAvailable")
    public void setHoursAvailable(String hoursAvailable) {
        this.hoursAvailable = hoursAvailable;
    }

    @JsonProperty("hasInput")
    public List<String> getHasInput() {
        return hasInput;
    }

    @JsonProperty("hasInput")
    public void setHasInput(List<String> hasInput) {
        this.hasInput = hasInput;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(HasChannel.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("type");
        sb.append('=');
        sb.append(((this.type == null)?"<null>":this.type));
        sb.append(',');
        sb.append("openingHours");
        sb.append('=');
        sb.append(((this.openingHours == null)?"<null>":this.openingHours));
        sb.append(',');
        sb.append("hoursAvailable");
        sb.append('=');
        sb.append(((this.hoursAvailable == null)?"<null>":this.hoursAvailable));
        sb.append(',');
        sb.append("hasInput");
        sb.append('=');
        sb.append(((this.hasInput == null)?"<null>":this.hasInput));
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
        result = ((result* 31)+((this.hoursAvailable == null)? 0 :this.hoursAvailable.hashCode()));
        result = ((result* 31)+((this.openingHours == null)? 0 :this.openingHours.hashCode()));
        result = ((result* 31)+((this.type == null)? 0 :this.type.hashCode()));
        result = ((result* 31)+((this.hasInput == null)? 0 :this.hasInput.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof HasChannel) == false) {
            return false;
        }
        HasChannel rhs = ((HasChannel) other);
        return ((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.hoursAvailable == rhs.hoursAvailable)||((this.hoursAvailable!= null)&&this.hoursAvailable.equals(rhs.hoursAvailable))))&&((this.openingHours == rhs.openingHours)||((this.openingHours!= null)&&this.openingHours.equals(rhs.openingHours))))&&((this.type == rhs.type)||((this.type!= null)&&this.type.equals(rhs.type))))&&((this.hasInput == rhs.hasInput)||((this.hasInput!= null)&&this.hasInput.equals(rhs.hasInput))));
    }

}
