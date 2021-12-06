
package it.eng.opsi.servicecatalog.model;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "identifier",
    "title",
    "description",
    "type"
})
public class Produce {

    @JsonProperty("identifier")
    private String identifier;
    /**
     * name
     * <p>
     * 
     * 
     */
    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    @Valid
    private Description__2 description;
    @JsonProperty("type")
    @Valid
    private List<String> type = new ArrayList<String>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public Produce() {
    }

    /**
     * 
     * @param identifier
     * @param description
     * @param title
     * @param type
     */
    public Produce(String identifier, String title, Description__2 description, List<String> type) {
        super();
        this.identifier = identifier;
        this.title = title;
        this.description = description;
        this.type = type;
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
     * name
     * <p>
     * 
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
     * 
     */
    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
    }

    @JsonProperty("description")
    public Description__2 getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(Description__2 description) {
        this.description = description;
    }

    @JsonProperty("type")
    public List<String> getType() {
        return type;
    }

    @JsonProperty("type")
    public void setType(List<String> type) {
        this.type = type;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Produce.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("identifier");
        sb.append('=');
        sb.append(((this.identifier == null)?"<null>":this.identifier));
        sb.append(',');
        sb.append("title");
        sb.append('=');
        sb.append(((this.title == null)?"<null>":this.title));
        sb.append(',');
        sb.append("description");
        sb.append('=');
        sb.append(((this.description == null)?"<null>":this.description));
        sb.append(',');
        sb.append("type");
        sb.append('=');
        sb.append(((this.type == null)?"<null>":this.type));
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
        result = ((result* 31)+((this.description == null)? 0 :this.description.hashCode()));
        result = ((result* 31)+((this.title == null)? 0 :this.title.hashCode()));
        result = ((result* 31)+((this.type == null)? 0 :this.type.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Produce) == false) {
            return false;
        }
        Produce rhs = ((Produce) other);
        return (((((this.identifier == rhs.identifier)||((this.identifier!= null)&&this.identifier.equals(rhs.identifier)))&&((this.description == rhs.description)||((this.description!= null)&&this.description.equals(rhs.description))))&&((this.title == rhs.title)||((this.title!= null)&&this.title.equals(rhs.title))))&&((this.type == rhs.type)||((this.type!= null)&&this.type.equals(rhs.type))));
    }

}
