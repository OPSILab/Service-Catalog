
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
import it.eng.opsi.servicecatalog.repository.ConnectorModelRepository;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({

        "connectorId",
        "type",
        "message",
        "issued"
})
public class ConnectorLog {

    @Autowired
    private ConnectorModelRepository connectorModelRepo;
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

    @JsonProperty("issued")
    @Valid
    @NotNull
    private Date issued;

    @JsonProperty("connectorId")
    @Valid
    @NotNull
    private String connectorId;

    /**
     * No args constructor for use in serialization
     * 
     */
    public ConnectorLog() {
    }

    /**
     * 
     * @param name
     * @param description
     */
    public ConnectorLog(String connectorId, String type, String message, Date issued) {
        super();
        this.type = type;
        this.message = message;
        this.issued = issued;
        this.connectorId = connectorId;
    }

    /**
     * @return String return the connectorId
     */
    @JsonProperty("connectorId")
    public String getConnectorId() {
        return connectorId;
    }

    /**
     * @param connectorId the connectorId to set
     */
    @JsonProperty("connectorId")
    public void setConnectorId(String connectorId) {
        this.connectorId = connectorId;
    }

    public ConnectorLog(ConnectorModelRepository connectorModelRepo, String type, String message, Date issued,
            String connectorId) {
        this.connectorModelRepo = connectorModelRepo;
        this.type = type;
        this.message = message;
        this.issued = issued;
        this.connectorId = connectorId;
    }

    public ConnectorLog connectorModelRepo(ConnectorModelRepository connectorModelRepo) {
        setConnectorModelRepo(connectorModelRepo);
        return this;
    }

    public ConnectorLog type(String type) {
        setType(type);
        return this;
    }

    public ConnectorLog message(String message) {
        setMessage(message);
        return this;
    }

    public ConnectorLog issued(Date issued) {
        setIssued(issued);
        return this;
    }

    public ConnectorLog connectorId(String connectorId) {
        setConnectorId(connectorId);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ConnectorLog)) {
            return false;
        }
        ConnectorLog connectorLog = (ConnectorLog) o;
        return Objects.equals(connectorModelRepo, connectorLog.connectorModelRepo)
                && Objects.equals(type, connectorLog.type) && Objects.equals(message, connectorLog.message)
                && Objects.equals(issued, connectorLog.issued) && Objects.equals(connectorId, connectorLog.connectorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(connectorModelRepo, type, message, issued, connectorId);
    }

    @Override
    public String toString() {
        return "{" +
                " connectorModelRepo='" + getConnectorModelRepo() + "'" +
                ", type='" + getType() + "'" +
                ", message='" + getMessage() + "'" +
                ", issued='" + getIssued() + "'" +
                ", connectorId='" + getConnectorId() + "'" +
                "}";
    }

    /**
     * @return ConnectorModelRepository return the connectorModelRepo
     */
    public ConnectorModelRepository getConnectorModelRepo() {
        return connectorModelRepo;
    }

    /**
     * @param connectorModelRepo the connectorModelRepo to set
     */
    public void setConnectorModelRepo(ConnectorModelRepository connectorModelRepo) {
        this.connectorModelRepo = connectorModelRepo;
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
