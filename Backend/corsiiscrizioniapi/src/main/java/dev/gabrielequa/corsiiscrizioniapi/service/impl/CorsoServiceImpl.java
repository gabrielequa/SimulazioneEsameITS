package dev.gabrielequa.corsiiscrizioniapi.service.impl;


import org.springframework.data.jpa.domain.Specification;
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
        Specification<Corso> spec = (root, query, cb) -> cb.conjunction();
        
        if (titolo != null && !titolo.isBlank()) {
            spec = spec.and((root, query, cb) -> 
                cb.like(cb.lower(root.get("titolo")), "%" + titolo.toLowerCase() + "%"));
        }
        
        if (luogo != null && !luogo.isBlank()) {
            spec = spec.and((root, query, cb) -> 
                cb.like(cb.lower(root.get("luogo")), "%" + luogo.toLowerCase() + "%"));
        }
        
        List<Corso> corsi = corsoRepository.findAll(spec);
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
