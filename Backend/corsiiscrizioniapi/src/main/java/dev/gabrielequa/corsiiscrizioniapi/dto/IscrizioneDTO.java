package dev.gabrielequa.corsiiscrizioniapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Schema(description = "DTO per rappresentare un'iscrizione")
public class IscrizioneDTO {
    
    @Schema(description = "ID dell'iscrizione", example = "1")
    private Long iscrizioneId;
    
    @NotNull(message = "L'ID del corso è obbligatorio")
    @Schema(description = "ID del corso", example = "1")
    private Long corsoId;
    
    @Schema(description = "Titolo del corso", example = "Java Spring Boot Avanzato")
    private String titoloCorso;
    
    @NotBlank(message = "Il nome del partecipante è obbligatorio")
    @Schema(description = "Nome del partecipante", example = "Mario")
    private String partecipanteNome;
    
    @NotBlank(message = "Il cognome del partecipante è obbligatorio")
    @Schema(description = "Cognome del partecipante", example = "Rossi")
    private String partecipanteCognome;
    
    @NotBlank(message = "L'email del partecipante è obbligatoria")
    @Email(message = "L'email deve essere valida")
    @Schema(description = "Email del partecipante", example = "mario.rossi@example.com")
    private String partecipanteEmail;
    
    @Schema(description = "Data e ora dell'iscrizione", example = "2025-10-01T14:30:00")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataOraIscrizione;


    public IscrizioneDTO() {
    }


    public IscrizioneDTO(Long iscrizioneId, Long corsoId, String titoloCorso, String partecipanteNome, String partecipanteCognome, String partecipanteEmail, LocalDateTime dataOraIscrizione) {
        this.iscrizioneId = iscrizioneId;
        this.corsoId = corsoId;
        this.titoloCorso = titoloCorso;
        this.partecipanteNome = partecipanteNome;
        this.partecipanteCognome = partecipanteCognome;
        this.partecipanteEmail = partecipanteEmail;
        this.dataOraIscrizione = dataOraIscrizione;
    }


    public Long getIscrizioneId() {
        return this.iscrizioneId;
    }

    public void setIscrizioneId(Long iscrizioneId) {
        this.iscrizioneId = iscrizioneId;
    }

    public Long getCorsoId() {
        return this.corsoId;
    }

    public void setCorsoId(Long corsoId) {
        this.corsoId = corsoId;
    }

    public String getTitoloCorso() {
        return this.titoloCorso;
    }

    public void setTitoloCorso(String titoloCorso) {
        this.titoloCorso = titoloCorso;
    }

    public String getPartecipanteNome() {
        return this.partecipanteNome;
    }

    public void setPartecipanteNome(String partecipanteNome) {
        this.partecipanteNome = partecipanteNome;
    }

    public String getPartecipanteCognome() {
        return this.partecipanteCognome;
    }

    public void setPartecipanteCognome(String partecipanteCognome) {
        this.partecipanteCognome = partecipanteCognome;
    }

    public String getPartecipanteEmail() {
        return this.partecipanteEmail;
    }

    public void setPartecipanteEmail(String partecipanteEmail) {
        this.partecipanteEmail = partecipanteEmail;
    }

    public LocalDateTime getDataOraIscrizione() {
        return this.dataOraIscrizione;
    }

    public void setDataOraIscrizione(LocalDateTime dataOraIscrizione) {
        this.dataOraIscrizione = dataOraIscrizione;
    }

}
