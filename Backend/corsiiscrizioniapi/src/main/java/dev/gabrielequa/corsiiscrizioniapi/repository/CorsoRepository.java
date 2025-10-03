package dev.gabrielequa.corsiiscrizioniapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import dev.gabrielequa.corsiiscrizioniapi.model.Corso;

@Repository
public interface CorsoRepository extends JpaRepository<Corso, Long>, JpaSpecificationExecutor<Corso> {
    List<Corso> findByTitoloContainingIgnoreCase(String titolo);
    List<Corso> findByLuogoContainingIgnoreCase(String luogo);
    List<Corso> findByTitoloContainingAndLuogoContainingIgnoreCase(String titolo, String luogo);
}