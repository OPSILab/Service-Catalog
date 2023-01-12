package it.eng.opsi.servicecatalog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ConnectorNotEditableException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public ConnectorNotEditableException() {
        this("Connector Model not found!");
    }

    public ConnectorNotEditableException(String message) {
        super(message);
    };

}
