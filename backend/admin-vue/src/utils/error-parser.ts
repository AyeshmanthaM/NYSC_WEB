import type { BackendErrorResponse, FormFieldError, ValidationError } from '@/types/forms'
import { formatFieldName } from './validation'

/**
 * Backend error response parser utilities
 */

export interface ParsedError {
  isValidationError: boolean
  isServerError: boolean
  isNetworkError: boolean
  statusCode?: number
  message: string
  fieldErrors: FormFieldError
  rawError?: any
}

/**
 * Parse backend error response
 */
export function parseBackendError(error: any): ParsedError {
  const result: ParsedError = {
    isValidationError: false,
    isServerError: false,
    isNetworkError: false,
    message: 'An unexpected error occurred',
    fieldErrors: {},
    rawError: error
  }
  
  // Network error (no response)
  if (!error.response) {
    result.isNetworkError = true
    result.message = error.message || 'Network error. Please check your connection.'
    return result
  }
  
  const { status, data } = error.response
  result.statusCode = status
  
  // Parse validation errors (400, 422)
  if (status === 400 || status === 422) {
    result.isValidationError = true
    result.fieldErrors = parseValidationErrors(data)
    result.message = data?.message || 'Validation failed'
    return result
  }
  
  // Server errors (500+)
  if (status >= 500) {
    result.isServerError = true
    result.message = 'Server error, please try again later'
    return result
  }
  
  // Authentication errors (401, 403)
  if (status === 401) {
    result.message = 'Authentication required. Please log in again.'
    return result
  }
  
  if (status === 403) {
    result.message = 'You do not have permission to perform this action.'
    return result
  }
  
  // Not found (404)
  if (status === 404) {
    result.message = data?.message || 'Resource not found'
    return result
  }
  
  // Other client errors
  if (status >= 400 && status < 500) {
    result.message = data?.message || `Request failed with status ${status}`
    return result
  }
  
  // Default message from backend
  if (data?.message) {
    result.message = data.message
  }
  
  return result
}

/**
 * Parse validation errors from backend response
 */
function parseValidationErrors(data: BackendErrorResponse): FormFieldError {
  const fieldErrors: FormFieldError = {}
  
  // Format 1: errors object with field names as keys
  if (data?.errors && typeof data.errors === 'object') {
    Object.keys(data.errors).forEach(field => {
      fieldErrors[field] = data.errors![field]
    })
    return fieldErrors
  }
  
  // Format 2: details object with field names as keys
  if (data?.details && typeof data.details === 'object') {
    Object.keys(data.details).forEach(field => {
      fieldErrors[field] = data.details![field]
    })
    return fieldErrors
  }
  
  // Format 3: validationErrors array
  if (data?.validationErrors && Array.isArray(data.validationErrors)) {
    data.validationErrors.forEach((error: ValidationError) => {
      if (error.field) {
        fieldErrors[error.field] = error.message
      }
    })
    return fieldErrors
  }
  
  // Format 4: Express-validator style errors
  if (Array.isArray(data)) {
    data.forEach((error: any) => {
      if (error.param || error.field) {
        const field = error.param || error.field
        fieldErrors[field] = error.msg || error.message || 'Invalid value'
      }
    })
    return fieldErrors
  }
  
  // Format 5: Nested errors in data.data
  if (data?.data && typeof data.data === 'object') {
    if (data.data.errors) {
      return parseValidationErrors({ ...data, errors: data.data.errors })
    }
    if (data.data.validationErrors) {
      return parseValidationErrors({ ...data, validationErrors: data.data.validationErrors })
    }
  }
  
  // Format 6: Single field error in message
  if (data?.message && data.message.includes('validation')) {
    // Try to extract field name from message
    const match = data.message.match(/["'](\w+)["']/i)
    if (match && match[1]) {
      fieldErrors[match[1]] = data.message
    }
  }
  
  return fieldErrors
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error: ParsedError): string {
  if (error.isNetworkError) {
    return '🔌 ' + error.message
  }
  
  if (error.isServerError) {
    return '⚠️ ' + error.message
  }
  
  if (error.isValidationError) {
    const errorCount = Object.keys(error.fieldErrors).length
    if (errorCount > 0) {
      return `Please fix ${errorCount} validation error${errorCount > 1 ? 's' : ''}`
    }
    return error.message
  }
  
  return error.message
}

/**
 * Get user-friendly field error messages
 */
export function getFieldErrorMessage(field: string, error: string): string {
  // Common error transformations
  const transformations: Record<string, Record<string, string>> = {
    email: {
      'unique': 'This email is already registered',
      'invalid': 'Please enter a valid email address',
      'required': 'Email address is required'
    },
    phone: {
      'unique': 'This phone number is already registered',
      'invalid': 'Please enter a valid phone number',
      'required': 'Phone number is required'
    },
    name: {
      'required': 'Name is required',
      'minlength': 'Name is too short',
      'maxlength': 'Name is too long'
    },
    password: {
      'weak': 'Password is too weak. Use at least 8 characters with uppercase, lowercase, number and special character',
      'mismatch': 'Passwords do not match',
      'required': 'Password is required'
    }
  }
  
  // Check for field-specific transformations
  const fieldTransformations = transformations[field.toLowerCase()]
  if (fieldTransformations) {
    const errorKey = error.toLowerCase()
    for (const key in fieldTransformations) {
      if (errorKey.includes(key)) {
        return fieldTransformations[key]
      }
    }
  }
  
  // Generic transformations
  if (error.toLowerCase().includes('required')) {
    return `${formatFieldName(field)} is required`
  }
  
  if (error.toLowerCase().includes('invalid')) {
    return `${formatFieldName(field)} is invalid`
  }
  
  if (error.toLowerCase().includes('unique')) {
    return `This ${formatFieldName(field).toLowerCase()} is already taken`
  }
  
  if (error.toLowerCase().includes('min')) {
    const match = error.match(/\d+/)
    if (match) {
      return `${formatFieldName(field)} must be at least ${match[0]} characters`
    }
  }
  
  if (error.toLowerCase().includes('max')) {
    const match = error.match(/\d+/)
    if (match) {
      return `${formatFieldName(field)} must not exceed ${match[0]} characters`
    }
  }
  
  // Return original error if no transformation found
  return error
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: ParsedError): boolean {
  // Network errors are retryable
  if (error.isNetworkError) return true
  
  // Server errors (500+) are potentially retryable
  if (error.isServerError) return true
  
  // Rate limiting (429) is retryable after delay
  if (error.statusCode === 429) return true
  
  // Service unavailable (503) is retryable
  if (error.statusCode === 503) return true
  
  // Timeout (408) is retryable
  if (error.statusCode === 408) return true
  
  return false
}

/**
 * Get retry delay based on error type
 */
export function getRetryDelay(error: ParsedError, attemptNumber: number): number {
  // Exponential backoff base delay
  const baseDelay = 1000 // 1 second
  
  // Rate limiting - check for Retry-After header
  if (error.statusCode === 429) {
    const retryAfter = error.rawError?.response?.headers?.['retry-after']
    if (retryAfter) {
      return parseInt(retryAfter) * 1000
    }
  }
  
  // Exponential backoff with jitter
  const exponentialDelay = baseDelay * Math.pow(2, attemptNumber - 1)
  const jitter = Math.random() * 1000 // 0-1 second jitter
  
  // Cap at 30 seconds
  return Math.min(exponentialDelay + jitter, 30000)
}