
package it.eng.opsi.servicecatalog.model;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "libraryDomain",
    "loginUri",
    "linkingRedirectUri",
    "objectionUri",
    "notificationUri"
})
public class ServiceUrls {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("libraryDomain")
    @NotNull
    private String libraryDomain;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("loginUri")
    @NotNull
    private String loginUri;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("linkingRedirectUri")
    @NotNull
    private String linkingRedirectUri;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("objectionUri")
    @NotNull
    private String objectionUri;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("notificationUri")
    @NotNull
    private String notificationUri;

    /**
     * No args constructor for use in serialization
     * 
     */
    public ServiceUrls() {
    }

    /**
     * 
     * @param loginUri
     * @param notificationUri
     * @param linkingRedirectUri
     * @param libraryDomain
     * @param objectionUri
     */
    public ServiceUrls(String libraryDomain, String loginUri, String linkingRedirectUri, String objectionUri, String notificationUri) {
        super();
        this.libraryDomain = libraryDomain;
        this.loginUri = loginUri;
        this.linkingRedirectUri = linkingRedirectUri;
        this.objectionUri = objectionUri;
        this.notificationUri = notificationUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("libraryDomain")
    public String getLibraryDomain() {
        return libraryDomain;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("libraryDomain")
    public void setLibraryDomain(String libraryDomain) {
        this.libraryDomain = libraryDomain;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("loginUri")
    public String getLoginUri() {
        return loginUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("loginUri")
    public void setLoginUri(String loginUri) {
        this.loginUri = loginUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("linkingRedirectUri")
    public String getLinkingRedirectUri() {
        return linkingRedirectUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("linkingRedirectUri")
    public void setLinkingRedirectUri(String linkingRedirectUri) {
        this.linkingRedirectUri = linkingRedirectUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("objectionUri")
    public String getObjectionUri() {
        return objectionUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("objectionUri")
    public void setObjectionUri(String objectionUri) {
        this.objectionUri = objectionUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("notificationUri")
    public String getNotificationUri() {
        return notificationUri;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("notificationUri")
    public void setNotificationUri(String notificationUri) {
        this.notificationUri = notificationUri;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(ServiceUrls.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("libraryDomain");
        sb.append('=');
        sb.append(((this.libraryDomain == null)?"<null>":this.libraryDomain));
        sb.append(',');
        sb.append("loginUri");
        sb.append('=');
        sb.append(((this.loginUri == null)?"<null>":this.loginUri));
        sb.append(',');
        sb.append("linkingRedirectUri");
        sb.append('=');
        sb.append(((this.linkingRedirectUri == null)?"<null>":this.linkingRedirectUri));
        sb.append(',');
        sb.append("objectionUri");
        sb.append('=');
        sb.append(((this.objectionUri == null)?"<null>":this.objectionUri));
        sb.append(',');
        sb.append("notificationUri");
        sb.append('=');
        sb.append(((this.notificationUri == null)?"<null>":this.notificationUri));
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
        result = ((result* 31)+((this.linkingRedirectUri == null)? 0 :this.linkingRedirectUri.hashCode()));
        result = ((result* 31)+((this.loginUri == null)? 0 :this.loginUri.hashCode()));
        result = ((result* 31)+((this.libraryDomain == null)? 0 :this.libraryDomain.hashCode()));
        result = ((result* 31)+((this.objectionUri == null)? 0 :this.objectionUri.hashCode()));
        result = ((result* 31)+((this.notificationUri == null)? 0 :this.notificationUri.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof ServiceUrls) == false) {
            return false;
        }
        ServiceUrls rhs = ((ServiceUrls) other);
        return ((((((this.linkingRedirectUri == rhs.linkingRedirectUri)||((this.linkingRedirectUri!= null)&&this.linkingRedirectUri.equals(rhs.linkingRedirectUri)))&&((this.loginUri == rhs.loginUri)||((this.loginUri!= null)&&this.loginUri.equals(rhs.loginUri))))&&((this.libraryDomain == rhs.libraryDomain)||((this.libraryDomain!= null)&&this.libraryDomain.equals(rhs.libraryDomain))))&&((this.objectionUri == rhs.objectionUri)||((this.objectionUri!= null)&&this.objectionUri.equals(rhs.objectionUri))))&&((this.notificationUri == rhs.notificationUri)||((this.notificationUri!= null)&&this.notificationUri.equals(rhs.notificationUri))));
    }

}
