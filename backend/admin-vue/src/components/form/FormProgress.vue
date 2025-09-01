<template>
  <div class="form-progress">
    <!-- Progress Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h3 v-if="title" class="text-lg font-medium text-gray-900">
          {{ title }}
        </h3>
        <span class="text-sm text-gray-500">
          Step {{ currentStep }} of {{ totalSteps }}
        </span>
      </div>
      
      <!-- Overall Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          class="bg-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${overallProgress}%` }"
        />
      </div>
    </div>

    <!-- Step Navigation -->
    <nav aria-label="Progress" class="mb-8">
      <ol class="flex items-center justify-between">
        <li
          v-for="(step, index) in steps"
          :key="step.key"
          class="relative flex-1"
          :class="{ 'pr-8 sm:pr-20': index < steps.length - 1 }"
        >
          <!-- Step Content -->
          <div class="flex items-center">
            <!-- Step Circle -->
            <div
              class="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200"
              :class="getStepCircleClass(step, index)"
            >
              <!-- Completed -->
              <CheckCircle
                v-if="step.status === 'completed'"
                class="h-5 w-5 text-white"
                aria-hidden="true"
              />
              <!-- Current -->
              <div
                v-else-if="step.status === 'current'"
                class="h-2.5 w-2.5 rounded-full bg-white"
              />
              <!-- Pending/Error -->
              <span
                v-else
                class="text-sm font-medium"
                :class="getStepNumberClass(step)"
              >
                {{ index + 1 }}
              </span>
            </div>
            
            <!-- Step Label -->
            <div class="ml-4 min-w-0 flex-1">
              <p
                class="text-sm font-medium transition-colors duration-200"
                :class="getStepLabelClass(step)"
              >
                {{ step.title }}
              </p>
              <p
                v-if="step.description"
                class="text-xs transition-colors duration-200"
                :class="getStepDescriptionClass(step)"
              >
                {{ step.description }}
              </p>
            </div>
          </div>

          <!-- Connector Line -->
          <div
            v-if="index < steps.length - 1"
            class="absolute top-4 left-8 -ml-px mt-0.5 h-full w-0.5 transition-colors duration-200"
            :class="getConnectorClass(step, steps[index + 1])"
            aria-hidden="true"
          />
        </li>
      </ol>
    </nav>

    <!-- Current Step Details -->
    <div v-if="currentStepData" class="current-step-info">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <InfoIcon class="h-5 w-5 text-blue-600" />
          </div>
          <div class="ml-3">
            <h4 class="text-sm font-medium text-blue-900">
              {{ currentStepData.title }}
            </h4>
            <p v-if="currentStepData.description" class="text-sm text-blue-700 mt-1">
              {{ currentStepData.description }}
            </p>
            <div v-if="currentStepData.fields" class="mt-2">
              <p class="text-xs text-blue-600 font-medium mb-1">Required fields:</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="field in currentStepData.fields"
                  :key="field"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                >
                  {{ formatFieldName(field) }}
                  <CheckCircle
                    v-if="isFieldCompleted(field)"
                    class="ml-1 h-3 w-3 text-green-600"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step Completion Summary -->
    <div v-if="showSummary && completedSteps > 0" class="mt-6">
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center">
          <CheckCircle class="h-5 w-5 text-green-600" />
          <div class="ml-3">
            <h4 class="text-sm font-medium text-green-900">
              Progress Summary
            </h4>
            <p class="text-sm text-green-700">
              {{ completedSteps }} of {{ totalSteps }} steps completed
              <span v-if="estimatedTimeRemaining">
                • {{ estimatedTimeRemaining }} remaining
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, Info as InfoIcon, AlertCircle, Clock } from 'lucide-vue-next'

export type StepStatus = 'pending' | 'current' | 'completed' | 'error' | 'skipped'

export interface FormStep {
  key: string
  title: string
  description?: string
  status: StepStatus
  fields?: string[]
  optional?: boolean
  estimatedTime?: number // in minutes
}

interface Props {
  steps: FormStep[]
  currentStep: number
  title?: string
  showSummary?: boolean
  formData?: Record<string, any>
  validationErrors?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  showSummary: true,
  formData: () => ({}),
  validationErrors: () => ({})
})

// Computed properties
const totalSteps = computed(() => props.steps.length)

const completedSteps = computed(() => 
  props.steps.filter(step => step.status === 'completed').length
)

const overallProgress = computed(() => {
  if (totalSteps.value === 0) return 0
  return Math.round((completedSteps.value / totalSteps.value) * 100)
})

const currentStepData = computed(() => 
  props.steps.find(step => step.status === 'current')
)

const estimatedTimeRemaining = computed(() => {
  const remainingSteps = props.steps.filter(step => 
    step.status === 'pending' || step.status === 'current'
  )
  
  const totalMinutes = remainingSteps.reduce((sum, step) => 
    sum + (step.estimatedTime || 2), 0
  )
  
  if (totalMinutes < 1) return null
  if (totalMinutes < 60) return `${totalMinutes} min`
  
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
})

// Helper functions
const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

const isFieldCompleted = (fieldName: string): boolean => {
  const value = props.formData[fieldName]
  return value !== undefined && value !== null && value !== ''
}

const getStepCircleClass = (step: FormStep, index: number): string => {
  const baseClass = 'border-2 transition-all duration-200'
  
  switch (step.status) {
    case 'completed':
      return `${baseClass} border-primary-600 bg-primary-600`
    case 'current':
      return `${baseClass} border-primary-600 bg-primary-600`
    case 'error':
      return `${baseClass} border-red-500 bg-red-500`
    case 'skipped':
      return `${baseClass} border-gray-300 bg-gray-100`
    default:
      return `${baseClass} border-gray-300 bg-white`
  }
}

const getStepNumberClass = (step: FormStep): string => {
  switch (step.status) {
    case 'error':
      return 'text-white'
    case 'skipped':
      return 'text-gray-500'
    default:
      return 'text-gray-500'
  }
}

const getStepLabelClass = (step: FormStep): string => {
  switch (step.status) {
    case 'completed':
    case 'current':
      return 'text-primary-600'
    case 'error':
      return 'text-red-600'
    case 'skipped':
      return 'text-gray-400'
    default:
      return 'text-gray-500'
  }
}

const getStepDescriptionClass = (step: FormStep): string => {
  switch (step.status) {
    case 'completed':
    case 'current':
      return 'text-primary-500'
    case 'error':
      return 'text-red-500'
    case 'skipped':
      return 'text-gray-400'
    default:
      return 'text-gray-400'
  }
}

const getConnectorClass = (currentStep: FormStep, nextStep: FormStep): string => {
  if (currentStep.status === 'completed') {
    return 'bg-primary-600'
  } else if (currentStep.status === 'error') {
    return 'bg-red-500'
  } else {
    return 'bg-gray-200'
  }
}
</script>

<style scoped>
.form-progress {
  @apply w-full;
}

/* Custom animations */
@keyframes pulse-success {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-success {
  animation: pulse-success 2s infinite;
}
</style>