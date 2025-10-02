package dev.gabrielequa.corsiiscrizioniapi.service;

import java.util.List;

import dev.gabrielequa.corsiiscrizioniapi.dto.CorsoDTO;

public interface CorsoService {
    
    /**
     * Recupera tutti i corsi disponibili
     * @param titolo Filtro opzionale per titolo
     * @param luogo Filtro opzionale per luogo
     * @return Lista di corsi
     */
    List<CorsoDTO> getAllCorsi(String titolo, String luogo);
    
    /**
     * Riduce la disponibilità di un corso
     * @param corsoId ID del corso
     */
    void riduciDisponibilita(Long corsoId);
}
