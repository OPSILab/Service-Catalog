
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
    "identifier",
    "description",
    "datasetSchema",
    "dataStructureSpecification",
    "distribution",
    "dataMapping"
})
public class Dataset {

    @JsonProperty("identifier")
    private String identifier;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    @Valid
    @NotNull
    private List<Description__4> description = new ArrayList<Description__4>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("datasetSchema")
    @Valid
    @NotNull
    private DatasetSchema datasetSchema;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataStructureSpecification")
    @NotNull
    private String dataStructureSpecification;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("distribution")
    @Valid
    @NotNull
    private List<Distribution> distribution = new ArrayList<Distribution>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataMapping")
    @Valid
    @NotNull
    private List<DataMapping> dataMapping = new ArrayList<DataMapping>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public Dataset() {
    }

    /**
     * 
     * @param identifier
     * @param dataStructureSpecification
     * @param dataMapping
     * @param description
     * @param datasetSchema
     * @param distribution
     */
    public Dataset(String identifier, List<Description__4> description, DatasetSchema datasetSchema, String dataStructureSpecification, List<Distribution> distribution, List<DataMapping> dataMapping) {
        super();
        this.identifier = identifier;
        this.description = description;
        this.datasetSchema = datasetSchema;
        this.dataStructureSpecification = dataStructureSpecification;
        this.distribution = distribution;
        this.dataMapping = dataMapping;
    }

    @JsonProperty("identifier")
    public String getIdentifier() {
        return identifier;
    }

    @JsonProperty("identifier")
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public List<Description__4> getDescription() {
        return description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public void setDescription(List<Description__4> description) {
        this.description = description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("datasetSchema")
    public DatasetSchema getDatasetSchema() {
        return datasetSchema;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("datasetSchema")
    public void setDatasetSchema(DatasetSchema datasetSchema) {
        this.datasetSchema = datasetSchema;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataStructureSpecification")
    public String getDataStructureSpecification() {
        return dataStructureSpecification;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataStructureSpecification")
    public void setDataStructureSpecification(String dataStructureSpecification) {
        this.dataStructureSpecification = dataStructureSpecification;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("distribution")
    public List<Distribution> getDistribution() {
        return distribution;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("distribution")
    public void setDistribution(List<Distribution> distribution) {
        this.distribution = distribution;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataMapping")
    public List<DataMapping> getDataMapping() {
        return dataMapping;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataMapping")
    public void setDataMapping(List<DataMapping> dataMapping) {
        this.dataMapping = dataMapping;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Dataset.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("datasetSchema");
        sb.append('=');
        sb.append(((this.datasetSchema == null)?"<null>":this.datasetSchema));
        sb.append(',');
        sb.append("dataStructureSpecification");
        sb.append('=');
        sb.append(((this.dataStructureSpecification == null)?"<null>":this.dataStructureSpecification));
        sb.append(',');
        sb.append("distribution");
        sb.append('=');
        sb.append(((this.distribution == null)?"<null>":this.distribution));
        sb.append(',');
        sb.append("dataMapping");
        sb.append('=');
        sb.append(((this.dataMapping == null)?"<null>":this.dataMapping));
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
        result = ((result* 31)+((this.dataStructureSpecification == null)? 0 :this.dataStructureSpecification.hashCode()));
        result = ((result* 31)+((this.dataMapping == null)? 0 :this.dataMapping.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.datasetSchema == null)? 0 :this.datasetSchema.hashCode()));
        result = ((result* 31)+((this.distribution == null)? 0 :this.distribution.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Dataset) == false) {
            return false;
        }
        Dataset rhs = ((Dataset) other);
        return (((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.dataStructureSpecification == rhs.dataStructureSpecification)||((this.dataStructureSpecification!= null)&&this.dataStructureSpecification.equals(rhs.dataStructureSpecification))))&&((this.dataMapping == rhs.dataMapping)||((this.dataMapping!= null)&&this.dataMapping.equals(rhs.dataMapping))))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.datasetSchema == rhs.datasetSchema)||((this.datasetSchema!= null)&&this.datasetSchema.equals(rhs.datasetSchema))))&&((this.distribution == rhs.distribution)||((this.distribution!= null)&&this.distribution.equals(rhs.distribution))));
    }

}
