-- Inserimento corsi
INSERT INTO corsi (titolo, data_ora_inizio, luogo, disponibilita)
VALUES 
('Introduzione a Java', '2025-11-01 09:00:00', 'Aula Magna - Università Milano', 30),
('Spring Boot Avanzato', '2025-11-10 14:00:00', 'Laboratorio 3 - Università Roma', 25),
('Next.js per principianti', '2025-11-15 10:00:00', 'Sala Workshop - Torino', 20),
('Database PostgreSQL', '2025-11-20 09:30:00', 'Online (Zoom)', 50),
('Machine Learning Base', '2025-11-25 16:00:00', 'Sala 2 - Bologna', 15);

-- Inserimento iscrizioni di esempio
INSERT INTO iscrizioni (corso_id, partecipante_nome, partecipante_cognome, partecipante_email, data_ora_iscrizione)
VALUES
(1, 'Mario', 'Rossi', 'mario.rossi@email.com', NOW()),
(1, 'Luca', 'Bianchi', 'luca.bianchi@email.com', NOW()),
(2, 'Giulia', 'Verdi', 'giulia.verdi@email.com', NOW()),
(3, 'Alessia', 'Ferrari', 'alessia.ferrari@email.com', NOW());