package it.eng.opsi.servicecatalog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class AdapterLogNotEditableException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public AdapterLogNotEditableException() {
        this("Adapter Log not found!");
    }

    public AdapterLogNotEditableException(String message) {
        super(message);
    };

}
