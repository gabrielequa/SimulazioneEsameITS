import React, { useState } from "react";
import type { CorsoDTO } from "../types/types";
import { api } from "../service/api";

export function CreateEnrollmentForm({
  corso,
  onClose,
  onSuccess,
  onError,
}: {
  corso: CorsoDTO;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  async function submit() {
    if (!nome || !cognome || !email) return onError("Completa tutti i campi");
    setSaving(true);
    try {
      await api.createIscrizione({
        corsoId: corso.corsoId,
        partecipanteNome: nome,
        partecipanteCognome: cognome,
        partecipanteEmail: email,
      });
      onSuccess();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      // Controlla se l'errore è relativo a email già in uso
      if (errorMessage.toLowerCase().includes('email') && 
          (errorMessage.toLowerCase().includes('already') || 
           errorMessage.toLowerCase().includes('exist') ||
           errorMessage.toLowerCase().includes('duplicate') ||
           errorMessage.toLowerCase().includes('unique') ||
           errorMessage.toLowerCase().includes('già') ||
           errorMessage.toLowerCase().includes('duplicat'))) {
        onError("Email già in uso per questo corso");
      } else {
        onError("Errore creazione iscrizione: " + errorMessage);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        Nuova iscrizione per: {corso.titolo}
      </div>
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <label className="small">Nome</label>
          <input
            className="input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="small">Cognome</label>
          <input
            className="input"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label className="small">Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn" onClick={submit} disabled={saving}>
          {saving ? "Salvataggio..." : "Salva"}
        </button>
        <button className="btn ghost" onClick={onClose}>
          Annulla
        </button>
      </div>
    </div>
  );
}
