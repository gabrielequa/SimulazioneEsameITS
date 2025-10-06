import type { CorsoDTO, IscrizioneDTO } from "../types/types"

const API_BASE = "http://localhost:8080"

async function handleResp(resp: Response) {
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(text || resp.statusText)
  }
  if (resp.status === 204) return null
  return resp.json()
}

export const api = {
  async fetchCorsi(titolo?: string, luogo?: string): Promise<CorsoDTO[]> {
    const params = new URLSearchParams()
    if (titolo) params.set('titolo', titolo)
    if (luogo) params.set('luogo', luogo)
    const resp = await fetch(`${API_BASE}/courses?` + params.toString())
    return handleResp(resp)
  },

  async fetchIscrizioni(corsoId?: number, partecipanteEmail?: string) {
    const params = new URLSearchParams()
    if (corsoId) params.set('corsoId', String(corsoId))
    if (partecipanteEmail) params.set('partecipanteEmail', partecipanteEmail)
    const resp = await fetch(`${API_BASE}/enrollments?` + params.toString())
    return handleResp(resp)
  },

  async createIscrizione(payload: IscrizioneDTO) {
    const resp = await fetch(`${API_BASE}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return handleResp(resp)
  }
}