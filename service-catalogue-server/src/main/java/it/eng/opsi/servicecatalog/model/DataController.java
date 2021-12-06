
package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "piiController",
    "onBehalf",
    "organizationName",
    "hasContact",
    "hasAddress",
    "email",
    "telephone",
    "operatorName"
})
public class DataController {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("piiController")
    @NotNull
    private String piiController;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("onBehalf")
    @Valid
    @NotNull
    private OnBehalf onBehalf;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("organizationName")
    @NotNull
    private String organizationName;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasContact")
    @NotNull
    private String hasContact;
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
    @JsonProperty("operatorName")
    @NotNull
    private String operatorName;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DataController() {
    }

    /**
     * 
     * @param piiController
     * @param hasAddress
     * @param organizationName
     * @param onBehalf
     * @param telephone
     * @param hasContact
     * @param operatorName
     * @param email
     */
    public DataController(String piiController, OnBehalf onBehalf, String organizationName, String hasContact, String hasAddress, String email, String telephone, String operatorName) {
        super();
        this.piiController = piiController;
        this.onBehalf = onBehalf;
        this.organizationName = organizationName;
        this.hasContact = hasContact;
        this.hasAddress = hasAddress;
        this.email = email;
        this.telephone = telephone;
        this.operatorName = operatorName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("piiController")
    public String getPiiController() {
        return piiController;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("piiController")
    public void setPiiController(String piiController) {
        this.piiController = piiController;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("onBehalf")
    public OnBehalf getOnBehalf() {
        return onBehalf;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("onBehalf")
    public void setOnBehalf(OnBehalf onBehalf) {
        this.onBehalf = onBehalf;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("organizationName")
    public String getOrganizationName() {
        return organizationName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("organizationName")
    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasContact")
    public String getHasContact() {
        return hasContact;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasContact")
    public void setHasContact(String hasContact) {
        this.hasContact = hasContact;
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
    @JsonProperty("operatorName")
    public String getOperatorName() {
        return operatorName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("operatorName")
    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(DataController.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("piiController");
        sb.append('=');
        sb.append(((this.piiController == null)?"<null>":this.piiController));
        sb.append(',');
        sb.append("onBehalf");
        sb.append('=');
        sb.append(((this.onBehalf == null)?"<null>":this.onBehalf));
        sb.append(',');
        sb.append("organizationName");
        sb.append('=');
        sb.append(((this.organizationName == null)?"<null>":this.organizationName));
        sb.append(',');
        sb.append("hasContact");
        sb.append('=');
        sb.append(((this.hasContact == null)?"<null>":this.hasContact));
        sb.append(',');
        sb.append("hasAddress");
        sb.append('=');
        sb.append(((this.hasAddress == null)?"<null>":this.hasAddress));
        sb.append(',');
        sb.append("email");
        sb.append('=');
        sb.append(((this.email == null)?"<null>":this.email));
        sb.append(',');
        sb.append("telephone");
        sb.append('=');
        sb.append(((this.telephone == null)?"<null>":this.telephone));
        sb.append(',');
        sb.append("operatorName");
        sb.append('=');
        sb.append(((this.operatorName == null)?"<null>":this.operatorName));
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
        result = ((result* 31)+((this.piiController == null)? 0 :this.piiController.hashCode()));
        result = ((result* 31)+((this.hasAddress == null)? 0 :this.hasAddress.hashCode()));
        result = ((result* 31)+((this.organizationName == null)? 0 :this.organizationName.hashCode()));
        result = ((result* 31)+((this.onBehalf == null)? 0 :this.onBehalf.hashCode()));
        result = ((result* 31)+((this.telephone == null)? 0 :this.telephone.hashCode()));
        result = ((result* 31)+((this.hasContact == null)? 0 :this.hasContact.hashCode()));
        result = ((result* 31)+((this.operatorName == null)? 0 :this.operatorName.hashCode()));
        result = ((result* 31)+((this.email == null)? 0 :this.email.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof DataController) == false) {
            return false;
        }
        DataController rhs = ((DataController) other);
        return (((((((((this.piiController == rhs.piiController)||((this.piiController!= null)&&this.piiController.equals(rhs.piiController)))&&((this.hasAddress == rhs.hasAddress)||((this.hasAddress!= null)&&this.hasAddress.equals(rhs.hasAddress))))&&((this.organizationName == rhs.organizationName)||((this.organizationName!= null)&&this.organizationName.equals(rhs.organizationName))))&&((this.onBehalf == rhs.onBehalf)||((this.onBehalf!= null)&&this.onBehalf.equals(rhs.onBehalf))))&&((this.telephone == rhs.telephone)||((this.telephone!= null)&&this.telephone.equals(rhs.telephone))))&&((this.hasContact == rhs.hasContact)||((this.hasContact!= null)&&this.hasContact.equals(rhs.hasContact))))&&((this.operatorName == rhs.operatorName)||((this.operatorName!= null)&&this.operatorName.equals(rhs.operatorName))))&&((this.email == rhs.email)||((this.email!= null)&&this.email.equals(rhs.email))));
    }

}
