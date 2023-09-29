
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
    "property",
    "conceptId",
    "name",
    "type",
    "inputType",
    "multiple",
    "required",
    "source",
    "readonly",
    "datamap",
    "description"
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
    @JsonProperty("multiple")
    private Boolean multiple;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("required")
    @NotNull
    private Boolean required;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("source")
    @NotNull
    private String source;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("readonly")
    @NotNull
    private Boolean readonly;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("datamap")
    @NotNull
    private String datamap;
    @JsonProperty("description")
    @Valid
    private List<Description__2> description = new ArrayList<Description__2>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public DataMapping() {
    }

    /**
     * 
     * @param readonly
     * @param datamap
     * @param property
     * @param name
     * @param multiple
     * @param conceptId
     * @param description
     * @param inputType
     * @param source
     * @param type
     * @param required
     */
    public DataMapping(String property, String conceptId, String name, String type, String inputType, Boolean multiple, Boolean required, String source, Boolean readonly, String datamap, List<Description__2> description) {
        super();
        this.property = property;
        this.conceptId = conceptId;
        this.name = name;
        this.type = type;
        this.inputType = inputType;
        this.multiple = multiple;
        this.required = required;
        this.source = source;
        this.readonly = readonly;
        this.datamap = datamap;
        this.description = description;
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

    @JsonProperty("multiple")
    public Boolean getMultiple() {
        return multiple;
    }

    @JsonProperty("multiple")
    public void setMultiple(Boolean multiple) {
        this.multiple = multiple;
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

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("source")
    public String getSource() {
        return source;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("source")
    public void setSource(String source) {
        this.source = source;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("readonly")
    public Boolean getReadonly() {
        return readonly;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("readonly")
    public void setReadonly(Boolean readonly) {
        this.readonly = readonly;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("datamap")
    public String getDatamap() {
        return datamap;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("datamap")
    public void setDatamap(String datamap) {
        this.datamap = datamap;
    }

    @JsonProperty("description")
    public List<Description__2> getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(List<Description__2> description) {
        this.description = description;
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
        sb.append("multiple");
        sb.append('=');
        sb.append(((this.multiple == null)?"<null>":this.multiple));
        sb.append(',');
        sb.append("required");
        sb.append('=');
        sb.append(((this.required == null)?"<null>":this.required));
        sb.append(',');
        sb.append("source");
        sb.append('=');
        sb.append(((this.source == null)?"<null>":this.source));
        sb.append(',');
        sb.append("readonly");
        sb.append('=');
        sb.append(((this.readonly == null)?"<null>":this.readonly));
        sb.append(',');
        sb.append("datamap");
        sb.append('=');
        sb.append(((this.datamap == null)?"<null>":this.datamap));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
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
        result = ((result* 31)+((this.readonly == null)? 0 :this.readonly.hashCode()));
        result = ((result* 31)+((this.datamap == null)? 0 :this.datamap.hashCode()));
        result = ((result* 31)+((this.property == null)? 0 :this.property.hashCode()));
        result = ((result* 31)+((this.name == null)? 0 :this.name.hashCode()));
        result = ((result* 31)+((this.multiple == null)? 0 :this.multiple.hashCode()));
        result = ((result* 31)+((this.conceptId == null)? 0 :this.conceptId.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.inputType == null)? 0 :this.inputType.hashCode()));
        result = ((result* 31)+((this.source == null)? 0 :this.source.hashCode()));
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
        return ((((((((((((this.readonly == rhs.readonly)||((this.readonly!= null)&&this.readonly.equals(rhs.readonly)))&&((this.datamap == rhs.datamap)||((this.datamap!= null)&&this.datamap.equals(rhs.datamap))))&&((this.property == rhs.property)||((this.property!= null)&&this.property.equals(rhs.property))))&&((this.name == rhs.name)||((this.name!= null)&&this.name.equals(rhs.name))))&&((this.multiple == rhs.multiple)||((this.multiple!= null)&&this.multiple.equals(rhs.multiple))))&&((this.conceptId == rhs.conceptId)||((this.conceptId!= null)&&this.conceptId.equals(rhs.conceptId))))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.inputType == rhs.inputType)||((this.inputType!= null)&&this.inputType.equals(rhs.inputType))))&&((this.source == rhs.source)||((this.source!= null)&&this.source.equals(rhs.source))))&&((this.type == rhs.type)||((this.type!= null)&&this.type.equals(rhs.type))))&&((this.required == rhs.required)||((this.required!= null)&&this.required.equals(rhs.required))));
    }

}
