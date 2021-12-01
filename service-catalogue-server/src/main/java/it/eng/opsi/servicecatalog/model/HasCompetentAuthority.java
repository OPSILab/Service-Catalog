
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "prefLabel",
    "spatial"
})
public class HasCompetentAuthority {

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
     * @param prefLabel
     * @param spatial
     */
    public HasCompetentAuthority(String prefLabel, String spatial) {
        super();
        this.prefLabel = prefLabel;
        this.spatial = spatial;
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
        return (((this.spatial == rhs.spatial)||((this.spatial!= null)&&this.spatial.equals(rhs.spatial)))&&((this.prefLabel == rhs.prefLabel)||((this.prefLabel!= null)&&this.prefLabel.equals(rhs.prefLabel))));
    }

}
