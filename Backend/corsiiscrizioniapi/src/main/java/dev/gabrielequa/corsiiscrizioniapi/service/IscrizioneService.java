package dev.gabrielequa.corsiiscrizioniapi.service;



import java.util.List;

import dev.gabrielequa.corsiiscrizioniapi.dto.IscrizioneDTO;

public interface IscrizioneService {
    
    /**
     * Recupera tutte le iscrizioni
     * @param corsoId Filtro opzionale per corso
     * @param partecipanteEmail Filtro opzionale per email partecipante
     * @return Lista di iscrizioni
     */
    List<IscrizioneDTO> getAllIscrizioni(Long corsoId, String partecipanteEmail);
    
    /**
     * Crea una nuova iscrizione
     * @param request Dati dell'iscrizione
     * @return IscrizioneDTO creata
     */
    IscrizioneDTO createIscrizione(IscrizioneDTO request);
}

