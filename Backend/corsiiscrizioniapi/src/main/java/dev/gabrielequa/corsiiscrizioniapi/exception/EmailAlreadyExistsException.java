package dev.gabrielequa.corsiiscrizioniapi.exception;

/**
 * Eccezione lanciata quando un utente tenta di iscriversi a un corso
 * con un'email già utilizzata per lo stesso corso
 */
public class EmailAlreadyExistsException extends RuntimeException {
    
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
    
    public EmailAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}