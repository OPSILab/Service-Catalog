
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "location",
    "duration"
})
public class Storage {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("location")
    @NotNull
    private String location;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("duration")
    @NotNull
    private String duration;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Storage() {
    }

    /**
     * 
     * @param duration
     * @param location
     */
    public Storage(String location, String duration) {
        super();
        this.location = location;
        this.duration = duration;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("location")
    public String getLocation() {
        return location;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("location")
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("duration")
    public String getDuration() {
        return duration;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("duration")
    public void setDuration(String duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Storage.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("location");
        sb.append('=');
        sb.append(((this.location == null)?"<null>":this.location));
        sb.append(',');
        sb.append("duration");
        sb.append('=');
        sb.append(((this.duration == null)?"<null>":this.duration));
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
        result = ((result* 31)+((this.duration == null)? 0 :this.duration.hashCode()));
        result = ((result* 31)+((this.location == null)? 0 :this.location.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Storage) == false) {
            return false;
        }
        Storage rhs = ((Storage) other);
        return (((this.duration == rhs.duration)||((this.duration!= null)&&this.duration.equals(rhs.duration)))&&((this.location == rhs.location)||((this.location!= null)&&this.location.equals(rhs.location))));
    }

}
