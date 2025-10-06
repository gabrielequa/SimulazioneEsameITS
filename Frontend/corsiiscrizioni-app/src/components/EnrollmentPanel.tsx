import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/format";
import type { CorsoDTO } from "../types/types";
import { api } from "../service/api";

export function EnrollmentPanel({
  corso,
  onClose,
  onToast,
  onOpenEnrollmentModal,
  onResetSearch,
}: {
  corso: CorsoDTO | null;
  onClose: () => void;
  onToast: (msg: string) => void;
  onOpenEnrollmentModal: (corso: CorsoDTO) => void;
  onResetSearch?: () => void;
}) {
  const [iscrizioni, setIscrizioni] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [emailFilter, setEmailFilter] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await api.fetchIscrizioni(
          corso?.corsoId,
          emailFilter || undefined
        );
        setIscrizioni(data || []);
      } catch (err: unknown) {
        onToast("Errore caricamento iscrizioni: " + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [corso, emailFilter, onToast]);

  async function refreshList() {
    setLoading(true);
    try {
      const data = await api.fetchIscrizioni(
        corso?.corsoId,
        emailFilter || undefined
      );
      setIscrizioni(data || []);
    } catch (err: unknown) {
      onToast("Errore caricamento iscrizioni: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ fontWeight: 700 }}>
          Iscrizioni {corso ? `— ${corso.titolo}` : ""}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {corso && (
            <button className="btn" onClick={() => onOpenEnrollmentModal(corso)}>
              Nuova iscrizione
            </button>
          )}
          <button className="btn ghost" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 8 }} className="small">
        Filtra per email partecipante
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          className="input"
          placeholder="email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              refreshList();
            }
          }}
        />
        <button className="btn" onClick={refreshList}>
          Applica
        </button>
        <button
          className="btn ghost"
          onClick={async () => {
            setEmailFilter("");
            await refreshList();
            // Azzera anche i campi di ricerca nella lista corsi
            if (onResetSearch) {
              onResetSearch();
            }
          }}
        >
          Reset
        </button>
      </div>

      {loading && <div className="small">Caricamento iscrizioni...</div>}
      {!loading && iscrizioni.length === 0 && (
        <div className="empty">Nessuna iscrizione trovata</div>
      )}

      {iscrizioni.map((it) => (
        <div
          key={it.iscrizioneId}
          className="list-item card"
          style={{ marginBottom: 8 }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>
              {it.partecipanteNome} {it.partecipanteCognome}
            </div>
            <div className="small" style={{ color: "var(--muted)" }}>
              {it.partecipanteEmail}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="small">{formatDate(it.dataOraIscrizione)}</div>
            <div className="small">Corso ID: {String(it.corsoId)}</div>
          </div>
        </div>
      ))}

    </div>
  );
}
