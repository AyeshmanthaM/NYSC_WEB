import { ref, computed } from 'vue'
import { parseBackendError, isRetryableError, getRetryDelay } from '@/utils/error-parser'
import type { ParsedError } from '@/utils/error-parser'

interface RetryConfig {
  maxAttempts?: number
  baseDelay?: number
  maxDelay?: number
  exponentialBackoff?: boolean
  showProgress?: boolean
}

interface RetryState {
  isRetrying: boolean
  currentAttempt: number
  nextRetryIn: number
  lastError: ParsedError | null
  totalAttempts: number
}

/**
 * Composable for handling form submission with retry mechanism
 */
export function useRetrySubmission(config: RetryConfig = {}) {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    exponentialBackoff = true,
    showProgress = true
  } = config

  // State
  const retryState = ref<RetryState>({
    isRetrying: false,
    currentAttempt: 0,
    nextRetryIn: 0,
    lastError: null,
    totalAttempts: 0
  })

  const retryTimer = ref<NodeJS.Timeout>()
  const countdownTimer = ref<NodeJS.Timeout>()

  // Computed properties
  const hasRetriesLeft = computed(() => 
    retryState.value.currentAttempt < maxAttempts
  )

  const retryProgress = computed(() => {
    if (!showProgress || retryState.value.totalAttempts === 0) return 0
    return Math.round((retryState.value.currentAttempt / maxAttempts) * 100)
  })

  const retryMessage = computed(() => {
    const { currentAttempt, nextRetryIn, lastError } = retryState.value
    
    if (!lastError) return ''
    
    if (retryState.value.isRetrying) {
      return `Retrying in ${nextRetryIn}s... (Attempt ${currentAttempt + 1}/${maxAttempts})`
    }
    
    if (currentAttempt >= maxAttempts) {
      return `Failed after ${maxAttempts} attempts. ${lastError.message}`
    }
    
    return lastError.message
  })

  /**
   * Calculate retry delay
   */
  const calculateDelay = (attemptNumber: number, error?: ParsedError): number => {
    if (error) {
      const errorDelay = getRetryDelay(error, attemptNumber)
      if (errorDelay > 0) return Math.min(errorDelay, maxDelay)
    }

    if (!exponentialBackoff) return baseDelay

    // Exponential backoff with jitter
    const exponentialDelay = baseDelay * Math.pow(2, attemptNumber - 1)
    const jitter = Math.random() * 1000 // 0-1 second jitter
    
    return Math.min(exponentialDelay + jitter, maxDelay)
  }

  /**
   * Start countdown timer
   */
  const startCountdown = (delayMs: number) => {
    let remaining = Math.ceil(delayMs / 1000)
    retryState.value.nextRetryIn = remaining

    countdownTimer.value = setInterval(() => {
      remaining -= 1
      retryState.value.nextRetryIn = remaining
      
      if (remaining <= 0) {
        clearInterval(countdownTimer.value)
      }
    }, 1000)
  }

  /**
   * Clear all timers
   */
  const clearTimers = () => {
    if (retryTimer.value) {
      clearTimeout(retryTimer.value)
      retryTimer.value = undefined
    }
    if (countdownTimer.value) {
      clearInterval(countdownTimer.value)
      countdownTimer.value = undefined
    }
  }

  /**
   * Submit with retry logic
   */
  const submitWithRetry = async <T>(
    submitFn: () => Promise<T>,
    onProgress?: (state: RetryState) => void
  ): Promise<T> => {
    // Reset state
    retryState.value = {
      isRetrying: false,
      currentAttempt: 0,
      nextRetryIn: 0,
      lastError: null,
      totalAttempts: retryState.value.totalAttempts + 1
    }

    const attemptSubmission = async (attemptNumber: number): Promise<T> => {
      retryState.value.currentAttempt = attemptNumber
      
      try {
        const result = await submitFn()
        
        // Success - clear retry state
        retryState.value.isRetrying = false
        retryState.value.lastError = null
        clearTimers()
        
        return result
      } catch (error: any) {
        const parsedError = parseBackendError(error)
        retryState.value.lastError = parsedError
        
        console.error(`Submission attempt ${attemptNumber} failed:`, parsedError)
        
        // Check if we should retry
        if (attemptNumber < maxAttempts && isRetryableError(parsedError)) {
          const delay = calculateDelay(attemptNumber, parsedError)
          
          retryState.value.isRetrying = true
          onProgress?.(retryState.value)
          
          console.log(`Retrying in ${delay}ms (attempt ${attemptNumber + 1}/${maxAttempts})`)
          
          // Start countdown
          startCountdown(delay)
          
          // Schedule retry
          return new Promise<T>((resolve, reject) => {
            retryTimer.value = setTimeout(async () => {
              try {
                const result = await attemptSubmission(attemptNumber + 1)
                resolve(result)
              } catch (retryError) {
                reject(retryError)
              }
            }, delay)
          })
        } else {
          // No more retries or error not retryable
          retryState.value.isRetrying = false
          clearTimers()
          throw error
        }
      }
    }

    return attemptSubmission(1)
  }

  /**
   * Cancel ongoing retry
   */
  const cancelRetry = () => {
    retryState.value.isRetrying = false
    clearTimers()
  }

  /**
   * Reset retry state
   */
  const resetRetryState = () => {
    cancelRetry()
    retryState.value = {
      isRetrying: false,
      currentAttempt: 0,
      nextRetryIn: 0,
      lastError: null,
      totalAttempts: 0
    }
  }

  /**
   * Manual retry (for user-triggered retry)
   */
  const manualRetry = async <T>(
    submitFn: () => Promise<T>,
    onProgress?: (state: RetryState) => void
  ): Promise<T> => {
    if (retryState.value.lastError && hasRetriesLeft.value) {
      return submitWithRetry(submitFn, onProgress)
    } else {
      throw new Error('Cannot retry: no previous error or max attempts reached')
    }
  }

  return {
    // State
    retryState,
    hasRetriesLeft,
    retryProgress,
    retryMessage,
    
    // Methods
    submitWithRetry,
    manualRetry,
    cancelRetry,
    resetRetryState
  }
}