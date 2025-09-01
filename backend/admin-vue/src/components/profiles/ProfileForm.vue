<template>
  <div class="max-w-4xl mx-auto">
    <!-- Form Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ isEditing ? 'Edit' : 'Create' }} {{ getDirectorTypeLabel(directorType) }}
      </h2>
      <p class="text-gray-600 mt-1">
        {{ isEditing ? 'Update the information below' : 'Fill in the details to create a new profile' }}
      </p>
    </div>

    <!-- Success Alert -->
    <div
      v-if="showSuccess"
      class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
    >
      <div class="flex items-start">
        <CheckCircle class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 class="text-sm font-medium text-green-800">Success</h3>
          <p class="text-sm text-green-700 mt-1">
            Profile saved successfully
          </p>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Photo Upload Section -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
        <ProfileImageUpload
          :current-image="formData.image"
          :director-type="directorType"
          :director-id="profileId"
          @uploaded="handlePhotoUploaded"
          @removed="handlePhotoRemoved"
          @error="handlePhotoError"
        />
        <!-- Display current file ID if photo uploaded -->
        <div v-if="uploadedFileId" class="mt-3">
          <p class="text-sm text-green-600 flex items-center">
            <CheckCircle class="w-4 h-4 mr-2" />
            File ID: <span class="ml-1 font-mono text-green-700">{{ uploadedFileId }}</span>
          </p>
        </div>
        <!-- Display image upload error if any -->
        <p v-if="errors.image" class="mt-2 text-sm text-red-600">{{ errors.image }}</p>
      </div>

      <!-- Basic Information -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div>
            <label class="form-label required">Full Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="form-input"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name }"
              placeholder="Enter full name"
              required
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Position -->
          <div>
            <label class="form-label required">Position</label>
            <input
              v-model="formData.position"
              type="text"
              class="form-input"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.position }"
              placeholder="Enter position/title"
              required
            />
            <p v-if="errors.position" class="mt-1 text-sm text-red-600">{{ errors.position }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="form-label required">Email</label>
            <input
              v-model="formData.email"
              type="email"
              class="form-input"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }"
              placeholder="Enter email address"
              required
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Phone -->
          <div>
            <label class="form-label required">Phone</label>
            <input
              v-model="formData.phone"
              type="tel"
              class="form-input"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.phone }"
              placeholder="Enter phone number"
              required
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- LinkedIn (Optional) -->
          <div class="md:col-span-2">
            <label class="form-label">LinkedIn Profile</label>
            <input
              v-model="formData.linkedin"
              type="url"
              class="form-input"
              :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.linkedin }"
              placeholder="https://linkedin.com/in/profile"
            />
            <p v-if="errors.linkedin" class="mt-1 text-sm text-red-600">{{ errors.linkedin }}</p>
          </div>
        </div>
      </div>

      <!-- Director Type Specific Fields -->
      <div class="card p-6" v-if="getTypeSpecificFields().length > 0">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Additional Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Dynamic fields based on director type -->
          <template v-for="field in getTypeSpecificFields()" :key="field.key">
            <div :class="field.fullWidth ? 'md:col-span-2' : ''">
              <label class="form-label" :class="{ required: field.required }">
                {{ field.label }}
              </label>
              
              <!-- Text Input -->
              <input
                v-if="field.type === 'text' || field.type === 'email' || field.type === 'url'"
                v-model="formData[field.key]"
                :type="field.type"
                class="form-input"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors[field.key] }"
                :placeholder="field.placeholder"
                :required="field.required"
              />
              
              <!-- Textarea -->
              <textarea
                v-else-if="field.type === 'textarea'"
                v-model="formData[field.key]"
                class="form-input"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors[field.key] }"
                :placeholder="field.placeholder"
                :required="field.required"
                rows="4"
              ></textarea>
              
              <!-- Select -->
              <select
                v-else-if="field.type === 'select'"
                v-model="formData[field.key]"
                class="form-input"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors[field.key] }"
                :required="field.required"
              >
                <option value="">Select {{ field.label }}</option>
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              
              <!-- Number Input -->
              <input
                v-else-if="field.type === 'number'"
                v-model.number="formData[field.key]"
                type="number"
                class="form-input"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors[field.key] }"
                :placeholder="field.placeholder"
                :required="field.required"
              />

              <p v-if="errors[field.key]" class="mt-1 text-sm text-red-600">{{ errors[field.key] }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- Status and Order -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Active Status -->
          <div>
            <label class="form-label">Status</label>
            <select v-model="formData.isActive" class="form-input">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>

          <!-- Display Order -->
          <div>
            <label class="form-label">Display Order</label>
            <input
              v-model.number="formData.order"
              type="number"
              class="form-input"
              placeholder="Enter display order"
              min="1"
            />
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4 py-6">
        <button
          type="button"
          @click="handleCancel"
          :disabled="isSubmitting"
          class="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn btn-primary"
        >
          <Loader v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          {{ isEditing ? 'Update Profile' : 'Create Profile' }}
        </button>
      </div>
    </form>
    
    <!-- Server Error Modal -->
    <ServerErrorModal 
      :show="showServerErrorModal"
      :message="serverErrorMessage"
      @close="showServerErrorModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, onBeforeUnmount } from 'vue'
import { 
  CheckCircle, 
  Loader 
} from 'lucide-vue-next'
import ProfileImageUpload from './ProfileImageUpload.vue'
import ServerErrorModal from './ServerErrorModal.vue'
import { 
  imageUploadApi,
  chairmanApi,
  boardMembersApi,
  directorsApiService,
  deputyDirectorsApi,
  assistantDirectorsApi,
  provincialDirectorsApi,
  provincialAssistantsApi,
  youthClubApi
} from '@/utils/directors-api'
import type { DirectorType, DirectorData } from '@/types'
import type { 
  ProfileFormData, 
  FormFieldConfig, 
  BackendErrorResponse,
  FileUploadResult 
} from '@/types/forms'

// Props and Emits
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

// Form State
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
const tempUploadedFileId = ref<string>('') // Track temporarily uploaded files
const showServerErrorModal = ref<boolean>(false)
const serverErrorMessage = ref<string>('')

// Director type labels
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

// Helper function to get the correct API based on director type
const getDirectorApi = (type: DirectorType) => {
  const apiMap = {
    chairman: {
      getDirectorById: async (id: string) => chairmanApi.getChairman(),
      createDirector: async (data: any) => chairmanApi.updateChairman(data),
      updateDirector: async (id: string, data: any) => chairmanApi.updateChairman(data)
    },
    boardMember: boardMembersApi,
    director: directorsApiService,
    deputyDirector: deputyDirectorsApi,
    assistantDirector: assistantDirectorsApi,
    provincialDirector: provincialDirectorsApi,
    provincialAssistant: provincialAssistantsApi,
    youthClubMember: youthClubApi
  }
  
  return apiMap[type] as any
}

// Sri Lankan provinces for selects
const provinces = [
  { value: 'Western', label: 'Western Province' },
  { value: 'Central', label: 'Central Province' },
  { value: 'Southern', label: 'Southern Province' },
  { value: 'Northern', label: 'Northern Province' },
  { value: 'Eastern', label: 'Eastern Province' },
  { value: 'North Western', label: 'North Western Province' },
  { value: 'North Central', label: 'North Central Province' },
  { value: 'Uva', label: 'Uva Province' },
  { value: 'Sabaragamuwa', label: 'Sabaragamuwa Province' }
]

// Get director type label
const getDirectorTypeLabel = (type: DirectorType): string => {
  return directorTypeLabels[type] || type
}

// Get type-specific form fields
const getTypeSpecificFields = (): FormFieldConfig[] => {
  const baseFields = [
    {
      key: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter description or bio',
      required: true,
      fullWidth: true
    }
  ]

  switch (props.directorType) {
    case 'chairman':
      return [
        ...baseFields,
        {
          key: 'title',
          label: 'Official Title',
          type: 'text',
          placeholder: 'Enter official title',
          required: true
        },
        {
          key: 'tenure',
          label: 'Tenure Period',
          type: 'text',
          placeholder: 'e.g., 2021-2024'
        },
        {
          key: 'vision',
          label: 'Vision Statement',
          type: 'textarea',
          placeholder: 'Enter vision statement',
          fullWidth: true
        }
      ]

    case 'boardMember':
      return [
        ...baseFields,
        {
          key: 'badge',
          label: 'Badge/Special Recognition',
          type: 'text',
          placeholder: 'Enter badge or special recognition'
        }
      ]

    case 'director':
    case 'deputyDirector':
      return [
        ...baseFields,
        {
          key: 'department',
          label: 'Department',
          type: 'text',
          placeholder: 'Enter department',
          required: true
        },
        {
          key: 'specialization',
          label: 'Specialization',
          type: 'text',
          placeholder: 'Enter area of specialization'
        },
        {
          key: 'experience',
          label: 'Experience',
          type: 'text',
          placeholder: 'Years of experience or background'
        }
      ]

    case 'assistantDirector':
      return [
        ...baseFields,
        {
          key: 'department',
          label: 'Department',
          type: 'text',
          placeholder: 'Enter department',
          required: true
        },
        {
          key: 'region',
          label: 'Region',
          type: 'text',
          placeholder: 'Enter assigned region'
        },
        {
          key: 'specialization',
          label: 'Specialization',
          type: 'text',
          placeholder: 'Enter area of specialization'
        }
      ]

    case 'provincialDirector':
      return [
        ...baseFields,
        {
          key: 'province',
          label: 'Province',
          type: 'select',
          options: provinces,
          required: true
        },
        {
          key: 'headquarters',
          label: 'Headquarters',
          type: 'text',
          placeholder: 'Enter headquarters location'
        },
        {
          key: 'population',
          label: 'Population Served',
          type: 'text',
          placeholder: 'Enter population served'
        },
        {
          key: 'centers',
          label: 'Number of Centers',
          type: 'number',
          placeholder: 'Enter number of centers'
        }
      ]

    case 'provincialAssistant':
      return [
        {
          key: 'province',
          label: 'Province',
          type: 'select',
          options: provinces,
          required: true
        },
        {
          key: 'district',
          label: 'District',
          type: 'text',
          placeholder: 'Enter district',
          required: true
        },
        {
          key: 'headquarters',
          label: 'Headquarters',
          type: 'text',
          placeholder: 'Enter headquarters location'
        },
        {
          key: 'population',
          label: 'Population Served',
          type: 'text',
          placeholder: 'Enter population served'
        },
        {
          key: 'centers',
          label: 'Number of Centers',
          type: 'number',
          placeholder: 'Enter number of centers'
        },
        {
          key: 'specialization',
          label: 'Specialization',
          type: 'text',
          placeholder: 'Enter area of specialization'
        }
      ]

    case 'youthClubMember':
      return [
        ...baseFields,
        {
          key: 'teamRole',
          label: 'Team Role',
          type: 'text',
          placeholder: 'Enter role in team'
        },
        {
          key: 'age',
          label: 'Age',
          type: 'number',
          placeholder: 'Enter age'
        },
        {
          key: 'skills',
          label: 'Skills',
          type: 'text',
          placeholder: 'Enter skills or expertise'
        }
      ]

    default:
      return baseFields
  }
}

// Photo Upload Handlers
const handlePhotoUploaded = (data: FileUploadResult) => {
  formData.image = data.url
  uploadedFileId.value = data.fileId
  tempUploadedFileId.value = data.fileId // Track for potential cleanup
  
  // Clear any photo-related errors
  if (errors.image) {
    delete errors.image
  }
}

const handlePhotoRemoved = () => {
  formData.image = ''
  uploadedFileId.value = ''
  tempUploadedFileId.value = ''
}

const handlePhotoError = (message: string) => {
  // Show photo errors inline, not as server errors
  errors.image = message
}

// Validation
const validateForm = (): boolean => {
  // Clear previous errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  // Required field validation
  if (!formData.name?.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  if (!formData.position?.trim()) {
    errors.position = 'Position is required'
    isValid = false
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone is required'
    isValid = false
  }

  // LinkedIn URL validation
  if (formData.linkedin && !/^https?:\/\/.+/.test(formData.linkedin)) {
    errors.linkedin = 'Please enter a valid URL'
    isValid = false
  }

  // Type-specific validation
  const typeFields = getTypeSpecificFields()
  typeFields.forEach(field => {
    if (field.required && !formData[field.key]) {
      errors[field.key] = `${field.label} is required`
      isValid = false
    }
  })

  return isValid
}

// Helper function to handle validation errors from backend
const handleValidationErrors = (errorResponse: any) => {
  // Clear previous errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // Check if it's a validation error response
  if (errorResponse?.errors) {
    // Handle field-specific errors
    Object.keys(errorResponse.errors).forEach(field => {
      errors[field] = errorResponse.errors[field]
    })
    return true
  }
  
  // Check for validation error in message
  if (errorResponse?.message?.toLowerCase().includes('validation')) {
    // Parse validation errors from message if structured differently
    if (errorResponse.details) {
      Object.keys(errorResponse.details).forEach(field => {
        errors[field] = errorResponse.details[field]
      })
    }
    return true
  }
  
  return false
}

// Form Handlers
const handleSubmit = async () => {
  // Client-side validation first
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  
  // Clear any previous success/error states
  showSuccess.value = false
  showServerErrorModal.value = false
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  try {
    const api = getDirectorApi(props.directorType)
    if (!api) {
      throw new Error('Invalid director type')
    }

    // Include file ID if photo was uploaded
    if (uploadedFileId.value) {
      formData.imageFileId = uploadedFileId.value
    }

    let result: DirectorData
    if (isEditing.value && props.profileId) {
      result = await api.updateDirector(props.profileId, formData)
    } else {
      result = await api.createDirector(formData)
    }

    // Success - reset temp file tracking
    tempUploadedFileId.value = ''
    
    // Show success message
    showSuccess.value = true
    
    // Close form after 2 seconds
    setTimeout(() => {
      showSuccess.value = false
      emit('success', result)
      resetForm()
    }, 2000)

  } catch (error: any) {
    const errorData = error.response?.data
    
    // Check if it's a validation error
    if (error.response?.status === 400 || error.response?.status === 422) {
      if (!handleValidationErrors(errorData)) {
        // If we couldn't parse validation errors, show as server error
        serverErrorMessage.value = 'Server error, please try again later'
        showServerErrorModal.value = true
      }
      // Keep form open with existing data
    } else {
      // Server error - show popup
      serverErrorMessage.value = 'Server error, please try again later'
      showServerErrorModal.value = true
      emit('error', serverErrorMessage.value)
    }
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = async () => {
  // Clean up temporarily uploaded photo if exists
  if (tempUploadedFileId.value) {
    try {
      await imageUploadApi.deleteUploadedImage(tempUploadedFileId.value)
      console.log('Cleaned up uploaded photo:', tempUploadedFileId.value)
    } catch (error) {
      console.warn('Failed to clean up uploaded photo:', error)
    }
  }

  // Reset form state
  resetForm()
  emit('cancel')
}

// Reset form to initial state
const resetForm = () => {
  // Clear form data
  Object.keys(formData).forEach(key => {
    if (key === 'isActive') {
      formData[key] = true
    } else if (key === 'order') {
      formData[key] = 1
    } else {
      formData[key] = ''
    }
  })
  
  // Clear errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // Reset states
  uploadedFileId.value = ''
  tempUploadedFileId.value = ''
  showSuccess.value = false
  showServerErrorModal.value = false
}

// Load existing data if editing
const loadExistingData = async () => {
  if (!props.profileId) return

  try {
    isEditing.value = true
    const api = getDirectorApi(props.directorType)
    if (!api) return

    const data = await api.getDirectorById(props.profileId)
    
    // Populate form with existing data
    Object.keys(formData).forEach(key => {
      if (data[key] !== undefined) {
        formData[key] = data[key]
      }
    })

  } catch (error: any) {
    serverErrorMessage.value = 'Failed to load profile data'
    showServerErrorModal.value = true
  }
}

// Initialize component
onMounted(() => {
  if (props.initialData) {
    Object.assign(formData, props.initialData)
  }

  if (props.profileId) {
    loadExistingData()
  }
})

// Clear field error when user modifies the field
watch(formData, (newVal, oldVal) => {
  // Check which field changed and clear its error
  Object.keys(newVal).forEach(key => {
    if (newVal[key] !== oldVal[key] && errors[key]) {
      errors[key] = ''
    }
  })
}, { deep: true })

// Cleanup on unmount
onBeforeUnmount(async () => {
  // Clean up any temporary uploaded files
  if (tempUploadedFileId.value) {
    try {
      await imageUploadApi.deleteUploadedImage(tempUploadedFileId.value)
      console.log('Cleaned up temporary upload on unmount')
    } catch (error) {
      console.warn('Failed to clean up on unmount:', error)
    }
  }
})
</script>

<style scoped>
.required::after {
  content: " *";
  color: #ef4444;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-input {
  @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm;
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
</style>