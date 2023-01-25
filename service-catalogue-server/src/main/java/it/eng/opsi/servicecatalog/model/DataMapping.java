
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "property",
    "conceptId",
    "name",
    "type",
    "inputType",
    "required"
})
public class DataMapping {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("property")
    @NotNull
    private String property;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("conceptId")
    @NotNull
    private String conceptId;
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
    @JsonProperty("type")
    @NotNull
    private String type;
    @JsonProperty("inputType")
    private String inputType;
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
    public DataMapping() {
    }

    /**
     * 
     * @param property
     * @param name
     * @param conceptId
     * @param inputType
     * @param type
     * @param required
     */
    public DataMapping(String property, String conceptId, String name, String type, String inputType, Boolean required) {
        super();
        this.property = property;
        this.conceptId = conceptId;
        this.name = name;
        this.type = type;
        this.inputType = inputType;
        this.required = required;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("property")
    public String getProperty() {
        return property;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("property")
    public void setProperty(String property) {
        this.property = property;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("conceptId")
    public String getConceptId() {
        return conceptId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("conceptId")
    public void setConceptId(String conceptId) {
        this.conceptId = conceptId;
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
    @JsonProperty("type")
    public String getType() {
        return type;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    public void setType(String type) {
        this.type = type;
    }

    @JsonProperty("inputType")
    public String getInputType() {
        return inputType;
    }

    @JsonProperty("inputType")
    public void setInputType(String inputType) {
        this.inputType = inputType;
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
        sb.append(DataMapping.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("property");
        sb.append('=');
        sb.append(((this.property == null)?"<null>":this.property));
        sb.append(',');
        sb.append("conceptId");
        sb.append('=');
        sb.append(((this.conceptId == null)?"<null>":this.conceptId));
        sb.append(',');
        sb.append("name");
        sb.append('=');
        sb.append(((this.name == null)?"<null>":this.name));
        sb.append(',');
        sb.append("type");
        sb.append('=');
        sb.append(((this.type == null)?"<null>":this.type));
        sb.append(',');
        sb.append("inputType");
        sb.append('=');
        sb.append(((this.inputType == null)?"<null>":this.inputType));
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
        result = ((result* 31)+((this.property == null)? 0 :this.property.hashCode()));
        result = ((result* 31)+((this.name == null)? 0 :this.name.hashCode()));
        result = ((result* 31)+((this.conceptId == null)? 0 :this.conceptId.hashCode()));
        result = ((result* 31)+((this.inputType == null)? 0 :this.inputType.hashCode()));
        result = ((result* 31)+((this.type == null)? 0 :this.type.hashCode()));
        result = ((result* 31)+((this.required == null)? 0 :this.required.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof DataMapping) == false) {
            return false;
        }
        DataMapping rhs = ((DataMapping) other);
        return (((((((this.property == rhs.property)||((this.property!= null)&&this.property.equals(rhs.property)))&&((this.name == rhs.name)||((this.name!= null)&&this.name.equals(rhs.name))))&&((this.conceptId == rhs.conceptId)||((this.conceptId!= null)&&this.conceptId.equals(rhs.conceptId))))&&((this.inputType == rhs.inputType)||((this.inputType!= null)&&this.inputType.equals(rhs.inputType))))&&((this.type == rhs.type)||((this.type!= null)&&this.type.equals(rhs.type))))&&((this.required == rhs.required)||((this.required!= null)&&this.required.equals(rhs.required))));
    }

}
