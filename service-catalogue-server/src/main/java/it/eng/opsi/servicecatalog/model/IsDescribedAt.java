
package it.eng.opsi.servicecatalog.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "identifier",
    "name",
    "landingPage"
})
public class IsDescribedAt {

    @JsonProperty("identifier")
    private String identifier;
    @JsonProperty("name")
    private String name;
    @JsonProperty("landingPage")
    private String landingPage;

    /**
     * No args constructor for use in serialization
     * 
     */
    public IsDescribedAt() {
    }

    /**
     * 
     * @param identifier
     * @param landingPage
     * @param name
     */
    public IsDescribedAt(String identifier, String name, String landingPage) {
        super();
        this.identifier = identifier;
        this.name = name;
        this.landingPage = landingPage;
    }

    @JsonProperty("identifier")
    public String getIdentifier() {
        return identifier;
    }

    @JsonProperty("identifier")
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("landingPage")
    public String getLandingPage() {
        return landingPage;
    }

    @JsonProperty("landingPage")
    public void setLandingPage(String landingPage) {
        this.landingPage = landingPage;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(IsDescribedAt.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("name");
        sb.append('=');
        sb.append(((this.name == null)?"<null>":this.name));
        sb.append(',');
        sb.append("landingPage");
        sb.append('=');
        sb.append(((this.landingPage == null)?"<null>":this.landingPage));
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
        result = ((result* 31)+((this.name == null)? 0 :this.name.hashCode()));
        result = ((result* 31)+((this.identifier == null)? 0 :this.identifier.hashCode()));
        result = ((result* 31)+((this.landingPage == null)? 0 :this.landingPage.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof IsDescribedAt) == false) {
            return false;
        }
        IsDescribedAt rhs = ((IsDescribedAt) other);
        return ((((this.name == rhs.name)||((this.name!= null)&&this.name.equals(rhs.name)))&&((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier))))&&((this.landingPage == rhs.landingPage)||((this.landingPage!= null)&&this.landingPage.equals(rhs.landingPage))));
    }

}
