package dev.gabrielequa.corsiiscrizioniapi.service;



import java.util.List;

import dev.gabrielequa.corsiiscrizioniapi.dto.IscrizioneDTO;

public interface IscrizioneService {
    
    /**
     * Recupera tutte le iscrizioni
     */
    List<IscrizioneDTO> getAllIscrizioni(Long corsoId, String partecipanteEmail);
    
    /**
     * Crea una nuova iscrizione
     */
    IscrizioneDTO createIscrizione(IscrizioneDTO request);
}

