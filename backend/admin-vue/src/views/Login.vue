<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-white opacity-10">
        <svg class="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g fill-rule="evenodd">
            <g fill="#1976d2" fill-opacity="0.03">
              <circle cx="200" cy="200" r="100"/>
              <circle cx="300" cy="100" r="80"/>
              <circle cx="100" cy="300" r="60"/>
            </g>
          </g>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative w-full max-w-md px-6">
      <!-- Logo and Header -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Lock class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">NYSC Admin Panel</h1>
        <p class="text-gray-600">National Youth Services Council</p>
      </div>

      <!-- Login Form Container -->
      <div class="bg-white rounded-xl shadow-xl overflow-hidden">
        <div class="px-6 py-8">
          <!-- Page Title -->
          <div class="text-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">
              Sign in to Admin Panel
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Enter your credentials to access the administration panel
            </p>
          </div>

          <!-- Alert Messages -->
          <div v-if="authStore.error" 
               class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div class="flex items-center">
              <AlertCircle class="w-5 h-5 mr-2 flex-shrink-0" />
              {{ authStore.error }}
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="form-label">
                Email Address <span class="text-red-500">*</span>
              </label>
              <div class="relative input-container">
                <input 
                  v-model="form.email"
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  autocomplete="email"
                  class="form-input pl-11"
                  placeholder="Enter your email address"
                  :disabled="authStore.loading"
                  aria-describedby="email-help"
                >
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="form-label">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative input-container">
                <input 
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password" 
                  name="password" 
                  required 
                  autocomplete="current-password"
                  class="form-input pl-11 pr-11"
                  placeholder="Enter your password"
                  :disabled="authStore.loading"
                  aria-describedby="password-help"
                >
                <button 
                  type="button" 
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 icon-button"
                  @click="showPassword = !showPassword"
                  :disabled="authStore.loading"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <Eye v-if="!showPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  v-model="form.remember"
                  type="checkbox" 
                  id="remember" 
                  name="remember"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  :disabled="authStore.loading"
                >
                <label for="remember" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div class="text-sm">
                <a href="/admin/auth/forgot-password" 
                   class="text-primary-600 hover:text-primary-500 transition duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <button 
                type="submit" 
                class="btn btn-primary w-full py-3"
                :disabled="authStore.loading || !form.email || !form.password"
              >
                <Loader2 v-if="authStore.loading" class="w-4 h-4 mr-2 animate-spin" />
                {{ authStore.loading ? 'Signing In...' : 'Sign In' }}
              </button>
            </div>

            <!-- Additional Info -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Access restricted to authorized personnel only
              </p>
            </div>
          </form>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p class="text-sm text-gray-600">
            &copy; {{ new Date().getFullYear() }} NYSC Sri Lanka. All rights reserved.
          </p>
        </div>
      </div>

      <!-- System Status -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          System Status: <span class="text-green-600 font-medium">Online</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)

// Handle form submission
async function handleSubmit() {
  authStore.clearError()
  
  const success = await authStore.login(form)
  
  if (success) {
    router.push('/dashboard')
  }
}

// Auto-focus email field
onMounted(() => {
  const emailInput = document.getElementById('email')
  if (emailInput) {
    emailInput.focus()
  }
})
</script>