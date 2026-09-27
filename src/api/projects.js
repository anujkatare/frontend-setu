import client from './client'

export const listProjects = (status) =>
  client.get('/api/projects', { params: status ? { status } : {} }).then((r) => r.data)

export const getProject = (id) =>
  client.get(`/api/projects/${id}`).then((r) => r.data)

export const createProject = (payload) =>
  client.post('/api/projects', payload).then((r) => r.data)

export const listMinistries = () => client.get('/api/ministries').then((r) => r.data)
export const createMinistry = (payload) =>
  client.post('/api/ministries', payload).then((r) => r.data)

export const listSectors = () => client.get('/api/sectors').then((r) => r.data)
export const createSector = (payload) =>
  client.post('/api/sectors', payload).then((r) => r.data)
