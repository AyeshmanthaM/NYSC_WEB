<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Profile Image -->
    <div class="relative h-48 bg-gradient-to-r from-primary-100 to-primary-200">
      <img 
        v-if="profile.image" 
        :src="profile.image" 
        :alt="`${profile.name} photo`"
        class="w-full h-full object-cover"
      />
      <div 
        v-else 
        class="w-full h-full flex items-center justify-center text-primary-600"
      >
        <User class="w-16 h-16" />
      </div>
      
      <!-- Badge -->
      <div 
        v-if="badge" 
        class="absolute top-3 right-3 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full"
      >
        {{ badge }}
      </div>
    </div>

    <!-- Profile Content -->
    <div class="p-6">
      <!-- Name and Position -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          {{ profile.name }}
        </h3>
        <p class="text-sm text-primary-600 font-medium">
          {{ profile.position }}
        </p>
        <p v-if="department" class="text-sm text-gray-500 mt-1">
          {{ department }}
        </p>
      </div>

      <!-- Description -->
      <div v-if="profile.description" class="mb-4">
        <p class="text-gray-700 text-sm line-clamp-3">
          {{ profile.description }}
        </p>
      </div>

      <!-- Contact Info -->
      <div class="flex flex-col space-y-2 mb-4">
        <div class="flex items-center text-sm text-gray-600">
          <Mail class="w-4 h-4 mr-2 text-gray-400" />
          <a :href="`mailto:${profile.email}`" class="hover:text-primary-600">
            {{ profile.email }}
          </a>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <Phone class="w-4 h-4 mr-2 text-gray-400" />
          <a :href="`tel:${profile.phone}`" class="hover:text-primary-600">
            {{ profile.phone }}
          </a>
        </div>
        <div v-if="profile.linkedin" class="flex items-center text-sm text-gray-600">
          <ExternalLink class="w-4 h-4 mr-2 text-gray-400" />
          <a :href="profile.linkedin" target="_blank" class="hover:text-primary-600">
            LinkedIn Profile
          </a>
        </div>
      </div>

      <!-- Additional Info -->
      <div v-if="additionalInfo.length > 0" class="mb-4">
        <div v-for="info in additionalInfo" :key="info.label" class="flex justify-between text-sm mb-1">
          <span class="text-gray-500">{{ info.label }}:</span>
          <span class="text-gray-900 font-medium">{{ info.value }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-2">
        <button
          @click="$emit('view', profile.id)"
          class="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          <Eye class="w-3 h-3 mr-1 inline" />
          View
        </button>
        <button
          @click="$emit('edit', profile.id)"
          class="px-3 py-1.5 text-xs bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-md transition-colors"
        >
          <Edit class="w-3 h-3 mr-1 inline" />
          Edit
        </button>
        <button
          @click="$emit('delete', profile.id)"
          class="px-3 py-1.5 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
        >
          <Trash2 class="w-3 h-3 mr-1 inline" />
          Delete
        </button>
      </div>
    </div>

    <!-- Status Indicator -->
    <div 
      class="absolute top-3 left-3 w-3 h-3 rounded-full"
      :class="{
        'bg-green-500': profile.isActive,
        'bg-red-500': !profile.isActive
      }"
      :title="profile.isActive ? 'Active' : 'Inactive'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { User, Mail, Phone, ExternalLink, Eye, Edit, Trash2 } from 'lucide-vue-next'
import type { BaseDirector } from '@/types'

interface Props {
  profile: BaseDirector & { description?: string }
  badge?: string
  department?: string
  additionalInfo?: Array<{ label: string; value: string }>
}

const props = withDefaults(defineProps<Props>(), {
  additionalInfo: () => []
})

defineEmits<{
  view: [id: string]
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>