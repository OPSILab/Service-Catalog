
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
    "name",
    "status",
    "keyword",
    "sector",
    "thematicArea",
    "type",
    "language",
    "description",
    "processingTime",
    "isGroupedBy",
    "hasCompetentAuthority",
    "requires",
    "spatial",
    "hasInput",
    "produces",
    "hasContactPoint",
    "hasChannel"
})
public class HasInfo {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("identifier")
    @NotNull
    private String identifier;
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
    @JsonProperty("status")
    @NotNull
    private String status;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyword")
    @Valid
    @NotNull
    private List<Object> keyword = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("sector")
    @Valid
    @NotNull
    private List<Object> sector = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("thematicArea")
    @Valid
    @NotNull
    private List<Object> thematicArea = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    @Valid
    @NotNull
    private List<Object> type = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("language")
    @Valid
    @NotNull
    private List<Object> language = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    @Valid
    @NotNull
    private List<Object> description = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("processingTime")
    @NotNull
    private String processingTime;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("isGroupedBy")
    @Valid
    @NotNull
    private IsGroupedBy isGroupedBy;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasCompetentAuthority")
    @Valid
    @NotNull
    private HasCompetentAuthority hasCompetentAuthority;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("requires")
    @Valid
    @NotNull
    private List<Object> requires = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("spatial")
    @NotNull
    private String spatial;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasInput")
    @Valid
    @NotNull
    private List<Object> hasInput = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("produces")
    @Valid
    @NotNull
    private List<Object> produces = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasContactPoint")
    @Valid
    @NotNull
    private HasContactPoint hasContactPoint;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasChannel")
    @Valid
    @NotNull
    private List<Object> hasChannel = new ArrayList<Object>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public HasInfo() {
    }

    /**
     * 
     * @param identifier
     * @param hasContactPoint
     * @param hasChannel
     * @param hasCompetentAuthority
     * @param description
     * @param language
     * @param isGroupedBy
     * @param type
     * @param processingTime
     * @param name
     * @param produces
     * @param keyword
     * @param spatial
     * @param hasInput
     * @param sector
     * @param thematicArea
     * @param status
     * @param requires
     */
    public HasInfo(String identifier, String name, String status, List<Object> keyword, List<Object> sector, List<Object> thematicArea, List<Object> type, List<Object> language, List<Object> description, String processingTime, IsGroupedBy isGroupedBy, HasCompetentAuthority hasCompetentAuthority, List<Object> requires, String spatial, List<Object> hasInput, List<Object> produces, HasContactPoint hasContactPoint, List<Object> hasChannel) {
        super();
        this.identifier = identifier;
        this.name = name;
        this.status = status;
        this.keyword = keyword;
        this.sector = sector;
        this.thematicArea = thematicArea;
        this.type = type;
        this.language = language;
        this.description = description;
        this.processingTime = processingTime;
        this.isGroupedBy = isGroupedBy;
        this.hasCompetentAuthority = hasCompetentAuthority;
        this.requires = requires;
        this.spatial = spatial;
        this.hasInput = hasInput;
        this.produces = produces;
        this.hasContactPoint = hasContactPoint;
        this.hasChannel = hasChannel;
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
    @JsonProperty("status")
    public String getStatus() {
        return status;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("status")
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyword")
    public List<Object> getKeyword() {
        return keyword;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyword")
    public void setKeyword(List<Object> keyword) {
        this.keyword = keyword;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("sector")
    public List<Object> getSector() {
        return sector;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("sector")
    public void setSector(List<Object> sector) {
        this.sector = sector;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("thematicArea")
    public List<Object> getThematicArea() {
        return thematicArea;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("thematicArea")
    public void setThematicArea(List<Object> thematicArea) {
        this.thematicArea = thematicArea;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    public List<Object> getType() {
        return type;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    public void setType(List<Object> type) {
        this.type = type;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("language")
    public List<Object> getLanguage() {
        return language;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("language")
    public void setLanguage(List<Object> language) {
        this.language = language;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public List<Object> getDescription() {
        return description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public void setDescription(List<Object> description) {
        this.description = description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("processingTime")
    public String getProcessingTime() {
        return processingTime;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("processingTime")
    public void setProcessingTime(String processingTime) {
        this.processingTime = processingTime;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("isGroupedBy")
    public IsGroupedBy getIsGroupedBy() {
        return isGroupedBy;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("isGroupedBy")
    public void setIsGroupedBy(IsGroupedBy isGroupedBy) {
        this.isGroupedBy = isGroupedBy;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasCompetentAuthority")
    public HasCompetentAuthority getHasCompetentAuthority() {
        return hasCompetentAuthority;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasCompetentAuthority")
    public void setHasCompetentAuthority(HasCompetentAuthority hasCompetentAuthority) {
        this.hasCompetentAuthority = hasCompetentAuthority;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("requires")
    public List<Object> getRequires() {
        return requires;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("requires")
    public void setRequires(List<Object> requires) {
        this.requires = requires;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("spatial")
    public String getSpatial() {
        return spatial;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("spatial")
    public void setSpatial(String spatial) {
        this.spatial = spatial;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasInput")
    public List<Object> getHasInput() {
        return hasInput;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasInput")
    public void setHasInput(List<Object> hasInput) {
        this.hasInput = hasInput;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("produces")
    public List<Object> getProduces() {
        return produces;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("produces")
    public void setProduces(List<Object> produces) {
        this.produces = produces;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasContactPoint")
    public HasContactPoint getHasContactPoint() {
        return hasContactPoint;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasContactPoint")
    public void setHasContactPoint(HasContactPoint hasContactPoint) {
        this.hasContactPoint = hasContactPoint;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasChannel")
    public List<Object> getHasChannel() {
        return hasChannel;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasChannel")
    public void setHasChannel(List<Object> hasChannel) {
        this.hasChannel = hasChannel;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(HasInfo.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("name");
        sb.append('=');
        sb.append(((this.name == null)?"<null>":this.name));
        sb.append(',');
        sb.append("status");
        sb.append('=');
        sb.append(((this.status == null)?"<null>":this.status));
        sb.append(',');
        sb.append("keyword");
        sb.append('=');
        sb.append(((this.keyword == null)?"<null>":this.keyword));
        sb.append(',');
        sb.append("sector");
        sb.append('=');
        sb.append(((this.sector == null)?"<null>":this.sector));
        sb.append(',');
        sb.append("thematicArea");
        sb.append('=');
        sb.append(((this.thematicArea == null)?"<null>":this.thematicArea));
        sb.append(',');
        sb.append("type");
        sb.append('=');
        sb.append(((this.type == null)?"<null>":this.type));
        sb.append(',');
        sb.append("language");
        sb.append('=');
        sb.append(((this.language == null)?"<null>":this.language));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("processingTime");
        sb.append('=');
        sb.append(((this.processingTime == null)?"<null>":this.processingTime));
        sb.append(',');
        sb.append("isGroupedBy");
        sb.append('=');
        sb.append(((this.isGroupedBy == null)?"<null>":this.isGroupedBy));
        sb.append(',');
        sb.append("hasCompetentAuthority");
        sb.append('=');
        sb.append(((this.hasCompetentAuthority == null)?"<null>":this.hasCompetentAuthority));
        sb.append(',');
        sb.append("requires");
        sb.append('=');
        sb.append(((this.requires == null)?"<null>":this.requires));
        sb.append(',');
        sb.append("spatial");
        sb.append('=');
        sb.append(((this.spatial == null)?"<null>":this.spatial));
        sb.append(',');
        sb.append("hasInput");
        sb.append('=');
        sb.append(((this.hasInput == null)?"<null>":this.hasInput));
        sb.append(',');
        sb.append("produces");
        sb.append('=');
        sb.append(((this.produces == null)?"<null>":this.produces));
        sb.append(',');
        sb.append("hasContactPoint");
        sb.append('=');
        sb.append(((this.hasContactPoint == null)?"<null>":this.hasContactPoint));
        sb.append(',');
        sb.append("hasChannel");
        sb.append('=');
        sb.append(((this.hasChannel == null)?"<null>":this.hasChannel));
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
        result = ((result* 31)+((this.hasContactPoint == null)? 0 :this.hasContactPoint.hashCode()));
        result = ((result* 31)+((this.hasChannel == null)? 0 :this.hasChannel.hashCode()));
        result = ((result* 31)+((this.hasCompetentAuthority == null)? 0 :this.hasCompetentAuthority.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.language == null)? 0 :this.language.hashCode()));
        result = ((result* 31)+((this.isGroupedBy == null)? 0 :this.isGroupedBy.hashCode()));
        result = ((result* 31)+((this.type == null)? 0 :this.type.hashCode()));
        result = ((result* 31)+((this.processingTime == null)? 0 :this.processingTime.hashCode()));
        result = ((result* 31)+((this.name == null)? 0 :this.name.hashCode()));
        result = ((result* 31)+((this.produces == null)? 0 :this.produces.hashCode()));
        result = ((result* 31)+((this.keyword == null)? 0 :this.keyword.hashCode()));
        result = ((result* 31)+((this.spatial == null)? 0 :this.spatial.hashCode()));
        result = ((result* 31)+((this.hasInput == null)? 0 :this.hasInput.hashCode()));
        result = ((result* 31)+((this.sector == null)? 0 :this.sector.hashCode()));
        result = ((result* 31)+((this.thematicArea == null)? 0 :this.thematicArea.hashCode()));
        result = ((result* 31)+((this.status == null)? 0 :this.status.hashCode()));
        result = ((result* 31)+((this.requires == null)? 0 :this.requires.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof HasInfo) == false) {
            return false;
        }
        HasInfo rhs = ((HasInfo) other);
        return (((((((((((((((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.hasContactPoint == rhs.hasContactPoint)||((this.hasContactPoint!= null)&&this.hasContactPoint.equals(rhs.hasContactPoint))))&&((this.hasChannel == rhs.hasChannel)||((this.hasChannel!= null)&&this.hasChannel.equals(rhs.hasChannel))))&&((this.hasCompetentAuthority == rhs.hasCompetentAuthority)||((this.hasCompetentAuthority!= null)&&this.hasCompetentAuthority.equals(rhs.hasCompetentAuthority))))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.language == rhs.language)||((this.language!= null)&&this.language.equals(rhs.language))))&&((this.isGroupedBy == rhs.isGroupedBy)||((this.isGroupedBy!= null)&&this.isGroupedBy.equals(rhs.isGroupedBy))))&&((this.type == rhs.type)||((this.type!= null)&&this.type.equals(rhs.type))))&&((this.processingTime == rhs.processingTime)||((this.processingTime!= null)&&this.processingTime.equals(rhs.processingTime))))&&((this.name == rhs.name)||((this.name!= null)&&this.name.equals(rhs.name))))&&((this.produces == rhs.produces)||((this.produces!= null)&&this.produces.equals(rhs.produces))))&&((this.keyword == rhs.keyword)||((this.keyword!= null)&&this.keyword.equals(rhs.keyword))))&&((this.spatial == rhs.spatial)||((this.spatial!= null)&&this.spatial.equals(rhs.spatial))))&&((this.hasInput == rhs.hasInput)||((this.hasInput!= null)&&this.hasInput.equals(rhs.hasInput))))&&((this.sector == rhs.sector)||((this.sector!= null)&&this.sector.equals(rhs.sector))))&&((this.thematicArea == rhs.thematicArea)||((this.thematicArea!= null)&&this.thematicArea.equals(rhs.thematicArea))))&&((this.status == rhs.status)||((this.status!= null)&&this.status.equals(rhs.status))))&&((this.requires == rhs.requires)||((this.requires!= null)&&this.requires.equals(rhs.requires))));
    }

}
