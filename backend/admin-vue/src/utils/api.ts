import axios, { AxiosResponse } from 'axios'
import type { 
  ApiResponse, 
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
    return response.data
  },

  async getUserById(id: string): Promise<User> {
    const response = await usersApi.get(`/${id}`)
    return response.data
  },

  async createUser(userData: Partial<User>): Promise<User> {
    const response = await usersApi.post('/', userData)
    return response.data
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await usersApi.put(`/${id}`, userData)
    return response.data
  },

  async deleteUser(id: string): Promise<void> {
    await usersApi.delete(`/${id}`)
  },

  async bulkAction(action: string, userIds: string[]): Promise<{ updated: number }> {
    const response = await usersApi.post('/bulk', { action, userIds })
    return response.data
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
    return response.data
  }
}

export default api