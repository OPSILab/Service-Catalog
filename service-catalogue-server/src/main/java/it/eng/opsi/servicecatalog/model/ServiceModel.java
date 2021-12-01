
package it.eng.opsi.servicecatalog.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonValue;


/**
 * ServiceModel
 * <p>
 * 
 * 
 */
@JsonTypeName("acr:ServiceModel")
//@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "@type")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "serviceId", "dct:name", "identifier", "issued", "createdByUserId", "serviceDescriptionVersion",
		"serviceIconUrl", "status", "isPublicService", "hasInfo", "hasServiceInstance", "hasUsageRule",
		"isPersonalDataHandling" })
public class ServiceModel {

	 /**
     * 
     * (Required)
     * 
     */
	@JsonProperty("@id")
	@JsonAlias({ "@id", "identifier" })
    @NotNull
    private String identifier;
	/**
	 * 
	 * (Required)
	 * 
	 */

	
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
    @JsonProperty("issued")
    @NotNull
    private String issued;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("createdByUserId")
    @NotNull
    private String createdByUserId;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceDescriptionVersion")
    @NotNull
    private String serviceDescriptionVersion;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceIconUrl")
    @NotNull
    private String serviceIconUrl;
    /**
     * Service Description status
     * <p>
     * Status of Service Description (Allowed values: *Completed*, *Deprecated*, *UnderDevelopment*, *Withdrawn*)
     * (Required)
     * 
     */
    @JsonProperty("status")
    @JsonPropertyDescription("Status of Service Description (Allowed values: *Completed*, *Deprecated*, *UnderDevelopment*, *Withdrawn*)")
    @NotNull
    private ServiceModel.ServiceDescriptionStatus status = ServiceModel.ServiceDescriptionStatus.fromValue("UnderDevelopment");
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("isPublicService")
    @NotNull
    private Boolean isPublicService;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasInfo")
    @Valid
    @NotNull
    private HasInfo hasInfo;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasServiceInstance")
    @Valid
    @NotNull
    private HasServiceInstance hasServiceInstance;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasUsageRule")
    @Valid
    @NotNull
    private List<Object> hasUsageRule = new ArrayList<Object>();
    @JsonProperty("isPersonalDataHandling")
    @Valid
    private List<Object> isPersonalDataHandling = new ArrayList<Object>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public ServiceModel() {
    }

    /**
     * 
     * @param identifier
     * @param createdByUserId
     * @param serviceDescriptionVersion
     * @param hasUsageRule
     * @param isPersonalDataHandling
     * @param name
     * @param hasServiceInstance
     * @param issued
     * @param serviceIconUrl
     * @param hasInfo
     * @param status
     * @param isPublicService
     */
    public ServiceModel(String name, String identifier, String issued, String createdByUserId, String serviceDescriptionVersion, String serviceIconUrl, ServiceModel.ServiceDescriptionStatus status, Boolean isPublicService, HasInfo hasInfo, HasServiceInstance hasServiceInstance, List<Object> hasUsageRule, List<Object> isPersonalDataHandling) {
        super();
        this.name = name;
        this.identifier = identifier;
        this.issued = issued;
        this.createdByUserId = createdByUserId;
        this.serviceDescriptionVersion = serviceDescriptionVersion;
        this.serviceIconUrl = serviceIconUrl;
        this.status = status;
        this.isPublicService = isPublicService;
        this.hasInfo = hasInfo;
        this.hasServiceInstance = hasServiceInstance;
        this.hasUsageRule = hasUsageRule;
        this.isPersonalDataHandling = isPersonalDataHandling;
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
    @JsonProperty("identifier")
    public String getIdentifier() {
        return identifier;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("identifier")
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("issued")
    public String getIssued() {
        return issued;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("issued")
    public void setIssued(String issued) {
        this.issued = issued;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("createdByUserId")
    public String getCreatedByUserId() {
        return createdByUserId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("createdByUserId")
    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceDescriptionVersion")
    public String getServiceDescriptionVersion() {
        return serviceDescriptionVersion;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceDescriptionVersion")
    public void setServiceDescriptionVersion(String serviceDescriptionVersion) {
        this.serviceDescriptionVersion = serviceDescriptionVersion;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceIconUrl")
    public String getServiceIconUrl() {
        return serviceIconUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceIconUrl")
    public void setServiceIconUrl(String serviceIconUrl) {
        this.serviceIconUrl = serviceIconUrl;
    }

    /**
     * Service Description status
     * <p>
     * Status of Service Description (Allowed values: *Completed*, *Deprecated*, *UnderDevelopment*, *Withdrawn*)
     * (Required)
     * 
     */
    @JsonProperty("status")
    public ServiceModel.ServiceDescriptionStatus getStatus() {
        return status;
    }

    /**
     * Service Description status
     * <p>
     * Status of Service Description (Allowed values: *Completed*, *Deprecated*, *UnderDevelopment*, *Withdrawn*)
     * (Required)
     * 
     */
    @JsonProperty("status")
    public void setStatus(ServiceModel.ServiceDescriptionStatus status) {
        this.status = status;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("isPublicService")
    public Boolean getIsPublicService() {
        return isPublicService;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("isPublicService")
    public void setIsPublicService(Boolean isPublicService) {
        this.isPublicService = isPublicService;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasInfo")
    public HasInfo getHasInfo() {
        return hasInfo;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasInfo")
    public void setHasInfo(HasInfo hasInfo) {
        this.hasInfo = hasInfo;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasServiceInstance")
    public HasServiceInstance getHasServiceInstance() {
        return hasServiceInstance;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasServiceInstance")
    public void setHasServiceInstance(HasServiceInstance hasServiceInstance) {
        this.hasServiceInstance = hasServiceInstance;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasUsageRule")
    public List<Object> getHasUsageRule() {
        return hasUsageRule;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasUsageRule")
    public void setHasUsageRule(List<Object> hasUsageRule) {
        this.hasUsageRule = hasUsageRule;
    }

    @JsonProperty("isPersonalDataHandling")
    public List<Object> getIsPersonalDataHandling() {
        return isPersonalDataHandling;
    }

    @JsonProperty("isPersonalDataHandling")
    public void setIsPersonalDataHandling(List<Object> isPersonalDataHandling) {
        this.isPersonalDataHandling = isPersonalDataHandling;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(ServiceModel.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("name");
        sb.append('=');
        sb.append(((this.name == null)?"<null>":this.name));
        sb.append(',');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("issued");
        sb.append('=');
        sb.append(((this.issued == null)?"<null>":this.issued));
        sb.append(',');
        sb.append("createdByUserId");
        sb.append('=');
        sb.append(((this.createdByUserId == null)?"<null>":this.createdByUserId));
        sb.append(',');
        sb.append("serviceDescriptionVersion");
        sb.append('=');
        sb.append(((this.serviceDescriptionVersion == null)?"<null>":this.serviceDescriptionVersion));
        sb.append(',');
        sb.append("serviceIconUrl");
        sb.append('=');
        sb.append(((this.serviceIconUrl == null)?"<null>":this.serviceIconUrl));
        sb.append(',');
        sb.append("status");
        sb.append('=');
        sb.append(((this.status == null)?"<null>":this.status));
        sb.append(',');
        sb.append("isPublicService");
        sb.append('=');
        sb.append(((this.isPublicService == null)?"<null>":this.isPublicService));
        sb.append(',');
        sb.append("hasInfo");
        sb.append('=');
        sb.append(((this.hasInfo == null)?"<null>":this.hasInfo));
        sb.append(',');
        sb.append("hasServiceInstance");
        sb.append('=');
        sb.append(((this.hasServiceInstance == null)?"<null>":this.hasServiceInstance));
        sb.append(',');
        sb.append("hasUsageRule");
        sb.append('=');
        sb.append(((this.hasUsageRule == null)?"<null>":this.hasUsageRule));
        sb.append(',');
        sb.append("isPersonalDataHandling");
        sb.append('=');
        sb.append(((this.isPersonalDataHandling == null)?"<null>":this.isPersonalDataHandling));
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
        result = ((result* 31)+((this.createdByUserId == null)? 0 :this.createdByUserId.hashCode()));
        result = ((result* 31)+((this.serviceDescriptionVersion == null)? 0 :this.serviceDescriptionVersion.hashCode()));
        result = ((result* 31)+((this.hasUsageRule == null)? 0 :this.hasUsageRule.hashCode()));
        result = ((result* 31)+((this.isPersonalDataHandling == null)? 0 :this.isPersonalDataHandling.hashCode()));
        result = ((result* 31)+((this.serviceIconUrl == null)? 0 :this.serviceIconUrl.hashCode()));
        result = ((result* 31)+((this.hasInfo == null)? 0 :this.hasInfo.hashCode()));
        result = ((result* 31)+((this.isPublicService == null)? 0 :this.isPublicService.hashCode()));
        result = ((result* 31)+((this.name == null)? 0 :this.name.hashCode()));
        result = ((result* 31)+((this.hasServiceInstance == null)? 0 :this.hasServiceInstance.hashCode()));
        result = ((result* 31)+((this.issued == null)? 0 :this.issued.hashCode()));
        result = ((result* 31)+((this.status == null)? 0 :this.status.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof ServiceModel) == false) {
            return false;
        }
        ServiceModel rhs = ((ServiceModel) other);
        return (((((((((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.createdByUserId == rhs.createdByUserId)||((this.createdByUserId!= null)&&this.createdByUserId.equals(rhs.createdByUserId))))&&((this.serviceDescriptionVersion == rhs.serviceDescriptionVersion)||((this.serviceDescriptionVersion!= null)&&this.serviceDescriptionVersion.equals(rhs.serviceDescriptionVersion))))&&((this.hasUsageRule == rhs.hasUsageRule)||((this.hasUsageRule!= null)&&this.hasUsageRule.equals(rhs.hasUsageRule))))&&((this.isPersonalDataHandling == rhs.isPersonalDataHandling)||((this.isPersonalDataHandling!= null)&&this.isPersonalDataHandling.equals(rhs.isPersonalDataHandling))))&&((this.serviceIconUrl == rhs.serviceIconUrl)||((this.serviceIconUrl!= null)&&this.serviceIconUrl.equals(rhs.serviceIconUrl))))&&((this.hasInfo == rhs.hasInfo)||((this.hasInfo!= null)&&this.hasInfo.equals(rhs.hasInfo))))&&((this.isPublicService == rhs.isPublicService)||((this.isPublicService!= null)&&this.isPublicService.equals(rhs.isPublicService))))&&((this.name == rhs.name)||((this.name!= null)&&this.name.equals(rhs.name))))&&((this.hasServiceInstance == rhs.hasServiceInstance)||((this.hasServiceInstance!= null)&&this.hasServiceInstance.equals(rhs.hasServiceInstance))))&&((this.issued == rhs.issued)||((this.issued!= null)&&this.issued.equals(rhs.issued))))&&((this.status == rhs.status)||((this.status!= null)&&this.status.equals(rhs.status))));
    }

    public enum ServiceDescriptionStatus {

        COMPLETED("Completed"),
        DEPRECATED("Deprecated"),
        UNDER_DEVELOPMENT("UnderDevelopment"),
        WITH_DRAWN("WithDrawn");
        private final String value;
        private final static Map<String, ServiceModel.ServiceDescriptionStatus> CONSTANTS = new HashMap<String, ServiceModel.ServiceDescriptionStatus>();

        static {
            for (ServiceModel.ServiceDescriptionStatus c: values()) {
                CONSTANTS.put(c.value, c);
            }
        }

        private ServiceDescriptionStatus(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }

        @JsonValue
        public String value() {
            return this.value;
        }

        @JsonCreator
        public static ServiceModel.ServiceDescriptionStatus fromValue(String value) {
            ServiceModel.ServiceDescriptionStatus constant = CONSTANTS.get(value);
            if (constant == null) {
                throw new IllegalArgumentException(value);
            } else {
                return constant;
            }
        }

    }

}
