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
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600">Welcome back, {{ authStore.user?.firstName }}!</p>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              :value="stats?.totalUsers || 0"
              icon="Users"
              color="blue"
              :loading="loading"
            />
            <StatCard
              title="Active Users"
              :value="stats?.activeUsers || 0"
              icon="UserCheck"
              color="green"
              :loading="loading"
            />
            <StatCard
              title="Total Content"
              :value="stats?.totalContent || 0"
              icon="FileText"
              color="purple"
              :loading="loading"
            />
            <StatCard
              title="System Status"
              value="Online"
              icon="Activity"
              color="emerald"
              :loading="false"
            />
          </div>

          <!-- Recent Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Activity Log -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div class="space-y-4">
                <div v-if="loading" class="space-y-3">
                  <div v-for="i in 5" :key="i" class="animate-pulse">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
                  </div>
                </div>
                <div v-else-if="stats?.recentActivity?.length">
                  <div 
                    v-for="activity in stats.recentActivity" 
                    :key="activity.id"
                    class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex-shrink-0">
                      <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-gray-900">
                        {{ formatActivityMessage(activity) }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ formatDate(activity.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-6 text-gray-500">
                  <Activity class="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No recent activity</p>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <router-link 
                  v-if="authStore.canManageUsers"
                  to="/users"
                  class="flex items-center p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                >
                  <Users class="w-5 h-5 text-gray-400 group-hover:text-primary-600 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900 group-hover:text-primary-600">Manage Users</p>
                    <p class="text-sm text-gray-500">Add, edit, or remove users</p>
                  </div>
                </router-link>

                <a 
                  href="#"
                  class="flex items-center p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                >
                  <FileText class="w-5 h-5 text-gray-400 group-hover:text-primary-600 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900 group-hover:text-primary-600">Content Management</p>
                    <p class="text-sm text-gray-500">Manage website content</p>
                  </div>
                </a>

                <a 
                  href="#"
                  class="flex items-center p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                >
                  <Settings class="w-5 h-5 text-gray-400 group-hover:text-primary-600 mr-3" />
                  <div>
                    <p class="font-medium text-gray-900 group-hover:text-primary-600">System Settings</p>
                    <p class="text-sm text-gray-500">Configure system preferences</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { statsApi } from '@/utils/api'
import { Users, UserCheck, FileText, Activity, Settings } from 'lucide-vue-next'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import StatCard from '@/components/StatCard.vue'
import type { DashboardStats, ActivityLog } from '@/types'

const authStore = useAuthStore()
const stats = ref<DashboardStats | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    stats.value = await statsApi.getDashboardStats()
  } catch (error) {
    console.error('Error loading dashboard stats:', error)
  } finally {
    loading.value = false
  }
})

function formatActivityMessage(activity: ActivityLog): string {
  const userName = activity.user ? `${activity.user.firstName} ${activity.user.lastName}` : 'System'
  
  switch (activity.action) {
    case 'CREATE_USER':
      return `${userName} created a new user`
    case 'UPDATE_USER':
      return `${userName} updated user information`
    case 'DELETE_USER':
      return `${userName} deleted a user`
    case 'LOGIN':
      return `${userName} logged into the system`
    default:
      return `${userName} performed ${activity.action.toLowerCase().replace('_', ' ')}`
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    return date.toLocaleDateString()
  }
}
</script>