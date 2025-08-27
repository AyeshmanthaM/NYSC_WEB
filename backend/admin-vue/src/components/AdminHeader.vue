<template>
  <header class="admin-header">
    <div class="admin-header-content">
      <div class="admin-header-wrapper">
        <!-- Logo and Title -->
        <div class="admin-logo-section">
          <div class="admin-logo">
            <span class="admin-logo-text">NY</span>
          </div>
          <h1 class="admin-title">NYSC Admin</h1>
        </div>

        <!-- Search Bar -->
        <div class="admin-search-container">
          <div class="admin-search-wrapper">
            <Search class="admin-search-icon" />
            <input
              type="text"
              placeholder="Search... (Ctrl+K)"
              class="admin-search-input"
              @keydown="handleSearchKeydown"
            />
          </div>
        </div>

        <!-- User Menu -->
        <div class="admin-user-menu">
          <!-- Notifications -->
          <button class="admin-notification-btn">
            <Bell class="w-5 h-5" />
            <span class="admin-notification-dot"></span>
          </button>

          <!-- User Dropdown -->
          <div class="relative" ref="userMenuRef">
            <button
              @click="showUserMenu = !showUserMenu"
              class="admin-user-button"
            >
              <div class="admin-user-avatar">
                <User class="admin-user-avatar-icon" />
              </div>
              <div class="admin-user-info">
                <p class="admin-user-name">
                  {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
                </p>
                <p class="admin-user-role">{{ authStore.user?.role }}</p>
              </div>
              <ChevronDown class="admin-dropdown-icon" />
            </button>

            <!-- Dropdown Menu -->
            <Transition name="fade">
              <div
                v-if="showUserMenu"
                class="admin-dropdown-menu"
              >
                <a
                  href="#"
                  class="admin-dropdown-item"
                >
                  <User class="admin-dropdown-icon-item" />
                  Profile Settings
                </a>
                <a
                  href="#"
                  class="admin-dropdown-item"
                >
                  <Settings class="admin-dropdown-icon-item" />
                  Account Settings
                </a>
                <div class="admin-dropdown-divider"></div>
                <button
                  @click="handleLogout"
                  class="w-full admin-dropdown-item"
                >
                  <LogOut class="admin-dropdown-icon-item" />
                  Sign Out
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  Settings, 
  LogOut 
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const showUserMenu = ref(false)
const userMenuRef = ref<HTMLElement>()

// Handle search keyboard shortcut
function handleSearchKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    // Implement search functionality
    console.log('Search triggered')
  }
}

// Handle logout
async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Global search shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>