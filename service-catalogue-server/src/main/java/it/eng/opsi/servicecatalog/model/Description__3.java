
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
    "locale",
    "description",
    "keywords"
})
public class Description__3 {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("locale")
    @NotNull
    private String locale;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    @NotNull
    private String description;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keywords")
    @Valid
    @NotNull
    private List<String> keywords = new ArrayList<String>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public Description__3() {
    }

    /**
     * 
     * @param keywords
     * @param description
     * @param locale
     */
    public Description__3(String locale, String description, List<String> keywords) {
        super();
        this.locale = locale;
        this.description = description;
        this.keywords = keywords;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("locale")
    public String getLocale() {
        return locale;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("locale")
    public void setLocale(String locale) {
        this.locale = locale;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("description")
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keywords")
    public List<String> getKeywords() {
        return keywords;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("keywords")
    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Description__3 .class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("locale");
        sb.append('=');
        sb.append(((this.locale == null)?"<null>":this.locale));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("keywords");
        sb.append('=');
        sb.append(((this.keywords == null)?"<null>":this.keywords));
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
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.locale == null)? 0 :this.locale.hashCode()));
        result = ((result* 31)+((this.keywords == null)? 0 :this.keywords.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Description__3) == false) {
            return false;
        }
        Description__3 rhs = ((Description__3) other);
        return ((((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description)))&&((this.locale == rhs.locale)||((this.locale!= null)&&this.locale.equals(rhs.locale))))&&((this.keywords == rhs.keywords)||((this.keywords!= null)&&this.keywords.equals(rhs.keywords))));
    }

}
