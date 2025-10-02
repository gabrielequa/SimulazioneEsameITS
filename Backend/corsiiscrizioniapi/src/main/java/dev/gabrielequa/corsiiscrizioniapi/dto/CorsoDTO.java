package dev.gabrielequa.corsiiscrizioniapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "DTO per rappresentare un corso")
public class CorsoDTO {
    
    @Schema(description = "ID del corso", example = "1")
    private Long corsoId;
    
    @Schema(description = "Titolo del corso", example = "Java Spring Boot Avanzato")
    private String titolo;
    
    @Schema(description = "Data e ora di inizio del corso", example = "2025-11-15T10:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataOraInizio;
    
    @Schema(description = "Luogo dove si terrà il corso", example = "Aula Magna, Via Roma 123")
    private String luogo;
    
    @Schema(description = "Numero di posti disponibili", example = "25")
    private Integer disponibilita;


    public CorsoDTO() {
    }

    public CorsoDTO(Long corsoId, String titolo, LocalDateTime dataOraInizio, String luogo, Integer disponibilita) {
        this.corsoId = corsoId;
        this.titolo = titolo;
        this.dataOraInizio = dataOraInizio;
        this.luogo = luogo;
        this.disponibilita = disponibilita;
    }

    public Long getCorsoId() {
        return this.corsoId;
    }

    public void setCorsoId(Long corsoId) {
        this.corsoId = corsoId;
    }

    public String getTitolo() {
        return this.titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public LocalDateTime getDataOraInizio() {
        return this.dataOraInizio;
    }

    public void setDataOraInizio(LocalDateTime dataOraInizio) {
        this.dataOraInizio = dataOraInizio;
    }

    public String getLuogo() {
        return this.luogo;
    }

    public void setLuogo(String luogo) {
        this.luogo = luogo;
    }

    public Integer getDisponibilita() {
        return this.disponibilita;
    }

    public void setDisponibilita(Integer disponibilita) {
        this.disponibilita = disponibilita;
    }

}
