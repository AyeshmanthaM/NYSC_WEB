<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform translate-y-4"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform translate-y-4"
  >
    <div v-if="show" class="restore-prompt-overlay">
      <div class="restore-prompt-backdrop" @click="$emit('decline')" />
      
      <div class="restore-prompt-container">
        <div class="restore-prompt">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ClockIcon class="h-6 w-6 text-blue-600" />
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-gray-900">
                  Restore Previous Work?
                </h3>
              </div>
            </div>
            <button
              @click="$emit('decline')"
              class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Content -->
          <div class="mb-6">
            <p class="text-sm text-gray-600 mb-4">
              We found unsaved form data from a previous session. Would you like to restore it?
            </p>

            <!-- Restore Info -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Last saved:</span>
                  <span class="text-gray-900 font-medium">
                    {{ formatTimestamp(restoreInfo?.timestamp) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Time ago:</span>
                  <span class="text-gray-900 font-medium">
                    {{ formatTimeAgo(restoreInfo?.age) }}
                  </span>
                </div>
                <div v-if="restoreInfo?.size" class="flex justify-between">
                  <span class="text-gray-600">Data size:</span>
                  <span class="text-gray-900 font-medium">
                    {{ formatBytes(restoreInfo.size) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Warning for old data -->
            <div
              v-if="isOldData"
              class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4"
            >
              <div class="flex items-start">
                <AlertTriangle class="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div class="ml-2">
                  <p class="text-xs text-yellow-800">
                    This data is quite old. Please verify it's still relevant before restoring.
                  </p>
                </div>
              </div>
            </div>

            <!-- Options -->
            <div class="space-y-3">
              <label class="flex items-start">
                <input
                  v-model="restoreOption"
                  type="radio"
                  value="restore"
                  class="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">
                    Restore and continue
                  </div>
                  <div class="text-xs text-gray-600">
                    Load your previous work and continue where you left off
                  </div>
                </div>
              </label>

              <label class="flex items-start">
                <input
                  v-model="restoreOption"
                  type="radio"
                  value="start-fresh"
                  class="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">
                    Start fresh
                  </div>
                  <div class="text-xs text-gray-600">
                    Clear saved data and begin with a blank form
                  </div>
                </div>
              </label>

              <label v-if="showMergeOption" class="flex items-start">
                <input
                  v-model="restoreOption"
                  type="radio"
                  value="merge"
                  class="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">
                    Merge with current data
                  </div>
                  <div class="text-xs text-gray-600">
                    Keep existing form data and add saved data where empty
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <button
              @click="$emit('decline')"
              class="btn btn-secondary"
              type="button"
            >
              Cancel
            </button>
            <button
              @click="handleConfirm"
              :disabled="!restoreOption"
              class="btn btn-primary"
              type="button"
            >
              <CheckCircle class="w-4 h-4 mr-2" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Clock as ClockIcon, X, AlertTriangle, CheckCircle } from 'lucide-vue-next'

interface Props {
  show: boolean
  restoreInfo?: {
    timestamp: Date
    age: number
    size: number
    version: string
    hasData: boolean
  }
  showMergeOption?: boolean
  currentFormHasData?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showMergeOption: false,
  currentFormHasData: false
})

const emit = defineEmits<{
  accept: [option: 'restore' | 'merge']
  decline: []
}>()

// State
const restoreOption = ref<'restore' | 'start-fresh' | 'merge'>('restore')

// Computed
const isOldData = computed(() => {
  if (!props.restoreInfo?.age) return false
  // Consider data old if it's more than 24 hours
  return props.restoreInfo.age > 24 * 60 * 60 * 1000
})

// Methods
const formatTimestamp = (timestamp?: Date): string => {
  if (!timestamp) return 'Unknown'
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(timestamp)
}

const formatTimeAgo = (milliseconds?: number): string => {
  if (!milliseconds) return 'Unknown'
  
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const handleConfirm = () => {
  if (restoreOption.value === 'start-fresh') {
    emit('decline')
  } else {
    emit('accept', restoreOption.value as 'restore' | 'merge')
  }
}
</script>

<style scoped>
.restore-prompt-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center p-4;
}

.restore-prompt-backdrop {
  @apply absolute inset-0 bg-gray-500 bg-opacity-75;
}

.restore-prompt-container {
  @apply relative w-full max-w-md;
}

.restore-prompt {
  @apply bg-white rounded-lg shadow-xl p-6;
}

.btn {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors;
}

.btn-primary {
  @apply text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-blue-500;
}
</style>