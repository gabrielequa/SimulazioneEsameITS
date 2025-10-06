export function Header() {
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
    </header>
  );
}
