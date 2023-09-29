
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
    "distributionId",
    "accessUrl",
    "description",
    "format"
})
public class Distribution {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("distributionId")
    @NotNull
    private String distributionId;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("accessUrl")
    @NotNull
    private String accessUrl;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    @Valid
    @NotNull
    private List<Description__1> description = new ArrayList<Description__1>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("format")
    @NotNull
    private String format;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Distribution() {
    }

    /**
     * 
     * @param distributionId
     * @param accessUrl
     * @param format
     * @param description
     */
    public Distribution(String distributionId, String accessUrl, List<Description__1> description, String format) {
        super();
        this.distributionId = distributionId;
        this.accessUrl = accessUrl;
        this.description = description;
        this.format = format;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("distributionId")
    public String getDistributionId() {
        return distributionId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("distributionId")
    public void setDistributionId(String distributionId) {
        this.distributionId = distributionId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("accessUrl")
    public String getAccessUrl() {
        return accessUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("accessUrl")
    public void setAccessUrl(String accessUrl) {
        this.accessUrl = accessUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public List<Description__1> getDescription() {
        return description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public void setDescription(List<Description__1> description) {
        this.description = description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("format")
    public String getFormat() {
        return format;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("format")
    public void setFormat(String format) {
        this.format = format;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Distribution.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("distributionId");
        sb.append('=');
        sb.append(((this.distributionId == null)?"<null>":this.distributionId));
        sb.append(',');
        sb.append("accessUrl");
        sb.append('=');
        sb.append(((this.accessUrl == null)?"<null>":this.accessUrl));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("format");
        sb.append('=');
        sb.append(((this.format == null)?"<null>":this.format));
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
        result = ((result* 31)+((this.format == null)? 0 :this.format.hashCode()));
        result = ((result* 31)+((this.distributionId == null)? 0 :this.distributionId.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.accessUrl == null)? 0 :this.accessUrl.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Distribution) == false) {
            return false;
        }
        Distribution rhs = ((Distribution) other);
        return (((((this.format == rhs.format)||((this.format!= null)&&this.format.equals(rhs.format)))&&((this.distributionId == rhs.distributionId)||((this.distributionId!= null)&&this.distributionId.equals(rhs.distributionId))))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.accessUrl == rhs.accessUrl)||((this.accessUrl!= null)&&this.accessUrl.equals(rhs.accessUrl))));
    }

}
