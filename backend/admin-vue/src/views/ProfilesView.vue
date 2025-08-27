<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AdminHeader />
    
    <!-- Main Content with proper spacing for fixed header -->
    <main class="pt-16">
      <!-- Sidebar -->
      <AdminSidebar />
      
      <!-- Content Area with proper spacing for fixed sidebar -->
      <div class="ml-64 min-h-[calc(100vh-4rem)]">
        <div class="p-8">
          <!-- Dynamic Profile Content -->
          <component :is="currentProfileComponent" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'

const route = useRoute()

// Lazy load profile components
const profileComponents = {
  chairman: defineAsyncComponent(() => import('@/components/profiles/ChairmanContent.vue')),
  'board-members': defineAsyncComponent(() => import('@/components/profiles/BoardMembersContent.vue')),
  directors: defineAsyncComponent(() => import('@/components/profiles/DirectorsContent.vue')),
  'deputy-directors': defineAsyncComponent(() => import('@/components/profiles/DeputyDirectorsContent.vue')),
  'assistant-directors': defineAsyncComponent(() => import('@/components/profiles/AssistantDirectorsContent.vue')),
  'provincial-directors': defineAsyncComponent(() => import('@/components/profiles/ProvincialDirectorsContent.vue')),
  'provincial-assistants': defineAsyncComponent(() => import('@/components/profiles/ProvincialAssistantsContent.vue')),
  'youth-club': defineAsyncComponent(() => import('@/components/profiles/YouthClubContent.vue'))
}

// Get current profile type from route params
const currentProfileType = computed(() => {
  return route.params.type as string || 'chairman'
})

// Get the appropriate component for the current profile type
const currentProfileComponent = computed(() => {
  return profileComponents[currentProfileType.value] || profileComponents.chairman
})
</script>