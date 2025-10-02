package dev.gabrielequa.corsiiscrizioniapi.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.gabrielequa.corsiiscrizioniapi.dto.IscrizioneDTO;
import dev.gabrielequa.corsiiscrizioniapi.service.IscrizioneService;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@Tag(name = "Iscrizioni", description = "API per la gestione delle iscrizioni ai corsi")
public class IscrizioneController {
    
    private final IscrizioneService iscrizioneService;

    public IscrizioneController(IscrizioneService iscrizioneService) {
        this.iscrizioneService = iscrizioneService;
    }
    
    @GetMapping
    @Operation(
        summary = "Recupera tutte le iscrizioni",
        description = "Restituisce un elenco di tutte le iscrizioni effettuate, con possibilità di filtrare per corso e email partecipante"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista delle iscrizioni recuperata con successo",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = IscrizioneDTO.class)
            )
        )
    })
    public ResponseEntity<List<IscrizioneDTO>> getAllIscrizioni(
            @Parameter(description = "Filtro per ID del corso")
            @RequestParam(required = false) Long corsoId,
            
            @Parameter(description = "Filtro per email del partecipante")
            @RequestParam(required = false) String partecipanteEmail
    ) {
        List<IscrizioneDTO> iscrizioni = iscrizioneService.getAllIscrizioni(corsoId, partecipanteEmail);
        return ResponseEntity.ok(iscrizioni);
    }
    
    @PostMapping
    @Operation(
        summary = "Crea una nuova iscrizione",
        description = "Crea un'iscrizione ad un corso, riducendo automaticamente la disponibilità del corso"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Iscrizione creata con successo",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = IscrizioneDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dati non validi o corso non disponibile"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Corso non trovato"
        )
    })
    public ResponseEntity<IscrizioneDTO> createIscrizione(
            @Valid @RequestBody IscrizioneDTO request
    ) {
        IscrizioneDTO iscrizione = iscrizioneService.createIscrizione(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(iscrizione);
    }
}