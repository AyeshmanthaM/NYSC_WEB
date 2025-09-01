<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Background overlay -->
    <div 
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="handleBackdropClick"
    ></div>

    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-6xl"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-white px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900" id="modal-title">
              {{ modalTitle }}
            </h3>
            <button
              @click="handleClose"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="bg-gray-50 px-6 py-6">
          <ProfileForm
            :director-type="directorType"
            :profile-id="profileId"
            :initial-data="initialData"
            @success="handleSuccess"
            @cancel="handleCancel"
            @error="handleError"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { X } from 'lucide-vue-next'
import ProfileForm from './ProfileForm.vue'
import type { DirectorType, DirectorData } from '@/types'

interface Props {
  isOpen: boolean
  directorType: DirectorType
  profileId?: string
  initialData?: Partial<DirectorData>
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  success: [data: DirectorData]
  cancel: []
  error: [message: string]
}>()

// Computed properties
const modalTitle = computed(() => {
  const typeLabels = {
    chairman: 'Chairman',
    boardMember: 'Board Member',
    director: 'Director',
    deputyDirector: 'Deputy Director',
    assistantDirector: 'Assistant Director',
    provincialDirector: 'Provincial Director',
    provincialAssistant: 'Provincial Assistant',
    youthClubMember: 'Youth Club Member'
  } as const

  const action = props.profileId ? 'Edit' : 'Create'
  const type = typeLabels[props.directorType] || props.directorType
  
  return `${action} ${type}`
})

// Event handlers
const handleClose = () => {
  emit('update:isOpen', false)
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    handleClose()
  }
}

const handleSuccess = (data: DirectorData) => {
  emit('success', data)
  handleClose()
}

const handleCancel = () => {
  emit('cancel')
  handleClose()
}

const handleError = (message: string) => {
  emit('error', message)
  // Don't close modal on error to allow user to fix issues
}

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Clean up on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Ensure modal appears above everything */
.fixed {
  z-index: 1000;
}

/* Smooth transitions */
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar for modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Focus trap styling */
.modal-focus-trap:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>