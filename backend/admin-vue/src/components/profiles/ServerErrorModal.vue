<template>
  <!-- Modal Backdrop -->
  <Transition
    enter-active-class="transition-opacity ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
      @click="handleClose"
    />
  </Transition>

  <!-- Modal Panel -->
  <Transition
    enter-active-class="transition-all ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="transition-all ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-50 overflow-y-auto"
    >
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
          @click.stop
        >
          <!-- Error Icon -->
          <div>
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle class="h-6 w-6 text-red-600" />
            </div>
            
            <!-- Error Content -->
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                Server Error
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ message || 'Server error, please try again later' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-5 sm:mt-6">
            <button
              type="button"
              @click="handleClose"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

interface Props {
  show: boolean
  message?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}

// Close on Escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    handleClose()
  }
}

// Add/remove event listener
import { watchEffect } from 'vue'
watchEffect(() => {
  if (props.show) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})
</script>