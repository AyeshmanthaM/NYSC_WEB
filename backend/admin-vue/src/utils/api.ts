import axios, { AxiosResponse } from 'axios'
import type { 
  AuthResponse, 
  AuthCheckResponse,
  LoginCredentials, 
  User, 
  UserFilters, 
  PaginatedResponse,
  DashboardStats
} from '@/types'

// Create axios instance
const api = axios.create({
  baseURL: '/admin/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use((config) => {
  // Add CSRF token if available
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken
  }
  
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post('/login', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/logout')
  },

  async getProfile(): Promise<AuthCheckResponse> {
    const response: AxiosResponse<AuthCheckResponse> = await api.get('/check-auth')
    return response.data
  }
}

// Users API (will use existing backend API routes)
const usersApi = axios.create({
  baseURL: '/admin/api/users',
  withCredentials: true
})

export const userApi = {
  async getUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
    const response = await usersApi.get('/', { params: filters })
    // Handle the backend's success/data response structure
    const data = response.data?.data || response.data
    return {
      items: data?.items || data || [],
      total: data?.total || 0,
      page: data?.page || 1,
      limit: data?.limit || 20,
      totalPages: data?.totalPages || 1,
      hasNext: data?.hasNext || false,
      hasPrev: data?.hasPrev || false
    }
  },

  async getUserById(id: string): Promise<User> {
    const response = await usersApi.get(`/${id}`)
    // Extract data from the success/data structure
    return response.data?.data || response.data
  },

  async createUser(userData: Partial<User>): Promise<User> {
    const response = await usersApi.post('/', userData)
    // Extract data from the success/data structure
    return response.data?.data || response.data
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await usersApi.put(`/${id}`, userData)
    // Extract data from the success/data structure
    return response.data?.data || response.data
  },

  async deleteUser(id: string): Promise<void> {
    await usersApi.delete(`/${id}`)
  },

  async bulkAction(action: string, userIds: string[]): Promise<{ updated: number }> {
    const response = await usersApi.post('/bulk', { action, userIds })
    // Extract data from the success/data structure
    return response.data?.data || response.data
  }
}

// Dashboard API
const dashboardApi = axios.create({
  baseURL: '/admin/api/dashboard',
  withCredentials: true
})

export const statsApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await dashboardApi.get('/stats')
    // Extract data from the success/data structure
    return response.data?.data || response.data
  }
}

export default api