export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'USER' | 'EDITOR' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN'
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    message?: string
  }
  error?: {
    code: string
    message: string
  }
}

export interface AuthCheckResponse {
  success: boolean
  data: {
    isAuthenticated: boolean
    user?: User
  }
  error?: {
    code: string
    message: string
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: {
    code: string
    message: string
  }
}

export interface UserFilters {
  search?: string
  role?: User['role']
  active?: boolean
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  totalPages: number
  total: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  createdAt: string
  user?: {
    firstName: string
    lastName: string
    email: string
  }
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalContent: number
  recentActivity: ActivityLog[]
}