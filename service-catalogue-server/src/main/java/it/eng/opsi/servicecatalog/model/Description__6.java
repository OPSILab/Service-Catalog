
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "locale",
    "title",
    "description",
    "descriptionUrl",
    "iconUrl"
})
public class Description__6 {

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
    @JsonProperty("title")
    @NotNull
    private String title;
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
    @JsonProperty("descriptionUrl")
    @NotNull
    private String descriptionUrl;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("iconUrl")
    @NotNull
    private String iconUrl;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Description__6() {
    }

    /**
     * 
     * @param descriptionUrl
     * @param description
     * @param iconUrl
     * @param locale
     * @param title
     */
    public Description__6(String locale, String title, String description, String descriptionUrl, String iconUrl) {
        super();
        this.locale = locale;
        this.title = title;
        this.description = description;
        this.descriptionUrl = descriptionUrl;
        this.iconUrl = iconUrl;
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
    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    /**
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
    @JsonProperty("descriptionUrl")
    public String getDescriptionUrl() {
        return descriptionUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("descriptionUrl")
    public void setDescriptionUrl(String descriptionUrl) {
        this.descriptionUrl = descriptionUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("iconUrl")
    public String getIconUrl() {
        return iconUrl;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("iconUrl")
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Description__6 .class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("locale");
        sb.append('=');
        sb.append(((this.locale == null)?"<null>":this.locale));
        sb.append(',');
        sb.append("title");
        sb.append('=');
        sb.append(((this.title == null)?"<null>":this.title));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("descriptionUrl");
        sb.append('=');
        sb.append(((this.descriptionUrl == null)?"<null>":this.descriptionUrl));
        sb.append(',');
        sb.append("iconUrl");
        sb.append('=');
        sb.append(((this.iconUrl == null)?"<null>":this.iconUrl));
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
        result = ((result* 31)+((this.descriptionUrl == null)? 0 :this.descriptionUrl.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.iconUrl == null)? 0 :this.iconUrl.hashCode()));
        result = ((result* 31)+((this.locale == null)? 0 :this.locale.hashCode()));
        result = ((result* 31)+((this.title == null)? 0 :this.title.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Description__6) == false) {
            return false;
        }
        Description__6 rhs = ((Description__6) other);
        return ((((((this.descriptionUrl == rhs.descriptionUrl)||((this.descriptionUrl!= null)&&this.descriptionUrl.equals(rhs.descriptionUrl)))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.iconUrl == rhs.iconUrl)||((this.iconUrl!= null)&&this.iconUrl.equals(rhs.iconUrl))))&&((this.locale == rhs.locale)||((this.locale!= null)&&this.locale.equals(rhs.locale))))&&((this.title == rhs.title)||((this.title!= null)&&this.title.equals(rhs.title))));
    }

}
