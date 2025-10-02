-- Creazione del database
CREATE DATABASE dbsimulazione

-- Creazione tabella corsi
CREATE TABLE corsi (
    corso_id SERIAL PRIMARY KEY,
    titolo VARCHAR(50) NOT NULL,
    data_ora_inizio TIMESTAMP NOT NULL,
    luogo VARCHAR(100) NOT NULL,
    disponibilita INT NOT NULL
);

-- Creazione tabella iscrizioni
CREATE TABLE iscrizioni (
    iscrizione_id SERIAL PRIMARY KEY,
    corso_id INT NOT NULL,
    partecipante_nome VARCHAR(30) NOT NULL,
    partecipante_cognome VARCHAR(30) NOT NULL,
    partecipante_email VARCHAR(50) NOT NULL,
    data_ora_iscrizione TIMESTAMP NOT NULL,
    CONSTRAINT fk_corso
        FOREIGN KEY (corso_id) REFERENCES corsi(corso_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
