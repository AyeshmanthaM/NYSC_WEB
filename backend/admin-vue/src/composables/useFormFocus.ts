import { ref, nextTick, Ref } from 'vue'
import type { FormFieldError } from '@/types/forms'

/**
 * Composable for managing form field focus
 */
export function useFormFocus() {
  const focusedField = ref<string | null>(null)
  const fieldRefs = ref<Record<string, HTMLElement>>({})
  
  /**
   * Register a field reference
   */
  const registerFieldRef = (fieldName: string, element: HTMLElement | null) => {
    if (element) {
      fieldRefs.value[fieldName] = element
    } else {
      delete fieldRefs.value[fieldName]
    }
  }
  
  /**
   * Focus on a specific field
   */
  const focusField = async (fieldName: string) => {
    await nextTick()
    
    const element = fieldRefs.value[fieldName]
    if (element) {
      // Find the input element within the field container
      const input = element.querySelector('input, textarea, select') as HTMLElement
      if (input) {
        input.focus()
        input.scrollIntoView({ behavior: 'smooth', block: 'center' })
        focusedField.value = fieldName
        
        // Add visual highlight
        input.classList.add('ring-2', 'ring-red-500', 'ring-offset-2')
        setTimeout(() => {
          input.classList.remove('ring-2', 'ring-red-500', 'ring-offset-2')
        }, 3000)
      }
    }
  }
  
  /**
   * Focus on the first field with an error
   */
  const focusFirstError = async (errors: FormFieldError) => {
    const errorFields = Object.keys(errors)
    if (errorFields.length > 0) {
      await focusField(errorFields[0])
    }
  }
  
  /**
   * Focus on the next field in sequence
   */
  const focusNextField = async (currentField: string) => {
    const fields = Object.keys(fieldRefs.value)
    const currentIndex = fields.indexOf(currentField)
    
    if (currentIndex !== -1 && currentIndex < fields.length - 1) {
      await focusField(fields[currentIndex + 1])
    }
  }
  
  /**
   * Focus on the previous field in sequence
   */
  const focusPreviousField = async (currentField: string) => {
    const fields = Object.keys(fieldRefs.value)
    const currentIndex = fields.indexOf(currentField)
    
    if (currentIndex > 0) {
      await focusField(fields[currentIndex - 1])
    }
  }
  
  /**
   * Clear focus
   */
  const clearFocus = () => {
    focusedField.value = null
  }
  
  /**
   * Setup keyboard navigation
   */
  const setupKeyboardNavigation = (formElement: Ref<HTMLFormElement | null>) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Enter key - move to next field or submit
      if (event.key === 'Enter' && !event.shiftKey) {
        const target = event.target as HTMLElement
        const tagName = target.tagName.toLowerCase()
        
        // Don't intercept Enter in textarea
        if (tagName === 'textarea') return
        
        // Find current field
        const currentField = Object.keys(fieldRefs.value).find(field => {
          const element = fieldRefs.value[field]
          return element.contains(target)
        })
        
        if (currentField) {
          event.preventDefault()
          focusNextField(currentField)
        }
      }
      
      // Shift+Enter - move to previous field
      if (event.key === 'Enter' && event.shiftKey) {
        const target = event.target as HTMLElement
        const currentField = Object.keys(fieldRefs.value).find(field => {
          const element = fieldRefs.value[field]
          return element.contains(target)
        })
        
        if (currentField) {
          event.preventDefault()
          focusPreviousField(currentField)
        }
      }
      
      // Escape - clear focus
      if (event.key === 'Escape') {
        clearFocus()
        ;(event.target as HTMLElement).blur()
      }
    }
    
    // Add event listener when form is available
    if (formElement.value) {
      formElement.value.addEventListener('keydown', handleKeyDown)
      
      // Return cleanup function
      return () => {
        if (formElement.value) {
          formElement.value.removeEventListener('keydown', handleKeyDown)
        }
      }
    }
  }
  
  /**
   * Auto-focus first empty required field
   */
  const autoFocusFirstEmpty = async (formData: Record<string, any>, requiredFields: string[]) => {
    await nextTick()
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field] === '') {
        await focusField(field)
        break
      }
    }
  }
  
  /**
   * Highlight fields with errors
   */
  const highlightErrorFields = (errors: FormFieldError) => {
    Object.keys(errors).forEach(fieldName => {
      const element = fieldRefs.value[fieldName]
      if (element) {
        const input = element.querySelector('input, textarea, select') as HTMLElement
        if (input) {
          input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500')
        }
      }
    })
  }
  
  /**
   * Clear error highlights
   */
  const clearErrorHighlights = () => {
    Object.values(fieldRefs.value).forEach(element => {
      const input = element.querySelector('input, textarea, select') as HTMLElement
      if (input) {
        input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500')
      }
    })
  }
  
  return {
    focusedField,
    fieldRefs,
    registerFieldRef,
    focusField,
    focusFirstError,
    focusNextField,
    focusPreviousField,
    clearFocus,
    setupKeyboardNavigation,
    autoFocusFirstEmpty,
    highlightErrorFields,
    clearErrorHighlights
  }
}

/**
 * Create a field ref function for template
 */
export function createFieldRef(
  registerFn: (name: string, el: HTMLElement | null) => void,
  fieldName: string
) {
  return (el: HTMLElement | null) => {
    registerFn(fieldName, el)
  }
}