import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PTERODACTYL_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_PTERODACTYL_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export interface PterodactylServer {
  id: string
  attributes: {
    name: string
    description: string
    identifier: string
    uuid: string
    status: string
    suspended: boolean
    limits: {
      memory: number
      swap: number
      disk: number
      io: number
      cpu: number
    }
  }
}

export const pterodactylApi = {
  getServers: async () => {
    const response = await apiClient.get<{ data: PterodactylServer[] }>('/api/client')
    return response.data.data
  },

  getServerDetails: async (serverId: string) => {
    const response = await apiClient.get<{ data: PterodactylServer }>(`/api/client/servers/${serverId}`)
    return response.data.data
  },

  startServer: async (serverId: string) => {
    await apiClient.post(`/api/client/servers/${serverId}/power`, { signal: 'start' })
  },

  stopServer: async (serverId: string) => {
    await apiClient.post(`/api/client/servers/${serverId}/power`, { signal: 'stop' })
  },

  restartServer: async (serverId: string) => {
    await apiClient.post(`/api/client/servers/${serverId}/power`, { signal: 'restart' })
  },
} 