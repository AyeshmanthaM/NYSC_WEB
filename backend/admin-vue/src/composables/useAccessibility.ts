import { ref, computed, onMounted, nextTick } from 'vue'

/**
 * Composable for accessibility improvements
 */
export function useAccessibility() {
  const announcements = ref<string[]>([])
  const focusedElement = ref<HTMLElement | null>(null)

  /**
   * Announce message to screen readers
   */
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announcements.value.push(message)
    
    // Create or update live region
    let liveRegion = document.getElementById('a11y-live-region')
    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'a11y-live-region'
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `
      document.body.appendChild(liveRegion)
    }
    
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.textContent = message
    
    // Clear after announcement
    setTimeout(() => {
      const index = announcements.value.indexOf(message)
      if (index > -1) {
        announcements.value.splice(index, 1)
      }
      if (announcements.value.length === 0 && liveRegion) {
        liveRegion.textContent = ''
      }
    }, 1000)
  }

  /**
   * Focus management utilities
   */
  const focusManagement = {
    /**
     * Focus element and announce action
     */
    focusWithAnnouncement: async (element: HTMLElement | string, message?: string) => {
      await nextTick()
      
      const targetElement = typeof element === 'string' 
        ? document.getElementById(element) || document.querySelector(element)
        : element
      
      if (targetElement) {
        targetElement.focus()
        focusedElement.value = targetElement
        
        if (message) {
          announce(message)
        }
      }
    },

    /**
     * Set focus to first error field
     */
    focusFirstError: async (containerSelector?: string) => {
      await nextTick()
      
      const container = containerSelector 
        ? document.querySelector(containerSelector)
        : document

      if (!container) return

      const errorField = container.querySelector(
        'input[aria-invalid="true"], textarea[aria-invalid="true"], select[aria-invalid="true"]'
      ) as HTMLElement

      if (errorField) {
        errorField.focus()
        errorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        announce('Please correct the errors in the form', 'assertive')
      }
    },

    /**
     * Trap focus within container
     */
    trapFocus: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>

      if (focusableElements.length === 0) return () => {}

      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
              event.preventDefault()
              lastFocusable.focus()
            }
          } else {
            // Tab
            if (document.activeElement === lastFocusable) {
              event.preventDefault()
              firstFocusable.focus()
            }
          }
        }
      }

      container.addEventListener('keydown', handleKeyDown)
      
      // Focus first element
      firstFocusable.focus()

      // Return cleanup function
      return () => {
        container.removeEventListener('keydown', handleKeyDown)
      }
    }
  }

  /**
   * Generate unique ID for form elements
   */
  const generateId = (prefix = 'a11y') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Create accessible form field attributes
   */
  const getFieldAttributes = (options: {
    id?: string
    name: string
    required?: boolean
    error?: string
    description?: string
    invalid?: boolean
  }) => {
    const { id, name, required, error, description, invalid } = options
    const fieldId = id || generateId(`field-${name}`)
    
    const attributes: Record<string, any> = {
      id: fieldId,
      'aria-required': required ? 'true' : undefined,
      'aria-invalid': invalid || !!error ? 'true' : 'false'
    }

    const describedByIds: string[] = []

    if (error) {
      const errorId = `${fieldId}-error`
      describedByIds.push(errorId)
    }

    if (description) {
      const descriptionId = `${fieldId}-description`
      describedByIds.push(descriptionId)
    }

    if (describedByIds.length > 0) {
      attributes['aria-describedby'] = describedByIds.join(' ')
    }

    return {
      field: attributes,
      errorId: error ? `${fieldId}-error` : undefined,
      descriptionId: description ? `${fieldId}-description` : undefined
    }
  }

  /**
   * Get accessible button attributes
   */
  const getButtonAttributes = (options: {
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    expanded?: boolean
    controls?: string
    describedBy?: string
  }) => {
    const { type = 'button', disabled, loading, expanded, controls, describedBy } = options

    const attributes: Record<string, any> = {
      type,
      'aria-disabled': disabled ? 'true' : undefined,
      'aria-busy': loading ? 'true' : undefined,
      'aria-expanded': expanded !== undefined ? expanded.toString() : undefined,
      'aria-controls': controls,
      'aria-describedby': describedBy
    }

    // Remove undefined values
    Object.keys(attributes).forEach(key => {
      if (attributes[key] === undefined) {
        delete attributes[key]
      }
    })

    return attributes
  }

  /**
   * Keyboard navigation helpers
   */
  const keyboardNavigation = {
    /**
     * Handle arrow key navigation in lists
     */
    handleArrowNavigation: (event: KeyboardEvent, items: HTMLElement[], currentIndex: number) => {
      let newIndex = currentIndex

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          newIndex = Math.min(currentIndex + 1, items.length - 1)
          break
        case 'ArrowUp':
          event.preventDefault()
          newIndex = Math.max(currentIndex - 1, 0)
          break
        case 'Home':
          event.preventDefault()
          newIndex = 0
          break
        case 'End':
          event.preventDefault()
          newIndex = items.length - 1
          break
        default:
          return currentIndex
      }

      items[newIndex]?.focus()
      return newIndex
    },

    /**
     * Handle escape key to close modal/dropdown
     */
    handleEscape: (event: KeyboardEvent, callback: () => void) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        callback()
      }
    },

    /**
     * Handle enter/space to activate button
     */
    handleActivation: (event: KeyboardEvent, callback: () => void) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        callback()
      }
    }
  }

  /**
   * Check if element is visible to assistive technology
   */
  const isAccessible = (element: HTMLElement): boolean => {
    const style = getComputedStyle(element)
    return !(
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      element.hidden ||
      element.hasAttribute('aria-hidden') ||
      parseInt(style.opacity) === 0
    )
  }

  /**
   * Get accessible name for element
   */
  const getAccessibleName = (element: HTMLElement): string => {
    // Check aria-label first
    if (element.hasAttribute('aria-label')) {
      return element.getAttribute('aria-label')!
    }

    // Check aria-labelledby
    const labelledBy = element.getAttribute('aria-labelledby')
    if (labelledBy) {
      const labels = labelledBy
        .split(' ')
        .map(id => document.getElementById(id))
        .filter(Boolean)
        .map(el => el!.textContent?.trim())
        .filter(Boolean)
      
      if (labels.length > 0) {
        return labels.join(' ')
      }
    }

    // Check for label element
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`)
      if (label) {
        return label.textContent?.trim() || ''
      }
    }

    // Check wrapping label
    const parentLabel = element.closest('label')
    if (parentLabel) {
      return parentLabel.textContent?.trim() || ''
    }

    // Fallback to element's text content
    return element.textContent?.trim() || ''
  }

  /**
   * Color contrast utilities
   */
  const colorContrast = {
    /**
     * Check if color combination meets WCAG contrast requirements
     */
    meetsContrast: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
      // This is a simplified check - in production, use a proper contrast calculation library
      const ratioRequired = level === 'AA' ? 4.5 : 7
      
      // For now, return true - implement actual contrast calculation as needed
      return true
    },

    /**
     * Suggest accessible color alternatives
     */
    getAccessibleColor: (color: string, background: string): string => {
      // Simplified implementation - return darker/lighter version
      // In production, calculate proper contrast ratios
      return color
    }
  }

  return {
    // Announcements
    announce,
    announcements: computed(() => announcements.value),

    // Focus management
    focusManagement,
    focusedElement: computed(() => focusedElement.value),

    // Attributes generators
    generateId,
    getFieldAttributes,
    getButtonAttributes,

    // Keyboard navigation
    keyboardNavigation,

    // Utilities
    isAccessible,
    getAccessibleName,
    colorContrast
  }
}

/**
 * Composable for form accessibility
 */
export function useFormAccessibility(formRef?: any) {
  const { 
    announce, 
    focusManagement, 
    getFieldAttributes, 
    getButtonAttributes 
  } = useAccessibility()

  /**
   * Announce form validation results
   */
  const announceValidation = (errors: Record<string, string>, isSubmitting = false) => {
    const errorCount = Object.keys(errors).length
    
    if (errorCount > 0) {
      const message = errorCount === 1 
        ? '1 error found. Please review and correct.'
        : `${errorCount} errors found. Please review and correct.`
      
      announce(message, 'assertive')
      
      // Focus first error field
      setTimeout(() => {
        focusManagement.focusFirstError(formRef?.value)
      }, 100)
    } else if (!isSubmitting) {
      announce('All fields are valid', 'polite')
    }
  }

  /**
   * Announce form submission state
   */
  const announceSubmission = (state: 'submitting' | 'success' | 'error', message?: string) => {
    switch (state) {
      case 'submitting':
        announce('Submitting form...', 'polite')
        break
      case 'success':
        announce(message || 'Form submitted successfully', 'assertive')
        break
      case 'error':
        announce(message || 'Form submission failed. Please try again.', 'assertive')
        break
    }
  }

  return {
    announce,
    announceValidation,
    announceSubmission,
    focusManagement,
    getFieldAttributes,
    getButtonAttributes
  }
}