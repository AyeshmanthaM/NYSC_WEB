<template>
  <div class="space-y-4">
    <!-- Current Image Display -->
    <div class="flex items-center space-x-4">
      <div class="relative">
        <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          <img 
            v-if="currentImage || previewImage" 
            :src="previewImage || currentImage" 
            alt="Profile photo"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <User class="w-8 h-8" />
          </div>
        </div>
        
        <!-- Remove Image Button -->
        <button
          v-if="currentImage && !uploading"
          @click="removeImage"
          class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
          title="Remove image"
        >
          <X class="w-3 h-3" />
        </button>
      </div>

      <!-- Upload Status -->
      <div class="flex-1">
        <div v-if="uploading" class="space-y-2">
          <div class="flex items-center text-sm text-gray-600">
            <Loader class="w-4 h-4 mr-2 animate-spin" />
            Uploading image...
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-primary-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${uploadProgress}%` }"
            />
          </div>
        </div>
        
        <div v-else-if="error" class="text-sm text-red-600 flex items-center">
          <AlertCircle class="w-4 h-4 mr-2" />
          {{ error }}
        </div>
        
        <div v-else-if="!currentImage && !uploadedFileId" class="text-sm text-gray-500">
          No profile image uploaded
        </div>
        
        <div v-else-if="uploadedFileId" class="text-sm text-green-600 flex items-center">
          <CheckCircle class="w-4 h-4 mr-2" />
          File ID: <span class="ml-1 font-mono text-green-700">{{ uploadedFileId }}</span>
        </div>
        
        <div v-else class="text-sm text-green-600 flex items-center">
          <CheckCircle class="w-4 h-4 mr-2" />
          Profile image uploaded
        </div>
      </div>
    </div>

    <!-- Upload Controls -->
    <div class="space-y-3">
      <!-- File Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Upload New Profile Image
        </label>
        <div class="flex items-center space-x-3">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />
          <button
            @click="triggerFileInput"
            :disabled="uploading"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload class="w-4 h-4 mr-2" />
            {{ uploading ? 'Uploading...' : 'Choose & Upload Image' }}
          </button>
        </div>
      </div>

      <!-- File Info -->
      <div v-if="selectedFile" class="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">{{ selectedFile.name }}</p>
            <p>{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <button
            @click="clearSelection"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Upload Guidelines -->
      <div class="text-xs text-gray-500">
        <p>• Maximum file size: 5MB</p>
        <p>• Supported formats: JPG, PNG, WebP</p>
        <p>• Recommended dimensions: 400x400px or larger</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { 
  User, 
  Upload, 
  Save, 
  X, 
  Loader, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-vue-next'
import { imageUploadApi } from '@/utils/directors-api'
import type { DirectorType } from '@/types'

interface Props {
  currentImage?: string
  directorType: DirectorType
  directorId?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  uploaded: [data: { url: string; fileId: string }]
  removed: []
  error: [message: string]
}>()

const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File>()
const previewImage = ref<string>()
const uploading = ref(false)
const uploadProgress = ref(0)
const error = ref<string>()
const uploadedFileId = ref<string>()

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // Validate file
  if (!validateFile(file)) return

  selectedFile.value = file
  createPreview(file)
  error.value = undefined

  // Auto-upload immediately after selection
  await uploadImage()
}

const validateFile = (file: File): boolean => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select a valid image file'
    return false
  }

  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'File size must be less than 5MB'
    return false
  }

  return true
}

const createPreview = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const uploadImage = async () => {
  if (!selectedFile.value) return

  try {
    uploading.value = true
    error.value = undefined
    uploadProgress.value = 0

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10
      }
    }, 100)

    const result = await imageUploadApi.uploadImage(
      selectedFile.value,
      props.directorType,
      props.directorId
    )

    clearInterval(progressInterval)
    uploadProgress.value = 100

    // Store the file ID for display
    uploadedFileId.value = result.fileId

    emit('uploaded', { url: result.url, fileId: result.fileId })
    clearSelection()
    
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Upload failed'
    emit('error', error.value)
  } finally {
    uploading.value = false
    uploadProgress.value = 0
  }
}

const removeImage = async () => {
  if (!props.directorId) return

  try {
    await imageUploadApi.deleteImage(props.directorType, props.directorId)
    emit('removed')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to remove image'
    emit('error', error.value)
  }
}

const clearSelection = () => {
  selectedFile.value = undefined
  previewImage.value = undefined
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Clean up preview URL when component unmounts
watch(previewImage, (newUrl, oldUrl) => {
  if (oldUrl && oldUrl.startsWith('blob:')) {
    URL.revokeObjectURL(oldUrl)
  }
})
</script>