<template>
  <aside class="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-40">
    <nav class="p-4 space-y-2">
      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        class="flex items-center px-4 py-3 rounded-lg transition-colors"
        :class="$route.name === 'Dashboard' 
          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
          : 'text-gray-700 hover:bg-gray-100'"
      >
        <LayoutDashboard class="w-5 h-5 mr-3" />
        Dashboard
      </router-link>

      <!-- User Management -->
      <div v-if="authStore.canManageUsers">
        <router-link
          to="/users"
          class="flex items-center px-4 py-3 rounded-lg transition-colors"
          :class="$route.name === 'Users' 
            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
            : 'text-gray-700 hover:bg-gray-100'"
        >
          <Users class="w-5 h-5 mr-3" />
          User Management
        </router-link>
      </div>

      <!-- Content Management -->
      <div class="space-y-1">
        <button
          @click="toggleContentMenu"
          class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center">
            <FileText class="w-5 h-5 mr-3" />
            Content
          </div>
          <ChevronDown 
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': showContentMenu }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="showContentMenu" class="ml-4 space-y-1">
            <a
              href="#"
              class="flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Newspaper class="w-4 h-4 mr-3" />
              News & Events
            </a>
            <a
              href="#"
              class="flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <GraduationCap class="w-4 h-4 mr-3" />
              Programs
            </a>
            <a
              href="#"
              class="flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Image class="w-4 h-4 mr-3" />
              Media Library
            </a>
          </div>
        </Transition>
      </div>

      <!-- Reports -->
      <div class="space-y-1">
        <button
          @click="toggleReportsMenu"
          class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center">
            <BarChart3 class="w-5 h-5 mr-3" />
            Reports
          </div>
          <ChevronDown 
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': showReportsMenu }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="showReportsMenu" class="ml-4 space-y-1">
            <a
              href="#"
              class="flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <TrendingUp class="w-4 h-4 mr-3" />
              Analytics
            </a>
            <a
              href="#"
              class="flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Activity class="w-4 h-4 mr-3" />
              Activity Logs
            </a>
          </div>
        </Transition>
      </div>

      <!-- Settings -->
      <div class="pt-4 border-t border-gray-200">
        <a
          href="#"
          class="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Settings class="w-5 h-5 mr-3" />
          Settings
        </a>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { 
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  Newspaper,
  GraduationCap,
  Image,
  TrendingUp,
  Activity
} from 'lucide-vue-next'

const authStore = useAuthStore()

const showContentMenu = ref(false)
const showReportsMenu = ref(false)

function toggleContentMenu() {
  showContentMenu.value = !showContentMenu.value
}

function toggleReportsMenu() {
  showReportsMenu.value = !showReportsMenu.value
}
</script>