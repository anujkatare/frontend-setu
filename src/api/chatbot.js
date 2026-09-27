import client from './client'

export const sendChatQuery = (payload) =>
  client.post('/api/chatbot/query', payload).then((r) => r.data)

export const listSessions = () => client.get('/api/chatbot/sessions').then((r) => r.data)

export const getSessionMessages = (sessionId) =>
  client.get(`/api/chatbot/sessions/${sessionId}/messages`).then((r) => r.data)
