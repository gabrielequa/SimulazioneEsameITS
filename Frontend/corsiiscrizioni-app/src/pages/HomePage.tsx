// src/pages/HomePage.tsx

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  Search,
  Refresh,
  Event,
  LocationOn,
  People,
  SearchOff
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { corsiApi } from '../services/api';
import type { Corso } from '../types/types';

interface HomePageProps {
  onViewEnrollments: (corsoId?: number) => void;
}

export default function HomePage({ onViewEnrollments }: HomePageProps) {
  const [corsi, setCorsi] = useState<Corso[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    titolo: '',
    luogo: ''
  });

  useEffect(() => {
    loadCorsi();
  }, []);

  const loadCorsi = async () => {
    try {
      setLoading(true);
      const data = await corsiApi.getAll();
      setCorsi(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Errore nel caricamento dei corsi';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (filters.titolo) params.titolo = filters.titolo;
      if (filters.luogo) params.luogo = filters.luogo;
      
      const data = await corsiApi.getAll(params);
      setCorsi(data);
      
      if (data.length === 0) {
        toast('Nessun corso trovato con i filtri selezionati', { icon: '🔍' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Errore nella ricerca';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({ titolo: '', luogo: '' });
    loadCorsi();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvailabilityColor = (disponibilita: number): "success" | "warning" | "error" => {
    if (disponibilita > 15) return 'success';
    if (disponibilita > 5) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Search color="primary" />
            Cerca Corsi
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={2} sx={{ mb: 2 }}>
            <Box flex="1" minWidth="250px">
              <TextField
                fullWidth
                label="Titolo Corso"
                placeholder="Es. Java, Python..."
                value={filters.titolo}
                onChange={(e) => setFilters({ ...filters, titolo: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                variant="outlined"
              />
            </Box>
            <Box flex="1" minWidth="250px">
              <TextField
                fullWidth
                label="Luogo"
                placeholder="Es. Milano, Roma..."
                value={filters.luogo}
                onChange={(e) => setFilters({ ...filters, luogo: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                variant="outlined"
              />
            </Box>
          </Box>
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              disabled={loading}
            >
              Cerca
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleReset}
              disabled={loading}
            >
              Resetta Filtri
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
        {corsi.length} {corsi.length === 1 ? 'corso trovato' : 'corsi trovati'}
      </Typography>

      {corsi.length === 0 ? (
        <Card elevation={1}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" py={4}>
              <SearchOff sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Nessun corso disponibile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Non ci sono corsi che corrispondono ai criteri di ricerca
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {corsi.map((corso) => (
            <Box key={corso.corsoId} minWidth="350px" flex="1" maxWidth="400px">
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h3" sx={{ flexGrow: 1, mr: 1 }}>
                      {corso.titolo}
                    </Typography>
                    <Chip
                      label={`${corso.disponibilita} ${corso.disponibilita === 1 ? 'posto' : 'posti'}`}
                      color={getAvailabilityColor(corso.disponibilita)}
                      size="small"
                    />
                  </Box>

                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Event fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(corso.dataOraInizio)}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {corso.luogo}
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    variant="contained"
                    startIcon={<People />}
                    onClick={() => onViewEnrollments(corso.corsoId)}
                    fullWidth
                    sx={{ mt: 'auto' }}
                  >
                    Visualizza Iscrizioni
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}