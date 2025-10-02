import axios, { AxiosError } from 'axios';
import type { Corso, Iscrizione, CreateIscrizioneRequest, ErrorResponse } from '../types/types';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per gestione errori
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw new Error('Errore di connessione al server');
  }
);

// API Corsi
export const corsiApi = {
  getAll: async (params?: { titolo?: string; luogo?: string }): Promise<Corso[]> => {
    const response = await apiClient.get<Corso[]>('/courses', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Corso> => {
    const response = await apiClient.get<Corso>(`/courses/${id}`);
    return response.data;
  },
};

// API Iscrizioni
export const iscrizioniApi = {
  getAll: async (params?: { corsoId?: number; partecipanteEmail?: string }): Promise<Iscrizione[]> => {
    const response = await apiClient.get<Iscrizione[]>('/enrollments', { params });
    return response.data;
  },

  create: async (data: CreateIscrizioneRequest): Promise<Iscrizione> => {
    const response = await apiClient.post<Iscrizione>('/enrollments', data);
    return response.data;
  },
};

export default apiClient;