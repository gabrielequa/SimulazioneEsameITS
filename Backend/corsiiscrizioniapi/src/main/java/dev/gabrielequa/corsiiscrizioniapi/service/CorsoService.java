package dev.gabrielequa.corsiiscrizioniapi.service;

import java.util.List;

import dev.gabrielequa.corsiiscrizioniapi.dto.CorsoDTO;

public interface CorsoService {
    
    /**
     * Recupera tutti i corsi disponibili
     */
    List<CorsoDTO> getAllCorsi(String titolo, String luogo);
    
    /**
     * Riduce la disponibilità di un corso
     */
    void riduciDisponibilita(Long corsoId);
}
