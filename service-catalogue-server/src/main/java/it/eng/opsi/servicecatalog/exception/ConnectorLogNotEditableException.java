package it.eng.opsi.servicecatalog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ConnectorLogNotEditableException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public ConnectorLogNotEditableException() {
        this("Connector Log not found!");
    }

    public ConnectorLogNotEditableException(String message) {
        super(message);
    };

}
