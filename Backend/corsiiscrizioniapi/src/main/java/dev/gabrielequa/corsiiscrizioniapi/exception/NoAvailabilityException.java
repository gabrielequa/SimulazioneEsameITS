package dev.gabrielequa.corsiiscrizioniapi.exception;

/**
 * Eccezione lanciata quando non ci sono posti disponibili per un corso
 */
public class NoAvailabilityException extends RuntimeException {
    
    public NoAvailabilityException(String message) {
        super(message);
    }
    
    public NoAvailabilityException(String message, Throwable cause) {
        super(message, cause);
    }
}