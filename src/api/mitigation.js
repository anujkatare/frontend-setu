import client from './client'

export const submitQuestionnaire = (payload) =>
  client.post('/api/mitigation/questionnaire', payload).then((r) => r.data)

export const generateMitigationStrategy = (payload) =>
  client.post('/api/mitigation/generate', payload).then((r) => r.data)

export const getStrategyHistory = (projectName, sessionId) =>
  client
    .get(`/api/mitigation/${encodeURIComponent(projectName)}/${sessionId}/strategies`)
    .then((r) => r.data)
