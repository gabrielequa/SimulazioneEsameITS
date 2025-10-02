export interface Corso {
  corsoId: number;
  titolo: string;
  dataOraInizio: string;
  luogo: string;
  disponibilita: number;
}

export interface Iscrizione {
  iscrizioneId: number;
  corsoId: number;
  titoloCorso: string;
  partecipanteNome: string;
  partecipanteCognome: string;
  partecipanteEmail: string;
  dataOraIscrizione: string;
}

export interface CreateIscrizioneRequest {
  corsoId: number;
  partecipanteNome: string;
  partecipanteCognome: string;
  partecipanteEmail: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: string[];
}