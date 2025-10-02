import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  PersonAdd,
  Email,
  Person,
  MenuBook,
  CheckCircle
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { iscrizioniApi, corsiApi } from '../services/api';
import type { Corso, CreateIscrizioneRequest } from '../types/types';

interface CreateEnrollmentPageProps {
  onSuccess?: () => void;
}

export default function CreateEnrollmentPage({ onSuccess }: CreateEnrollmentPageProps) {
  const [corsi, setCorsi] = useState<Corso[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateIscrizioneRequest>({
    corsoId: 0,
    partecipanteNome: '',
    partecipanteCognome: '',
    partecipanteEmail: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCorsi();
  }, []);

  const loadCorsi = async () => {
    try {
      const data = await corsiApi.getAll();
      // Filtra solo corsi con disponibilità > 0
      const availableCorsi = data.filter(c => c.disponibilita > 0);
      setCorsi(availableCorsi);
    } catch {
      toast.error('Errore nel caricamento dei corsi');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.corsoId || formData.corsoId === 0) {
      newErrors.corsoId = 'Seleziona un corso';
    }

    if (!formData.partecipanteNome.trim()) {
      newErrors.partecipanteNome = 'Il nome è obbligatorio';
    } else if (formData.partecipanteNome.length > 30) {
      newErrors.partecipanteNome = 'Il nome non può superare 30 caratteri';
    }

    if (!formData.partecipanteCognome.trim()) {
      newErrors.partecipanteCognome = 'Il cognome è obbligatorio';
    } else if (formData.partecipanteCognome.length > 30) {
      newErrors.partecipanteCognome = 'Il cognome non può superare 30 caratteri';
    }

    if (!formData.partecipanteEmail.trim()) {
      newErrors.partecipanteEmail = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.partecipanteEmail)) {
      newErrors.partecipanteEmail = "L'email non è valida";
    } else if (formData.partecipanteEmail.length > 50) {
      newErrors.partecipanteEmail = "L'email non può superare 50 caratteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Compila tutti i campi obbligatori correttamente');
      return;
    }

    try {
      setLoading(true);
      await iscrizioniApi.create(formData);
      
      toast.success('Iscrizione creata con successo! 🎉', {
        duration: 4000,
      });

      // Reset form
      setFormData({
        corsoId: 0,
        partecipanteNome: '',
        partecipanteCognome: '',
        partecipanteEmail: ''
      });
      setErrors({});

      // Ricarica i corsi per aggiornare la disponibilità
      await loadCorsi();

      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error) {
        const statusError = error as { status: number; message?: string };
        if (statusError.status === 400) {
          toast.error(statusError.message || 'Corso non disponibile o dati non validi');
        } else if (statusError.status === 404) {
          toast.error('Corso non trovato');
        } else {
          toast.error(statusError.message || 'Errore nella creazione dell\'iscrizione');
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Errore nella creazione dell\'iscrizione';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateIscrizioneRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const selectedCorso = corsi.find(c => c.corsoId === formData.corsoId);

  return (
    <Box>
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'primary.main' }}>
            <PersonAdd fontSize="large" />
            Crea Nuova Iscrizione
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Compila il modulo per iscrivere un partecipante a un corso
          </Typography>

          {corsi.length === 0 ? (
            <Box display="flex" flexDirection="column" alignItems="center" py={4}>
              <MenuBook sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Nessun corso disponibile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Al momento non ci sono corsi con posti disponibili
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <FormControl fullWidth error={Boolean(errors.corsoId)}>
                  <InputLabel>Corso *</InputLabel>
                  <Select
                    value={formData.corsoId || ''}
                    label="Corso *"
                    onChange={(e) => handleInputChange('corsoId', Number(e.target.value))}
                    disabled={loading}
                  >
                    <MenuItem value={0}>Seleziona un corso</MenuItem>
                    {corsi.map(corso => (
                      <MenuItem key={corso.corsoId} value={corso.corsoId}>
                        <Box>
                          <Typography variant="body2">
                            {corso.titolo}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {corso.disponibilita} {corso.disponibilita === 1 ? 'posto disponibile' : 'posti disponibili'}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.corsoId && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {errors.corsoId}
                    </Typography>
                  )}
                </FormControl>

                {selectedCorso && (
                  <Card variant="outlined" sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        📋 Dettagli Corso
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Data:</strong> {new Date(selectedCorso.dataOraInizio).toLocaleDateString('it-IT', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Luogo:</strong> {selectedCorso.luogo}
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                <TextField
                  fullWidth
                  label="Nome"
                  placeholder="Inserisci il nome"
                  value={formData.partecipanteNome}
                  onChange={(e) => handleInputChange('partecipanteNome', e.target.value)}
                  disabled={loading}
                  inputProps={{ maxLength: 30 }}
                  error={Boolean(errors.partecipanteNome)}
                  helperText={errors.partecipanteNome}
                  required
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />

                <TextField
                  fullWidth
                  label="Cognome"
                  placeholder="Inserisci il cognome"
                  value={formData.partecipanteCognome}
                  onChange={(e) => handleInputChange('partecipanteCognome', e.target.value)}
                  disabled={loading}
                  inputProps={{ maxLength: 30 }}
                  error={Boolean(errors.partecipanteCognome)}
                  helperText={errors.partecipanteCognome}
                  required
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />

                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="nome@example.com"
                  value={formData.partecipanteEmail}
                  onChange={(e) => handleInputChange('partecipanteEmail', e.target.value)}
                  disabled={loading}
                  inputProps={{ maxLength: 50 }}
                  error={Boolean(errors.partecipanteEmail)}
                  helperText={errors.partecipanteEmail}
                  required
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                  sx={{ py: 2, fontSize: '1.1rem' }}
                >
                  {loading ? 'Creazione in corso...' : 'Crea Iscrizione'}
                </Button>

                <Typography variant="body2" align="center" color="text.secondary">
                  <strong>Nota:</strong> La data e l'ora dell'iscrizione saranno generate automaticamente
                </Typography>
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}