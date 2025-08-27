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
  limit: number
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

// Directors & Profiles Type Definitions

export interface BaseDirector {
  id: string
  name: string
  position: string
  email: string
  phone: string
  image?: string
  linkedin?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
  updatedBy?: string
}

export interface Chairman extends BaseDirector {
  title: string
  description: string
  tenure?: string
  qualifications?: any[]
  achievements?: any[]
  vision?: string
  keyInitiatives?: any[]
}

export interface BoardMember extends BaseDirector {
  description: string
  badge?: string
}

export interface Director extends BaseDirector {
  department: string
  description: string
  specialization?: string
  experience?: string
  achievements?: any[]
}

export interface DeputyDirector extends BaseDirector {
  department: string
  description: string
  specialization?: string
  provinces?: string[]
}

export interface AssistantDirector extends BaseDirector {
  department: string
  region?: string
  specialization?: string
}

export interface ProvincialDirector extends BaseDirector {
  province: string
  description: string
  headquarters?: string
  districts?: string[]
  population?: string
  centers?: number
  achievements?: any[]
}

export interface ProvincialAssistant extends BaseDirector {
  province: string
  district: string
  headquarters?: string
  population?: string
  centers?: number
  specialization?: string
}

export interface YouthClubMember extends BaseDirector {
  description: string
  teamRole?: string
  age?: number
  skills?: string
}

export interface DirectorFilters {
  search?: string
  status?: 'active' | 'inactive' | 'all'
  department?: string
  province?: string
  district?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface DirectorsOverview {
  organizationStats: {
    totalLeadership: number
    provinces: number
    districts: number
    combinedExperience: string
  }
  hierarchy: {
    boardMembers: number
    chairman: number
    directors: number
    deputyDirectors: number
    assistantDirectors: number
    provincialDirectors: number
    provincialAssistants: number
    totalLevels: number
  }
  coverage: {
    nationalReach: boolean
    provincialCoverage: string
    districtCoverage: string
    youthCenters: string
    annualBeneficiaries: string
  }
  keyFunctions: Array<{
    level: string
    function: string
    description: string
  }>
}

export type DirectorType = 
  | 'chairman' 
  | 'boardMember' 
  | 'director' 
  | 'deputyDirector' 
  | 'assistantDirector' 
  | 'provincialDirector' 
  | 'provincialAssistant'
  | 'youthClubMember'

export type DirectorData = 
  | Chairman 
  | BoardMember 
  | Director 
  | DeputyDirector 
  | AssistantDirector 
  | ProvincialDirector 
  | ProvincialAssistant
  | YouthClubMember