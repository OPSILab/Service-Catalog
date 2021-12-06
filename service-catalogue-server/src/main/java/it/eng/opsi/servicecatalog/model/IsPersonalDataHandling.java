
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
    "purposeId",
    "purposeName",
    "legalBasis",
    "purposeCategory",
    "processingCategories",
    "description",
    "requiredDatasets",
    "storage",
    "recipients",
    "shareWith",
    "obligations",
    "policyRef",
    "collectionMethod",
    "collectionOperator",
    "termination"
})
public class IsPersonalDataHandling {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeId")
    @NotNull
    private String purposeId;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeName")
    @NotNull
    private String purposeName;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("legalBasis")
    @NotNull
    private String legalBasis;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeCategory")
    @NotNull
    private String purposeCategory;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("processingCategories")
    @Valid
    @NotNull
    private List<String> processingCategories = new ArrayList<String>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    @Valid
    @NotNull
    private List<Description__5> description = new ArrayList<Description__5>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("requiredDatasets")
    @Valid
    @NotNull
    private List<String> requiredDatasets = new ArrayList<String>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("storage")
    @Valid
    @NotNull
    private Storage storage;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("recipients")
    @Valid
    @NotNull
    private List<Object> recipients = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("shareWith")
    @Valid
    @NotNull
    private List<ShareWith> shareWith = new ArrayList<ShareWith>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("obligations")
    @Valid
    @NotNull
    private List<Obligation> obligations = new ArrayList<Obligation>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("policyRef")
    @NotNull
    private String policyRef;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("collectionMethod")
    @NotNull
    private String collectionMethod;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("collectionOperator")
    @NotNull
    private String collectionOperator;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("termination")
    @NotNull
    private String termination;

    /**
     * No args constructor for use in serialization
     * 
     */
    public IsPersonalDataHandling() {
    }

    /**
     * 
     * @param termination
     * @param collectionMethod
     * @param processingCategories
     * @param purposeId
     * @param purposeName
     * @param obligations
     * @param legalBasis
     * @param description
     * @param collectionOperator
     * @param storage
     * @param purposeCategory
     * @param policyRef
     * @param shareWith
     * @param recipients
     * @param requiredDatasets
     */
    public IsPersonalDataHandling(String purposeId, String purposeName, String legalBasis, String purposeCategory, List<String> processingCategories, List<Description__5> description, List<String> requiredDatasets, Storage storage, List<Object> recipients, List<ShareWith> shareWith, List<Obligation> obligations, String policyRef, String collectionMethod, String collectionOperator, String termination) {
        super();
        this.purposeId = purposeId;
        this.purposeName = purposeName;
        this.legalBasis = legalBasis;
        this.purposeCategory = purposeCategory;
        this.processingCategories = processingCategories;
        this.description = description;
        this.requiredDatasets = requiredDatasets;
        this.storage = storage;
        this.recipients = recipients;
        this.shareWith = shareWith;
        this.obligations = obligations;
        this.policyRef = policyRef;
        this.collectionMethod = collectionMethod;
        this.collectionOperator = collectionOperator;
        this.termination = termination;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeId")
    public String getPurposeId() {
        return purposeId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeId")
    public void setPurposeId(String purposeId) {
        this.purposeId = purposeId;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeName")
    public String getPurposeName() {
        return purposeName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeName")
    public void setPurposeName(String purposeName) {
        this.purposeName = purposeName;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("legalBasis")
    public String getLegalBasis() {
        return legalBasis;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("legalBasis")
    public void setLegalBasis(String legalBasis) {
        this.legalBasis = legalBasis;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeCategory")
    public String getPurposeCategory() {
        return purposeCategory;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("purposeCategory")
    public void setPurposeCategory(String purposeCategory) {
        this.purposeCategory = purposeCategory;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("processingCategories")
    public List<String> getProcessingCategories() {
        return processingCategories;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("processingCategories")
    public void setProcessingCategories(List<String> processingCategories) {
        this.processingCategories = processingCategories;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public List<Description__5> getDescription() {
        return description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public void setDescription(List<Description__5> description) {
        this.description = description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("requiredDatasets")
    public List<String> getRequiredDatasets() {
        return requiredDatasets;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("requiredDatasets")
    public void setRequiredDatasets(List<String> requiredDatasets) {
        this.requiredDatasets = requiredDatasets;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("storage")
    public Storage getStorage() {
        return storage;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("storage")
    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("recipients")
    public List<Object> getRecipients() {
        return recipients;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("recipients")
    public void setRecipients(List<Object> recipients) {
        this.recipients = recipients;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("shareWith")
    public List<ShareWith> getShareWith() {
        return shareWith;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("shareWith")
    public void setShareWith(List<ShareWith> shareWith) {
        this.shareWith = shareWith;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("obligations")
    public List<Obligation> getObligations() {
        return obligations;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("obligations")
    public void setObligations(List<Obligation> obligations) {
        this.obligations = obligations;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("policyRef")
    public String getPolicyRef() {
        return policyRef;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("policyRef")
    public void setPolicyRef(String policyRef) {
        this.policyRef = policyRef;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("collectionMethod")
    public String getCollectionMethod() {
        return collectionMethod;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("collectionMethod")
    public void setCollectionMethod(String collectionMethod) {
        this.collectionMethod = collectionMethod;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("collectionOperator")
    public String getCollectionOperator() {
        return collectionOperator;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("collectionOperator")
    public void setCollectionOperator(String collectionOperator) {
        this.collectionOperator = collectionOperator;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("termination")
    public String getTermination() {
        return termination;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("termination")
    public void setTermination(String termination) {
        this.termination = termination;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(IsPersonalDataHandling.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("purposeId");
        sb.append('=');
        sb.append(((this.purposeId == null)?"<null>":this.purposeId));
        sb.append(',');
        sb.append("purposeName");
        sb.append('=');
        sb.append(((this.purposeName == null)?"<null>":this.purposeName));
        sb.append(',');
        sb.append("legalBasis");
        sb.append('=');
        sb.append(((this.legalBasis == null)?"<null>":this.legalBasis));
        sb.append(',');
        sb.append("purposeCategory");
        sb.append('=');
        sb.append(((this.purposeCategory == null)?"<null>":this.purposeCategory));
        sb.append(',');
        sb.append("processingCategories");
        sb.append('=');
        sb.append(((this.processingCategories == null)?"<null>":this.processingCategories));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("requiredDatasets");
        sb.append('=');
        sb.append(((this.requiredDatasets == null)?"<null>":this.requiredDatasets));
        sb.append(',');
        sb.append("storage");
        sb.append('=');
        sb.append(((this.storage == null)?"<null>":this.storage));
        sb.append(',');
        sb.append("recipients");
        sb.append('=');
        sb.append(((this.recipients == null)?"<null>":this.recipients));
        sb.append(',');
        sb.append("shareWith");
        sb.append('=');
        sb.append(((this.shareWith == null)?"<null>":this.shareWith));
        sb.append(',');
        sb.append("obligations");
        sb.append('=');
        sb.append(((this.obligations == null)?"<null>":this.obligations));
        sb.append(',');
        sb.append("policyRef");
        sb.append('=');
        sb.append(((this.policyRef == null)?"<null>":this.policyRef));
        sb.append(',');
        sb.append("collectionMethod");
        sb.append('=');
        sb.append(((this.collectionMethod == null)?"<null>":this.collectionMethod));
        sb.append(',');
        sb.append("collectionOperator");
        sb.append('=');
        sb.append(((this.collectionOperator == null)?"<null>":this.collectionOperator));
        sb.append(',');
        sb.append("termination");
        sb.append('=');
        sb.append(((this.termination == null)?"<null>":this.termination));
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
        result = ((result* 31)+((this.termination == null)? 0 :this.termination.hashCode()));
        result = ((result* 31)+((this.collectionMethod == null)? 0 :this.collectionMethod.hashCode()));
        result = ((result* 31)+((this.processingCategories == null)? 0 :this.processingCategories.hashCode()));
        result = ((result* 31)+((this.purposeId == null)? 0 :this.purposeId.hashCode()));
        result = ((result* 31)+((this.purposeName == null)? 0 :this.purposeName.hashCode()));
        result = ((result* 31)+((this.obligations == null)? 0 :this.obligations.hashCode()));
        result = ((result* 31)+((this.legalBasis == null)? 0 :this.legalBasis.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.collectionOperator == null)? 0 :this.collectionOperator.hashCode()));
        result = ((result* 31)+((this.storage == null)? 0 :this.storage.hashCode()));
        result = ((result* 31)+((this.purposeCategory == null)? 0 :this.purposeCategory.hashCode()));
        result = ((result* 31)+((this.policyRef == null)? 0 :this.policyRef.hashCode()));
        result = ((result* 31)+((this.shareWith == null)? 0 :this.shareWith.hashCode()));
        result = ((result* 31)+((this.recipients == null)? 0 :this.recipients.hashCode()));
        result = ((result* 31)+((this.requiredDatasets == null)? 0 :this.requiredDatasets.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof IsPersonalDataHandling) == false) {
            return false;
        }
        IsPersonalDataHandling rhs = ((IsPersonalDataHandling) other);
        return ((((((((((((((((this.termination == rhs.termination)||((this.termination!= null)&&this.termination.equals(rhs.termination)))&&((this.collectionMethod == rhs.collectionMethod)||((this.collectionMethod!= null)&&this.collectionMethod.equals(rhs.collectionMethod))))&&((this.processingCategories == rhs.processingCategories)||((this.processingCategories!= null)&&this.processingCategories.equals(rhs.processingCategories))))&&((this.purposeId == rhs.purposeId)||((this.purposeId!= null)&&this.purposeId.equals(rhs.purposeId))))&&((this.purposeName == rhs.purposeName)||((this.purposeName!= null)&&this.purposeName.equals(rhs.purposeName))))&&((this.obligations == rhs.obligations)||((this.obligations!= null)&&this.obligations.equals(rhs.obligations))))&&((this.legalBasis == rhs.legalBasis)||((this.legalBasis!= null)&&this.legalBasis.equals(rhs.legalBasis))))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.collectionOperator == rhs.collectionOperator)||((this.collectionOperator!= null)&&this.collectionOperator.equals(rhs.collectionOperator))))&&((this.storage == rhs.storage)||((this.storage!= null)&&this.storage.equals(rhs.storage))))&&((this.purposeCategory == rhs.purposeCategory)||((this.purposeCategory!= null)&&this.purposeCategory.equals(rhs.purposeCategory))))&&((this.policyRef == rhs.policyRef)||((this.policyRef!= null)&&this.policyRef.equals(rhs.policyRef))))&&((this.shareWith == rhs.shareWith)||((this.shareWith!= null)&&this.shareWith.equals(rhs.shareWith))))&&((this.recipients == rhs.recipients)||((this.recipients!= null)&&this.recipients.equals(rhs.recipients))))&&((this.requiredDatasets == rhs.requiredDatasets)||((this.requiredDatasets!= null)&&this.requiredDatasets.equals(rhs.requiredDatasets))));
    }

}
