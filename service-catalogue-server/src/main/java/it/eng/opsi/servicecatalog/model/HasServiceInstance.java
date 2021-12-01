
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
    "serviceProvider",
    "cert",
    "connector",
    "dataset",
    "serviceUrls",
    "dataController"
})
public class HasServiceInstance {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceProvider")
    @Valid
    @NotNull
    private ServiceProvider serviceProvider;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("cert")
    @Valid
    @NotNull
    private Cert cert;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connector")
    @Valid
    @NotNull
    private Connector connector;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataset")
    @Valid
    @NotNull
    private List<Object> dataset = new ArrayList<Object>();
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceUrls")
    @Valid
    @NotNull
    private ServiceUrls serviceUrls;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataController")
    @Valid
    @NotNull
    private DataController dataController;

    /**
     * No args constructor for use in serialization
     * 
     */
    public HasServiceInstance() {
    }

    /**
     * 
     * @param connector
     * @param serviceUrls
     * @param serviceProvider
     * @param dataController
     * @param cert
     * @param dataset
     */
    public HasServiceInstance(ServiceProvider serviceProvider, Cert cert, Connector connector, List<Object> dataset, ServiceUrls serviceUrls, DataController dataController) {
        super();
        this.serviceProvider = serviceProvider;
        this.cert = cert;
        this.connector = connector;
        this.dataset = dataset;
        this.serviceUrls = serviceUrls;
        this.dataController = dataController;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceProvider")
    public ServiceProvider getServiceProvider() {
        return serviceProvider;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceProvider")
    public void setServiceProvider(ServiceProvider serviceProvider) {
        this.serviceProvider = serviceProvider;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("cert")
    public Cert getCert() {
        return cert;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("cert")
    public void setCert(Cert cert) {
        this.cert = cert;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connector")
    public Connector getConnector() {
        return connector;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("connector")
    public void setConnector(Connector connector) {
        this.connector = connector;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataset")
    public List<Object> getDataset() {
        return dataset;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataset")
    public void setDataset(List<Object> dataset) {
        this.dataset = dataset;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceUrls")
    public ServiceUrls getServiceUrls() {
        return serviceUrls;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("serviceUrls")
    public void setServiceUrls(ServiceUrls serviceUrls) {
        this.serviceUrls = serviceUrls;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataController")
    public DataController getDataController() {
        return dataController;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataController")
    public void setDataController(DataController dataController) {
        this.dataController = dataController;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(HasServiceInstance.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this))).append('[');
        sb.append("serviceProvider");
        sb.append('=');
        sb.append(((this.serviceProvider == null)?"<null>":this.serviceProvider));
        sb.append(',');
        sb.append("cert");
        sb.append('=');
        sb.append(((this.cert == null)?"<null>":this.cert));
        sb.append(',');
        sb.append("connector");
        sb.append('=');
        sb.append(((this.connector == null)?"<null>":this.connector));
        sb.append(',');
        sb.append("dataset");
        sb.append('=');
        sb.append(((this.dataset == null)?"<null>":this.dataset));
        sb.append(',');
        sb.append("serviceUrls");
        sb.append('=');
        sb.append(((this.serviceUrls == null)?"<null>":this.serviceUrls));
        sb.append(',');
        sb.append("dataController");
        sb.append('=');
        sb.append(((this.dataController == null)?"<null>":this.dataController));
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
        result = ((result* 31)+((this.connector == null)? 0 :this.connector.hashCode()));
        result = ((result* 31)+((this.serviceUrls == null)? 0 :this.serviceUrls.hashCode()));
        result = ((result* 31)+((this.serviceProvider == null)? 0 :this.serviceProvider.hashCode()));
        result = ((result* 31)+((this.dataController == null)? 0 :this.dataController.hashCode()));
        result = ((result* 31)+((this.cert == null)? 0 :this.cert.hashCode()));
        result = ((result* 31)+((this.dataset == null)? 0 :this.dataset.hashCode()));
        return result;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof HasServiceInstance) == false) {
            return false;
        }
        HasServiceInstance rhs = ((HasServiceInstance) other);
        return (((((((this.connector == rhs.connector)||((this.connector!= null)&&this.connector.equals(rhs.connector)))&&((this.serviceUrls == rhs.serviceUrls)||((this.serviceUrls!= null)&&this.serviceUrls.equals(rhs.serviceUrls))))&&((this.serviceProvider == rhs.serviceProvider)||((this.serviceProvider!= null)&&this.serviceProvider.equals(rhs.serviceProvider))))&&((this.dataController == rhs.dataController)||((this.dataController!= null)&&this.dataController.equals(rhs.dataController))))&&((this.cert == rhs.cert)||((this.cert!= null)&&this.cert.equals(rhs.cert))))&&((this.dataset == rhs.dataset)||((this.dataset!= null)&&this.dataset.equals(rhs.dataset))));
    }

}
