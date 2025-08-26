<template>
  <div class="card p-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div 
          class="w-10 h-10 rounded-lg flex items-center justify-center"
          :class="iconBgClass"
        >
          <component 
            :is="iconComponent" 
            class="w-5 h-5"
            :class="iconClass"
          />
        </div>
      </div>
      <div class="ml-4 flex-1">
        <div v-if="loading" class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-16 mb-1"></div>
          <div class="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        <div v-else>
          <p class="text-sm text-gray-600">{{ title }}</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ typeof value === 'number' ? formatNumber(value) : value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  Users, 
  UserCheck, 
  FileText, 
  Activity,
  TrendingUp,
  Settings
} from 'lucide-vue-next'

interface Props {
  title: string
  value: number | string
  icon: string
  color: 'blue' | 'green' | 'purple' | 'emerald' | 'yellow' | 'red'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const iconComponents = {
  Users,
  UserCheck,
  FileText,
  Activity,
  TrendingUp,
  Settings
}

const iconComponent = computed(() => {
  return iconComponents[props.icon as keyof typeof iconComponents] || Users
})

const iconBgClass = computed(() => {
  const classes = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    emerald: 'bg-emerald-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100'
  }
  return classes[props.color]
})

const iconClass = computed(() => {
  const classes = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    emerald: 'text-emerald-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600'
  }
  return classes[props.color]
})

function formatNumber(num: number): string {
  return num.toLocaleString()
}
</script>