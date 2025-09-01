<template>
  <div :class="containerClass" ref="fieldContainer">
    <!-- Label -->
    <label 
      v-if="label"
      :for="fieldId"
      class="form-label"
      :class="{ 'required': required }"
    >
      {{ label }}
    </label>
    
    <!-- Help text (above input) -->
    <p v-if="helpText && helpPosition === 'top'" class="text-xs text-gray-500 mb-1">
      {{ helpText }}
    </p>
    
    <!-- Input Field -->
    <div class="relative">
      <!-- Text, Email, Tel, URL, Number Input -->
      <input
        v-if="['text', 'email', 'tel', 'url', 'number', 'password'].includes(type)"
        :id="fieldId"
        :type="type"
        :name="name"
        v-model="localValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :minlength="minLength"
        :maxlength="maxLength"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${fieldId}-error` : undefined"
        class="form-input"
        :class="inputClass"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Textarea -->
      <textarea
        v-else-if="type === 'textarea'"
        :id="fieldId"
        :name="name"
        v-model="localValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :minlength="minLength"
        :maxlength="maxLength"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${fieldId}-error` : undefined"
        class="form-input"
        :class="inputClass"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Select -->
      <select
        v-else-if="type === 'select'"
        :id="fieldId"
        :name="name"
        v-model="localValue"
        :required="required"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${fieldId}-error` : undefined"
        class="form-input"
        :class="inputClass"
        @change="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option v-if="placeholder" value="">{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Checkbox -->
      <div v-else-if="type === 'checkbox'" class="flex items-center">
        <input
          :id="fieldId"
          type="checkbox"
          :name="name"
          v-model="localValue"
          :required="required"
          :disabled="disabled"
          :aria-invalid="!!error"
          :aria-describedby="error ? `${fieldId}-error` : undefined"
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          :class="{ 'border-red-500': error }"
          @change="handleInput"
        />
        <label :for="fieldId" class="ml-2 block text-sm text-gray-900">
          {{ checkboxLabel || label }}
        </label>
      </div>
      
      <!-- Success/Error Icons -->
      <div 
        v-if="showStatusIcon && !disabled && !readonly"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <CheckCircle 
          v-if="showSuccess && !error" 
          class="h-5 w-5 text-green-500"
        />
        <XCircle 
          v-else-if="error" 
          class="h-5 w-5 text-red-500"
        />
      </div>
      
      <!-- Character Counter -->
      <div 
        v-if="showCharCounter && maxLength && ['text', 'textarea'].includes(type)"
        class="absolute bottom-0 right-0 -mb-5 text-xs"
        :class="charCounterClass"
      >
        {{ charCount }} / {{ maxLength }}
      </div>
    </div>
    
    <!-- Error Message -->
    <p 
      v-if="error"
      :id="`${fieldId}-error`"
      class="mt-1 text-sm text-red-600 flex items-center"
    >
      <AlertCircle class="w-4 h-4 mr-1 flex-shrink-0" />
      {{ error }}
    </p>
    
    <!-- Help text (below input) -->
    <p 
      v-if="helpText && helpPosition === 'bottom' && !error" 
      class="mt-1 text-xs text-gray-500"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-vue-next'

interface Option {
  value: string | number
  label: string
}

interface Props {
  // Field configuration
  name: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'password' | 'textarea' | 'select' | 'checkbox'
  label?: string
  placeholder?: string
  helpText?: string
  helpPosition?: 'top' | 'bottom'
  
  // Validation
  required?: boolean
  error?: string
  pattern?: string
  min?: number | string
  max?: number | string
  minLength?: number
  maxLength?: number
  
  // State
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  
  // Styling
  containerClass?: string
  fullWidth?: boolean
  
  // Select options
  options?: Option[]
  
  // Textarea
  rows?: number
  
  // Checkbox
  checkboxLabel?: string
  
  // Features
  showStatusIcon?: boolean
  showSuccess?: boolean
  showCharCounter?: boolean
  autocomplete?: string
  
  // Validation triggers
  validateOnBlur?: boolean
  validateOnInput?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  helpPosition: 'bottom',
  rows: 4,
  showStatusIcon: true,
  showSuccess: false,
  showCharCounter: false,
  validateOnBlur: true,
  validateOnInput: false,
  fullWidth: false
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'input': [value: any]
  'validate': []
}>()

// Local state
const localValue = ref(props.modelValue)
const fieldContainer = ref<HTMLElement>()
const isFocused = ref(false)

// Generate unique field ID
const fieldId = computed(() => `field-${props.name}-${Math.random().toString(36).substr(2, 9)}`)

// Character count
const charCount = computed(() => {
  if (typeof localValue.value === 'string') {
    return localValue.value.length
  }
  return 0
})

// Character counter class
const charCounterClass = computed(() => {
  if (!props.maxLength) return 'text-gray-500'
  
  const percentage = (charCount.value / props.maxLength) * 100
  if (percentage >= 100) return 'text-red-600 font-medium'
  if (percentage >= 90) return 'text-orange-600'
  if (percentage >= 75) return 'text-yellow-600'
  return 'text-gray-500'
})

// Container classes
const containerClass = computed(() => {
  const classes = []
  if (props.fullWidth) classes.push('w-full')
  if (props.containerClass) classes.push(props.containerClass)
  return classes.join(' ')
})

// Input classes
const inputClass = computed(() => {
  const classes = []
  
  if (props.error) {
    classes.push('border-red-500', 'focus:border-red-500', 'focus:ring-red-500')
  } else if (props.showSuccess && localValue.value && !isFocused.value) {
    classes.push('border-green-500', 'focus:border-green-500', 'focus:ring-green-500')
  }
  
  if (props.disabled) {
    classes.push('bg-gray-50', 'cursor-not-allowed')
  }
  
  if (props.readonly) {
    classes.push('bg-gray-50')
  }
  
  // Add padding for status icon
  if (props.showStatusIcon && (props.error || props.showSuccess)) {
    classes.push('pr-10')
  }
  
  return classes.join(' ')
})

// Handlers
const handleInput = (event: Event | any) => {
  const value = event?.target?.value ?? event
  localValue.value = value
  emit('update:modelValue', value)
  emit('input', value)
  
  if (props.validateOnInput) {
    emit('validate')
  }
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
  
  if (props.validateOnBlur) {
    emit('validate')
  }
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

// Watch for external model changes
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

// Expose field container for focus management
defineExpose({
  fieldContainer,
  focus: () => {
    const input = fieldContainer.value?.querySelector('input, textarea, select') as HTMLElement
    input?.focus()
  }
})
</script>

<style scoped>
.required::after {
  content: " *";
  @apply text-red-500;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-input {
  @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors;
}

textarea.form-input {
  @apply resize-y;
}
</style>