// src/pages/EnrollmentsPage.tsx

import { useEffect, useState, useCallback } from 'react';
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
  InputLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Search,
  Refresh,
  Email,
  Person,
  MenuBook,
  Clear,
  FilterList
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { iscrizioniApi, corsiApi } from '../services/api';
import type { Iscrizione, Corso } from '../types/types';

interface EnrollmentsPageProps {
  selectedCorsoId?: number;
  onClearFilter?: () => void;
}

export default function EnrollmentsPage({ selectedCorsoId, onClearFilter }: EnrollmentsPageProps) {
  const [iscrizioni, setIscrizioni] = useState<Iscrizione[]>([]);
  const [corsi, setCorsi] = useState<Corso[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    corsoId: selectedCorsoId || undefined as number | undefined,
    partecipanteEmail: ''
  });
  const [searchFilters, setSearchFilters] = useState({
    corsoId: selectedCorsoId || undefined as number | undefined,
    partecipanteEmail: ''
  });

  useEffect(() => {
    loadCorsi();
  }, []);

  useEffect(() => {
    if (selectedCorsoId) {
      setFilters(prev => ({ ...prev, corsoId: selectedCorsoId }));
      setSearchFilters(prev => ({ ...prev, corsoId: selectedCorsoId }));
    }
  }, [selectedCorsoId]);

  const loadCorsi = async () => {
    try {
      const data = await corsiApi.getAll();
      setCorsi(data);
    } catch {
      toast.error('Errore nel caricamento dei corsi');
    }
  };

  const loadIscrizioni = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, unknown> = {};
      if (searchFilters.corsoId) params.corsoId = searchFilters.corsoId;
      if (searchFilters.partecipanteEmail) params.partecipanteEmail = searchFilters.partecipanteEmail;

      const data = await iscrizioniApi.getAll(params);
      setIscrizioni(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Errore nel caricamento delle iscrizioni';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [searchFilters.corsoId, searchFilters.partecipanteEmail]);

  useEffect(() => {
    loadIscrizioni();
  }, [loadIscrizioni]);

  const handleSearch = () => {
    setSearchFilters({ ...filters });
  };

  const handleReset = () => {
    const resetFilters = { corsoId: undefined, partecipanteEmail: '' };
    setFilters(resetFilters);
    setSearchFilters(resetFilters);
    if (onClearFilter) onClearFilter();
  };

  const selectedCorso = corsi.find(c => c.corsoId === filters.corsoId);

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
            <FilterList color="primary" />
            Filtra Iscrizioni
          </Typography>
          
          {selectedCorsoId && (
            <Box sx={{ 
              bgcolor: 'primary.light', 
              p: 2, 
              borderRadius: 1, 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography variant="body2">
                <strong>Filtro attivo:</strong> {selectedCorso?.titolo || `Corso ID ${selectedCorsoId}`}
              </Typography>
              <IconButton
                size="small"
                onClick={handleReset}
                sx={{ ml: 1 }}
              >
                <Clear />
              </IconButton>
            </Box>
          )}

          <Box display="flex" flexWrap="wrap" gap={2} sx={{ mb: 2 }}>
            <Box flex="1" minWidth="250px">
              <FormControl fullWidth>
                <InputLabel>Corso</InputLabel>
                <Select
                  value={filters.corsoId || ''}
                  label="Corso"
                  onChange={(e) => setFilters({ ...filters, corsoId: e.target.value ? Number(e.target.value) : undefined })}
                >
                  <MenuItem value="">Tutti i corsi</MenuItem>
                  {corsi.map(corso => (
                    <MenuItem key={corso.corsoId} value={corso.corsoId}>
                      {corso.titolo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box flex="1" minWidth="250px">
              <TextField
                fullWidth
                label="Email Partecipante"
                placeholder="email@example.com"
                type="email"
                value={filters.partecipanteEmail}
                onChange={(e) => setFilters({ ...filters, partecipanteEmail: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
        {iscrizioni.length} {iscrizioni.length === 1 ? 'iscrizione trovata' : 'iscrizioni trovate'}
      </Typography>

      {iscrizioni.length === 0 ? (
        <Card elevation={1}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" py={4}>
              <MenuBook sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Nessuna iscrizione trovata
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Non ci sono iscrizioni che corrispondono ai criteri di ricerca
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Corso</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Cognome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Data Iscrizione</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {iscrizioni.map((iscrizione) => (
                  <TableRow key={iscrizione.iscrizioneId}>
                    <TableCell>#{iscrizione.iscrizioneId}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <MenuBook fontSize="small" color="primary" />
                        <Typography variant="body2" fontWeight="bold">
                          {iscrizione.titoloCorso}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Person fontSize="small" color="action" />
                        {iscrizione.partecipanteNome}
                      </Box>
                    </TableCell>
                    <TableCell>{iscrizione.partecipanteCognome}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Email fontSize="small" color="action" />
                        {iscrizione.partecipanteEmail}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(iscrizione.dataOraIscrizione).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
}