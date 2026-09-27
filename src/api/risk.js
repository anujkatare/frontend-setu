import client from './client'

export const generateRisk = (projectId) =>
  client.post(`/api/projects/${projectId}/risk/generate`).then((r) => r.data)

export const getLatestRisk = (projectId) =>
  client.get(`/api/projects/${projectId}/risk/latest`).then((r) => r.data)
