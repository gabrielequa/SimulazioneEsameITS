package dev.gabrielequa.corsiiscrizioniapi.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import dev.gabrielequa.corsiiscrizioniapi.dto.IscrizioneDTO;
import dev.gabrielequa.corsiiscrizioniapi.model.Iscrizione;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IscrizioneMapper {
    
    @Mapping(source = "corso.corsoId", target = "corsoId")
    @Mapping(source = "corso.titolo", target = "titoloCorso")
    IscrizioneDTO toDTO(Iscrizione iscrizione);

    
    List<IscrizioneDTO> toDTOList(List<Iscrizione> iscrizioni);
}
