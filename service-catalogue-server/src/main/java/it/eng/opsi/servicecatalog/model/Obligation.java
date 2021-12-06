
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "event",
    "activity"
})
public class Obligation {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("event")
    @NotNull
    private String event;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("activity")
    @NotNull
    private String activity;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Obligation() {
    }

    /**
     * 
     * @param activity
     * @param event
     */
    public Obligation(String event, String activity) {
        super();
        this.event = event;
        this.activity = activity;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("event")
    public String getEvent() {
        return event;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("event")
    public void setEvent(String event) {
        this.event = event;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("activity")
    public String getActivity() {
        return activity;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("activity")
    public void setActivity(String activity) {
        this.activity = activity;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Obligation.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("event");
        sb.append('=');
        sb.append(((this.event == null)?"<null>":this.event));
        sb.append(',');
        sb.append("activity");
        sb.append('=');
        sb.append(((this.activity == null)?"<null>":this.activity));
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
        result = ((result* 31)+((this.event == null)? 0 :this.event.hashCode()));
        result = ((result* 31)+((this.activity == null)? 0 :this.activity.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Obligation) == false) {
            return false;
        }
        Obligation rhs = ((Obligation) other);
        return (((this.event == rhs.event)||((this.event!= null)&&this.event.equals(rhs.event)))&&((this.activity == rhs.activity)||((this.activity!= null)&&this.activity.equals(rhs.activity))));
    }

}
