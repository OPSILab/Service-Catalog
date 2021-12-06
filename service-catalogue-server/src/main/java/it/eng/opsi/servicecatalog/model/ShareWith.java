
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "orgName",
    "orgUrl",
    "businessType",
    "required"
})
public class ShareWith {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("orgName")
    @NotNull
    private String orgName;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("orgUrl")
    @NotNull
    private String orgUrl;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessType")
    @NotNull
    private String businessType;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("required")
    @NotNull
    private Boolean required;

    /**
     * No args constructor for use in serialization
     * 
     */
    public ShareWith() {
    }

    /**
     * 
     * @param orgName
     * @param orgUrl
     * @param businessType
     * @param required
     */
    public ShareWith(String orgName, String orgUrl, String businessType, Boolean required) {
        super();
        this.orgName = orgName;
        this.orgUrl = orgUrl;
        this.businessType = businessType;
        this.required = required;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("orgName")
    public String getOrgName() {
        return orgName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("orgName")
    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("orgUrl")
    public String getOrgUrl() {
        return orgUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("orgUrl")
    public void setOrgUrl(String orgUrl) {
        this.orgUrl = orgUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessType")
    public String getBusinessType() {
        return businessType;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessType")
    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("required")
    public Boolean getRequired() {
        return required;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("required")
    public void setRequired(Boolean required) {
        this.required = required;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(ShareWith.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("orgName");
        sb.append('=');
        sb.append(((this.orgName == null)?"<null>":this.orgName));
        sb.append(',');
        sb.append("orgUrl");
        sb.append('=');
        sb.append(((this.orgUrl == null)?"<null>":this.orgUrl));
        sb.append(',');
        sb.append("businessType");
        sb.append('=');
        sb.append(((this.businessType == null)?"<null>":this.businessType));
        sb.append(',');
        sb.append("required");
        sb.append('=');
        sb.append(((this.required == null)?"<null>":this.required));
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
        result = ((result* 31)+((this.orgName == null)? 0 :this.orgName.hashCode()));
        result = ((result* 31)+((this.orgUrl == null)? 0 :this.orgUrl.hashCode()));
        result = ((result* 31)+((this.businessType == null)? 0 :this.businessType.hashCode()));
        result = ((result* 31)+((this.required == null)? 0 :this.required.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof ShareWith) == false) {
            return false;
        }
        ShareWith rhs = ((ShareWith) other);
        return (((((this.orgName == rhs.orgName)||((this.orgName!= null)&&this.orgName.equals(rhs.orgName)))&&((this.orgUrl == rhs.orgUrl)||((this.orgUrl!= null)&&this.orgUrl.equals(rhs.orgUrl))))&&((this.businessType == rhs.businessType)||((this.businessType!= null)&&this.businessType.equals(rhs.businessType))))&&((this.required == rhs.required)||((this.required!= null)&&this.required.equals(rhs.required))));
    }

}
