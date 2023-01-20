
package it.eng.opsi.servicecatalog.model;

import java.util.Date;
import java.util.Objects;

import javax.validation.Valid;
import javax.validation.constraints.*;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import it.eng.opsi.servicecatalog.repository.AdapterRepository;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({

        "adapterId",
        "type",
        "message",
        "issued"
})
public class AdapterLog {

    @Autowired
    private AdapterRepository adapterModelRepo;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("type")
    @Valid
    @NotNull
    private String type;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("message")
    @Valid
    @NotNull
    private String message;

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("issued")
    @Valid
    @NotNull
    private Date issued;

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("adapterId")
    @Valid
    @NotNull
    private String adapterId;

    /**
     * No args constructor for use in serialization
     * 
     */
    public AdapterLog() {
    }

    /**
     * 
     * @param name
     * @param description
     */
    public AdapterLog(String adapterId, String type, String message, Date issued) {
        super();
        this.type = type;
        this.message = message;
        this.issued = issued;
        this.adapterId = adapterId;
    }

    /**
     * @return String return the adapterId
     */
    @JsonProperty("adapterId")
    public String getAdapterId() {
        return adapterId;
    }

    /**
     * @param adapterId the adapterId to set
     */
    @JsonProperty("adapterId")
    public void setAdapterId(String adapterId) {
        this.adapterId = adapterId;
    }

    public AdapterLog(AdapterRepository adapterModelRepo, String type, String message, Date issued,
            String adapterId) {
        this.adapterModelRepo = adapterModelRepo;
        this.type = type;
        this.message = message;
        this.issued = issued;
        this.adapterId = adapterId;
    }

    public AdapterLog adapterModelRepo(AdapterRepository adapterModelRepo) {
        setAdapterModelRepo(adapterModelRepo);
        return this;
    }

    public AdapterLog type(String type) {
        setType(type);
        return this;
    }

    public AdapterLog message(String message) {
        setMessage(message);
        return this;
    }

    public AdapterLog issued(Date issued) {
        setIssued(issued);
        return this;
    }

    public AdapterLog adapterId(String adapterId) {
        setAdapterId(adapterId);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof AdapterLog)) {
            return false;
        }
        AdapterLog adapterLog = (AdapterLog) o;
        return Objects.equals(adapterModelRepo, adapterLog.adapterModelRepo)
                && Objects.equals(type, adapterLog.type) && Objects.equals(message, adapterLog.message)
                && Objects.equals(issued, adapterLog.issued) && Objects.equals(adapterId, adapterLog.adapterId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(adapterModelRepo, type, message, issued, adapterId);
    }

    @Override
    public String toString() {
        return "{" +
                " adapterModelRepo='" + getAdapterModelRepo() + "'" +
                ", type='" + getType() + "'" +
                ", message='" + getMessage() + "'" +
                ", issued='" + getIssued() + "'" +
                ", adapterId='" + getAdapterId() + "'" +
                "}";
    }

    /**
     * @return AdapterRepository return the adapterModelRepo
     */
    public AdapterRepository getAdapterModelRepo() {
        return adapterModelRepo;
    }

    /**
     * @param adapterModelRepo the adapterModelRepo to set
     */
    public void setAdapterModelRepo(AdapterRepository adapterModelRepo) {
        this.adapterModelRepo = adapterModelRepo;
    }

    /**
     * @return String return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return String return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return Date return the issued
     */
    public Date getIssued() {
        return issued;
    }

    /**
     * @param issued the issued to set
     */
    public void setIssued(Date issued) {
        this.issued = issued;
    }

}
