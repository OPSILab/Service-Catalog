
package it.eng.opsi.servicecatalog.model;

import javax.validation.Valid;
import javax.validation.constraints.*;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.github.jsonldjava.shaded.com.google.common.base.Objects;

import it.eng.opsi.servicecatalog.repository.AdapterRepository;
import it.eng.opsi.servicecatalog.repository.ConnectorModelRepository;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "adapterId"
})
public class Adapter {

    @Autowired
    private AdapterRepository adapterRepo;

    @JsonProperty("adapterId")
    @Valid
    @NotNull
    private String adapterId;

    public Adapter() {
    }

    /**
     * 
     * @param name
     * @param description
     */
    public Adapter(String adapterId) {
        super();
        try {
            this.adapterId = adapterId;
            System.out.println(adapterRepo.findByadapterId(adapterId));
            if (adapterRepo.findByadapterId(adapterId).adapterId == adapterId)
                throw new Error("connectorId already exists");
        } catch (Error e) {
            System.out.println(e);
        }

    }

    public String getAdapterId() {
        return this.adapterId;
    }

    public void setAdapterId(String adapterId) {
        this.adapterId = adapterId;
    }

    public Adapter adapterId(String adapterId) {
        setAdapterId(adapterId);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Adapter)) {
            return false;
        }
        Adapter adapter = (Adapter) o;
        return Objects.equal(adapterRepo, adapter.adapterRepo) && Objects.equal(adapterId, adapter.adapterId);
    }

    /*
     * @Override
     * public int hashCode() {
     * return Objects.hash(adapterRepo, adapterId);
     * }
     */

    @Override
    public String toString() {
        return "{" +
                ", adapterId='" + getAdapterId() + "'" +
                "}";
    }
}
