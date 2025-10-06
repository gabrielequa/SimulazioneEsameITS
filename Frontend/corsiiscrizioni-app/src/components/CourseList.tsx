import React from "react";
import { formatDate } from "../utils/format";
import type { CorsoDTO } from "../types/types";

interface Props {
  corsi: CorsoDTO[];
  loading: boolean;
  onSearch: (titolo: string, luogo: string) => void;
  onShowEnrollments: (corso: CorsoDTO) => void;
  onSelectCourse: (corso: CorsoDTO) => void;
}

export interface CourseListRef {
  resetFields: () => void;
}

export const CourseList = React.forwardRef<CourseListRef, Props>((
  {
    corsi,
    loading,
    onSearch,
    onShowEnrollments,
    onSelectCourse,
  },
  ref
) => {
  const [titolo, setTitolo] = React.useState("");
  const [luogo, setLuogo] = React.useState("");

  const handleSearch = () => {
    onSearch(titolo, luogo);
  };

  const handleReset = () => {
    setTitolo("");
    setLuogo("");
    onSearch("", ""); // Ricerca con campi vuoti
  };

  // Esponiamo la funzione reset tramite ref
  React.useImperativeHandle(ref, () => ({
    resetFields: handleReset,
  }));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 700 }}>Elenco corsi</div>
        <div className="small" style={{ color: "var(--muted)" }}>
          Totale: {corsi.length}
        </div>
      </div>

      <div className="filter-row">
        <input
          className="input"
          placeholder="Titolo"
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="input"
          placeholder="Luogo"
          value={luogo}
          onChange={(e) => setLuogo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" onClick={handleSearch}>
          Cerca
        </button>
        <button
          className="btn ghost"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {loading && <div className="small">Caricamento...</div>}
      {!loading && corsi.length === 0 && (
        <div className="empty">Nessun corso trovato</div>
      )}

      {corsi.map((c) => (
        <div key={c.corsoId} className="course">
          <div className="course-meta">
            <div className="course-title">{c.titolo}</div>
            <div className="course-sub">
              {formatDate(c.dataOraInizio)} · {c.luogo} · Disp:{" "}
              {c.disponibilita}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn" onClick={() => onShowEnrollments(c)}>
              Iscrizioni
            </button>
            <button className="btn ghost" onClick={() => onSelectCourse(c)}>
              Iscriviti
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});
