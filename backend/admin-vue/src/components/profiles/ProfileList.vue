<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
        <p class="text-gray-600 mt-1">{{ description }}</p>
      </div>
      
      <button
        @click="$emit('create')"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add {{ singularTitle }}
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              v-model="localFilters.search"
              type="text"
              placeholder="Search by name, position..."
              class="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              @input="debouncedFilter"
            />
          </div>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="localFilters.status"
            @change="applyFilters"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 bg-white"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Department Filter (if applicable) -->
        <div v-if="showDepartmentFilter">
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            v-model="localFilters.department"
            @change="applyFilters"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 bg-white"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <!-- Province Filter (if applicable) -->
        <div v-if="showProvinceFilter">
          <label class="block text-sm font-medium text-gray-700 mb-1">Province</label>
          <select
            v-model="localFilters.province"
            @change="applyFilters"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 bg-white"
          >
            <option value="">All Provinces</option>
            <option v-for="province in provinces" :key="province" :value="province">
              {{ province }}
            </option>
          </select>
        </div>

        <!-- Sort -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            v-model="localFilters.sortBy"
            @change="applyFilters"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 bg-white"
          >
            <option value="name">Name</option>
            <option value="position">Position</option>
            <option value="createdAt">Date Created</option>
            <option value="order">Display Order</option>
          </select>
        </div>
      </div>

      <!-- Clear Filters -->
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="clearFilters"
          class="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear Filters
        </button>
        
        <div class="text-sm text-gray-500">
          Showing {{ items.length }} of {{ total }} {{ title.toLowerCase() }}
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary-600" />
    </div>

    <!-- Empty State -->
    <div v-else-if="items.length === 0" class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 text-gray-300">
        <Users class="w-full h-full" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No {{ title.toLowerCase() }} found
      </h3>
      <p class="text-gray-500 mb-6">
        {{ localFilters.search ? 'Try adjusting your search criteria' : `Get started by adding your first ${singularTitle.toLowerCase()}` }}
      </p>
      <button
        v-if="!localFilters.search"
        @click="$emit('create')"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add {{ singularTitle }}
      </button>
    </div>

    <!-- Grid View -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProfileCard
        v-for="item in items"
        :key="item.id"
        :profile="item"
        :badge="getItemBadge(item)"
        :department="getItemDepartment(item)"
        :additional-info="getAdditionalInfo(item)"
        @view="$emit('view', $event)"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-between items-center mt-8">
      <div class="text-sm text-gray-700">
        Showing {{ ((page - 1) * limit) + 1 }} to {{ Math.min(page * limit, total) }} of {{ total }} results
      </div>
      
      <div class="flex space-x-2">
        <button
          @click="changePage(page - 1)"
          :disabled="page <= 1"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        
        <button
          v-for="pageNum in visiblePages"
          :key="pageNum"
          @click="changePage(pageNum)"
          :class="{
            'bg-primary-600 text-white': pageNum === page,
            'border-gray-300 hover:bg-gray-50': pageNum !== page
          }"
          class="px-3 py-1 border rounded-md"
        >
          {{ pageNum }}
        </button>
        
        <button
          @click="changePage(page + 1)"
          :disabled="page >= totalPages"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Plus, 
  Search, 
  Loader, 
  Users, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-vue-next'
import ProfileCard from './ProfileCard.vue'
import type { BaseDirector, DirectorFilters } from '@/types'

interface Props {
  title: string
  singularTitle: string
  description: string
  items: BaseDirector[]
  total: number
  page: number
  limit: number
  totalPages: number
  loading?: boolean
  showDepartmentFilter?: boolean
  showProvinceFilter?: boolean
  departments?: string[]
  provinces?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showDepartmentFilter: false,
  showProvinceFilter: false,
  departments: () => [],
  provinces: () => []
})

const emit = defineEmits<{
  create: []
  view: [id: string]
  edit: [id: string]
  delete: [id: string]
  filter: [filters: DirectorFilters]
  paginate: [page: number]
}>()

const localFilters = ref<DirectorFilters>({
  search: '',
  status: 'all',
  department: '',
  province: '',
  sortBy: 'name',
  sortOrder: 'asc'
})

const debounceTimeout = ref<number>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const start = Math.max(1, props.page - 2)
  const end = Math.min(props.totalPages, props.page + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const debouncedFilter = () => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value)
  }
  
  debounceTimeout.value = setTimeout(() => {
    applyFilters()
  }, 300)
}

const applyFilters = () => {
  emit('filter', { ...localFilters.value })
}

const clearFilters = () => {
  localFilters.value = {
    search: '',
    status: 'all',
    department: '',
    province: '',
    sortBy: 'name',
    sortOrder: 'asc'
  }
  applyFilters()
}

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    emit('paginate', newPage)
  }
}

const getItemBadge = (item: any): string | undefined => {
  return item.badge || (item.isActive ? undefined : 'Inactive')
}

const getItemDepartment = (item: any): string | undefined => {
  return item.department || item.province
}

const getAdditionalInfo = (item: any): Array<{ label: string; value: string }> => {
  const info: Array<{ label: string; value: string }> = []
  
  if (item.specialization) {
    info.push({ label: 'Specialization', value: item.specialization })
  }
  
  if (item.region) {
    info.push({ label: 'Region', value: item.region })
  }
  
  if (item.headquarters) {
    info.push({ label: 'Headquarters', value: item.headquarters })
  }
  
  if (item.centers) {
    info.push({ label: 'Centers', value: item.centers.toString() })
  }
  
  return info
}
</script>