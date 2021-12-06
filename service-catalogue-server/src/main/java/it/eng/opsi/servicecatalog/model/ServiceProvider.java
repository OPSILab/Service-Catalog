
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "businessId",
    "name",
    "hasAddress",
    "postalcode",
    "city",
    "state",
    "country",
    "email",
    "telephone",
    "jurisdiction"
})
public class ServiceProvider {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessId")
    @NotNull
    private String businessId;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("name")
    @NotNull
    private String name;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasAddress")
    @NotNull
    private String hasAddress;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("postalcode")
    @NotNull
    private String postalcode;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("city")
    @NotNull
    private String city;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("state")
    @NotNull
    private String state;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("country")
    @NotNull
    private String country;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("email")
    @NotNull
    private String email;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("telephone")
    @NotNull
    private String telephone;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("jurisdiction")
    @NotNull
    private String jurisdiction;

    /**
     * No args constructor for use in serialization
     * 
     */
    public ServiceProvider() {
    }

    /**
     * 
     * @param hasAddress
     * @param country
     * @param city
     * @param postalcode
     * @param jurisdiction
     * @param businessId
     * @param name
     * @param telephone
     * @param state
     * @param email
     */
    public ServiceProvider(String businessId, String name, String hasAddress, String postalcode, String city, String state, String country, String email, String telephone, String jurisdiction) {
        super();
        this.businessId = businessId;
        this.name = name;
        this.hasAddress = hasAddress;
        this.postalcode = postalcode;
        this.city = city;
        this.state = state;
        this.country = country;
        this.email = email;
        this.telephone = telephone;
        this.jurisdiction = jurisdiction;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessId")
    public String getBusinessId() {
        return businessId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessId")
    public void setBusinessId(String businessId) {
        this.businessId = businessId;
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
    @JsonProperty("hasAddress")
    public String getHasAddress() {
        return hasAddress;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasAddress")
    public void setHasAddress(String hasAddress) {
        this.hasAddress = hasAddress;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("postalcode")
    public String getPostalcode() {
        return postalcode;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("postalcode")
    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("city")
    public String getCity() {
        return city;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("city")
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("state")
    public String getState() {
        return state;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("state")
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("country")
    public String getCountry() {
        return country;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("country")
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("email")
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("telephone")
    public String getTelephone() {
        return telephone;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("telephone")
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("jurisdiction")
    public String getJurisdiction() {
        return jurisdiction;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("jurisdiction")
    public void setJurisdiction(String jurisdiction) {
        this.jurisdiction = jurisdiction;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(ServiceProvider.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("businessId");
        sb.append('=');
        sb.append(((this.businessId == null)?"<null>":this.businessId));
        sb.append(',');
        sb.append("name");
        sb.append('=');
        sb.append(((this.name == null)?"<null>":this.name));
        sb.append(',');
        sb.append("hasAddress");
        sb.append('=');
        sb.append(((this.hasAddress == null)?"<null>":this.hasAddress));
        sb.append(',');
        sb.append("postalcode");
        sb.append('=');
        sb.append(((this.postalcode == null)?"<null>":this.postalcode));
        sb.append(',');
        sb.append("city");
        sb.append('=');
        sb.append(((this.city == null)?"<null>":this.city));
        sb.append(',');
        sb.append("state");
        sb.append('=');
        sb.append(((this.state == null)?"<null>":this.state));
        sb.append(',');
        sb.append("country");
        sb.append('=');
        sb.append(((this.country == null)?"<null>":this.country));
        sb.append(',');
        sb.append("email");
        sb.append('=');
        sb.append(((this.email == null)?"<null>":this.email));
        sb.append(',');
        sb.append("telephone");
        sb.append('=');
        sb.append(((this.telephone == null)?"<null>":this.telephone));
        sb.append(',');
        sb.append("jurisdiction");
        sb.append('=');
        sb.append(((this.jurisdiction == null)?"<null>":this.jurisdiction));
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
        result = ((result* 31)+((this.hasAddress == null)? 0 :this.hasAddress.hashCode()));
        result = ((result* 31)+((this.country == null)? 0 :this.country.hashCode()));
        result = ((result* 31)+((this.city == null)? 0 :this.city.hashCode()));
        result = ((result* 31)+((this.postalcode == null)? 0 :this.postalcode.hashCode()));
        result = ((result* 31)+((this.jurisdiction == null)? 0 :this.jurisdiction.hashCode()));
        result = ((result* 31)+((this.businessId == null)? 0 :this.businessId.hashCode()));
        result = ((result* 31)+((this.name == null)? 0 :this.name.hashCode()));
        result = ((result* 31)+((this.telephone == null)? 0 :this.telephone.hashCode()));
        result = ((result* 31)+((this.state == null)? 0 :this.state.hashCode()));
        result = ((result* 31)+((this.email == null)? 0 :this.email.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof ServiceProvider) == false) {
            return false;
        }
        ServiceProvider rhs = ((ServiceProvider) other);
        return (((((((((((this.hasAddress == rhs.hasAddress)||((this.hasAddress!= null)&&this.hasAddress.equals(rhs.hasAddress)))&&((this.country == rhs.country)||((this.country!= null)&&this.country.equals(rhs.country))))&&((this.city == rhs.city)||((this.city!= null)&&this.city.equals(rhs.city))))&&((this.postalcode == rhs.postalcode)||((this.postalcode!= null)&&this.postalcode.equals(rhs.postalcode))))&&((this.jurisdiction == rhs.jurisdiction)||((this.jurisdiction!= null)&&this.jurisdiction.equals(rhs.jurisdiction))))&&((this.businessId == rhs.businessId)||((this.businessId!= null)&&this.businessId.equals(rhs.businessId))))&&((this.name == rhs.name)||((this.name!= null)&&this.name.equals(rhs.name))))&&((this.telephone == rhs.telephone)||((this.telephone!= null)&&this.telephone.equals(rhs.telephone))))&&((this.state == rhs.state)||((this.state!= null)&&this.state.equals(rhs.state))))&&((this.email == rhs.email)||((this.email!= null)&&this.email.equals(rhs.email))));
    }

}
