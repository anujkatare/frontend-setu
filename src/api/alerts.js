import client from './client'

export const listAlerts = () => client.get('/api/alerts').then((r) => r.data)
export const acknowledgeAlert = (id) =>
  client.post(`/api/alerts/${id}/acknowledge`).then((r) => r.data)
