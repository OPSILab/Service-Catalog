
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
    "x5u",
    "x5c"
})
public class Cert {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("x5u")
    @NotNull
    private String x5u;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("x5c")
    @Valid
    @NotNull
    private List<Object> x5c = new ArrayList<Object>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public Cert() {
    }

    /**
     * 
     * @param x5c
     * @param x5u
     */
    public Cert(String x5u, List<Object> x5c) {
        super();
        this.x5u = x5u;
        this.x5c = x5c;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("x5u")
    public String getX5u() {
        return x5u;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("x5u")
    public void setX5u(String x5u) {
        this.x5u = x5u;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("x5c")
    public List<Object> getX5c() {
        return x5c;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("x5c")
    public void setX5c(List<Object> x5c) {
        this.x5c = x5c;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Cert.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("x5u");
        sb.append('=');
        sb.append(((this.x5u == null)?"<null>":this.x5u));
        sb.append(',');
        sb.append("x5c");
        sb.append('=');
        sb.append(((this.x5c == null)?"<null>":this.x5c));
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
        result = ((result* 31)+((this.x5u == null)? 0 :this.x5u.hashCode()));
        result = ((result* 31)+((this.x5c == null)? 0 :this.x5c.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Cert) == false) {
            return false;
        }
        Cert rhs = ((Cert) other);
        return (((this.x5u == rhs.x5u)||((this.x5u!= null)&&this.x5u.equals(rhs.x5u)))&&((this.x5c == rhs.x5c)||((this.x5c!= null)&&this.x5c.equals(rhs.x5c))));
    }

}
