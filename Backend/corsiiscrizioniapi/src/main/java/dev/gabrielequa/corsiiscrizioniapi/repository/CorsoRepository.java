package dev.gabrielequa.corsiiscrizioniapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import dev.gabrielequa.corsiiscrizioniapi.model.Corso;

@Repository
public interface CorsoRepository extends JpaRepository<Corso, Long>, JpaSpecificationExecutor<Corso> {
}