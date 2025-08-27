import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Lazy load components
const Login = () => import('@/views/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Users = () => import('@/views/Users.vue')

// Profile Management - Unified Layout
const ProfilesView = () => import('@/views/ProfilesView.vue')

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true,
        title: 'Admin Login'
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        title: 'Dashboard'
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        requiresAuth: true,
        title: 'User Management',
        roles: ['ADMIN', 'SUPER_ADMIN']
      }
    },
    // Profile Management - Unified Route
    {
      path: '/profiles/:type',
      name: 'Profiles',
      component: ProfilesView,
      meta: {
        requiresAuth: true,
        title: 'Profile Management',
        roles: ['EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN']
      }
    },
    // Default profile redirect
    {
      path: '/profiles',
      redirect: '/profiles/chairman'
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - NYSC Admin`
  }
  
  // Check authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Redirect authenticated users away from login
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }
  
  // Check role-based access
  if (to.meta.roles && authStore.user) {
    const hasRequiredRole = Array.isArray(to.meta.roles) 
      ? to.meta.roles.includes(authStore.user.role)
      : to.meta.roles === authStore.user.role
    
    if (!hasRequiredRole) {
      next('/dashboard')
      return
    }
  }
  
  next()
})

export default router