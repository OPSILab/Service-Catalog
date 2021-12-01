
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "lifeEvent",
    "businessEvent"
})
public class IsGroupedBy {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("lifeEvent")
    @NotNull
    private String lifeEvent;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessEvent")
    @NotNull
    private String businessEvent;

    /**
     * No args constructor for use in serialization
     * 
     */
    public IsGroupedBy() {
    }

    /**
     * 
     * @param businessEvent
     * @param lifeEvent
     */
    public IsGroupedBy(String lifeEvent, String businessEvent) {
        super();
        this.lifeEvent = lifeEvent;
        this.businessEvent = businessEvent;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("lifeEvent")
    public String getLifeEvent() {
        return lifeEvent;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("lifeEvent")
    public void setLifeEvent(String lifeEvent) {
        this.lifeEvent = lifeEvent;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessEvent")
    public String getBusinessEvent() {
        return businessEvent;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("businessEvent")
    public void setBusinessEvent(String businessEvent) {
        this.businessEvent = businessEvent;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(IsGroupedBy.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("lifeEvent");
        sb.append('=');
        sb.append(((this.lifeEvent == null)?"<null>":this.lifeEvent));
        sb.append(',');
        sb.append("businessEvent");
        sb.append('=');
        sb.append(((this.businessEvent == null)?"<null>":this.businessEvent));
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
        result = ((result* 31)+((this.lifeEvent == null)? 0 :this.lifeEvent.hashCode()));
        result = ((result* 31)+((this.businessEvent == null)? 0 :this.businessEvent.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof IsGroupedBy) == false) {
            return false;
        }
        IsGroupedBy rhs = ((IsGroupedBy) other);
        return (((this.lifeEvent == rhs.lifeEvent)||((this.lifeEvent!= null)&&this.lifeEvent.equals(rhs.lifeEvent)))&&((this.businessEvent == rhs.businessEvent)||((this.businessEvent!= null)&&this.businessEvent.equals(rhs.businessEvent))));
    }

}
