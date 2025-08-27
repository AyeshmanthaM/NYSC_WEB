<template>
  <div class="admin-stat-card">
    <div class="admin-stat-content">
      <div class="admin-stat-icon-wrapper">
        <div 
          class="admin-stat-icon-container"
          :class="iconBgClass"
        >
          <component 
            :is="iconComponent" 
            class="admin-stat-icon"
            :class="iconClass"
          />
        </div>
      </div>
      <div class="admin-stat-info">
        <div v-if="loading" class="admin-stat-loading">
          <div class="admin-stat-loading-title"></div>
          <div class="admin-stat-loading-value"></div>
        </div>
        <div v-else>
          <p class="admin-stat-title">{{ title }}</p>
          <p class="admin-stat-value">
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
    blue: 'admin-stat-blue',
    green: 'admin-stat-green',
    purple: 'admin-stat-purple',
    emerald: 'admin-stat-emerald',
    yellow: 'admin-stat-yellow',
    red: 'admin-stat-red'
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