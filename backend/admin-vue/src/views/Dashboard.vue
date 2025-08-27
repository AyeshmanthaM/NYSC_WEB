<template>
  <div class="admin-layout">
    <!-- Header -->
    <AdminHeader />
    
    <!-- Main Content -->
    <main class="admin-main-content">
      <!-- Sidebar -->
      <AdminSidebar />
      
      <!-- Content Area -->
      <div class="admin-content-area">
        <div class="admin-content-padding">
          <!-- Page Header -->
          <div class="admin-page-header">
            <h1 class="admin-page-title">Dashboard</h1>
            <p class="admin-page-subtitle">Welcome back, {{ authStore.user?.firstName }}!</p>
          </div>

          <!-- Stats Cards -->
          <div class="admin-stats-grid">
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
          <div class="admin-dashboard-grid">
            <!-- Activity Log -->
            <div class="admin-activity-section">
              <h3 class="admin-activity-title">Recent Activity</h3>
              <div class="admin-activity-list">
                <div v-if="loading" class="admin-activity-loading">
                  <div v-for="i in 5" :key="i" class="admin-activity-skeleton-item">
                    <div class="admin-activity-skeleton-main"></div>
                    <div class="admin-activity-skeleton-sub"></div>
                  </div>
                </div>
                <div v-else-if="stats?.recentActivity?.length">
                  <div 
                    v-for="activity in stats.recentActivity" 
                    :key="activity.id"
                    class="admin-activity-item"
                  >
                    <div class="admin-activity-dot-wrapper">
                      <div class="admin-activity-dot"></div>
                    </div>
                    <div class="admin-activity-content">
                      <p class="admin-activity-message">
                        {{ formatActivityMessage(activity) }}
                      </p>
                      <p class="admin-activity-time">
                        {{ formatDate(activity.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else class="admin-empty-state">
                  <Activity class="admin-empty-icon" />
                  <p>No recent activity</p>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="admin-activity-section">
              <h3 class="admin-activity-title">Quick Actions</h3>
              <div class="admin-quick-actions">
                <router-link 
                  v-if="authStore.canManageUsers"
                  to="/users"
                  class="admin-quick-action-item"
                >
                  <Users class="admin-quick-action-icon" />
                  <div>
                    <p class="admin-quick-action-title">Manage Users</p>
                    <p class="admin-quick-action-desc">Add, edit, or remove users</p>
                  </div>
                </router-link>

                <a 
                  href="#"
                  class="admin-quick-action-item"
                >
                  <FileText class="admin-quick-action-icon" />
                  <div>
                    <p class="admin-quick-action-title">Content Management</p>
                    <p class="admin-quick-action-desc">Manage website content</p>
                  </div>
                </a>

                <a 
                  href="#"
                  class="admin-quick-action-item"
                >
                  <Settings class="admin-quick-action-icon" />
                  <div>
                    <p class="admin-quick-action-title">System Settings</p>
                    <p class="admin-quick-action-desc">Configure system preferences</p>
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