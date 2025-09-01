import { ref, computed, reactive, watch } from 'vue'
import type { FormStep, StepStatus } from '@/components/form/FormProgress.vue'
import type { FormFieldError } from '@/types/forms'
import { validateForm } from '@/utils/validation'

interface MultiStepConfig {
  steps: Omit<FormStep, 'status'>[]
  validateStepOnChange?: boolean
  allowSkipOptional?: boolean
  autoSave?: boolean
  persistToStorage?: boolean
  storageKey?: string
}

/**
 * Composable for managing multi-step forms
 */
export function useMultiStepForm(config: MultiStepConfig) {
  const {
    steps: initialSteps,
    validateStepOnChange = true,
    allowSkipOptional = true,
    autoSave = false,
    persistToStorage = false,
    storageKey = 'multi-step-form'
  } = config

  // State
  const currentStepIndex = ref(0)
  const steps = ref<FormStep[]>(
    initialSteps.map((step, index) => ({
      ...step,
      status: index === 0 ? 'current' : 'pending'
    }))
  )

  const formData = reactive<Record<string, any>>({})
  const stepErrors = reactive<Record<string, FormFieldError>>({})
  const completedSteps = ref<Set<number>>(new Set())
  const visitedSteps = ref<Set<number>>(new Set([0]))

  // Computed properties
  const currentStep = computed(() => currentStepIndex.value + 1)
  const totalSteps = computed(() => steps.value.length)
  const isFirstStep = computed(() => currentStepIndex.value === 0)
  const isLastStep = computed(() => currentStepIndex.value === totalSteps.value - 1)
  
  const currentStepData = computed(() => steps.value[currentStepIndex.value])
  const canProceed = computed(() => validateCurrentStep())
  const canGoBack = computed(() => !isFirstStep.value)

  const progress = computed(() => {
    const completed = completedSteps.value.size
    return Math.round((completed / totalSteps.value) * 100)
  })

  const allStepsCompleted = computed(() => 
    completedSteps.value.size === totalSteps.value
  )

  // Load from storage if enabled
  const loadFromStorage = () => {
    if (!persistToStorage) return
    
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(formData, parsed.formData || {})
        currentStepIndex.value = parsed.currentStepIndex || 0
        completedSteps.value = new Set(parsed.completedSteps || [])
        visitedSteps.value = new Set(parsed.visitedSteps || [0])
        
        // Update step statuses
        updateStepStatuses()
      }
    } catch (error) {
      console.warn('Failed to load form data from storage:', error)
    }
  }

  // Save to storage if enabled
  const saveToStorage = () => {
    if (!persistToStorage) return
    
    try {
      const dataToSave = {
        formData: { ...formData },
        currentStepIndex: currentStepIndex.value,
        completedSteps: Array.from(completedSteps.value),
        visitedSteps: Array.from(visitedSteps.value)
      }
      localStorage.setItem(storageKey, JSON.stringify(dataToSave))
    } catch (error) {
      console.warn('Failed to save form data to storage:', error)
    }
  }

  // Update step statuses based on current state
  const updateStepStatuses = () => {
    steps.value.forEach((step, index) => {
      if (index === currentStepIndex.value) {
        step.status = 'current'
      } else if (completedSteps.value.has(index)) {
        step.status = 'completed'
      } else if (stepErrors.value[step.key]) {
        step.status = 'error'
      } else if (visitedSteps.value.has(index) && step.optional && allowSkipOptional) {
        step.status = 'skipped'
      } else {
        step.status = 'pending'
      }
    })
  }

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const step = currentStepData.value
    if (!step || !step.fields) return true

    const requiredFields = step.fields.filter(field => {
      // Check if field is actually required (not optional)
      return !step.optional
    })

    const errors = validateForm(formData, requiredFields)
    stepErrors.value[step.key] = errors

    return Object.keys(errors).length === 0
  }

  // Validate specific step
  const validateStep = (stepIndex: number): boolean => {
    const step = steps.value[stepIndex]
    if (!step || !step.fields) return true

    const requiredFields = step.fields.filter(field => !step.optional)
    const errors = validateForm(formData, requiredFields)
    stepErrors.value[step.key] = errors

    return Object.keys(errors).length === 0
  }

  // Go to next step
  const nextStep = (): boolean => {
    if (isLastStep.value) return false

    const currentValid = validateCurrentStep()
    if (!currentValid && !currentStepData.value.optional) {
      return false
    }

    // Mark current step as completed if valid
    if (currentValid) {
      completedSteps.value.add(currentStepIndex.value)
    }

    currentStepIndex.value++
    visitedSteps.value.add(currentStepIndex.value)
    updateStepStatuses()

    if (autoSave) saveToStorage()
    return true
  }

  // Go to previous step
  const previousStep = (): boolean => {
    if (isFirstStep.value) return false

    currentStepIndex.value--
    updateStepStatuses()

    if (autoSave) saveToStorage()
    return true
  }

  // Go to specific step
  const goToStep = (stepIndex: number): boolean => {
    if (stepIndex < 0 || stepIndex >= totalSteps.value) return false

    // Check if we can navigate to this step
    if (stepIndex > currentStepIndex.value) {
      // Moving forward - validate all steps in between
      for (let i = currentStepIndex.value; i < stepIndex; i++) {
        if (!validateStep(i) && !steps.value[i].optional) {
          return false
        }
        completedSteps.value.add(i)
      }
    }

    currentStepIndex.value = stepIndex
    visitedSteps.value.add(stepIndex)
    updateStepStatuses()

    if (autoSave) saveToStorage()
    return true
  }

  // Skip current step (if optional)
  const skipStep = (): boolean => {
    if (!currentStepData.value.optional || !allowSkipOptional) return false
    
    // Mark as skipped and move to next
    steps.value[currentStepIndex.value].status = 'skipped'
    return nextStep()
  }

  // Reset form
  const resetForm = () => {
    currentStepIndex.value = 0
    completedSteps.value.clear()
    visitedSteps.value.clear()
    visitedSteps.value.add(0)
    
    Object.keys(formData).forEach(key => {
      delete formData[key]
    })
    
    Object.keys(stepErrors.value).forEach(key => {
      delete stepErrors.value[key]
    })

    steps.value.forEach((step, index) => {
      step.status = index === 0 ? 'current' : 'pending'
    })

    if (persistToStorage) {
      localStorage.removeItem(storageKey)
    }
  }

  // Get step data
  const getStepData = (stepKey: string) => {
    const step = steps.value.find(s => s.key === stepKey)
    if (!step || !step.fields) return {}

    const stepData: Record<string, any> = {}
    step.fields.forEach(field => {
      if (formData[field] !== undefined) {
        stepData[field] = formData[field]
      }
    })
    return stepData
  }

  // Set step data
  const setStepData = (stepKey: string, data: Record<string, any>) => {
    Object.assign(formData, data)
    
    // Revalidate current step if it matches
    if (currentStepData.value.key === stepKey && validateStepOnChange) {
      validateCurrentStep()
      updateStepStatuses()
    }

    if (autoSave) saveToStorage()
  }

  // Get errors for specific step
  const getStepErrors = (stepKey: string): FormFieldError => {
    return stepErrors.value[stepKey] || {}
  }

  // Clear errors for specific step
  const clearStepErrors = (stepKey: string) => {
    delete stepErrors.value[stepKey]
    updateStepStatuses()
  }

  // Check if step is accessible
  const isStepAccessible = (stepIndex: number): boolean => {
    if (stepIndex <= currentStepIndex.value) return true
    
    // Check if all previous required steps are completed
    for (let i = 0; i < stepIndex; i++) {
      const step = steps.value[i]
      if (!step.optional && !completedSteps.value.has(i)) {
        return false
      }
    }
    return true
  }

  // Watch for form data changes
  watch(formData, () => {
    if (validateStepOnChange) {
      validateCurrentStep()
      updateStepStatuses()
    }
    if (autoSave) {
      saveToStorage()
    }
  }, { deep: true })

  // Initialize
  loadFromStorage()

  return {
    // State
    currentStepIndex,
    currentStep,
    totalSteps,
    steps,
    formData,
    stepErrors,
    
    // Computed
    isFirstStep,
    isLastStep,
    currentStepData,
    canProceed,
    canGoBack,
    progress,
    allStepsCompleted,
    
    // Methods
    nextStep,
    previousStep,
    goToStep,
    skipStep,
    resetForm,
    validateCurrentStep,
    validateStep,
    getStepData,
    setStepData,
    getStepErrors,
    clearStepErrors,
    isStepAccessible,
    saveToStorage,
    loadFromStorage
  }
}