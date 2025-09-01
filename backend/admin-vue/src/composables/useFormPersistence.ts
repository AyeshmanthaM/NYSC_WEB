import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { ProfileFormData } from '@/types/forms'

interface PersistenceConfig {
  storageKey: string
  debounceMs?: number
  excludeFields?: string[]
  encryptData?: boolean
  maxAge?: number // in milliseconds
  syncAcrossTabs?: boolean
  clearOnSuccess?: boolean
}

interface StoredFormData {
  data: Partial<ProfileFormData>
  timestamp: number
  version: string
  metadata?: Record<string, any>
}

/**
 * Composable for form data persistence to localStorage
 */
export function useFormPersistence(
  formData: ProfileFormData,
  config: PersistenceConfig
) {
  const {
    storageKey,
    debounceMs = 1000,
    excludeFields = ['password', 'confirmPassword', 'imageFileId'],
    encryptData = false,
    maxAge = 7 * 24 * 60 * 60 * 1000, // 7 days default
    syncAcrossTabs = true,
    clearOnSuccess = true
  } = config

  // State
  const isLoading = ref(false)
  const lastSaved = ref<Date | null>(null)
  const hasUnsavedChanges = ref(false)
  const storageAvailable = ref(true)
  const dataRestored = ref(false)

  let saveTimeout: NodeJS.Timeout | null = null
  let storageListener: ((e: StorageEvent) => void) | null = null

  // Check localStorage availability
  const checkStorageAvailability = (): boolean => {
    try {
      const testKey = '__storage_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }

  // Simple encryption/decryption (for basic obfuscation)
  const encryptString = (str: string): string => {
    if (!encryptData) return str
    return btoa(encodeURIComponent(str))
  }

  const decryptString = (str: string): string => {
    if (!encryptData) return str
    try {
      return decodeURIComponent(atob(str))
    } catch {
      return str // Return as-is if decryption fails
    }
  }

  // Filter out excluded fields
  const filterFormData = (data: ProfileFormData): Partial<ProfileFormData> => {
    const filtered: Partial<ProfileFormData> = {}
    Object.keys(data).forEach(key => {
      if (!excludeFields.includes(key)) {
        filtered[key] = data[key]
      }
    })
    return filtered
  }

  // Save data to localStorage
  const saveToStorage = async (): Promise<void> => {
    if (!storageAvailable.value) return

    try {
      const filteredData = filterFormData(formData)
      const storageData: StoredFormData = {
        data: filteredData,
        timestamp: Date.now(),
        version: '1.0',
        metadata: {
          userAgent: navigator.userAgent,
          url: window.location.href
        }
      }

      const serialized = JSON.stringify(storageData)
      const finalData = encryptString(serialized)
      
      localStorage.setItem(storageKey, finalData)
      lastSaved.value = new Date()
      hasUnsavedChanges.value = false

      console.debug(`Form data saved to storage: ${storageKey}`)
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error)
      storageAvailable.value = false
    }
  }

  // Load data from localStorage
  const loadFromStorage = (): Partial<ProfileFormData> | null => {
    if (!storageAvailable.value) return null

    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) return null

      const decrypted = decryptString(stored)
      const parsed: StoredFormData = JSON.parse(decrypted)

      // Check if data is expired
      if (maxAge > 0 && Date.now() - parsed.timestamp > maxAge) {
        localStorage.removeItem(storageKey)
        return null
      }

      // Validate data structure
      if (!parsed.data || typeof parsed.data !== 'object') {
        return null
      }

      console.debug(`Form data loaded from storage: ${storageKey}`)
      return parsed.data
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error)
      // Clear corrupted data
      try {
        localStorage.removeItem(storageKey)
      } catch {}
      return null
    }
  }

  // Debounced save function
  const debouncedSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    saveTimeout = setTimeout(() => {
      saveToStorage()
    }, debounceMs)

    hasUnsavedChanges.value = true
  }

  // Restore form data
  const restoreFormData = async (): Promise<boolean> => {
    isLoading.value = true

    try {
      await nextTick() // Ensure form is ready
      const savedData = loadFromStorage()
      
      if (savedData) {
        // Only restore non-empty values
        Object.keys(savedData).forEach(key => {
          const value = savedData[key]
          if (value !== undefined && value !== null && value !== '') {
            (formData as any)[key] = value
          }
        })

        dataRestored.value = true
        hasUnsavedChanges.value = false
        console.debug('Form data restored from localStorage')
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to restore form data:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Clear stored data
  const clearStorage = (): void => {
    try {
      localStorage.removeItem(storageKey)
      lastSaved.value = null
      hasUnsavedChanges.value = false
      dataRestored.value = false
      console.debug(`Cleared storage: ${storageKey}`)
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  }

  // Get storage info
  const getStorageInfo = () => {
    const stored = localStorage.getItem(storageKey)
    if (!stored) return null

    try {
      const decrypted = decryptString(stored)
      const parsed: StoredFormData = JSON.parse(decrypted)
      
      return {
        timestamp: new Date(parsed.timestamp),
        age: Date.now() - parsed.timestamp,
        size: new Blob([stored]).size,
        version: parsed.version,
        hasData: Object.keys(parsed.data).length > 0
      }
    } catch {
      return null
    }
  }

  // Handle storage events (for cross-tab sync)
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === storageKey && event.newValue !== event.oldValue) {
      // Another tab updated our data
      if (event.newValue) {
        console.debug('Form data updated by another tab')
        // Optionally restore the updated data
        if (syncAcrossTabs && !hasUnsavedChanges.value) {
          restoreFormData()
        }
      } else {
        // Another tab cleared our data
        console.debug('Form data cleared by another tab')
        if (syncAcrossTabs) {
          clearStorage()
        }
      }
    }
  }

  // Setup watchers and listeners
  const setupPersistence = () => {
    // Check storage availability
    storageAvailable.value = checkStorageAvailability()
    if (!storageAvailable.value) {
      console.warn('localStorage is not available')
      return
    }

    // Watch form data changes
    watch(
      () => formData,
      () => {
        if (dataRestored.value || Object.keys(formData).some(key => formData[key])) {
          debouncedSave()
        }
      },
      { deep: true }
    )

    // Setup cross-tab sync
    if (syncAcrossTabs) {
      storageListener = handleStorageEvent
      window.addEventListener('storage', storageListener)
    }

    // Setup beforeunload listener to save immediately
    const beforeUnloadHandler = () => {
      if (hasUnsavedChanges.value) {
        // Save synchronously on page unload
        saveToStorage()
      }
    }
    window.addEventListener('beforeunload', beforeUnloadHandler)

    // Cleanup function
    const cleanup = () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }
      if (storageListener) {
        window.removeEventListener('storage', storageListener)
      }
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }

    onBeforeUnmount(cleanup)
    
    // Return cleanup for manual use
    return cleanup
  }

  // Auto-restore on mount
  onMounted(async () => {
    const cleanup = setupPersistence()
    
    // Restore saved data if available
    await restoreFormData()

    return cleanup
  })

  // Force save (bypasses debounce)
  const forceSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
      saveTimeout = null
    }
    return saveToStorage()
  }

  // Check if there's any saved data
  const hasSavedData = (): boolean => {
    if (!storageAvailable.value) return false
    return localStorage.getItem(storageKey) !== null
  }

  // Get last modified timestamp
  const getLastModified = (): Date | null => {
    const info = getStorageInfo()
    return info?.timestamp || null
  }

  return {
    // State
    isLoading,
    lastSaved,
    hasUnsavedChanges,
    storageAvailable,
    dataRestored,

    // Methods
    saveToStorage: forceSave,
    restoreFormData,
    clearStorage,
    getStorageInfo,
    hasSavedData,
    getLastModified,

    // Utilities
    setupPersistence
  }
}

/**
 * Hook for showing restore prompt
 */
export function useFormRestorePrompt(
  persistence: ReturnType<typeof useFormPersistence>
) {
  const showRestorePrompt = ref(false)
  const restoreInfo = ref<any>(null)

  const checkForSavedData = async () => {
    if (persistence.hasSavedData()) {
      restoreInfo.value = persistence.getStorageInfo()
      showRestorePrompt.value = true
    }
  }

  const acceptRestore = async () => {
    const success = await persistence.restoreFormData()
    showRestorePrompt.value = false
    return success
  }

  const declineRestore = () => {
    showRestorePrompt.value = false
    persistence.clearStorage()
  }

  onMounted(checkForSavedData)

  return {
    showRestorePrompt,
    restoreInfo,
    acceptRestore,
    declineRestore,
    checkForSavedData
  }
}