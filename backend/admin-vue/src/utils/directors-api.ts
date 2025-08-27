import axios, { AxiosResponse } from 'axios'
import type { 
  Chairman,
  BoardMember,
  Director,
  DeputyDirector,
  AssistantDirector,
  ProvincialDirector,
  ProvincialAssistant,
  YouthClubMember,
  DirectorFilters,
  DirectorsOverview,
  PaginatedResponse,
  ApiResponse,
  DirectorType,
  DirectorData
} from '@/types'

// Create axios instance for directors API
const directorsApi = axios.create({
  baseURL: '/admin/api/directors',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Helper function to handle API responses
const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  return response.data?.data || response.data as T
}

const handlePaginatedResponse = <T>(response: AxiosResponse<any>): PaginatedResponse<T> => {
  const data = response.data?.data || response.data
  const pagination = response.data?.pagination
  
  return {
    items: data || [],
    total: pagination?.total || 0,
    page: pagination?.page || 1,
    limit: pagination?.limit || 20,
    totalPages: pagination?.pages || 1,
    hasNext: pagination?.hasNext || false,
    hasPrev: pagination?.hasPrev || false
  }
}

// =============================
// OVERVIEW API
// =============================

export const overviewApi = {
  async getOverview(): Promise<DirectorsOverview> {
    const response = await directorsApi.get('/overview')
    return handleApiResponse<DirectorsOverview>(response)
  }
}

// =============================
// CHAIRMAN API
// =============================

export const chairmanApi = {
  async getChairman(): Promise<Chairman | null> {
    try {
      const response = await directorsApi.get('/chairman')
      return handleApiResponse<Chairman>(response)
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  async updateChairman(data: Partial<Chairman>): Promise<Chairman> {
    const response = await directorsApi.put('/chairman', data)
    return handleApiResponse<Chairman>(response)
  }
}

// =============================
// BOARD MEMBERS API
// =============================

export const boardMembersApi = {
  async getBoardMembers(filters: DirectorFilters = {}): Promise<PaginatedResponse<BoardMember>> {
    const response = await directorsApi.get('/board-members', { params: filters })
    return handlePaginatedResponse<BoardMember>(response)
  },

  async getBoardMemberById(id: string): Promise<BoardMember> {
    const response = await directorsApi.get(`/board-members/${id}`)
    return handleApiResponse<BoardMember>(response)
  },

  async createBoardMember(data: Partial<BoardMember>): Promise<BoardMember> {
    const response = await directorsApi.post('/board-members', data)
    return handleApiResponse<BoardMember>(response)
  },

  async updateBoardMember(id: string, data: Partial<BoardMember>): Promise<BoardMember> {
    const response = await directorsApi.put(`/board-members/${id}`, data)
    return handleApiResponse<BoardMember>(response)
  },

  async deleteBoardMember(id: string): Promise<void> {
    await directorsApi.delete(`/board-members/${id}`)
  }
}

// =============================
// DIRECTORS API
// =============================

export const directorsApiService = {
  async getDirectors(filters: DirectorFilters = {}): Promise<PaginatedResponse<Director>> {
    const response = await directorsApi.get('/directors', { params: filters })
    return handlePaginatedResponse<Director>(response)
  },

  async getDirectorById(id: string): Promise<Director> {
    const response = await directorsApi.get(`/directors/${id}`)
    return handleApiResponse<Director>(response)
  },

  async createDirector(data: Partial<Director>): Promise<Director> {
    const response = await directorsApi.post('/directors', data)
    return handleApiResponse<Director>(response)
  },

  async updateDirector(id: string, data: Partial<Director>): Promise<Director> {
    const response = await directorsApi.put(`/directors/${id}`, data)
    return handleApiResponse<Director>(response)
  },

  async deleteDirector(id: string): Promise<void> {
    await directorsApi.delete(`/directors/${id}`)
  }
}

// =============================
// DEPUTY DIRECTORS API
// =============================

export const deputyDirectorsApi = {
  async getDeputyDirectors(filters: DirectorFilters = {}): Promise<PaginatedResponse<DeputyDirector>> {
    const response = await directorsApi.get('/deputy-directors', { params: filters })
    return handlePaginatedResponse<DeputyDirector>(response)
  },

  async getDeputyDirectorById(id: string): Promise<DeputyDirector> {
    const response = await directorsApi.get(`/deputy-directors/${id}`)
    return handleApiResponse<DeputyDirector>(response)
  },

  async createDeputyDirector(data: Partial<DeputyDirector>): Promise<DeputyDirector> {
    const response = await directorsApi.post('/deputy-directors', data)
    return handleApiResponse<DeputyDirector>(response)
  },

  async updateDeputyDirector(id: string, data: Partial<DeputyDirector>): Promise<DeputyDirector> {
    const response = await directorsApi.put(`/deputy-directors/${id}`, data)
    return handleApiResponse<DeputyDirector>(response)
  },

  async deleteDeputyDirector(id: string): Promise<void> {
    await directorsApi.delete(`/deputy-directors/${id}`)
  }
}

// =============================
// ASSISTANT DIRECTORS API
// =============================

export const assistantDirectorsApi = {
  async getAssistantDirectors(filters: DirectorFilters = {}): Promise<PaginatedResponse<AssistantDirector>> {
    const response = await directorsApi.get('/assistant-directors', { params: filters })
    return handlePaginatedResponse<AssistantDirector>(response)
  },

  async getAssistantDirectorById(id: string): Promise<AssistantDirector> {
    const response = await directorsApi.get(`/assistant-directors/${id}`)
    return handleApiResponse<AssistantDirector>(response)
  },

  async createAssistantDirector(data: Partial<AssistantDirector>): Promise<AssistantDirector> {
    const response = await directorsApi.post('/assistant-directors', data)
    return handleApiResponse<AssistantDirector>(response)
  },

  async updateAssistantDirector(id: string, data: Partial<AssistantDirector>): Promise<AssistantDirector> {
    const response = await directorsApi.put(`/assistant-directors/${id}`, data)
    return handleApiResponse<AssistantDirector>(response)
  },

  async deleteAssistantDirector(id: string): Promise<void> {
    await directorsApi.delete(`/assistant-directors/${id}`)
  }
}

// =============================
// PROVINCIAL DIRECTORS API
// =============================

export const provincialDirectorsApi = {
  async getProvincialDirectors(filters: DirectorFilters = {}): Promise<PaginatedResponse<ProvincialDirector>> {
    const response = await directorsApi.get('/provincial-directors', { params: filters })
    return handlePaginatedResponse<ProvincialDirector>(response)
  },

  async getProvincialDirectorById(id: string): Promise<ProvincialDirector> {
    const response = await directorsApi.get(`/provincial-directors/${id}`)
    return handleApiResponse<ProvincialDirector>(response)
  },

  async createProvincialDirector(data: Partial<ProvincialDirector>): Promise<ProvincialDirector> {
    const response = await directorsApi.post('/provincial-directors', data)
    return handleApiResponse<ProvincialDirector>(response)
  },

  async updateProvincialDirector(id: string, data: Partial<ProvincialDirector>): Promise<ProvincialDirector> {
    const response = await directorsApi.put(`/provincial-directors/${id}`, data)
    return handleApiResponse<ProvincialDirector>(response)
  },

  async deleteProvincialDirector(id: string): Promise<void> {
    await directorsApi.delete(`/provincial-directors/${id}`)
  }
}

// =============================
// PROVINCIAL ASSISTANTS API
// =============================

export const provincialAssistantsApi = {
  async getProvincialAssistants(filters: DirectorFilters = {}): Promise<PaginatedResponse<ProvincialAssistant>> {
    const response = await directorsApi.get('/provincial-assistants', { params: filters })
    return handlePaginatedResponse<ProvincialAssistant>(response)
  },

  async getProvincialAssistantById(id: string): Promise<ProvincialAssistant> {
    const response = await directorsApi.get(`/provincial-assistants/${id}`)
    return handleApiResponse<ProvincialAssistant>(response)
  },

  async createProvincialAssistant(data: Partial<ProvincialAssistant>): Promise<ProvincialAssistant> {
    const response = await directorsApi.post('/provincial-assistants', data)
    return handleApiResponse<ProvincialAssistant>(response)
  },

  async updateProvincialAssistant(id: string, data: Partial<ProvincialAssistant>): Promise<ProvincialAssistant> {
    const response = await directorsApi.put(`/provincial-assistants/${id}`, data)
    return handleApiResponse<ProvincialAssistant>(response)
  },

  async deleteProvincialAssistant(id: string): Promise<void> {
    await directorsApi.delete(`/provincial-assistants/${id}`)
  }
}

// =============================
// YOUTH CLUB API
// =============================

export const youthClubApi = {
  async getYouthClubMembers(filters: DirectorFilters = {}): Promise<PaginatedResponse<YouthClubMember>> {
    const response = await directorsApi.get('/youth-club', { params: filters })
    return handlePaginatedResponse<YouthClubMember>(response)
  },

  async getYouthClubMemberById(id: string): Promise<YouthClubMember> {
    const response = await directorsApi.get(`/youth-club/${id}`)
    return handleApiResponse<YouthClubMember>(response)
  },

  async createYouthClubMember(data: Partial<YouthClubMember>): Promise<YouthClubMember> {
    const response = await directorsApi.post('/youth-club', data)
    return handleApiResponse<YouthClubMember>(response)
  },

  async updateYouthClubMember(id: string, data: Partial<YouthClubMember>): Promise<YouthClubMember> {
    const response = await directorsApi.put(`/youth-club/${id}`, data)
    return handleApiResponse<YouthClubMember>(response)
  },

  async deleteYouthClubMember(id: string): Promise<void> {
    await directorsApi.delete(`/youth-club/${id}`)
  }
}

// =============================
// IMAGE UPLOAD API
// =============================

export const imageUploadApi = {
  async uploadImage(file: File, directorType: DirectorType, directorId?: string): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('image', file)
    if (directorId) {
      formData.append('directorId', directorId)
    }

    const response = await directorsApi.post(`/${directorType}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return handleApiResponse<{ url: string }>(response)
  },

  async deleteImage(directorType: DirectorType, directorId: string): Promise<void> {
    await directorsApi.delete(`/${directorType}/${directorId}/image`)
  }
}

// =============================
// UNIFIED API INTERFACE
// =============================

export const profilesApi = {
  overview: overviewApi,
  chairman: chairmanApi,
  boardMembers: boardMembersApi,
  directors: directorsApiService,
  deputyDirectors: deputyDirectorsApi,
  assistantDirectors: assistantDirectorsApi,
  provincialDirectors: provincialDirectorsApi,
  provincialAssistants: provincialAssistantsApi,
  youthClub: youthClubApi,
  images: imageUploadApi
}

// Helper function to get API by director type
export const getDirectorApi = (type: DirectorType) => {
  const apiMap = {
    chairman: chairmanApi,
    boardMember: boardMembersApi,
    director: directorsApiService,
    deputyDirector: deputyDirectorsApi,
    assistantDirector: assistantDirectorsApi,
    provincialDirector: provincialDirectorsApi,
    provincialAssistant: provincialAssistantsApi,
    youthClubMember: youthClubApi
  }
  
  return apiMap[type]
}

export default profilesApi