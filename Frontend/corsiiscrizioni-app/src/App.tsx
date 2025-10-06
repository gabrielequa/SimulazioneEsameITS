import React, { useEffect, useState, useRef } from "react";
import { Header } from "./components/Header";
import { CourseList } from "./components/CourseList";
import type { CourseListRef } from "./components/CourseList";
import { EnrollmentPanel } from "./components/EnrollmentPanel";
import { Toast } from "./components/Toast";
import { api } from "./service/api";
import type { CorsoDTO } from "./types/types";

export default function App() {
  const [corsi, setCorsi] = useState<CorsoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CorsoDTO | null>(null);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const courseListRef = useRef<CourseListRef>(null);

  useEffect(() => {
    if (toast) setTimeout(() => setToast(null), 4000);
  }, [toast]);

  async function fetchCorsi(titolo?: string, luogo?: string) {
    setLoading(true);
    try {
      const data = await api.fetchCorsi(titolo, luogo);
      setCorsi(data);
    } catch (err) {
      setToast("Errore caricamento corsi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCorsi();
  }, []);

  return (
    <div className="app">
      <Header onRefresh={() => fetchCorsi()} />
      <div className="grid">
        <CourseList
          ref={courseListRef}
          corsi={corsi}
          loading={loading}
          onSearch={fetchCorsi}
          onShowEnrollments={(c) => {
            setSelectedCourse(c);
            setShowEnrollments(true);
          }}
          onSelectCourse={(c) => {
            setSelectedCourse(c);
            setShowEnrollments(true);
          }}
        />

        <div className="card">
          {showEnrollments ? (
            <EnrollmentPanel
              corso={selectedCourse}
              onClose={() => setShowEnrollments(false)}
              onToast={(m) => setToast(m)}
              onResetSearch={() => {
                courseListRef.current?.resetFields();
              }}
            />
          ) : (
            <div>
              <div style={{ fontWeight: 700 }}>Iscrizioni</div>
              <div className="small" style={{ color: "var(--muted)" }}>
                Visualizza tutte o per corso
              </div>
              <button
                className="btn"
                style={{ marginTop: 8 }}
                onClick={() => {
                  setSelectedCourse(null);
                  setShowEnrollments(true);
                }}
              >
                Vedi tutte
              </button>
            </div>
          )}
        </div>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  );
}
