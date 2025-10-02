package dev.gabrielequa.corsiiscrizioniapi.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import dev.gabrielequa.corsiiscrizioniapi.dto.CorsoDTO;
import dev.gabrielequa.corsiiscrizioniapi.model.Corso;

@Mapper(componentModel = "spring")
public interface CorsoMapper {
    
    CorsoDTO toDTO(Corso corso);
    
    List<CorsoDTO> toDTOList(List<Corso> corsi);
}
