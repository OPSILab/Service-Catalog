
package it.eng.opsi.servicecatalog.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "email",
    "faxNumber",
    "telephone",
    "identifier",
    "openingHours",
    "hoursAvailable",
    "url"
})
public class HasContactPoint {

    @JsonProperty("email")
    private String email;
    @JsonProperty("faxNumber")
    private String faxNumber;
    @JsonProperty("telephone")
    private String telephone;
    @JsonProperty("identifier")
    private String identifier;
    @JsonProperty("openingHours")
    private String openingHours;
    @JsonProperty("hoursAvailable")
    private String hoursAvailable;
    @JsonProperty("url")
    private String url;

    /**
     * No args constructor for use in serialization
     * 
     */
    public HasContactPoint() {
    }

    /**
     * 
     * @param identifier
     * @param faxNumber
     * @param hoursAvailable
     * @param telephone
     * @param openingHours
     * @param email
     * @param url
     */
    public HasContactPoint(String email, String faxNumber, String telephone, String identifier, String openingHours, String hoursAvailable, String url) {
        super();
        this.email = email;
        this.faxNumber = faxNumber;
        this.telephone = telephone;
        this.identifier = identifier;
        this.openingHours = openingHours;
        this.hoursAvailable = hoursAvailable;
        this.url = url;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @JsonProperty("email")
    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("faxNumber")
    public String getFaxNumber() {
        return faxNumber;
    }

    @JsonProperty("faxNumber")
    public void setFaxNumber(String faxNumber) {
        this.faxNumber = faxNumber;
    }

    @JsonProperty("telephone")
    public String getTelephone() {
        return telephone;
    }

    @JsonProperty("telephone")
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @JsonProperty("identifier")
    public String getIdentifier() {
        return identifier;
    }

    @JsonProperty("identifier")
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    @JsonProperty("openingHours")
    public String getOpeningHours() {
        return openingHours;
    }

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

    @JsonProperty("url")
    public String getUrl() {
        return url;
    }

    @JsonProperty("url")
    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(HasContactPoint.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("email");
        sb.append('=');
        sb.append(((this.email == null)?"<null>":this.email));
        sb.append(',');
        sb.append("faxNumber");
        sb.append('=');
        sb.append(((this.faxNumber == null)?"<null>":this.faxNumber));
        sb.append(',');
        sb.append("telephone");
        sb.append('=');
        sb.append(((this.telephone == null)?"<null>":this.telephone));
        sb.append(',');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("openingHours");
        sb.append('=');
        sb.append(((this.openingHours == null)?"<null>":this.openingHours));
        sb.append(',');
        sb.append("hoursAvailable");
        sb.append('=');
        sb.append(((this.hoursAvailable == null)?"<null>":this.hoursAvailable));
        sb.append(',');
        sb.append("url");
        sb.append('=');
        sb.append(((this.url == null)?"<null>":this.url));
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
        result = ((result* 31)+((this.faxNumber == null)? 0 :this.faxNumber.hashCode()));
        result = ((result* 31)+((this.hoursAvailable == null)? 0 :this.hoursAvailable.hashCode()));
        result = ((result* 31)+((this.telephone == null)? 0 :this.telephone.hashCode()));
        result = ((result* 31)+((this.openingHours == null)? 0 :this.openingHours.hashCode()));
        result = ((result* 31)+((this.email == null)? 0 :this.email.hashCode()));
        result = ((result* 31)+((this.url == null)? 0 :this.url.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof HasContactPoint) == false) {
            return false;
        }
        HasContactPoint rhs = ((HasContactPoint) other);
        return ((((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.faxNumber == rhs.faxNumber)||((this.faxNumber!= null)&&this.faxNumber.equals(rhs.faxNumber))))&&((this.hoursAvailable == rhs.hoursAvailable)||((this.hoursAvailable!= null)&&this.hoursAvailable.equals(rhs.hoursAvailable))))&&((this.telephone == rhs.telephone)||((this.telephone!= null)&&this.telephone.equals(rhs.telephone))))&&((this.openingHours == rhs.openingHours)||((this.openingHours!= null)&&this.openingHours.equals(rhs.openingHours))))&&((this.email == rhs.email)||((this.email!= null)&&this.email.equals(rhs.email))))&&((this.url == rhs.url)||((this.url!= null)&&this.url.equals(rhs.url))));
    }

}
