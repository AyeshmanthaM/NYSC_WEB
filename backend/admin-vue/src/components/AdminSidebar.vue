<template>
  <aside class="admin-sidebar">
    <nav class="admin-sidebar-nav">
      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        class="admin-nav-item"
        :class="$route.name === 'Dashboard' 
          ? 'admin-nav-item-active' 
          : 'admin-nav-item-inactive'"
      >
        <LayoutDashboard class="admin-nav-icon" />
        Dashboard
      </router-link>

      <!-- User Management -->
      <div v-if="authStore.canManageUsers">
        <router-link
          to="/users"
          class="admin-nav-item"
          :class="$route.name === 'Users' 
            ? 'admin-nav-item-active' 
            : 'admin-nav-item-inactive'"
        >
          <Users class="admin-nav-icon" />
          User Management
        </router-link>
      </div>

      <!-- Content Management -->
      <div class="admin-expandable-nav">
        <button
          @click="toggleContentMenu"
          class="admin-expandable-button"
        >
          <div class="admin-expandable-content">
            <FileText class="admin-nav-icon" />
            Content
          </div>
          <ChevronDown 
            class="admin-expandable-chevron"
            :class="{ 'admin-expandable-chevron-open': showContentMenu }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="showContentMenu" class="admin-subnav">
            <a
              href="#"
              class="admin-subnav-item admin-subnav-item-inactive"
            >
              <Newspaper class="admin-subnav-icon" />
              News & Events
            </a>
            <a
              href="#"
              class="admin-subnav-item admin-subnav-item-inactive"
            >
              <GraduationCap class="admin-subnav-icon" />
              Programs
            </a>
            <a
              href="#"
              class="admin-subnav-item admin-subnav-item-inactive"
            >
              <Image class="admin-subnav-icon" />
              Media Library
            </a>
          </div>
        </Transition>
      </div>


      <!-- Profile Management -->
      <div class="admin-expandable-nav">
        <button
          @click="toggleProfileMenu"
          class="admin-expandable-button"
        >
          <div class="admin-expandable-content">
            <FileText class="admin-nav-icon" />
            Profiles
          </div>
          <ChevronDown 
            class="admin-expandable-chevron"
            :class="{ 'admin-expandable-chevron-open': showProfileMenu }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="showProfileMenu" class="admin-subnav">
            <router-link
              to="/profiles/chairman"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'chairman'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <Crown class="admin-subnav-icon" />
              Chairman
            </router-link>
            <router-link
              to="/profiles/board-members"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'board-members'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <Users class="admin-subnav-icon" />
              Board Members
            </router-link>
            <router-link
              to="/profiles/directors"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'directors'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <UserCheck class="admin-subnav-icon" />
              Directors
            </router-link>
            <router-link
              to="/profiles/deputy-directors"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'deputy-directors'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <UserCog class="admin-subnav-icon" />
              Deputy Directors
            </router-link>
            <router-link
              to="/profiles/assistant-directors"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'assistant-directors'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <User class="admin-subnav-icon" />
              Assistant Directors
            </router-link>
            <router-link
              to="/profiles/provincial-directors"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'provincial-directors'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <MapPin class="admin-subnav-icon" />
              Provincial Directors
            </router-link>
            <router-link
              to="/profiles/provincial-assistants"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'provincial-assistants'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <Map class="admin-subnav-icon" />
              Provincial Assistants
            </router-link>
            <router-link
              to="/profiles/youth-club"
              class="admin-subnav-item"
              :class="$route.name === 'Profiles' && $route.params.type === 'youth-club'
                ? 'admin-subnav-item-active' 
                : 'admin-subnav-item-inactive'"
            >
              <Trophy class="admin-subnav-icon" />
              Youth Club National Team
            </router-link>
          </div>
        </Transition>
      </div>

      <!-- Reports -->
      <div class="admin-expandable-nav">
        <button
          @click="toggleReportsMenu"
          class="admin-expandable-button"
        >
          <div class="admin-expandable-content">
            <BarChart3 class="admin-nav-icon" />
            Reports
          </div>
          <ChevronDown 
            class="admin-expandable-chevron"
            :class="{ 'admin-expandable-chevron-open': showReportsMenu }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="showReportsMenu" class="admin-subnav">
            <a
              href="#"
              class="admin-subnav-item admin-subnav-item-inactive"
            >
              <TrendingUp class="admin-subnav-icon" />
              Analytics
            </a>
            <a
              href="#"
              class="admin-subnav-item admin-subnav-item-inactive"
            >
              <Activity class="admin-subnav-icon" />
              Activity Logs
            </a>
          </div>
        </Transition>
      </div>

      <!-- Settings -->
      <div class="admin-settings-section">
        <a
          href="#"
          class="admin-nav-item admin-nav-item-inactive"
        >
          <Settings class="admin-nav-icon" />
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
  Crown,
  UserCheck,
  UserCog,
  User,
  MapPin,
  Map,
  Trophy,
  TrendingUp,
  Activity,
  Newspaper,
  GraduationCap,
  Image
} from 'lucide-vue-next'

const authStore = useAuthStore()

const showContentMenu = ref(false)
const showProfileMenu = ref(false)
const showReportsMenu = ref(false)

function toggleContentMenu() {
  showContentMenu.value = !showContentMenu.value
}

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
}

function toggleReportsMenu() {
  showReportsMenu.value = !showReportsMenu.value
}
</script>