package it.eng.opsi.servicecatalog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class AdapterNotEditableException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public AdapterNotEditableException() {
        this("Adapter Model not found!");
    }

    public AdapterNotEditableException(String message) {
        super(message);
    };

}
