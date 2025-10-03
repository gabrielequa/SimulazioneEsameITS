package dev.gabrielequa.corsiiscrizioniapi.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.gabrielequa.corsiiscrizioniapi.dto.CorsoDTO;
import dev.gabrielequa.corsiiscrizioniapi.mapper.CorsoMapper;
import dev.gabrielequa.corsiiscrizioniapi.model.Corso;
import dev.gabrielequa.corsiiscrizioniapi.repository.CorsoRepository;
import dev.gabrielequa.corsiiscrizioniapi.service.CorsoService;
import dev.gabrielequa.corsiiscrizioniapi.exception.ResourceNotFoundException;
import dev.gabrielequa.corsiiscrizioniapi.exception.NoAvailabilityException;

import java.util.List;

@Service
public class CorsoServiceImpl implements CorsoService {
    
    private final CorsoRepository corsoRepository;
    private final CorsoMapper corsoMapper;
    
    public CorsoServiceImpl(CorsoRepository corsoRepository, CorsoMapper corsoMapper) {
        this.corsoRepository = corsoRepository;
        this.corsoMapper = corsoMapper;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CorsoDTO> getAllCorsi(String titolo, String luogo) {
        List<Corso> corsi;
        if (titolo != null && !titolo.isEmpty() && luogo != null && !luogo.isEmpty()) {
            corsi = corsoRepository.findByTitoloContainingAndLuogoContainingIgnoreCase(titolo, luogo);
        } else if (titolo != null && !titolo.isEmpty()) {
            corsi = corsoRepository.findByTitoloContainingIgnoreCase(titolo);
        } else if (luogo != null && !luogo.isEmpty()) {
            corsi = corsoRepository.findByLuogoContainingIgnoreCase(luogo);
        } else {
            corsi = corsoRepository.findAll();
        }
        return corsoMapper.toDTOList(corsi);
    }
    
    @Override
    @Transactional
    public void riduciDisponibilita(Long corsoId) {
        Corso corso = corsoRepository.findById(corsoId)
            .orElseThrow(() -> new ResourceNotFoundException("Corso non trovato con ID: " + corsoId));
        
        if (corso.getDisponibilita() <= 0) {
            throw new NoAvailabilityException("Non ci sono posti disponibili per il corso: " + corso.getTitolo());
        }
        
        corso.setDisponibilita(corso.getDisponibilita() - 1);
        corsoRepository.save(corso);
    }
}
