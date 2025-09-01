<template>
  <div class="max-w-4xl mx-auto" ref="formContainer">
    <!-- Screen Reader Only Content -->
    <div class="sr-only">
      <h1>{{ isEditing ? 'Edit' : 'Create' }} {{ getDirectorTypeLabel(directorType) }} Profile Form</h1>
      <p>{{ isEditing ? 'Update the information below' : 'Fill in the details to create a new profile' }}</p>
    </div>

    <!-- Form Header with proper heading hierarchy -->
    <header class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900" id="form-title">
        {{ isEditing ? 'Edit' : 'Create' }} {{ getDirectorTypeLabel(directorType) }}
      </h2>
      <p class="text-gray-600 mt-1" id="form-description">
        {{ isEditing ? 'Update the information below' : 'Fill in the details to create a new profile' }}
      </p>
    </header>

    <!-- Form Progress (for screen readers) -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      <p>Form completion: {{ completionPercentage }}%</p>
    </div>

    <!-- Success Alert with proper semantics -->
    <div
      v-if="showSuccess"
      role="alert"
      aria-live="assertive"
      class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
    >
      <div class="flex items-start">
        <CheckCircle 
          class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" 
          aria-hidden="true"
        />
        <div>
          <h3 class="text-sm font-medium text-green-800">Success</h3>
          <p class="text-sm text-green-700 mt-1">
            Profile saved successfully
          </p>
        </div>
      </div>
    </div>

    <!-- Main Form with proper labeling -->
    <form 
      @submit.prevent="handleSubmit" 
      class="space-y-8"
      ref="formRef"
      :aria-labelledby="formTitleId"
      :aria-describedby="formDescriptionId"
      novalidate
      role="form"
    >
      <!-- Error Summary for screen readers -->
      <div 
        v-if="hasErrors" 
        role="alert" 
        aria-live="assertive"
        class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        id="error-summary"
        tabindex="-1"
        ref="errorSummaryRef"
      >
        <h3 class="text-sm font-medium text-red-800 mb-2">
          Please correct the following {{ errorCount }} error{{ errorCount > 1 ? 's' : '' }}:
        </h3>
        <ul class="list-disc list-inside text-sm text-red-700 space-y-1">
          <li v-for="(error, field) in errors" :key="field">
            <a 
              :href="`#${field}-field`"
              class="text-red-700 underline hover:text-red-900"
              @click.prevent="focusField(field)"
            >
              {{ formatFieldName(field) }}: {{ error }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Photo Upload Section with accessibility -->
      <fieldset class="card p-6">
        <legend class="text-lg font-semibold text-gray-900 mb-4">
          Profile Photo
        </legend>
        
        <div :id="`image-field`" :ref="el => registerFieldRef('image', el)">
          <ProfileImageUpload
            :current-image="formData.image"
            :director-type="directorType"
            :director-id="profileId"
            @uploaded="handlePhotoUploaded"
            @removed="handlePhotoRemoved"
            @error="handlePhotoError"
            :aria-describedby="errors.image ? 'image-error' : undefined"
          />
          
          <!-- File ID Display -->
          <div v-if="uploadedFileId" class="mt-3" role="status" aria-live="polite">
            <p class="text-sm text-green-600 flex items-center">
              <CheckCircle class="w-4 h-4 mr-2" aria-hidden="true" />
              <span class="sr-only">Image uploaded successfully. </span>
              File ID: <span class="ml-1 font-mono text-green-700">{{ uploadedFileId }}</span>
            </p>
          </div>
          
          <!-- Image Error -->
          <div
            v-if="errors.image"
            :id="`image-error`"
            role="alert"
            class="mt-2 text-sm text-red-600 flex items-center"
          >
            <AlertCircle class="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
            {{ errors.image }}
          </div>
        </div>
      </fieldset>

      <!-- Basic Information with enhanced accessibility -->
      <fieldset class="card p-6">
        <legend class="text-lg font-semibold text-gray-900 mb-6">
          Basic Information
        </legend>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name Field -->
          <div :ref="el => registerFieldRef('name', el)">
            <FormField
              :id="getFieldId('name')"
              name="name"
              type="text"
              label="Full Name"
              placeholder="Enter full name"
              :required="true"
              :error="errors.name"
              :aria-invalid="!!errors.name"
              :aria-describedby="getAriaDescribedBy('name')"
              v-model="formData.name"
              @blur="validateField('name')"
              @input="clearFieldError('name')"
              autocomplete="name"
              :aria-required="true"
            />
          </div>

          <!-- Position Field -->
          <div :ref="el => registerFieldRef('position', el)">
            <FormField
              :id="getFieldId('position')"
              name="position"
              type="text"
              label="Position"
              placeholder="Enter position/title"
              :required="true"
              :error="errors.position"
              v-model="formData.position"
              @blur="validateField('position')"
              @input="clearFieldError('position')"
              autocomplete="organization-title"
            />
          </div>

          <!-- Email Field -->
          <div :ref="el => registerFieldRef('email', el)">
            <FormField
              :id="getFieldId('email')"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter email address"
              :required="true"
              :error="errors.email"
              v-model="formData.email"
              @blur="validateField('email')"
              @input="clearFieldError('email')"
              autocomplete="email"
              inputmode="email"
            />
          </div>

          <!-- Phone Field -->
          <div :ref="el => registerFieldRef('phone', el)">
            <FormField
              :id="getFieldId('phone')"
              name="phone"
              type="tel"
              label="Phone"
              placeholder="Enter phone number"
              :required="true"
              :error="errors.phone"
              v-model="formData.phone"
              @blur="validateField('phone')"
              @input="clearFieldError('phone')"
              autocomplete="tel"
              inputmode="tel"
              help-text="Format: +94 77 123 4567 or 0771234567"
            />
          </div>

          <!-- LinkedIn Field -->
          <div class="md:col-span-2" :ref="el => registerFieldRef('linkedin', el)">
            <FormField
              :id="getFieldId('linkedin')"
              name="linkedin"
              type="url"
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/profile"
              :error="errors.linkedin"
              v-model="formData.linkedin"
              @blur="validateField('linkedin')"
              @input="clearFieldError('linkedin')"
              autocomplete="url"
              inputmode="url"
              help-text="Optional. Must be a valid LinkedIn profile URL."
            />
          </div>
        </div>
      </fieldset>

      <!-- Dynamic Fields Section -->
      <fieldset v-if="getTypeSpecificFields().length > 0" class="card p-6">
        <legend class="text-lg font-semibold text-gray-900 mb-6">
          Additional Information
        </legend>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <template v-for="field in getTypeSpecificFields()" :key="field.key">
            <div 
              :class="field.fullWidth ? 'md:col-span-2' : ''"
              :ref="el => registerFieldRef(field.key, el)"
            >
              <FormField
                :id="getFieldId(field.key)"
                :name="field.key"
                :type="field.type"
                :label="field.label"
                :placeholder="field.placeholder"
                :required="field.required"
                :options="field.options"
                :rows="field.type === 'textarea' ? 4 : undefined"
                :error="errors[field.key]"
                v-model="formData[field.key]"
                @blur="validateField(field.key)"
                @input="clearFieldError(field.key)"
              />
            </div>
          </template>
        </div>
      </fieldset>

      <!-- Settings Section -->
      <fieldset class="card p-6">
        <legend class="text-lg font-semibold text-gray-900 mb-6">
          Settings
        </legend>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Active Status -->
          <div :ref="el => registerFieldRef('isActive', el)">
            <FormField
              :id="getFieldId('isActive')"
              name="isActive"
              type="select"
              label="Status"
              :options="[
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ]"
              v-model="formData.isActive"
            />
          </div>

          <!-- Display Order -->
          <div :ref="el => registerFieldRef('order', el)">
            <FormField
              :id="getFieldId('order')"
              name="order"
              type="number"
              label="Display Order"
              placeholder="Enter display order"
              :min="1"
              v-model="formData.order"
              help-text="Lower numbers appear first in lists"
            />
          </div>
        </div>
      </fieldset>

      <!-- Form Actions with proper semantics -->
      <div class="flex justify-end space-x-4 py-6" role="group" aria-label="Form actions">
        <button
          type="button"
          @click="handleCancel"
          :disabled="isSubmitting"
          class="btn btn-secondary"
          :aria-describedby="isSubmitting ? 'submitting-status' : undefined"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn btn-primary"
          :aria-describedby="isSubmitting ? 'submitting-status' : undefined"
        >
          <Loader 
            v-if="isSubmitting" 
            class="w-4 h-4 mr-2 animate-spin" 
            aria-hidden="true"
          />
          <span class="sr-only" v-if="isSubmitting">Submitting form...</span>
          {{ isEditing ? 'Update Profile' : 'Create Profile' }}
        </button>
      </div>

      <!-- Hidden status for screen readers -->
      <div 
        id="submitting-status" 
        class="sr-only" 
        aria-live="polite"
      >
        <span v-if="isSubmitting">Form is being submitted...</span>
      </div>
    </form>
    
    <!-- Server Error Modal with accessibility -->
    <ServerErrorModal 
      :show="showServerErrorModal"
      :message="serverErrorMessage"
      @close="showServerErrorModal = false"
      role="alertdialog"
      aria-modal="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { 
  CheckCircle, 
  Loader,
  AlertCircle
} from 'lucide-vue-next'
import ProfileImageUpload from './ProfileImageUpload.vue'
import ServerErrorModal from './ServerErrorModal.vue'
import FormField from '../form/FormField.vue'
import { useAccessibility, useFormAccessibility } from '@/composables/useAccessibility'
import { useFormFocus } from '@/composables/useFormFocus'
import { validateForm as validateFormData, clearFieldError as clearError } from '@/utils/validation'
import { parseBackendError } from '@/utils/error-parser'
import { imageUploadApi } from '@/utils/directors-api'
import type { DirectorType, DirectorData } from '@/types'
import type { ProfileFormData, FormFieldConfig } from '@/types/forms'

// Props and Emits (same as original)
interface Props {
  directorType: DirectorType
  profileId?: string
  initialData?: Partial<DirectorData>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  success: [data: DirectorData]
  cancel: []
  error: [message: string]
}>()

// Accessibility composables
const { generateId, getFieldAttributes, getButtonAttributes } = useAccessibility()
const { announceValidation, announceSubmission } = useFormAccessibility()
const { registerFieldRef, focusField, focusFirstError } = useFormFocus()

// Form refs
const formContainer = ref<HTMLElement>()
const formRef = ref<HTMLFormElement>()
const errorSummaryRef = ref<HTMLElement>()

// Form State (same as original)
const formData = reactive<ProfileFormData>({
  name: '',
  position: '',
  email: '',
  phone: '',
  image: '',
  linkedin: '',
  isActive: true,
  order: 1,
})

const errors = reactive<Record<string, string>>({})
const showSuccess = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const uploadedFileId = ref<string>('')
const tempUploadedFileId = ref<string>('')
const showServerErrorModal = ref<boolean>(false)
const serverErrorMessage = ref<string>('')

// Accessibility IDs
const formTitleId = generateId('form-title')
const formDescriptionId = generateId('form-description')

// Computed properties for accessibility
const hasErrors = computed(() => Object.keys(errors).length > 0)
const errorCount = computed(() => Object.keys(errors).length)
const completionPercentage = computed(() => {
  const requiredFields = ['name', 'position', 'email', 'phone']
  const completedFields = requiredFields.filter(field => formData[field]?.toString().trim())
  return Math.round((completedFields.length / requiredFields.length) * 100)
})

// Accessibility helper functions
const getFieldId = (fieldName: string) => generateId(`${fieldName}-field`)

const getAriaDescribedBy = (fieldName: string) => {
  const ids = []
  if (errors[fieldName]) ids.push(`${fieldName}-error`)
  return ids.length > 0 ? ids.join(' ') : undefined
}

const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

// Rest of the component logic would be the same as the original ProfileForm...
// (Including all the validation, submission, and data management functions)

// Enhanced validation with accessibility announcements
const validateField = (fieldName: string) => {
  const error = validateFormData(formData, [fieldName])[fieldName]
  if (error) {
    errors[fieldName] = error
  } else {
    clearFieldError(fieldName)
  }
}

const clearFieldError = (fieldName: string) => {
  clearError(errors, fieldName)
}

// Enhanced form submission with accessibility
const handleSubmit = async () => {
  const validationErrors = validateFormData(formData, ['name', 'position', 'email', 'phone'])
  Object.assign(errors, validationErrors)

  // Announce validation results
  announceValidation(errors, true)

  if (hasErrors.value) {
    // Focus error summary and first error field
    await nextTick()
    errorSummaryRef.value?.focus()
    focusFirstError(errors)
    return
  }

  // Continue with submission...
  announceSubmission('submitting')
  isSubmitting.value = true

  try {
    // Actual submission logic here...
    announceSubmission('success', 'Profile saved successfully')
    showSuccess.value = true
    
    setTimeout(() => {
      emit('success', formData as any)
    }, 2000)
    
  } catch (error: any) {
    const parsedError = parseBackendError(error)
    
    if (parsedError.isValidationError) {
      Object.assign(errors, parsedError.fieldErrors)
      announceValidation(errors)
      focusFirstError(errors)
    } else {
      announceSubmission('error', 'Server error, please try again later')
      serverErrorMessage.value = 'Server error, please try again later'
      showServerErrorModal.value = true
    }
  } finally {
    isSubmitting.value = false
  }
}

// All other methods from original component...
// (Director type labels, field configurations, photo upload handlers, etc.)

const directorTypeLabels = {
  chairman: 'Chairman',
  boardMember: 'Board Member',
  director: 'Director', 
  deputyDirector: 'Deputy Director',
  assistantDirector: 'Assistant Director',
  provincialDirector: 'Provincial Director',
  provincialAssistant: 'Provincial Assistant',
  youthClubMember: 'Youth Club Member'
} as const

const getDirectorTypeLabel = (type: DirectorType): string => {
  return directorTypeLabels[type] || type
}

const getTypeSpecificFields = (): FormFieldConfig[] => {
  // Return empty for now - implement based on original ProfileForm logic
  return []
}

const handlePhotoUploaded = (data: { url: string; fileId: string }) => {
  formData.image = data.url
  uploadedFileId.value = data.fileId
  tempUploadedFileId.value = data.fileId
  announceSubmission('success', 'Image uploaded successfully')
}

const handlePhotoRemoved = () => {
  formData.image = ''
  uploadedFileId.value = ''
  tempUploadedFileId.value = ''
}

const handlePhotoError = (message: string) => {
  errors.image = message
}

const handleCancel = async () => {
  if (tempUploadedFileId.value) {
    try {
      await imageUploadApi.deleteUploadedImage(tempUploadedFileId.value)
    } catch (error) {
      console.warn('Failed to clean up uploaded photo:', error)
    }
  }
  emit('cancel')
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.required::after {
  content: " *";
  @apply text-red-500;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.btn {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors;
}

.btn-primary {
  @apply text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500;
}

.btn-secondary {
  @apply text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-primary-500;
}

.card {
  @apply bg-white shadow rounded-lg;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .btn {
    @apply border-2;
  }
  
  .card {
    @apply border-2 border-gray-300;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>