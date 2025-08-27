<template>
  <ProfileList
    title="Deputy Directors"
    singular-title="Deputy Director"
    description="Manage deputy directors and departmental leadership"
    :items="deputyDirectors"
    :total="pagination.total"
    :page="pagination.page"
    :limit="pagination.limit"
    :total-pages="pagination.totalPages"
    :loading="loading"
    :show-department-filter="true"
    :departments="departments"
    @create="openCreateModal"
    @view="viewDeputyDirector"
    @edit="editDeputyDirector"
    @delete="deleteDeputyDirector"
    @filter="handleFilter"
    @paginate="handlePaginate"
  />

  <!-- Create/Edit Modal -->
  <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingDeputyDirector ? 'Edit Deputy Director' : 'Add Deputy Director' }}
        </h3>
        
        <form @submit.prevent="saveDeputyDirector" class="space-y-4">
          <!-- Profile Photo Upload -->
          <div class="border-b border-gray-200 pb-4">
            <ProfileImageUpload
              :current-image="form.image"
              director-type="deputyDirector"
              :director-id="editingDeputyDirector?.id"
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
import { deputyDirectorsApi } from '@/utils/directors-api'
import type { DeputyDirector, DirectorFilters, PaginatedResponse } from '@/types'

const deputyDirectors = ref<DeputyDirector[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editingDeputyDirector = ref<DeputyDirector | null>(null)
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

const loadDeputyDirectors = async (filters: DirectorFilters = {}) => {
  loading.value = true
  try {
    const response: PaginatedResponse<DeputyDirector> = await deputyDirectorsApi.getDeputyDirectors({
      ...filters,
      page: pagination.value.page,
      limit: pagination.value.limit
    })
    
    deputyDirectors.value = response.items
    pagination.value = {
      total: response.total,
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages
    }
  } catch (error) {
    console.error('Failed to load deputy directors:', error)
  } finally {
    loading.value = false
  }
}

const handleFilter = (filters: DirectorFilters) => {
  pagination.value.page = 1
  loadDeputyDirectors(filters)
}

const handlePaginate = (page: number) => {
  pagination.value.page = page
  loadDeputyDirectors()
}

const openCreateModal = () => {
  editingDeputyDirector.value = null
  resetForm()
  showModal.value = true
}

const editDeputyDirector = (id: string) => {
  const deputyDirector = deputyDirectors.value.find(d => d.id === id)
  if (deputyDirector) {
    editingDeputyDirector.value = deputyDirector
    form.value = {
      name: deputyDirector.name,
      position: deputyDirector.position,
      department: deputyDirector.department,
      description: deputyDirector.description,
      email: deputyDirector.email,
      phone: deputyDirector.phone,
      linkedin: deputyDirector.linkedin || '',
      order: deputyDirector.order,
      image: deputyDirector.image || ''
    }
    showModal.value = true
  }
}

const viewDeputyDirector = (id: string) => {
  console.log('View deputy director:', id)
}

const deleteDeputyDirector = async (id: string) => {
  if (confirm('Are you sure you want to delete this deputy director?')) {
    try {
      await deputyDirectorsApi.deleteDeputyDirector(id)
      loadDeputyDirectors()
    } catch (error) {
      console.error('Failed to delete deputy director:', error)
    }
  }
}

const saveDeputyDirector = async () => {
  saving.value = true
  try {
    if (editingDeputyDirector.value) {
      await deputyDirectorsApi.updateDeputyDirector(editingDeputyDirector.value.id, form.value)
    } else {
      await deputyDirectorsApi.createDeputyDirector(form.value)
    }
    closeModal()
    loadDeputyDirectors()
  } catch (error) {
    console.error('Failed to save deputy director:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  editingDeputyDirector.value = null
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
  loadDeputyDirectors()
})
</script>