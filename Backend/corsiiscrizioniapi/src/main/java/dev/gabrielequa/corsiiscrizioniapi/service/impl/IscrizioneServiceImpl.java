package dev.gabrielequa.corsiiscrizioniapi.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.gabrielequa.corsiiscrizioniapi.dto.IscrizioneDTO;
import dev.gabrielequa.corsiiscrizioniapi.mapper.IscrizioneMapper;
import dev.gabrielequa.corsiiscrizioniapi.model.Corso;
import dev.gabrielequa.corsiiscrizioniapi.model.Iscrizione;
import dev.gabrielequa.corsiiscrizioniapi.repository.CorsoRepository;
import dev.gabrielequa.corsiiscrizioniapi.repository.IscrizioneRepository;
import dev.gabrielequa.corsiiscrizioniapi.service.CorsoService;
import dev.gabrielequa.corsiiscrizioniapi.service.IscrizioneService;
import dev.gabrielequa.corsiiscrizioniapi.exception.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IscrizioneServiceImpl implements IscrizioneService {
    
    private final IscrizioneRepository iscrizioneRepository;
    private final CorsoRepository corsoRepository;
    private final IscrizioneMapper iscrizioneMapper;
    private final CorsoService corsoService;

    public IscrizioneServiceImpl(IscrizioneRepository iscrizioneRepository, CorsoRepository corsoRepository, 
                                IscrizioneMapper iscrizioneMapper, CorsoService corsoService) {
        this.iscrizioneRepository = iscrizioneRepository;
        this.corsoRepository = corsoRepository;
        this.iscrizioneMapper = iscrizioneMapper;
        this.corsoService = corsoService;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<IscrizioneDTO> getAllIscrizioni(Long corsoId, String partecipanteEmail) {
        List<Iscrizione> iscrizioni;
        if (corsoId != null && partecipanteEmail != null && !partecipanteEmail.isEmpty()) {
            iscrizioni = iscrizioneRepository.findByCorso_CorsoIdAndPartecipanteEmailContainingIgnoreCase(corsoId, partecipanteEmail);
        } else if (corsoId != null) {
            iscrizioni = iscrizioneRepository.findByCorso_CorsoId(corsoId);
        } else if (partecipanteEmail != null && !partecipanteEmail.isEmpty()) {
            iscrizioni = iscrizioneRepository.findByPartecipanteEmailContainingIgnoreCase(partecipanteEmail);
        } else {
            iscrizioni = iscrizioneRepository.findAll();
        }
        return iscrizioneMapper.toDTOList(iscrizioni);
    }
    
    @Override
    @Transactional
    public IscrizioneDTO createIscrizione(IscrizioneDTO request) {
        // Verifica esistenza corso e disponibilità
        Corso corso = corsoRepository.findById(request.getCorsoId())
            .orElseThrow(() -> new ResourceNotFoundException("Corso non trovato con ID: " + request.getCorsoId()));
        
        // Riduce la disponibilità del corso
        corsoService.riduciDisponibilita(request.getCorsoId());
        
        // Crea l'iscrizione
        Iscrizione iscrizione = new Iscrizione();
        iscrizione.setCorso(corso);
        iscrizione.setPartecipanteNome(request.getPartecipanteNome());
        iscrizione.setPartecipanteCognome(request.getPartecipanteCognome());
        iscrizione.setPartecipanteEmail(request.getPartecipanteEmail());
        iscrizione.setDataOraIscrizione(LocalDateTime.now());
        
        Iscrizione savedIscrizione = iscrizioneRepository.save(iscrizione);
        return iscrizioneMapper.toDTO(savedIscrizione);
    }
}
