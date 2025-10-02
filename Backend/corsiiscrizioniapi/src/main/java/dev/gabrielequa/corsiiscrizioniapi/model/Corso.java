package dev.gabrielequa.corsiiscrizioniapi.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "corsi")
public class Corso {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corso_id")
    private Long corsoId;
    
    @Column(name = "titolo", nullable = false, length = 50)
    private String titolo;
    
    @Column(name = "data_ora_inizio", nullable = false)
    private LocalDateTime dataOraInizio;
    
    @Column(name = "luogo", nullable = false, length = 100)
    private String luogo;
    
    @Column(name = "disponibilita", nullable = false)
    private Integer disponibilita;
    
    @OneToMany(mappedBy = "corso", cascade = CascadeType.ALL)
    private List<Iscrizione> iscrizioni;


    public Corso() {
    }
    

    public Corso(Long corsoId, String titolo, LocalDateTime dataOraInizio, String luogo, Integer disponibilita, List<Iscrizione> iscrizioni) {
        this.corsoId = corsoId;
        this.titolo = titolo;
        this.dataOraInizio = dataOraInizio;
        this.luogo = luogo;
        this.disponibilita = disponibilita;
        this.iscrizioni = iscrizioni;
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

    public List<Iscrizione> getIscrizioni() {
        return this.iscrizioni;
    }

    public void setIscrizioni(List<Iscrizione> iscrizioni) {
        this.iscrizioni = iscrizioni;
    }


}
