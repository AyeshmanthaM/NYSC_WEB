<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform -translate-y-2"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-2"
  >
    <div
      v-if="show"
      class="retry-indicator"
      :class="indicatorClass"
    >
      <div class="flex items-center space-x-3">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <div v-if="isRetrying" class="relative">
            <RefreshCw class="w-5 h-5 text-blue-600 animate-spin" />
            <!-- Progress ring -->
            <svg
              v-if="showProgress && progress > 0"
              class="absolute inset-0 w-5 h-5 -rotate-90"
              viewBox="0 0 20 20"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                class="text-blue-200"
              />
              <circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                class="text-blue-600 transition-all duration-300"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (progress / 100) * circumference"
              />
            </svg>
          </div>
          <AlertTriangle v-else-if="hasError" class="w-5 h-5 text-red-600" />
          <CheckCircle v-else class="w-5 h-5 text-green-600" />
        </div>
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium" :class="messageClass">
                {{ title }}
              </p>
              <p v-if="message" class="text-xs mt-0.5" :class="submessageClass">
                {{ message }}
              </p>
            </div>
            
            <!-- Countdown -->
            <div v-if="isRetrying && countdown > 0" class="flex-shrink-0">
              <div class="countdown-circle">
                <span class="text-xs font-mono text-blue-600">{{ countdown }}</span>
              </div>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div v-if="showProgress && isRetrying" class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div
                class="bg-blue-600 h-1 rounded-full transition-all duration-300"
                :style="{ width: `${progress}%` }"
              />
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div v-if="showActions" class="flex-shrink-0 flex space-x-2">
          <button
            v-if="isRetrying"
            @click="$emit('cancel')"
            class="btn-small btn-secondary"
            type="button"
          >
            Cancel
          </button>
          <button
            v-else-if="hasError && allowManualRetry"
            @click="$emit('retry')"
            class="btn-small btn-primary"
            type="button"
          >
            Retry Now
          </button>
          <button
            v-if="!isRetrying"
            @click="$emit('dismiss')"
            class="btn-icon"
            type="button"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RefreshCw, AlertTriangle, CheckCircle, X } from 'lucide-vue-next'

interface Props {
  show: boolean
  isRetrying?: boolean
  hasError?: boolean
  title: string
  message?: string
  progress?: number
  countdown?: number
  showProgress?: boolean
  showActions?: boolean
  allowManualRetry?: boolean
  variant?: 'info' | 'warning' | 'error' | 'success'
}

const props = withDefaults(defineProps<Props>(), {
  isRetrying: false,
  hasError: false,
  progress: 0,
  countdown: 0,
  showProgress: true,
  showActions: true,
  allowManualRetry: true,
  variant: 'info'
})

defineEmits<{
  cancel: []
  retry: []
  dismiss: []
}>()

// Progress circle circumference
const circumference = computed(() => 2 * Math.PI * 8)

// Dynamic classes
const indicatorClass = computed(() => {
  const baseClass = 'p-4 rounded-lg border shadow-sm'
  
  if (props.isRetrying) {
    return `${baseClass} bg-blue-50 border-blue-200`
  } else if (props.hasError) {
    return `${baseClass} bg-red-50 border-red-200`
  } else {
    return `${baseClass} bg-green-50 border-green-200`
  }
})

const messageClass = computed(() => {
  if (props.isRetrying) {
    return 'text-blue-900'
  } else if (props.hasError) {
    return 'text-red-900'
  } else {
    return 'text-green-900'
  }
})

const submessageClass = computed(() => {
  if (props.isRetrying) {
    return 'text-blue-700'
  } else if (props.hasError) {
    return 'text-red-700'
  } else {
    return 'text-green-700'
  }
})
</script>

<style scoped>
.retry-indicator {
  @apply transition-all duration-200;
}

.countdown-circle {
  @apply w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200;
}

.btn-small {
  @apply px-3 py-1 text-xs font-medium rounded border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors;
}

.btn-primary {
  @apply text-white bg-blue-600 border-blue-600 hover:bg-blue-700 focus:ring-blue-500;
}

.btn-secondary {
  @apply text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-blue-500;
}

.btn-icon {
  @apply p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded;
}
</style>