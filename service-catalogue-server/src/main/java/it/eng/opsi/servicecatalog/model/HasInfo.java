
package it.eng.opsi.servicecatalog.model;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("PublicService")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "@type", include = As.PROPERTY, defaultImpl = HasInfo.class)		
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "identifier",
    "title",
    "status",
    "keyword",
    "sector",
    "thematicArea",
    "type",
    "language",
    "description",
    "isDescribedAt",
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
	@JsonProperty("@id")
    @JsonAlias({ "identifier", "@id" })
    @NotNull
  	private String identifier;
    /**
     * name
     * <p>
     * 
     * (Required)
     * 
     */
    @JsonProperty("title")
    @NotNull
    private String title;
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
    private List<String> keyword = new ArrayList<String>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("sector")
    @Valid
    @NotNull
    private List<String> sector = new ArrayList<String>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("thematicArea")
    @Valid
    @NotNull
    private List<String> thematicArea = new ArrayList<String>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    @Valid
    @NotNull
    private List<String> type = new ArrayList<String>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("language")
    @Valid
    @NotNull
    private List<String> language = new ArrayList<String>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    @Valid
    @NotNull
    private Description description;
    @JsonProperty("isDescribedAt")
    @Valid
    private List<IsDescribedAt> isDescribedAt = new ArrayList<IsDescribedAt>();
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
    private List<String> isGroupedBy = new ArrayList<String>();
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
    private List<String> requires = new ArrayList<String>();
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
    private List<HasInput> hasInput = new ArrayList<HasInput>();
    /**
     * produces
     * <p>
     * 
     * (Required)
     * 
     */
    @JsonProperty("produces")
    @Valid
    @NotNull
    private List<Produce> produces = new ArrayList<Produce>();
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
    private List<HasChannel> hasChannel = new ArrayList<HasChannel>();

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
     * @param title
     * @param type
     * @param processingTime
     * @param produces
     * @param keyword
     * @param spatial
     * @param hasInput
     * @param sector
     * @param thematicArea
     * @param status
     * @param isDescribedAt
     * @param requires
     */
    public HasInfo(String identifier, String title, String status, List<String> keyword, List<String> sector, List<String> thematicArea, List<String> type, List<String> language, Description description, List<IsDescribedAt> isDescribedAt, String processingTime, List<String> isGroupedBy, HasCompetentAuthority hasCompetentAuthority, List<String> requires, String spatial, List<HasInput> hasInput, List<Produce> produces, HasContactPoint hasContactPoint, List<HasChannel> hasChannel) {
        super();
        this.identifier = identifier;
        this.title = title;
        this.status = status;
        this.keyword = keyword;
        this.sector = sector;
        this.thematicArea = thematicArea;
        this.type = type;
        this.language = language;
        this.description = description;
        this.isDescribedAt = isDescribedAt;
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
     * name
     * <p>
     * 
     * (Required)
     * 
     */
    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    /**
     * name
     * <p>
     * 
     * (Required)
     * 
     */
    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
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
    public List<String> getKeyword() {
        return keyword;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keyword")
    public void setKeyword(List<String> keyword) {
        this.keyword = keyword;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("sector")
    public List<String> getSector() {
        return sector;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("sector")
    public void setSector(List<String> sector) {
        this.sector = sector;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("thematicArea")
    public List<String> getThematicArea() {
        return thematicArea;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("thematicArea")
    public void setThematicArea(List<String> thematicArea) {
        this.thematicArea = thematicArea;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    public List<String> getType() {
        return type;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    public void setType(List<String> type) {
        this.type = type;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("language")
    public List<String> getLanguage() {
        return language;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("language")
    public void setLanguage(List<String> language) {
        this.language = language;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public Description getDescription() {
        return description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public void setDescription(Description description) {
        this.description = description;
    }

    @JsonProperty("isDescribedAt")
    public List<IsDescribedAt> getIsDescribedAt() {
        return isDescribedAt;
    }

    @JsonProperty("isDescribedAt")
    public void setIsDescribedAt(List<IsDescribedAt> isDescribedAt) {
        this.isDescribedAt = isDescribedAt;
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
    public List<String> getIsGroupedBy() {
        return isGroupedBy;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("isGroupedBy")
    public void setIsGroupedBy(List<String> isGroupedBy) {
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
    public List<String> getRequires() {
        return requires;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("requires")
    public void setRequires(List<String> requires) {
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
    public List<HasInput> getHasInput() {
        return hasInput;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasInput")
    public void setHasInput(List<HasInput> hasInput) {
        this.hasInput = hasInput;
    }

    /**
     * produces
     * <p>
     * 
     * (Required)
     * 
     */
    @JsonProperty("produces")
    public List<Produce> getProduces() {
        return produces;
    }

    /**
     * produces
     * <p>
     * 
     * (Required)
     * 
     */
    @JsonProperty("produces")
    public void setProduces(List<Produce> produces) {
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
    public List<HasChannel> getHasChannel() {
        return hasChannel;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("hasChannel")
    public void setHasChannel(List<HasChannel> hasChannel) {
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
        sb.append("title");
        sb.append('=');
        sb.append(((this.title == null)?"<null>":this.title));
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
        sb.append("isDescribedAt");
        sb.append('=');
        sb.append(((this.isDescribedAt == null)?"<null>":this.isDescribedAt));
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
        result = ((result* 31)+((this.title == null)? 0 :this.title.hashCode()));
        result = ((result* 31)+((this.type == null)? 0 :this.type.hashCode()));
        result = ((result* 31)+((this.processingTime == null)? 0 :this.processingTime.hashCode()));
        result = ((result* 31)+((this.produces == null)? 0 :this.produces.hashCode()));
        result = ((result* 31)+((this.keyword == null)? 0 :this.keyword.hashCode()));
        result = ((result* 31)+((this.spatial == null)? 0 :this.spatial.hashCode()));
        result = ((result* 31)+((this.hasInput == null)? 0 :this.hasInput.hashCode()));
        result = ((result* 31)+((this.sector == null)? 0 :this.sector.hashCode()));
        result = ((result* 31)+((this.thematicArea == null)? 0 :this.thematicArea.hashCode()));
        result = ((result* 31)+((this.status == null)? 0 :this.status.hashCode()));
        result = ((result* 31)+((this.isDescribedAt == null)? 0 :this.isDescribedAt.hashCode()));
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
        return ((((((((((((((((((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.hasContactPoint == rhs.hasContactPoint)||((this.hasContactPoint!= null)&&this.hasContactPoint.equals(rhs.hasContactPoint))))&&((this.hasChannel == rhs.hasChannel)||((this.hasChannel!= null)&&this.hasChannel.equals(rhs.hasChannel))))&&((this.hasCompetentAuthority == rhs.hasCompetentAuthority)||((this.hasCompetentAuthority!= null)&&this.hasCompetentAuthority.equals(rhs.hasCompetentAuthority))))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.language == rhs.language)||((this.language!= null)&&this.language.equals(rhs.language))))&&((this.isGroupedBy == rhs.isGroupedBy)||((this.isGroupedBy!= null)&&this.isGroupedBy.equals(rhs.isGroupedBy))))&&((this.title == rhs.title)||((this.title!= null)&&this.title.equals(rhs.title))))&&((this.type == rhs.type)||((this.type!= null)&&this.type.equals(rhs.type))))&&((this.processingTime == rhs.processingTime)||((this.processingTime!= null)&&this.processingTime.equals(rhs.processingTime))))&&((this.produces == rhs.produces)||((this.produces!= null)&&this.produces.equals(rhs.produces))))&&((this.keyword == rhs.keyword)||((this.keyword!= null)&&this.keyword.equals(rhs.keyword))))&&((this.spatial == rhs.spatial)||((this.spatial!= null)&&this.spatial.equals(rhs.spatial))))&&((this.hasInput == rhs.hasInput)||((this.hasInput!= null)&&this.hasInput.equals(rhs.hasInput))))&&((this.sector == rhs.sector)||((this.sector!= null)&&this.sector.equals(rhs.sector))))&&((this.thematicArea == rhs.thematicArea)||((this.thematicArea!= null)&&this.thematicArea.equals(rhs.thematicArea))))&&((this.status == rhs.status)||((this.status!= null)&&this.status.equals(rhs.status))))&&((this.isDescribedAt == rhs.isDescribedAt)||((this.isDescribedAt!= null)&&this.isDescribedAt.equals(rhs.isDescribedAt))))&&((this.requires == rhs.requires)||((this.requires!= null)&&this.requires.equals(rhs.requires))));
    }

}
