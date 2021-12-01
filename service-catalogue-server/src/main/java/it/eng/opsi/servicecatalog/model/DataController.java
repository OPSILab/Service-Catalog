
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "piiController",
    "onBehalf",
    "org",
    "contact",
    "address",
    "email",
    "phone",
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
    @NotNull
    private Boolean onBehalf;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("org")
    @NotNull
    private String org;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("contact")
    @NotNull
    private String contact;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("address")
    @NotNull
    private String address;
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
    @JsonProperty("phone")
    @NotNull
    private String phone;
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
     * @param address
     * @param org
     * @param phone
     * @param contact
     * @param onBehalf
     * @param operatorName
     * @param email
     */
    public DataController(String piiController, Boolean onBehalf, String org, String contact, String address, String email, String phone, String operatorName) {
        super();
        this.piiController = piiController;
        this.onBehalf = onBehalf;
        this.org = org;
        this.contact = contact;
        this.address = address;
        this.email = email;
        this.phone = phone;
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
    public Boolean getOnBehalf() {
        return onBehalf;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("onBehalf")
    public void setOnBehalf(Boolean onBehalf) {
        this.onBehalf = onBehalf;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("org")
    public String getOrg() {
        return org;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("org")
    public void setOrg(String org) {
        this.org = org;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("contact")
    public String getContact() {
        return contact;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("contact")
    public void setContact(String contact) {
        this.contact = contact;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("address")
    public String getAddress() {
        return address;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("address")
    public void setAddress(String address) {
        this.address = address;
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
    @JsonProperty("phone")
    public String getPhone() {
        return phone;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("phone")
    public void setPhone(String phone) {
        this.phone = phone;
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
        sb.append("org");
        sb.append('=');
        sb.append(((this.org == null)?"<null>":this.org));
        sb.append(',');
        sb.append("contact");
        sb.append('=');
        sb.append(((this.contact == null)?"<null>":this.contact));
        sb.append(',');
        sb.append("address");
        sb.append('=');
        sb.append(((this.address == null)?"<null>":this.address));
        sb.append(',');
        sb.append("email");
        sb.append('=');
        sb.append(((this.email == null)?"<null>":this.email));
        sb.append(',');
        sb.append("phone");
        sb.append('=');
        sb.append(((this.phone == null)?"<null>":this.phone));
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
        result = ((result* 31)+((this.address == null)? 0 :this.address.hashCode()));
        result = ((result* 31)+((this.org == null)? 0 :this.org.hashCode()));
        result = ((result* 31)+((this.phone == null)? 0 :this.phone.hashCode()));
        result = ((result* 31)+((this.contact == null)? 0 :this.contact.hashCode()));
        result = ((result* 31)+((this.onBehalf == null)? 0 :this.onBehalf.hashCode()));
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
        return (((((((((this.piiController == rhs.piiController)||((this.piiController!= null)&&this.piiController.equals(rhs.piiController)))&&((this.address == rhs.address)||((this.address!= null)&&this.address.equals(rhs.address))))&&((this.org == rhs.org)||((this.org!= null)&&this.org.equals(rhs.org))))&&((this.phone == rhs.phone)||((this.phone!= null)&&this.phone.equals(rhs.phone))))&&((this.contact == rhs.contact)||((this.contact!= null)&&this.contact.equals(rhs.contact))))&&((this.onBehalf == rhs.onBehalf)||((this.onBehalf!= null)&&this.onBehalf.equals(rhs.onBehalf))))&&((this.operatorName == rhs.operatorName)||((this.operatorName!= null)&&this.operatorName.equals(rhs.operatorName))))&&((this.email == rhs.email)||((this.email!= null)&&this.email.equals(rhs.email))));
    }

}
