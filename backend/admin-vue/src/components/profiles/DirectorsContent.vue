<template>
  <ProfileList
    title="Directors"
    singular-title="Director"
    description="Manage directors and departmental leadership"
    :items="directors"
    :total="pagination.total"
    :page="pagination.page"
    :limit="pagination.limit"
    :total-pages="pagination.totalPages"
    :loading="loading"
    :show-department-filter="true"
    :departments="departments"
    @create="openCreateModal"
    @view="viewDirector"
    @edit="editDirector"
    @delete="deleteDirector"
    @filter="handleFilter"
    @paginate="handlePaginate"
  />

  <!-- Create/Edit Modal -->
  <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingDirector ? 'Edit Director' : 'Add Director' }}
        </h3>
        
        <form @submit.prevent="saveDirector" class="space-y-4">
          <!-- Profile Photo Upload -->
          <div class="border-b border-gray-200 pb-4">
            <ProfileImageUpload
              :current-image="form.image"
              director-type="director"
              :director-id="editingDirector?.id"
              @uploaded="handleImageUploaded"
              @removed="handleImageRemoved"
              @error="handleImageError"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <input
                v-model="form.position"
                type="text"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department *</label>
            <select
              v-model="form.department"
              required
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 bg-white"
            >
              <option value="">Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              v-model="form.description"
              required
              rows="3"
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input
                v-model="form.linkedin"
                type="url"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                v-model.number="form.order"
                type="number"
                min="0"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProfileList from '@/components/profiles/ProfileList.vue'
import ProfileImageUpload from '@/components/profiles/ProfileImageUpload.vue'
import { directorsApiService } from '@/utils/directors-api'
import type { Director, DirectorFilters, PaginatedResponse } from '@/types'

const directors = ref<Director[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editingDirector = ref<Director | null>(null)
const departments = ref(['Operations', 'Programs', 'Administration', 'Finance'])

const pagination = ref({
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 0
})

const form = ref({
  name: '',
  position: '',
  department: '',
  description: '',
  email: '',
  phone: '',
  linkedin: '',
  order: 0,
  image: ''
})

const loadDirectors = async (filters: DirectorFilters = {}) => {
  loading.value = true
  try {
    const response: PaginatedResponse<Director> = await directorsApiService.getDirectors({
      ...filters,
      page: pagination.value.page,
      limit: pagination.value.limit
    })
    
    directors.value = response.items
    pagination.value = {
      total: response.total,
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages
    }
  } catch (error) {
    console.error('Failed to load directors:', error)
  } finally {
    loading.value = false
  }
}

const handleFilter = (filters: DirectorFilters) => {
  pagination.value.page = 1
  loadDirectors(filters)
}

const handlePaginate = (page: number) => {
  pagination.value.page = page
  loadDirectors()
}

const openCreateModal = () => {
  editingDirector.value = null
  resetForm()
  showModal.value = true
}

const editDirector = (id: string) => {
  const director = directors.value.find(d => d.id === id)
  if (director) {
    editingDirector.value = director
    form.value = {
      name: director.name,
      position: director.position,
      department: director.department,
      description: director.description,
      email: director.email,
      phone: director.phone,
      linkedin: director.linkedin || '',
      order: director.order,
      image: director.image || ''
    }
    showModal.value = true
  }
}

const viewDirector = (id: string) => {
  // TODO: Implement view modal or navigate to detail page
  console.log('View director:', id)
}

const deleteDirector = async (id: string) => {
  if (confirm('Are you sure you want to delete this director?')) {
    try {
      await directorsApiService.deleteDirector(id)
      loadDirectors()
    } catch (error) {
      console.error('Failed to delete director:', error)
    }
  }
}

const saveDirector = async () => {
  saving.value = true
  try {
    if (editingDirector.value) {
      await directorsApiService.updateDirector(editingDirector.value.id, form.value)
    } else {
      await directorsApiService.createDirector(form.value)
    }
    closeModal()
    loadDirectors()
  } catch (error) {
    console.error('Failed to save director:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  editingDirector.value = null
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    position: '',
    department: '',
    description: '',
    email: '',
    phone: '',
    linkedin: '',
    order: 0,
    image: ''
  }
}

// Image upload handlers
const handleImageUploaded = (url: string) => {
  form.value.image = url
}

const handleImageRemoved = () => {
  form.value.image = ''
}

const handleImageError = (message: string) => {
  console.error('Image upload error:', message)
  // You could show a toast notification here
}

onMounted(() => {
  loadDirectors()
})
</script>