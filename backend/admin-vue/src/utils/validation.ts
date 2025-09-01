import type { FormValidationRule, ProfileFormData, FormFieldError } from '@/types/forms'

/**
 * Comprehensive form validation utilities
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// URL validation regex
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

// Phone validation regex (Sri Lankan format)
const PHONE_REGEX = /^(\+94|0)?[0-9]{9,10}$/

// LinkedIn URL regex
const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/

/**
 * Validation rules for common fields
 */
export const commonValidationRules: Record<string, FormValidationRule> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    custom: (value: string) => {
      if (!value?.trim()) return 'Name is required'
      if (value.length < 2) return 'Name must be at least 2 characters'
      if (value.length > 100) return 'Name must not exceed 100 characters'
      if (!/^[a-zA-Z\s.'-]+$/.test(value)) return 'Name contains invalid characters'
      return undefined
    }
  },
  
  email: {
    required: true,
    pattern: EMAIL_REGEX,
    custom: (value: string) => {
      if (!value?.trim()) return 'Email is required'
      if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address'
      return undefined
    }
  },
  
  phone: {
    required: true,
    pattern: PHONE_REGEX,
    custom: (value: string) => {
      if (!value?.trim()) return 'Phone number is required'
      if (!PHONE_REGEX.test(value.replace(/[\s-]/g, ''))) {
        return 'Please enter a valid Sri Lankan phone number'
      }
      return undefined
    }
  },
  
  linkedin: {
    required: false,
    pattern: LINKEDIN_REGEX,
    custom: (value: string) => {
      if (value && !LINKEDIN_REGEX.test(value)) {
        return 'Please enter a valid LinkedIn profile URL'
      }
      return undefined
    }
  },
  
  position: {
    required: true,
    minLength: 2,
    maxLength: 100,
    custom: (value: string) => {
      if (!value?.trim()) return 'Position is required'
      if (value.length < 2) return 'Position must be at least 2 characters'
      if (value.length > 100) return 'Position must not exceed 100 characters'
      return undefined
    }
  },
  
  description: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    custom: (value: string) => {
      if (!value?.trim()) return 'Description is required'
      if (value.length < 10) return 'Description must be at least 10 characters'
      if (value.length > 1000) return 'Description must not exceed 1000 characters'
      return undefined
    }
  }
}

/**
 * Validate a single field
 */
export function validateField(
  fieldName: string, 
  value: any, 
  rule?: FormValidationRule,
  formData?: any
): string | undefined {
  if (!rule) {
    // Check if we have a common rule for this field
    rule = commonValidationRules[fieldName]
    if (!rule) return undefined
  }
  
  // Custom validation function takes precedence
  if (rule.custom) {
    return rule.custom(value, formData)
  }
  
  // Required field check
  if (rule.required) {
    if (value === undefined || value === null || value === '') {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
    }
  }
  
  // Skip other validations if field is empty and not required
  if (!rule.required && (!value || value === '')) {
    return undefined
  }
  
  // String validations
  if (typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`
    }
    
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must not exceed ${rule.maxLength} characters`
    }
    
    if (rule.pattern && !rule.pattern.test(value)) {
      return `Invalid format`
    }
  }
  
  // Number validations
  if (typeof value === 'number') {
    if (rule.min !== undefined && value < rule.min) {
      return `Must be at least ${rule.min}`
    }
    
    if (rule.max !== undefined && value > rule.max) {
      return `Must not exceed ${rule.max}`
    }
  }
  
  return undefined
}

/**
 * Validate entire form
 */
export function validateForm(
  formData: ProfileFormData,
  requiredFields: string[] = ['name', 'position', 'email', 'phone'],
  additionalRules?: Record<string, FormValidationRule>
): FormFieldError {
  const errors: FormFieldError = {}
  
  // Validate required fields
  requiredFields.forEach(field => {
    const error = validateField(field, formData[field], additionalRules?.[field], formData)
    if (error) {
      errors[field] = error
    }
  })
  
  // Validate optional fields if they have values
  Object.keys(formData).forEach(field => {
    if (!requiredFields.includes(field) && formData[field]) {
      const error = validateField(field, formData[field], additionalRules?.[field], formData)
      if (error) {
        errors[field] = error
      }
    }
  })
  
  return errors
}

/**
 * Clear field error when value changes
 */
export function clearFieldError(
  errors: FormFieldError,
  fieldName: string
): void {
  if (errors[fieldName]) {
    delete errors[fieldName]
  }
}

/**
 * Check if form has errors
 */
export function hasErrors(errors: FormFieldError): boolean {
  return Object.keys(errors).length > 0
}

/**
 * Get first error field for focus management
 */
export function getFirstErrorField(errors: FormFieldError): string | null {
  const errorFields = Object.keys(errors)
  return errorFields.length > 0 ? errorFields[0] : null
}

/**
 * Format field name for display
 */
export function formatFieldName(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

/**
 * Validate file upload
 */
export function validateFileUpload(
  file: File,
  maxSize: number = 5 * 1024 * 1024, // 5MB default
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
): string | undefined {
  if (!file) {
    return 'No file selected'
  }
  
  if (file.size > maxSize) {
    const sizeMB = Math.round(maxSize / 1024 / 1024)
    return `File size must be less than ${sizeMB}MB`
  }
  
  if (!allowedTypes.includes(file.type)) {
    return 'Invalid file type. Allowed types: ' + allowedTypes.join(', ')
  }
  
  return undefined
}

/**
 * Sanitize form data before submission
 */
export function sanitizeFormData(data: ProfileFormData): ProfileFormData {
  const sanitized = { ...data }
  
  // Trim string fields
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim()
    }
  })
  
  // Remove empty optional fields
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === '' || sanitized[key] === null || sanitized[key] === undefined) {
      if (!['isActive', 'order'].includes(key)) {
        delete sanitized[key]
      }
    }
  })
  
  return sanitized
}