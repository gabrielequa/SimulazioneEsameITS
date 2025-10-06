export interface CorsoDTO {
  corsoId: number
  titolo: string
  dataOraInizio: string // ISO
  luogo: string
  disponibilita: number
}

export interface IscrizioneDTO {
  iscrizioneId?: number
  corsoId: number
  partecipanteNome: string
  partecipanteCognome: string
  partecipanteEmail: string
  dataOraIscrizione?: string
}