package dev.gabrielequa.corsiiscrizioniapi.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.gabrielequa.corsiiscrizioniapi.dto.CorsoDTO;
import dev.gabrielequa.corsiiscrizioniapi.service.CorsoService;

import java.util.List;

@RestController
@RequestMapping("/courses")
@Tag(name = "Corsi", description = "API per la gestione dei corsi")
public class CorsoController {
    
    private final CorsoService corsoService;

    public CorsoController(CorsoService corsoService) {
        this.corsoService = corsoService;
    }
    
    @GetMapping
    @Operation(
        summary = "Recupera tutti i corsi",
        description = "Restituisce un elenco di tutti i corsi disponibili, con possibilità di filtrare per titolo e luogo"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista dei corsi recuperata con successo",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = CorsoDTO.class)
            )
        )
    })
    public ResponseEntity<List<CorsoDTO>> getAllCorsi(
            @Parameter(description = "Filtro per titolo del corso")
            @RequestParam(required = false) String titolo,
            
            @Parameter(description = "Filtro per luogo del corso")
            @RequestParam(required = false) String luogo
    ) {
        List<CorsoDTO> corsi = corsoService.getAllCorsi(titolo, luogo);
        return ResponseEntity.ok(corsi);
    }
}
