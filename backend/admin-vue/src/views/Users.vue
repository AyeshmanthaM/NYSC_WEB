<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AdminHeader />
    
    <!-- Main Content -->
    <main class="flex">
      <!-- Sidebar -->
      <AdminSidebar />
      
      <!-- Content Area -->
      <div class="flex-1 ml-64">
        <div class="p-8">
          <!-- Page Header -->
          <div class="flex justify-between items-center mb-8">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
              <p class="text-gray-600">Manage system users and permissions</p>
            </div>
            <button class="btn btn-primary">
              <Plus class="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>

          <!-- Filters -->
          <div class="card p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="form-label">Search</label>
                <div class="relative">
                  <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    v-model="filters.search"
                    type="text"
                    placeholder="Search users..."
                    class="form-input pl-10"
                    @input="debouncedSearch"
                  />
                </div>
              </div>
              <div>
                <label class="form-label">Role</label>
                <select v-model="filters.role" class="form-input" @change="loadUsers">
                  <option value="">All Roles</option>
                  <option value="USER">User</option>
                  <option value="EDITOR">Editor</option>
                  <option value="MODERATOR">Moderator</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div>
                <label class="form-label">Status</label>
                <select v-model="filters.active" class="form-input" @change="loadUsers">
                  <option :value="undefined">All Status</option>
                  <option :value="true">Active</option>
                  <option :value="false">Inactive</option>
                </select>
              </div>
              <div class="flex items-end">
                <button @click="clearFilters" class="btn btn-secondary w-full">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          <!-- Users Table -->
          <div class="card overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="loading" v-for="i in 5" :key="i">
                    <td class="px-6 py-4">
                      <div class="animate-pulse flex items-center">
                        <div class="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                        <div>
                          <div class="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                          <div class="h-3 bg-gray-200 rounded w-48"></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-4 bg-gray-200 rounded w-16 animate-pulse ml-auto"></div>
                    </td>
                  </tr>
                  
                  <tr v-else-if="!users || users.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                      <Users class="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>No users found</p>
                    </td>
                  </tr>
                  
                  <tr v-else v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          <span class="text-primary-600 font-medium text-sm">
                            {{ user.firstName?.charAt(0) || '?' }}{{ user.lastName?.charAt(0) || '?' }}
                          </span>
                        </div>
                        <div>
                          <div class="text-sm font-medium text-gray-900">
                            {{ user.firstName || 'Unknown' }} {{ user.lastName || 'User' }}
                          </div>
                          <div class="text-sm text-gray-500">{{ user.email || 'No email' }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getRoleClass(user.role)"
                      >
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'"
                      >
                        {{ user.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {{ user.lastLogin ? formatDate(user.lastLogin) : 'Never' }}
                    </td>
                    <td class="px-6 py-4 text-right text-sm font-medium space-x-2">
                      <button class="text-primary-600 hover:text-primary-900">
                        <Edit class="w-4 h-4" />
                      </button>
                      <button class="text-red-600 hover:text-red-900">
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { userApi } from '@/utils/api'
import { 
  Plus, 
  Search, 
  Users, 
  Edit, 
  Trash2 
} from 'lucide-vue-next'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import type { User, UserFilters } from '@/types'

const authStore = useAuthStore()
const users = ref<User[]>([])
const loading = ref(true)
const filters = reactive<UserFilters>({
  search: '',
  role: undefined,
  active: undefined
})

let searchTimeout: NodeJS.Timeout

async function loadUsers() {
  loading.value = true
  try {
    const response = await userApi.getUsers(filters)
    // The API utility now ensures this is always a proper structure
    users.value = response.items || []
  } catch (error) {
    console.error('Error loading users:', error)
    // Set users to empty array on error to prevent undefined errors
    users.value = []
  } finally {
    loading.value = false
  }
}

function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadUsers()
  }, 500)
}

function clearFilters() {
  Object.assign(filters, {
    search: '',
    role: undefined,
    active: undefined
  })
  loadUsers()
}

function getRoleClass(role: string): string {
  const classes = {
    'USER': 'bg-gray-100 text-gray-800',
    'EDITOR': 'bg-blue-100 text-blue-800',
    'MODERATOR': 'bg-yellow-100 text-yellow-800',
    'ADMIN': 'bg-purple-100 text-purple-800',
    'SUPER_ADMIN': 'bg-red-100 text-red-800'
  }
  return classes[role as keyof typeof classes] || classes.USER
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  loadUsers()
})
</script>