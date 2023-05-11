package it.eng.opsi.servicecatalog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class CatalogueDatasetNotEditableException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public CatalogueDatasetNotEditableException() {
        this("CatalogueDataset Model not found!");
    }

    public CatalogueDatasetNotEditableException(String message) {
        super(message);
    };

}
