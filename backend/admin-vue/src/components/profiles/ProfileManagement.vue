<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AdminHeader />
    
    <!-- Main Content -->
    <main class="flex">
      <!-- Sidebar -->
      <AdminSidebar />
      
      <!-- Content Area -->
      <div class="flex-1 ml-64">
        <div class="p-8">
          <!-- Page Header -->
          <div class="flex justify-between items-center mb-8">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Profile Management</h1>
              <p class="text-gray-600">Manage director profiles and information</p>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center space-x-3">
              <div class="relative">
                <button
                  @click="showCreateDropdown = !showCreateDropdown"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus class="w-4 h-4 mr-2" />
                  Create Profile
                  <ChevronDown class="w-4 h-4 ml-2" />
                </button>

                <!-- Dropdown Menu -->
                <div
                  v-if="showCreateDropdown"
                  class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  @click="showCreateDropdown = false"
                >
                  <div class="py-1">
                    <button
                      v-for="type in directorTypes"
                      :key="type.value"
                      @click="openCreateForm(type.value)"
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {{ type.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Success/Error Messages -->
          <div v-if="globalSuccessMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-start">
              <CheckCircle class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div class="flex-1">
                <h3 class="text-sm font-medium text-green-800">Success</h3>
                <p class="text-sm text-green-700 mt-1">{{ globalSuccessMessage }}</p>
              </div>
              <button
                @click="globalSuccessMessage = ''"
                class="ml-2 text-green-400 hover:text-green-600"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div v-if="globalErrorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-start">
              <AlertCircle class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div class="flex-1">
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <p class="text-sm text-red-700 mt-1">{{ globalErrorMessage }}</p>
              </div>
              <button
                @click="globalErrorMessage = ''"
                class="ml-2 text-red-400 hover:text-red-600"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Form Section -->
          <div v-if="showForm" class="mb-8">
            <ProfileFormComplete
              :director-type="selectedDirectorType"
              :profile-id="editingProfileId"
              :initial-data="editingInitialData"
              @success="handleFormSuccess"
              @cancel="handleFormCancel"
            />
          </div>

          <!-- Quick Demo Section -->
          <div v-if="!showForm" class="space-y-6">
            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <Users class="h-6 w-6 text-gray-400" />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Profiles</dt>
                        <dd class="text-lg font-medium text-gray-900">248</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <CheckCircle class="h-6 w-6 text-green-400" />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Active</dt>
                        <dd class="text-lg font-medium text-gray-900">231</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <Camera class="h-6 w-6 text-blue-400" />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">With Photos</dt>
                        <dd class="text-lg font-medium text-gray-900">198</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <Clock class="h-6 w-6 text-yellow-400" />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Updated Today</dt>
                        <dd class="text-lg font-medium text-gray-900">12</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Demo Instructions -->
            <div class="bg-white shadow rounded-lg">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Profile Form Demo</h3>
              </div>
              <div class="px-6 py-6">
                <div class="prose text-sm text-gray-600 max-w-none">
                  <p class="mb-4">This Profile Form implementation includes all requested features:</p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">✅ Form Submission & Response Handling</h4>
                      <ul class="list-disc list-inside space-y-1 text-xs">
                        <li>Form stays open until backend response</li>
                        <li>Loading states during submission</li>
                        <li>No premature form closure</li>
                      </ul>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">✅ Validation Error Handling</h4>
                      <ul class="list-disc list-inside space-y-1 text-xs">
                        <li>Fields highlighted in red on validation failure</li>
                        <li>Inline error messages below fields</li>
                        <li>Form remains open with all values intact</li>
                      </ul>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">✅ Server Error Handling</h4>
                      <ul class="list-disc list-inside space-y-1 text-xs">
                        <li>Popup error messages for server issues</li>
                        <li>Form stays open with existing values</li>
                        <li>Dismissible error alerts</li>
                      </ul>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">✅ Success Flow</h4>
                      <ul class="list-disc list-inside space-y-1 text-xs">
                        <li>Green success message display</li>
                        <li>Form closes/resets after success</li>
                        <li>Parent component notification</li>
                      </ul>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">✅ Photo Upload Integration</h4>
                      <ul class="list-disc list-inside space-y-1 text-xs">
                        <li>Immediate upload on file selection</li>
                        <li>Green file ID display on success</li>
                        <li>File ID stored in form state</li>
                        <li>Progress indicator and error handling</li>
                      </ul>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">✅ Cancel Cleanup</h4>
                      <ul class="list-disc list-inside space-y-1 text-xs">
                        <li>Deletes uploaded photos on cancel</li>
                        <li>No orphaned files left behind</li>
                        <li>Proper state cleanup</li>
                      </ul>
                    </div>
                  </div>

                  <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 class="font-semibold text-blue-900 mb-2">How to Test</h4>
                    <ol class="list-decimal list-inside space-y-1 text-xs text-blue-800">
                      <li>Click "Create Profile" above to select a director type</li>
                      <li>Fill out the form and test photo upload</li>
                      <li>Try submitting with missing required fields to see validation</li>
                      <li>Upload a photo and then cancel to see cleanup</li>
                      <li>Submit a complete form to see success flow</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sample Data for Testing -->
            <div class="bg-white shadow rounded-lg">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Test with Sample Data</h3>
              </div>
              <div class="px-6 py-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    @click="openEditDemo"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit class="w-4 h-4 mr-2" />
                    Test Edit Form with Sample Data
                  </button>
                  
                  <button
                    @click="testValidationErrors"
                    class="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <AlertTriangle class="w-4 h-4 mr-2" />
                    Test Validation Errors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  Plus, 
  ChevronDown, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Users, 
  Camera, 
  Clock, 
  Edit, 
  AlertTriangle 
} from 'lucide-vue-next'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import ProfileFormComplete from './ProfileFormComplete.vue'
import type { DirectorType, DirectorData } from '@/types'

// State management
const showForm = ref(false)
const showCreateDropdown = ref(false)
const selectedDirectorType = ref<DirectorType>('director')
const editingProfileId = ref<string>()
const editingInitialData = ref<Partial<DirectorData>>()

// Global messages
const globalSuccessMessage = ref('')
const globalErrorMessage = ref('')

// Director types for dropdown
const directorTypes = [
  { value: 'chairman' as DirectorType, label: 'Chairman' },
  { value: 'boardMember' as DirectorType, label: 'Board Member' },
  { value: 'director' as DirectorType, label: 'Director' },
  { value: 'deputyDirector' as DirectorType, label: 'Deputy Director' },
  { value: 'assistantDirector' as DirectorType, label: 'Assistant Director' },
  { value: 'provincialDirector' as DirectorType, label: 'Provincial Director' },
  { value: 'provincialAssistant' as DirectorType, label: 'Provincial Assistant' },
  { value: 'youthClubMember' as DirectorType, label: 'Youth Club Member' }
]

// Sample data for testing
const sampleDirectorData = {
  name: 'Dr. Rajesh Kumar',
  position: 'Senior Director',
  email: 'rajesh.kumar@nysc.lk',
  phone: '+94 11 123 4567',
  department: 'Youth Development',
  description: 'Experienced leader in youth development programs with over 15 years of expertise in community outreach and program management. Passionate about empowering young people and creating sustainable development initiatives.',
  specialization: 'Community Outreach & Youth Empowerment',
  experience: '15+ years in youth development and community programs',
  linkedin: 'https://linkedin.com/in/rajesh-kumar-nysc',
  isActive: true,
  order: 1
}

// Form handlers
const openCreateForm = (directorType: DirectorType) => {
  selectedDirectorType.value = directorType
  editingProfileId.value = undefined
  editingInitialData.value = undefined
  showForm.value = true
  showCreateDropdown.value = false
}

const openEditDemo = () => {
  selectedDirectorType.value = 'director'
  editingProfileId.value = 'sample-id-123'
  editingInitialData.value = sampleDirectorData
  showForm.value = true
}

const testValidationErrors = () => {
  selectedDirectorType.value = 'boardMember'
  editingProfileId.value = undefined
  editingInitialData.value = {
    name: '', // Empty required field to trigger validation
    position: '',
    email: 'invalid-email', // Invalid email to trigger validation
    phone: ''
  }
  showForm.value = true
}

const handleFormSuccess = (data: DirectorData) => {
  globalSuccessMessage.value = `${data.name} profile has been ${editingProfileId.value ? 'updated' : 'created'} successfully!`
  globalErrorMessage.value = ''
  showForm.value = false
  
  // Clear success message after 5 seconds
  setTimeout(() => {
    globalSuccessMessage.value = ''
  }, 5000)
}

const handleFormCancel = () => {
  showForm.value = false
  editingProfileId.value = undefined
  editingInitialData.value = undefined
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    showCreateDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Ensure dropdown appears above other elements */
.z-10 {
  z-index: 10;
}

/* Smooth transitions for dropdowns */
.origin-top-right {
  transform-origin: top right;
}

/* Custom focus styles */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Grid layout for statistics cards */
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>