<template>
  <div class="bg-white shadow rounded-lg">
    <!-- Form Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ isEditing ? 'Edit' : 'Create' }} {{ getDirectorTypeLabel(directorType) }}
      </h3>
      <p class="text-sm text-gray-600 mt-1">
        {{ isEditing ? 'Update the information below' : 'Fill in the details to create a new profile' }}
      </p>
    </div>

    <!-- Server Error Popup -->
    <div
      v-if="serverError"
      class="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <div class="flex items-start">
        <AlertCircle class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div class="flex-1">
          <h4 class="text-sm font-medium text-red-800">Server Error</h4>
          <p class="text-sm text-red-700 mt-1">{{ serverError }}</p>
        </div>
        <button
          @click="serverError = ''"
          class="ml-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
    >
      <div class="flex items-start">
        <CheckCircle class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
        <div class="flex-1">
          <h4 class="text-sm font-medium text-green-800">Success</h4>
          <p class="text-sm text-green-700 mt-1">{{ successMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div class="px-6 py-6">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Photo Upload Section -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Profile Photo</h4>
          
          <!-- Current Photo Display -->
          <div class="flex items-center space-x-4">
            <div class="relative">
              <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                <img 
                  v-if="currentPhotoPreview" 
                  :src="currentPhotoPreview" 
                  alt="Profile photo"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <User class="w-8 h-8" />
                </div>
              </div>
            </div>

            <!-- Upload Status and Controls -->
            <div class="flex-1 space-y-2">
              <!-- Upload Progress -->
              <div v-if="photoUploading" class="space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                  <Loader class="w-4 h-4 mr-2 animate-spin" />
                  Uploading photo...
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${uploadProgress}%` }"
                  />
                </div>
              </div>

              <!-- Upload Error -->
              <div v-else-if="photoError" class="text-sm text-red-600 flex items-center">
                <AlertCircle class="w-4 h-4 mr-2" />
                {{ photoError }}
              </div>

              <!-- Upload Success with File ID -->
              <div v-else-if="uploadedFileId" class="text-sm text-green-600 flex items-center">
                <CheckCircle class="w-4 h-4 mr-2" />
                File ID: <span class="ml-1 font-mono font-medium">{{ uploadedFileId }}</span>
              </div>

              <!-- No Photo Uploaded -->
              <div v-else-if="!formData.image" class="text-sm text-gray-500">
                No profile photo uploaded
              </div>

              <!-- Existing Photo -->
              <div v-else class="text-sm text-green-600 flex items-center">
                <CheckCircle class="w-4 h-4 mr-2" />
                Profile photo uploaded
              </div>

              <!-- Upload Button -->
              <div class="flex items-center space-x-3">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handlePhotoSelect"
                  class="hidden"
                />
                <button
                  type="button"
                  @click="triggerPhotoUpload"
                  :disabled="photoUploading"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload class="w-4 h-4 mr-2" />
                  {{ photoUploading ? 'Uploading...' : 'Choose & Upload Photo' }}
                </button>

                <!-- Remove Photo Button -->
                <button
                  v-if="formData.image && !photoUploading"
                  type="button"
                  @click="removePhoto"
                  class="inline-flex items-center px-3 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 class="w-4 h-4 mr-2" />
                  Remove Photo
                </button>
              </div>

              <!-- Upload Guidelines -->
              <div class="text-xs text-gray-500">
                <p>• Maximum file size: 5MB</p>
                <p>• Supported formats: JPG, PNG, WebP</p>
                <p>• Recommended dimensions: 400x400px or larger</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Basic Information -->
        <div class="space-y-6">
          <h4 class="text-md font-medium text-gray-900">Basic Information</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                :class="[
                  'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                  validationErrors.name 
                    ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                ]"
                placeholder="Enter full name"
                @input="clearFieldError('name')"
              />
              <p v-if="validationErrors.name" class="mt-1 text-sm text-red-600">
                {{ validationErrors.name }}
              </p>
            </div>

            <!-- Position Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Position <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.position"
                type="text"
                :class="[
                  'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                  validationErrors.position 
                    ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                ]"
                placeholder="Enter position/title"
                @input="clearFieldError('position')"
              />
              <p v-if="validationErrors.position" class="mt-1 text-sm text-red-600">
                {{ validationErrors.position }}
              </p>
            </div>

            <!-- Email Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.email"
                type="email"
                :class="[
                  'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                  validationErrors.email 
                    ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                ]"
                placeholder="Enter email address"
                @input="clearFieldError('email')"
              />
              <p v-if="validationErrors.email" class="mt-1 text-sm text-red-600">
                {{ validationErrors.email }}
              </p>
            </div>

            <!-- Phone Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Phone <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.phone"
                type="tel"
                :class="[
                  'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                  validationErrors.phone 
                    ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                ]"
                placeholder="Enter phone number"
                @input="clearFieldError('phone')"
              />
              <p v-if="validationErrors.phone" class="mt-1 text-sm text-red-600">
                {{ validationErrors.phone }}
              </p>
            </div>

            <!-- LinkedIn Field (Optional) -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile
              </label>
              <input
                v-model="formData.linkedin"
                type="url"
                :class="[
                  'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                  validationErrors.linkedin 
                    ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                ]"
                placeholder="https://linkedin.com/in/profile"
                @input="clearFieldError('linkedin')"
              />
              <p v-if="validationErrors.linkedin" class="mt-1 text-sm text-red-600">
                {{ validationErrors.linkedin }}
              </p>
            </div>
          </div>
        </div>

        <!-- Additional Information (Dynamic based on director type) -->
        <div v-if="additionalFields.length > 0" class="space-y-6">
          <h4 class="text-md font-medium text-gray-900">Additional Information</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <template v-for="field in additionalFields" :key="field.key">
              <div :class="field.fullWidth ? 'md:col-span-2' : ''">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ field.label }}
                  <span v-if="field.required" class="text-red-500">*</span>
                </label>
                
                <!-- Text Input -->
                <input
                  v-if="field.type === 'text' || field.type === 'email' || field.type === 'url'"
                  v-model="formData[field.key]"
                  :type="field.type"
                  :class="[
                    'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                    validationErrors[field.key] 
                      ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  ]"
                  :placeholder="field.placeholder"
                  @input="clearFieldError(field.key)"
                />
                
                <!-- Textarea -->
                <textarea
                  v-else-if="field.type === 'textarea'"
                  v-model="formData[field.key]"
                  :class="[
                    'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                    validationErrors[field.key] 
                      ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  ]"
                  :placeholder="field.placeholder"
                  rows="4"
                  @input="clearFieldError(field.key)"
                ></textarea>
                
                <!-- Select -->
                <select
                  v-else-if="field.type === 'select'"
                  v-model="formData[field.key]"
                  :class="[
                    'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                    validationErrors[field.key] 
                      ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  ]"
                  @change="clearFieldError(field.key)"
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
                  :class="[
                    'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm',
                    validationErrors[field.key] 
                      ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  ]"
                  :placeholder="field.placeholder"
                  @input="clearFieldError(field.key)"
                />

                <!-- Field Error Message -->
                <p v-if="validationErrors[field.key]" class="mt-1 text-sm text-red-600">
                  {{ validationErrors[field.key] }}
                </p>
              </div>
            </template>
          </div>
        </div>

        <!-- Settings -->
        <div class="space-y-6">
          <h4 class="text-md font-medium text-gray-900">Settings</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="formData.isActive"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>

            <!-- Display Order -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                v-model.number="formData.order"
                type="number"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter display order"
                min="1"
              />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="handleCancel"
            :disabled="isSubmitting"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Loader v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Update Profile' : 'Create Profile' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader, 
  User, 
  Upload, 
  Trash2 
} from 'lucide-vue-next'
import type { DirectorType, DirectorData } from '@/types'

// Props
interface Props {
  directorType: DirectorType
  profileId?: string
  initialData?: Partial<DirectorData>
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  success: [data: DirectorData]
  cancel: []
}>()

// Reactive form data
const formData = reactive<Record<string, any>>({
  name: '',
  position: '',
  email: '',
  phone: '',
  image: '',
  linkedin: '',
  isActive: true,
  order: 1,
})

// State management
const isSubmitting = ref(false)
const isEditing = ref(false)
const serverError = ref('')
const successMessage = ref('')
const validationErrors = reactive<Record<string, string>>({})

// Photo upload state
const photoUploading = ref(false)
const photoError = ref('')
const uploadProgress = ref(0)
const uploadedFileId = ref('')
const currentPhotoPreview = ref('')
const fileInput = ref<HTMLInputElement>()

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

// Computed properties
const getDirectorTypeLabel = (type: DirectorType): string => {
  return directorTypeLabels[type] || type
}

const additionalFields = computed(() => {
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
})

// Photo upload functions
const triggerPhotoUpload = () => {
  fileInput.value?.click()
}

const handlePhotoSelect = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // Validate file
  if (!validatePhotoFile(file)) return

  // Create preview
  createPhotoPreview(file)

  // Upload immediately
  await uploadPhoto(file)
}

const validatePhotoFile = (file: File): boolean => {
  // Clear previous errors
  photoError.value = ''

  // Check file type
  if (!file.type.startsWith('image/')) {
    photoError.value = 'Please select a valid image file'
    return false
  }

  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    photoError.value = 'File size must be less than 5MB'
    return false
  }

  return true
}

const createPhotoPreview = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    currentPhotoPreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const uploadPhoto = async (file: File) => {
  try {
    photoUploading.value = true
    photoError.value = ''
    uploadProgress.value = 0

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10
      }
    }, 100)

    // Create FormData
    const formData = new FormData()
    formData.append('image', file)
    if (props.profileId) {
      formData.append('directorId', props.profileId)
    }

    // Make API call
    const response = await fetch(`/admin/api/directors/${props.directorType}/upload-image`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })

    clearInterval(progressInterval)
    uploadProgress.value = 100

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Upload failed')
    }

    const result = await response.json()
    
    // Store the uploaded file info
    formData.image = result.data?.url || result.url
    uploadedFileId.value = result.data?.fileId || 'uploaded'

    // Clear file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }

  } catch (error: any) {
    photoError.value = error.message || 'Upload failed'
    currentPhotoPreview.value = ''
  } finally {
    photoUploading.value = false
    uploadProgress.value = 0
  }
}

const removePhoto = async () => {
  try {
    if (uploadedFileId.value && !isEditing.value) {
      // Delete uploaded file if it's a new upload
      await fetch(`/admin/api/directors/uploads/${uploadedFileId.value}`, {
        method: 'DELETE',
        credentials: 'include'
      })
    }

    // Clear photo state
    formData.image = ''
    uploadedFileId.value = ''
    currentPhotoPreview.value = ''
    photoError.value = ''
    
    if (fileInput.value) {
      fileInput.value.value = ''
    }

  } catch (error) {
    console.warn('Failed to delete uploaded photo:', error)
  }
}

// Form validation and error handling
const clearFieldError = (field: string) => {
  if (validationErrors[field]) {
    delete validationErrors[field]
  }
}

const clearAllErrors = () => {
  Object.keys(validationErrors).forEach(key => {
    delete validationErrors[key]
  })
  serverError.value = ''
  photoError.value = ''
}

const handleValidationErrors = (errors: Record<string, string>) => {
  // Clear existing errors
  Object.keys(validationErrors).forEach(key => {
    delete validationErrors[key]
  })

  // Set new validation errors
  Object.keys(errors).forEach(key => {
    validationErrors[key] = errors[key]
  })

  // Scroll to first error field
  nextTick(() => {
    const firstErrorField = document.querySelector('.border-red-500') as HTMLElement
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      firstErrorField.focus()
    }
  })
}

// Form submission
const handleSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  clearAllErrors()

  try {
    // Prepare form data for submission
    const submitData = { ...formData }
    
    // Include uploaded file ID if available
    if (uploadedFileId.value) {
      submitData.fileId = uploadedFileId.value
    }

    // Make API call
    const endpoint = isEditing.value && props.profileId
      ? `/admin/api/directors/${props.directorType}/${props.profileId}`
      : `/admin/api/directors/${props.directorType}`
    
    const method = isEditing.value ? 'PUT' : 'POST'

    const response = await fetch(endpoint, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitData)
    })

    const result = await response.json()

    if (!response.ok) {
      // Handle different types of errors
      if (response.status === 400 && result.errors) {
        // Validation errors - show field-specific errors
        handleValidationErrors(result.errors)
        return // Don't close form, keep errors visible
      } else {
        // Server error - show popup message
        serverError.value = result.message || 'Server error, please try again later'
        return // Don't close form, keep values intact
      }
    }

    // Success - show success message and close form
    successMessage.value = 'Profile saved successfully'
    
    // Close form after showing success message
    setTimeout(() => {
      emit('success', result.data || result)
    }, 2000)

  } catch (error: any) {
    // Network or other errors
    serverError.value = 'Network error, please check your connection and try again'
  } finally {
    isSubmitting.value = false
  }
}

// Cancel form
const handleCancel = async () => {
  // Clean up uploaded photo if it's a new upload
  if (uploadedFileId.value && !isEditing.value) {
    try {
      await fetch(`/admin/api/directors/uploads/${uploadedFileId.value}`, {
        method: 'DELETE',
        credentials: 'include'
      })
    } catch (error) {
      console.warn('Failed to clean up uploaded photo:', error)
    }
  }

  emit('cancel')
}

// Load existing data if editing
const loadExistingData = async () => {
  if (!props.profileId) return

  try {
    isEditing.value = true
    
    const response = await fetch(`/admin/api/directors/${props.directorType}/${props.profileId}`, {
      credentials: 'include'
    })

    if (!response.ok) {
      serverError.value = 'Failed to load profile data'
      return
    }

    const result = await response.json()
    const data = result.data || result

    // Populate form with existing data
    Object.keys(formData).forEach(key => {
      if (data[key] !== undefined) {
        formData[key] = data[key]
      }
    })

    // Set photo preview if image exists
    if (data.image) {
      currentPhotoPreview.value = data.image
    }

  } catch (error) {
    serverError.value = 'Failed to load profile data'
  }
}

// Initialize component
onMounted(() => {
  if (props.initialData) {
    Object.assign(formData, props.initialData)
    if (props.initialData.image) {
      currentPhotoPreview.value = props.initialData.image
    }
  }

  if (props.profileId) {
    loadExistingData()
  }
})
</script>

<style scoped>
/* Custom focus states for better accessibility */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Error state focus override */
.border-red-500:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Progress bar animation */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>