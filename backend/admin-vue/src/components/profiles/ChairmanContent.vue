<template>
  <div class="space-y-2 mt-4">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Chairman Profile</h1>
        <p class="text-gray-600 mt-1">Manage the Chairman/Director General information</p>
      </div>
      
      <button
        v-if="!isEditing && chairman"
        @click="startEditing"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        <Edit class="w-4 h-4 mr-2" />
        Edit Profile
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary-600" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <AlertCircle class="w-5 h-5 text-red-400 mr-2 mt-0.5" />
        <div>
          <h3 class="text-sm font-medium text-red-800">Error Loading Chairman Profile</h3>
          <p class="mt-1 text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- No Chairman State -->
    <div v-else-if="!chairman && !isEditing" class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 text-gray-300">
        <Crown class="w-full h-full" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No Chairman Profile
      </h3>
      <p class="text-gray-500 mb-6">
        Create the Chairman profile to get started
      </p>
      <button
        @click="startEditing"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        <Plus class="w-4 h-4 mr-2" />
        Create Profile
      </button>
    </div>

    <!-- Chairman Profile Display -->
    <div v-else-if="!isEditing" class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Profile Header -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
        <div class="flex items-center space-x-6">
          <div class="w-24 h-24 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <img 
              v-if="chairman?.image" 
              :src="chairman.image" 
              :alt="`${chairman?.name} photo`"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Crown class="w-12 h-12 text-white opacity-70" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-bold">{{ chairman?.name }}</h2>
            <p class="text-primary-100 text-lg">{{ chairman?.title }}</p>
            <p v-if="chairman?.tenure" class="text-primary-200 mt-1">Tenure: {{ chairman?.tenure }}</p>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="px-6 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Column -->
          <div class="space-y-6">
            <!-- About -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p class="text-gray-700 leading-relaxed">{{ chairman?.description }}</p>
            </div>

            <!-- Vision -->
            <div v-if="chairman?.vision">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Vision</h3>
              <p class="text-gray-700 leading-relaxed">{{ chairman?.vision }}</p>
            </div>

            <!-- Contact Information -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div class="space-y-2">
                <div class="flex items-center text-gray-600">
                  <Mail class="w-4 h-4 mr-3 text-gray-400" />
                  <a :href="`mailto:${chairman?.email}`" class="hover:text-primary-600">
                    {{ chairman?.email }}
                  </a>
                </div>
                <div class="flex items-center text-gray-600">
                  <Phone class="w-4 h-4 mr-3 text-gray-400" />
                  <a :href="`tel:${chairman?.phone}`" class="hover:text-primary-600">
                    {{ chairman?.phone }}
                  </a>
                </div>
                <div v-if="chairman?.linkedin" class="flex items-center text-gray-600">
                  <ExternalLink class="w-4 h-4 mr-3 text-gray-400" />
                  <a :href="chairman?.linkedin" target="_blank" class="hover:text-primary-600">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Qualifications -->
            <div v-if="chairman?.qualifications?.length">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Qualifications</h3>
              <ul class="space-y-2">
                <li 
                  v-for="(qualification, index) in chairman?.qualifications" 
                  :key="index"
                  class="flex items-start"
                >
                  <GraduationCap class="w-4 h-4 mr-2 mt-0.5 text-primary-600" />
                  <span class="text-gray-700">{{ qualification }}</span>
                </li>
              </ul>
            </div>

            <!-- Achievements -->
            <div v-if="chairman?.achievements?.length">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h3>
              <ul class="space-y-2">
                <li 
                  v-for="(achievement, index) in chairman?.achievements" 
                  :key="index"
                  class="flex items-start"
                >
                  <Award class="w-4 h-4 mr-2 mt-0.5 text-primary-600" />
                  <span class="text-gray-700">{{ achievement }}</span>
                </li>
              </ul>
            </div>

            <!-- Key Initiatives -->
            <div v-if="chairman?.keyInitiatives?.length">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Key Initiatives</h3>
              <ul class="space-y-2">
                <li 
                  v-for="(initiative, index) in chairman?.keyInitiatives" 
                  :key="index"
                  class="flex items-start"
                >
                  <Target class="w-4 h-4 mr-2 mt-0.5 text-primary-600" />
                  <span class="text-gray-700">{{ initiative }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Form -->
    <div v-else class="bg-white shadow rounded-lg p-6">
      <form @submit.prevent="saveChairman" class="space-y-6">
        <!-- Form Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ chairman ? 'Edit Chairman Profile' : 'Create Chairman Profile' }}
          </h2>
          <div class="space-x-3">
            <button
              type="button"
              @click="cancelEditing"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              <Loader v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
              {{ saving ? 'Saving...' : 'Save Profile' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Column - Basic Info -->
          <div class="space-y-4">
            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <ProfileImageUpload
                :current-image="form.image"
                director-type="chairman"
                :director-id="chairman?.id"
                @uploaded="form.image = $event"
                @removed="form.image = undefined"
              />
            </div>

            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Enter full name"
              />
            </div>

            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="form.title"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Chairman / Director General"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="chairman@nysc.lk"
              />
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="+94 11 234 5678"
              />
            </div>

            <!-- LinkedIn -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
              <input
                v-model="form.linkedin"
                type="url"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <!-- Tenure -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tenure</label>
              <input
                v-model="form.tenure"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="2020 - Present"
              />
            </div>
          </div>

          <!-- Right Column - Detailed Info -->
          <div class="space-y-4">
            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">About / Description *</label>
              <textarea
                v-model="form.description"
                required
                rows="4"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Brief description about the Chairman..."
              />
            </div>

            <!-- Vision -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
              <textarea
                v-model="form.vision"
                rows="3"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Chairman's vision for the organization..."
              />
            </div>

            <!-- Qualifications -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
              <textarea
                v-model="qualificationsText"
                rows="3"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Enter qualifications, one per line"
              />
            </div>

            <!-- Achievements -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Key Achievements</label>
              <textarea
                v-model="achievementsText"
                rows="3"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Enter achievements, one per line"
              />
            </div>

            <!-- Key Initiatives -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Key Initiatives</label>
              <textarea
                v-model="initiativesText"
                rows="3"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Enter key initiatives, one per line"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { 
  Crown, 
  Edit, 
  Plus, 
  Loader, 
  AlertCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  GraduationCap,
  Award,
  Target
} from 'lucide-vue-next'
import ProfileImageUpload from './ProfileImageUpload.vue'
import { chairmanApi } from '@/utils/directors-api'
import type { Chairman } from '@/types'

const chairman = ref<Chairman | null>(null)
const loading = ref(false)
const saving = ref(false)
const error = ref<string>()
const isEditing = ref(false)

// Form data
const form = ref({
  name: '',
  title: 'Chairman / Director General',
  description: '',
  email: '',
  phone: '',
  image: undefined as string | undefined,
  linkedin: '',
  tenure: '',
  vision: '',
  qualifications: [] as string[],
  achievements: [] as string[],
  keyInitiatives: [] as string[]
})

// Text representations for array fields
const qualificationsText = ref('')
const achievementsText = ref('')
const initiativesText = ref('')

// Watch text fields and convert to arrays
watch(qualificationsText, (value) => {
  form.value.qualifications = value.split('\n').filter(item => item.trim())
})

watch(achievementsText, (value) => {
  form.value.achievements = value.split('\n').filter(item => item.trim())
})

watch(initiativesText, (value) => {
  form.value.keyInitiatives = value.split('\n').filter(item => item.trim())
})

const loadChairman = async () => {
  loading.value = true
  error.value = undefined
  
  try {
    chairman.value = await chairmanApi.getChairman()
  } catch (err: any) {
    if (err.response?.status !== 404) {
      error.value = err.response?.data?.message || 'Failed to load chairman profile'
    }
  } finally {
    loading.value = false
  }
}

const startEditing = () => {
  isEditing.value = true
  
  if (chairman.value) {
    // Populate form with existing data
    form.value = {
      name: chairman.value.name,
      title: chairman.value.title,
      description: chairman.value.description,
      email: chairman.value.email,
      phone: chairman.value.phone,
      image: chairman.value.image,
      linkedin: chairman.value.linkedin || '',
      tenure: chairman.value.tenure || '',
      vision: chairman.value.vision || '',
      qualifications: [...(chairman.value.qualifications || [])],
      achievements: [...(chairman.value.achievements || [])],
      keyInitiatives: [...(chairman.value.keyInitiatives || [])]
    }
    
    // Populate text fields
    qualificationsText.value = (chairman.value.qualifications || []).join('\n')
    achievementsText.value = (chairman.value.achievements || []).join('\n')
    initiativesText.value = (chairman.value.keyInitiatives || []).join('\n')
  } else {
    // Reset form for new chairman
    resetForm()
  }
}

const cancelEditing = () => {
  isEditing.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    title: 'Chairman / Director General',
    description: '',
    email: '',
    phone: '',
    image: undefined,
    linkedin: '',
    tenure: '',
    vision: '',
    qualifications: [],
    achievements: [],
    keyInitiatives: []
  }
  qualificationsText.value = ''
  achievementsText.value = ''
  initiativesText.value = ''
}

const saveChairman = async () => {
  saving.value = true
  error.value = undefined
  
  try {
    const updatedChairman = await chairmanApi.updateChairman(form.value)
    chairman.value = updatedChairman
    isEditing.value = false
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to save chairman profile'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadChairman()
})
</script>