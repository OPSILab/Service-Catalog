
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "accessURL",
    "endpointInformation",
    "endpointDocumentation",
    "path",
    "async",
    "callback"
})
public class Endpoint {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("accessURL")
    @NotNull
    private String accessURL;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpointInformation")
    @NotNull
    private String endpointInformation;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpointDocumentation")
    @NotNull
    private String endpointDocumentation;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("path")
    @NotNull
    private String path;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("async")
    @NotNull
    private Boolean async;
    @JsonProperty("callback")
    private String callback;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Endpoint() {
    }

    /**
     * 
     * @param path
     * @param async
     * @param accessURL
     * @param endpointDocumentation
     * @param callback
     * @param endpointInformation
     */
    public Endpoint(String accessURL, String endpointInformation, String endpointDocumentation, String path, Boolean async, String callback) {
        super();
        this.accessURL = accessURL;
        this.endpointInformation = endpointInformation;
        this.endpointDocumentation = endpointDocumentation;
        this.path = path;
        this.async = async;
        this.callback = callback;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("accessURL")
    public String getAccessURL() {
        return accessURL;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("accessURL")
    public void setAccessURL(String accessURL) {
        this.accessURL = accessURL;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpointInformation")
    public String getEndpointInformation() {
        return endpointInformation;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpointInformation")
    public void setEndpointInformation(String endpointInformation) {
        this.endpointInformation = endpointInformation;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpointDocumentation")
    public String getEndpointDocumentation() {
        return endpointDocumentation;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("endpointDocumentation")
    public void setEndpointDocumentation(String endpointDocumentation) {
        this.endpointDocumentation = endpointDocumentation;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("path")
    public String getPath() {
        return path;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("path")
    public void setPath(String path) {
        this.path = path;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("async")
    public Boolean getAsync() {
        return async;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("async")
    public void setAsync(Boolean async) {
        this.async = async;
    }

    @JsonProperty("callback")
    public String getCallback() {
        return callback;
    }

    @JsonProperty("callback")
    public void setCallback(String callback) {
        this.callback = callback;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(Endpoint.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("accessURL");
        sb.append('=');
        sb.append(((this.accessURL == null)?"<null>":this.accessURL));
        sb.append(',');
        sb.append("endpointInformation");
        sb.append('=');
        sb.append(((this.endpointInformation == null)?"<null>":this.endpointInformation));
        sb.append(',');
        sb.append("endpointDocumentation");
        sb.append('=');
        sb.append(((this.endpointDocumentation == null)?"<null>":this.endpointDocumentation));
        sb.append(',');
        sb.append("path");
        sb.append('=');
        sb.append(((this.path == null)?"<null>":this.path));
        sb.append(',');
        sb.append("async");
        sb.append('=');
        sb.append(((this.async == null)?"<null>":this.async));
        sb.append(',');
        sb.append("callback");
        sb.append('=');
        sb.append(((this.callback == null)?"<null>":this.callback));
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
        result = ((result* 31)+((this.path == null)? 0 :this.path.hashCode()));
        result = ((result* 31)+((this.async == null)? 0 :this.async.hashCode()));
        result = ((result* 31)+((this.accessURL == null)? 0 :this.accessURL.hashCode()));
        result = ((result* 31)+((this.endpointDocumentation == null)? 0 :this.endpointDocumentation.hashCode()));
        result = ((result* 31)+((this.callback == null)? 0 :this.callback.hashCode()));
        result = ((result* 31)+((this.endpointInformation == null)? 0 :this.endpointInformation.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Endpoint) == false) {
            return false;
        }
        Endpoint rhs = ((Endpoint) other);
        return (((((((this.path == rhs.path)||((this.path!= null)&&this.path.equals(rhs.path)))&&((this.async == rhs.async)||((this.async!= null)&&this.async.equals(rhs.async))))&&((this.accessURL == rhs.accessURL)||((this.accessURL!= null)&&this.accessURL.equals(rhs.accessURL))))&&((this.endpointDocumentation == rhs.endpointDocumentation)||((this.endpointDocumentation!= null)&&this.endpointDocumentation.equals(rhs.endpointDocumentation))))&&((this.callback == rhs.callback)||((this.callback!= null)&&this.callback.equals(rhs.callback))))&&((this.endpointInformation == rhs.endpointInformation)||((this.endpointInformation!= null)&&this.endpointInformation.equals(rhs.endpointInformation))));
    }

}
