import React from "react";

export function Header({ onRefresh }: { onRefresh: () => void }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">CI</div>
        <div>
          <div style={{ fontWeight: 800 }}>Corsi & Iscrizioni</div>
          <div className="small" style={{ color: "var(--muted)" }}>
            Pannello di gestione
          </div>
        </div>
      </div>
      <div className="controls">
        <button className="btn" onClick={onRefresh}>
          Aggiorna
        </button>
      </div>
    </header>
  );
}
