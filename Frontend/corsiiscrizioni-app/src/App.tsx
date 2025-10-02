// src/App.tsx

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Tabs, 
  Tab, 
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper
} from '@mui/material';
import { Home, MenuBook, PersonAdd } from '@mui/icons-material';
import HomePage from './pages/HomePage';
import EnrollmentsPage from './pages/EnrollmentPage';
import CreateEnrollmentPage from './pages/CreateEnrollmentsPage';

// Tema personalizzato
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedCorsoId, setSelectedCorsoId] = useState<number | undefined>();

  const handleViewEnrollments = (corsoId?: number) => {
    setSelectedCorsoId(corsoId);
    setTabValue(1);
  };

  const handleClearFilter = () => {
    setSelectedCorsoId(undefined);
  };

  const handleEnrollmentSuccess = () => {
    setTabValue(1);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setSelectedCorsoId(undefined);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 4000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              🎓 Sistema di Gestione Corsi e Iscrizioni
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Paper elevation={1} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" color="text.secondary" align="center">
              Gestisci corsi, visualizza e crea iscrizioni in modo semplice ed efficiente
            </Typography>
          </Paper>

          <Paper elevation={2}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab 
                icon={<Home />} 
                label="Corsi" 
                iconPosition="start"
                {...a11yProps(0)} 
              />
              <Tab 
                icon={<MenuBook />} 
                label="Iscrizioni" 
                iconPosition="start"
                {...a11yProps(1)} 
              />
              <Tab 
                icon={<PersonAdd />} 
                label="Nuova Iscrizione" 
                iconPosition="start"
                {...a11yProps(2)} 
              />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <HomePage onViewEnrollments={handleViewEnrollments} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <EnrollmentsPage
                selectedCorsoId={selectedCorsoId}
                onClearFilter={handleClearFilter}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <CreateEnrollmentPage onSuccess={handleEnrollmentSuccess} />
            </TabPanel>
          </Paper>
        </Container>

        <Box component="footer" sx={{ mt: 5, py: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">
            © 2025 Sistema di Gestione Corsi - Realizzato con React + TypeScript + Material-UI
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;