package dev.gabrielequa.corsiiscrizioniapi.exception;

/**
 * Eccezione lanciata quando una risorsa richiesta non viene trovata
 */
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}