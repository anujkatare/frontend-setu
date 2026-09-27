const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function request(path, options = {}) {
  const token = localStorage.getItem('setu_token')
  const headers = new Headers(options.headers || {})
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type','application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const res = await fetch(`${BASE}${path}`, {...options, headers})
  const text = await res.text()
  let data = null
  try { data = text ? JSON.parse(text) : null } catch { data = text }
  if (res.status === 401) { localStorage.removeItem('setu_token'); localStorage.removeItem('setu_user'); }
  if (!res.ok) throw new Error(data?.message || data?.error || (typeof data === 'string' ? data : `Request failed (${res.status})`))
  return data
}

export const api = {
  login: body => request('/api/auth/login',{method:'POST',body:JSON.stringify(body)}),
  register: body => request('/api/auth/register',{method:'POST',body:JSON.stringify(body)}),
  dashboard: () => request('/api/dashboard/summary'),
  projects: status => request(`/api/projects${status ? `?status=${encodeURIComponent(status)}` : ''}`),
  project: id => request(`/api/projects/${id}`),
  createProject: body => request('/api/projects',{method:'POST',body:JSON.stringify(body)}),
  updateProject: (id,body) => request(`/api/projects/${id}`,{method:'PUT',body:JSON.stringify(body)}),
  generateRisk: id => request(`/api/projects/${id}/risk/generate`,{method:'POST'}),
  latestRisk: id => request(`/api/projects/${id}/risk/latest`),
  alerts: () => request('/api/alerts'),
  acknowledgeAlert: id => request(`/api/alerts/${id}/acknowledge`,{method:'POST'}),
  ministries: () => request('/api/ministries'),
  sectors: () => request('/api/sectors'),
  createMinistry: body => request('/api/ministries',{method:'POST',body:JSON.stringify(body)}),
  createSector: body => request('/api/sectors',{method:'POST',body:JSON.stringify(body)}),
  sessions: () => request('/api/chatbot/sessions'),
  history: id => request(`/api/chatbot/sessions/${id}/messages`),
  chat: body => request('/api/chatbot/query',{method:'POST',body:JSON.stringify(body)})
}
