
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "locale",
    "description"
})
public class Description__2 {

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
     * No args constructor for use in serialization
     * 
     */
    public Description__2() {
    }

    /**
     * 
     * @param description
     * @param locale
     */
    public Description__2(String locale, String description) {
        super();
        this.locale = locale;
        this.description = description;
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

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Description__2 .class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("locale");
        sb.append('=');
        sb.append(((this.locale == null)?"<null>":this.locale));
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
        result = ((result* 31)+((this.locale == null)? 0 :this.locale.hashCode()));
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Description__2) == false) {
            return false;
        }
        Description__2 rhs = ((Description__2) other);
        return (((this.locale == rhs.locale)||((this.locale!= null)&&this.locale.equals(rhs.locale)))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))));
    }

}
