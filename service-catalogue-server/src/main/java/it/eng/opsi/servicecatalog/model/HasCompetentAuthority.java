
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "identifier",
    "title",
    "hasAddress",
    "prefLabel",
    "spatial"
})
public class HasCompetentAuthority {

    @JsonProperty("identifier")
    private String identifier;
    /**
     * name
     * <p>
     * 
     * 
     */
    @JsonProperty("title")
    private String title;
    @JsonProperty("hasAddress")
    private String hasAddress;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("prefLabel")
    @NotNull
    private String prefLabel;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("spatial")
    @NotNull
    private String spatial;

    /**
     * No args constructor for use in serialization
     * 
     */
    public HasCompetentAuthority() {
    }

    /**
     * 
     * @param identifier
     * @param hasAddress
     * @param prefLabel
     * @param title
     * @param spatial
     */
    public HasCompetentAuthority(String identifier, String title, String hasAddress, String prefLabel, String spatial) {
        super();
        this.identifier = identifier;
        this.title = title;
        this.hasAddress = hasAddress;
        this.prefLabel = prefLabel;
        this.spatial = spatial;
    }

    @JsonProperty("identifier")
    public String getIdentifier() {
        return identifier;
    }

    @JsonProperty("identifier")
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    /**
     * name
     * <p>
     * 
     * 
     */
    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    /**
     * name
     * <p>
     * 
     * 
     */
    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
    }

    @JsonProperty("hasAddress")
    public String getHasAddress() {
        return hasAddress;
    }

    @JsonProperty("hasAddress")
    public void setHasAddress(String hasAddress) {
        this.hasAddress = hasAddress;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("prefLabel")
    public String getPrefLabel() {
        return prefLabel;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("prefLabel")
    public void setPrefLabel(String prefLabel) {
        this.prefLabel = prefLabel;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("spatial")
    public String getSpatial() {
        return spatial;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("spatial")
    public void setSpatial(String spatial) {
        this.spatial = spatial;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(HasCompetentAuthority.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("title");
        sb.append('=');
        sb.append(((this.title == null)?"<null>":this.title));
        sb.append(',');
        sb.append("hasAddress");
        sb.append('=');
        sb.append(((this.hasAddress == null)?"<null>":this.hasAddress));
        sb.append(',');
        sb.append("prefLabel");
        sb.append('=');
        sb.append(((this.prefLabel == null)?"<null>":this.prefLabel));
        sb.append(',');
        sb.append("spatial");
        sb.append('=');
        sb.append(((this.spatial == null)?"<null>":this.spatial));
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
        result = ((result* 31)+((this.hasAddress == null)? 0 :this.hasAddress.hashCode()));
        result = ((result* 31)+((this.title == null)? 0 :this.title.hashCode()));
        result = ((result* 31)+((this.spatial == null)? 0 :this.spatial.hashCode()));
        result = ((result* 31)+((this.prefLabel == null)? 0 :this.prefLabel.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof HasCompetentAuthority) == false) {
            return false;
        }
        HasCompetentAuthority rhs = ((HasCompetentAuthority) other);
        return ((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.hasAddress == rhs.hasAddress)||((this.hasAddress!= null)&&this.hasAddress.equals(rhs.hasAddress))))&&((this.title == rhs.title)||((this.title!= null)&&this.title.equals(rhs.title))))&&((this.spatial == rhs.spatial)||((this.spatial!= null)&&this.spatial.equals(rhs.spatial))))&&((this.prefLabel == rhs.prefLabel)||((this.prefLabel!= null)&&this.prefLabel.equals(rhs.prefLabel))));
    }

}
