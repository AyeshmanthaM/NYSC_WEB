import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/utils/api'
import type { User, LoginCredentials } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => 
    user.value?.role && ['ADMIN', 'SUPER_ADMIN'].includes(user.value.role)
  )
  const canManageUsers = computed(() => 
    user.value?.role && ['ADMIN', 'SUPER_ADMIN'].includes(user.value.role)
  )

  // Actions
  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null
    
    try {
      const response = await authApi.login(credentials)
      
      if (response.success && response.data) {
        user.value = response.data.user
        return true
      } else {
        error.value = response.error?.message || 'Login failed'
        return false
      }
    } catch (err: any) {
      // Handle axios error responses
      if (err.response?.data?.error?.message) {
        error.value = err.response.data.error.message
      } else if (err.response?.data?.message) {
        error.value = err.response.data.message
      } else {
        error.value = err.message || 'Login failed'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    
    try {
      await authApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      loading.value = false
    }
  }

  async function checkAuth() {
    loading.value = true
    
    try {
      const response = await authApi.getProfile()
      
      if (response.success && response.data.isAuthenticated && response.data.user) {
        user.value = response.data.user
        return true
      } else {
        user.value = null
        return false
      }
    } catch (err) {
      // Session expired or invalid
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    user,
    loading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    canManageUsers,
    // Actions
    login,
    logout,
    checkAuth,
    clearError
  }
})