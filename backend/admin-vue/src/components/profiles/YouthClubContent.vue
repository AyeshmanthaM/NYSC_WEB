<template>
  <ProfileList
    title="Youth Club National Team"
    singular-title="Youth Club Member"
    description="Manage Youth Club National Team members and activities"
    :items="youthClubMembers"
    :total="pagination.total"
    :page="pagination.page"
    :limit="pagination.limit"
    :total-pages="pagination.totalPages"
    :loading="loading"
    @create="openCreateModal"
    @view="viewYouthClubMember"
    @edit="editYouthClubMember"
    @delete="deleteYouthClubMember"
    @filter="handleFilter"
    @paginate="handlePaginate"
  />

  <!-- Create/Edit Modal -->
  <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingYouthClubMember ? 'Edit Youth Club Member' : 'Add Youth Club Member' }}
        </h3>
        
        <form @submit.prevent="saveYouthClubMember" class="space-y-4">
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Team Role</label>
              <select
                v-model="form.teamRole"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 bg-white"
              >
                <option value="">Select Team Role</option>
                <option value="Captain">Captain</option>
                <option value="Vice Captain">Vice Captain</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Member">Member</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                v-model.number="form.age"
                type="number"
                min="15"
                max="35"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
            </div>
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
              <label class="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input
                v-model="form.skills"
                type="text"
                placeholder="e.g., Leadership, Event Management"
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
import { youthClubApi } from '@/utils/directors-api'
import type { YouthClubMember, DirectorFilters, PaginatedResponse } from '@/types'

const youthClubMembers = ref<YouthClubMember[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editingYouthClubMember = ref<YouthClubMember | null>(null)

const pagination = ref({
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 0
})

const form = ref({
  name: '',
  position: '',
  teamRole: '',
  age: 0,
  description: '',
  email: '',
  phone: '',
  skills: '',
  order: 0
})

const loadYouthClubMembers = async (filters: DirectorFilters = {}) => {
  loading.value = true
  try {
    const response: PaginatedResponse<YouthClubMember> = await youthClubApi.getYouthClubMembers({
      ...filters,
      page: pagination.value.page,
      limit: pagination.value.limit
    })
    
    youthClubMembers.value = response.items
    pagination.value = {
      total: response.total,
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages
    }
  } catch (error) {
    console.error('Failed to load youth club members:', error)
  } finally {
    loading.value = false
  }
}

const handleFilter = (filters: DirectorFilters) => {
  pagination.value.page = 1
  loadYouthClubMembers(filters)
}

const handlePaginate = (page: number) => {
  pagination.value.page = page
  loadYouthClubMembers()
}

const openCreateModal = () => {
  editingYouthClubMember.value = null
  resetForm()
  showModal.value = true
}

const editYouthClubMember = (id: string) => {
  const youthClubMember = youthClubMembers.value.find(m => m.id === id)
  if (youthClubMember) {
    editingYouthClubMember.value = youthClubMember
    form.value = {
      name: youthClubMember.name,
      position: youthClubMember.position,
      teamRole: youthClubMember.teamRole || '',
      age: youthClubMember.age || 0,
      description: youthClubMember.description,
      email: youthClubMember.email,
      phone: youthClubMember.phone,
      skills: youthClubMember.skills || '',
      order: youthClubMember.order
    }
    showModal.value = true
  }
}

const viewYouthClubMember = (id: string) => {
  console.log('View youth club member:', id)
}

const deleteYouthClubMember = async (id: string) => {
  if (confirm('Are you sure you want to delete this youth club member?')) {
    try {
      await youthClubApi.deleteYouthClubMember(id)
      loadYouthClubMembers()
    } catch (error) {
      console.error('Failed to delete youth club member:', error)
    }
  }
}

const saveYouthClubMember = async () => {
  saving.value = true
  try {
    if (editingYouthClubMember.value) {
      await youthClubApi.updateYouthClubMember(editingYouthClubMember.value.id, form.value)
    } else {
      await youthClubApi.createYouthClubMember(form.value)
    }
    closeModal()
    loadYouthClubMembers()
  } catch (error) {
    console.error('Failed to save youth club member:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  editingYouthClubMember.value = null
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    position: '',
    teamRole: '',
    age: 0,
    description: '',
    email: '',
    phone: '',
    skills: '',
    order: 0
  }
}

onMounted(() => {
  loadYouthClubMembers()
})
</script>