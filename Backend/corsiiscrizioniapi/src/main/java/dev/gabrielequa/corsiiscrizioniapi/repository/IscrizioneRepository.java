package dev.gabrielequa.corsiiscrizioniapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import dev.gabrielequa.corsiiscrizioniapi.model.Iscrizione;

import java.util.List;

@Repository
public interface IscrizioneRepository extends JpaRepository<Iscrizione, Long>, JpaSpecificationExecutor<Iscrizione> {
    
    List<Iscrizione> findByCorso_CorsoId(Long corsoId);
}
