<template>
  <div class="p-8">
    <!-- Demo page showing how to use ProfileForm directly -->
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-8">Profile Form Demo - Complete Implementation</h1>
      
      <!-- Director Type Selector -->
      <div class="mb-6 bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Select Profile Type</h3>
        <div class="flex items-center space-x-4">
          <label class="block text-sm font-medium text-gray-700">
            Director Type:
          </label>
          <select 
            v-model="selectedDirectorType"
            class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="chairman">Chairman</option>
            <option value="boardMember">Board Member</option>
            <option value="director">Director</option>
            <option value="deputyDirector">Deputy Director</option>
            <option value="assistantDirector">Assistant Director</option>
            <option value="provincialDirector">Provincial Director</option>
            <option value="provincialAssistant">Provincial Assistant</option>
            <option value="youthClubMember">Youth Club Member</option>
          </select>
          <button
            @click="openCreateForm"
            class="btn btn-primary"
          >
            <Plus class="w-4 h-4 mr-2" />
            Create New Profile
          </button>
        </div>
      </div>

      <!-- Form Display -->
      <div v-if="showForm" class="bg-white rounded-lg shadow mb-8">
        <ProfileForm
          :director-type="selectedDirectorType"
          :profile-id="editingProfileId"
          :initial-data="initialFormData"
          @success="handleFormSuccess"
          @cancel="handleFormCancel"
          @error="handleFormError"
        />
      </div>

      <!-- Actions when form is closed -->
      <div v-if="!showForm" class="card p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Test Actions</h3>
        <p class="text-gray-600 mb-4">
          Test different scenarios with the form:
        </p>
        <div class="flex space-x-4">
          <button
            @click="openCreateForm"
            class="btn btn-primary"
          >
            <Plus class="w-4 h-4 mr-2" />
            Create New Profile
          </button>
          <button
            @click="openEditForm"
            class="btn btn-secondary"
          >
            <Edit class="w-4 h-4 mr-2" />
            Edit Sample Profile
          </button>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-start">
          <CheckCircle class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-medium text-green-800">Success</h3>
            <p class="text-sm text-green-700 mt-1">{{ successMessage }}</p>
          </div>
          <button
            @click="successMessage = ''"
            class="ml-auto flex-shrink-0 text-green-400 hover:text-green-600"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-start">
          <AlertCircle class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <p class="text-sm text-red-700 mt-1">{{ errorMessage }}</p>
          </div>
          <button
            @click="errorMessage = ''"
            class="ml-auto flex-shrink-0 text-red-400 hover:text-red-600"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Feature Documentation -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Key Features Implemented</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Form Behavior</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>✅ Form stays open until backend response</li>
              <li>✅ Never loses user input during errors</li>
              <li>✅ Resets only after successful submission</li>
              <li>✅ 2-second delay before auto-close on success</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Validation Handling</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>✅ Red borders on invalid fields</li>
              <li>✅ Inline error messages below fields</li>
              <li>✅ Errors clear when user modifies field</li>
              <li>✅ Backend validation errors mapped to fields</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Photo Upload</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>✅ Immediate upload on file selection</li>
              <li>✅ Green file ID display on success</li>
              <li>✅ File ID stored in form state</li>
              <li>✅ Auto-cleanup on cancel/unmount</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 mb-2">Error Handling</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>✅ Validation errors: inline display</li>
              <li>✅ Server errors: popup modal</li>
              <li>✅ "Server error, please try again later" message</li>
              <li>✅ Form data preserved during errors</li>
            </ul>
          </div>
        </div>
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>Success Flow:</strong> On successful submission, displays "Profile saved successfully" in green and closes form after 2 seconds.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, CheckCircle, AlertCircle, X } from 'lucide-vue-next'
import ProfileForm from './ProfileForm.vue'
import type { DirectorType, DirectorData } from '@/types'

// Form state
const showForm = ref(false)
const selectedDirectorType = ref<DirectorType>('director')
const editingProfileId = ref<string>()
const initialFormData = ref<Partial<DirectorData>>()

// Messages
const successMessage = ref('')
const errorMessage = ref('')

// Demo data for editing example
const sampleDirectorData = {
  name: 'John Doe',
  position: 'Senior Director',
  email: 'john.doe@nysc.lk',
  phone: '+94 11 123 4567',
  department: 'Youth Development',
  description: 'Experienced leader in youth development programs with over 15 years of experience.',
  specialization: 'Community Outreach',
  isActive: true,
  order: 1
}

// Form handlers
const openCreateForm = () => {
  editingProfileId.value = undefined
  initialFormData.value = undefined
  showForm.value = true
  successMessage.value = ''
  errorMessage.value = ''
}

const openEditForm = () => {
  editingProfileId.value = 'sample-id-123'
  initialFormData.value = sampleDirectorData
  showForm.value = true
  successMessage.value = ''
  errorMessage.value = ''
}

const handleFormSuccess = (data: DirectorData) => {
  successMessage.value = `Profile saved successfully! ${data.name} has been ${editingProfileId.value ? 'updated' : 'created'}.`
  errorMessage.value = ''
  showForm.value = false
  
  // Clear success message after 5 seconds
  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}

const handleFormCancel = () => {
  showForm.value = false
  console.log('Form cancelled - any uploaded files have been cleaned up')
}

const handleFormError = (message: string) => {
  // Note: Server errors are handled by the modal within the form
  // This is for any additional error handling needed at the parent level
  errorMessage.value = `Form error: ${message}`
  successMessage.value = ''
  
  // Clear error message after 10 seconds
  setTimeout(() => {
    errorMessage.value = ''
  }, 10000)
}
</script>

<style scoped>
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

.prose ol {
  @apply space-y-2;
}

.prose ol li {
  @apply text-gray-700;
}
</style>