
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "usageId",
    "usageName",
    "usageType"
})
public class HasUsageRule {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageId")
    @NotNull
    private String usageId;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageName")
    @NotNull
    private String usageName;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageType")
    @NotNull
    private String usageType;

    /**
     * No args constructor for use in serialization
     * 
     */
    public HasUsageRule() {
    }

    /**
     * 
     * @param usageId
     * @param usageName
     * @param usageType
     */
    public HasUsageRule(String usageId, String usageName, String usageType) {
        super();
        this.usageId = usageId;
        this.usageName = usageName;
        this.usageType = usageType;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageId")
    public String getUsageId() {
        return usageId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageId")
    public void setUsageId(String usageId) {
        this.usageId = usageId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageName")
    public String getUsageName() {
        return usageName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageName")
    public void setUsageName(String usageName) {
        this.usageName = usageName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageType")
    public String getUsageType() {
        return usageType;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("usageType")
    public void setUsageType(String usageType) {
        this.usageType = usageType;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(HasUsageRule.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("usageId");
        sb.append('=');
        sb.append(((this.usageId == null)?"<null>":this.usageId));
        sb.append(',');
        sb.append("usageName");
        sb.append('=');
        sb.append(((this.usageName == null)?"<null>":this.usageName));
        sb.append(',');
        sb.append("usageType");
        sb.append('=');
        sb.append(((this.usageType == null)?"<null>":this.usageType));
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
        result = ((result* 31)+((this.usageId == null)? 0 :this.usageId.hashCode()));
        result = ((result* 31)+((this.usageName == null)? 0 :this.usageName.hashCode()));
        result = ((result* 31)+((this.usageType == null)? 0 :this.usageType.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof HasUsageRule) == false) {
            return false;
        }
        HasUsageRule rhs = ((HasUsageRule) other);
        return ((((this.usageId == rhs.usageId)||((this.usageId!= null)&&this.usageId.equals(rhs.usageId)))&&((this.usageName == rhs.usageName)||((this.usageName!= null)&&this.usageName.equals(rhs.usageName))))&&((this.usageType == rhs.usageType)||((this.usageType!= null)&&this.usageType.equals(rhs.usageType))));
    }

}
