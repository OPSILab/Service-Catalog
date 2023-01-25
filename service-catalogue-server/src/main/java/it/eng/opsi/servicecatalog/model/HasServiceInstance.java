
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
    "endpointConnector",
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
    @JsonProperty("endpointConnector")
    @Valid
    private EndpointConnector endpointConnector;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataset")
    @Valid
    @NotNull
    private List<Dataset> dataset = new ArrayList<Dataset>();
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
     * @param serviceUrls
     * @param serviceProvider
     * @param dataController
     * @param endpointConnector
     * @param dataset
     */
    public HasServiceInstance(ServiceProvider serviceProvider, EndpointConnector endpointConnector, List<Dataset> dataset, ServiceUrls serviceUrls, DataController dataController) {
        super();
        this.serviceProvider = serviceProvider;
        this.endpointConnector = endpointConnector;
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

    @JsonProperty("endpointConnector")
    public EndpointConnector getEndpointConnector() {
        return endpointConnector;
    }

    @JsonProperty("endpointConnector")
    public void setEndpointConnector(EndpointConnector endpointConnector) {
        this.endpointConnector = endpointConnector;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataset")
    public List<Dataset> getDataset() {
        return dataset;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("dataset")
    public void setDataset(List<Dataset> dataset) {
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
        sb.append("endpointConnector");
        sb.append('=');
        sb.append(((this.endpointConnector == null)?"<null>":this.endpointConnector));
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
        result = ((result* 31)+((this.serviceProvider == null)? 0 :this.serviceProvider.hashCode()));
        result = ((result* 31)+((this.dataController == null)? 0 :this.dataController.hashCode()));
        result = ((result* 31)+((this.endpointConnector == null)? 0 :this.endpointConnector.hashCode()));
        result = ((result* 31)+((this.dataset == null)? 0 :this.dataset.hashCode()));
        result = ((result* 31)+((this.serviceUrls == null)? 0 :this.serviceUrls.hashCode()));
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
        return ((((((this.serviceProvider == rhs.serviceProvider)||((this.serviceProvider!= null)&&this.serviceProvider.equals(rhs.serviceProvider)))&&((this.dataController == rhs.dataController)||((this.dataController!= null)&&this.dataController.equals(rhs.dataController))))&&((this.endpointConnector == rhs.endpointConnector)||((this.endpointConnector!= null)&&this.endpointConnector.equals(rhs.endpointConnector))))&&((this.dataset == rhs.dataset)||((this.dataset!= null)&&this.dataset.equals(rhs.dataset))))&&((this.serviceUrls == rhs.serviceUrls)||((this.serviceUrls!= null)&&this.serviceUrls.equals(rhs.serviceUrls))));
    }

}
