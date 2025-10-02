package dev.gabrielequa.corsiiscrizioniapi.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "iscrizioni")
public class Iscrizione {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iscrizione_id")
    private Long iscrizioneId;
    
    @ManyToOne
    @JoinColumn(name = "corso_id", nullable = false)
    private Corso corso;
    
    @Column(name = "partecipante_nome", nullable = false, length = 30)
    private String partecipanteNome;
    
    @Column(name = "partecipante_cognome", nullable = false, length = 30)
    private String partecipanteCognome;
    
    @Column(name = "partecipante_email", nullable = false, length = 50)
    private String partecipanteEmail;
    
    @Column(name = "data_ora_iscrizione", nullable = false)
    private LocalDateTime dataOraIscrizione;


    public Iscrizione() {
    }

    public Iscrizione(Long iscrizioneId, Corso corso, String partecipanteNome, String partecipanteCognome, String partecipanteEmail, LocalDateTime dataOraIscrizione) {
        this.iscrizioneId = iscrizioneId;
        this.corso = corso;
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

    public Corso getCorso() {
        return this.corso;
    }

    public void setCorso(Corso corso) {
        this.corso = corso;
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
