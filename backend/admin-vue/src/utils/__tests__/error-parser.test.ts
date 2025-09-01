import { describe, it, expect } from 'vitest'
import {
  parseBackendError,
  formatErrorMessage,
  getFieldErrorMessage,
  isRetryableError,
  getRetryDelay
} from '../error-parser'
import type { ParsedError } from '../error-parser'

describe('error parser utilities', () => {
  describe('parseBackendError', () => {
    it('should handle network errors', () => {
      const networkError = { message: 'Network Error' }
      const result = parseBackendError(networkError)

      expect(result.isNetworkError).toBe(true)
      expect(result.isValidationError).toBe(false)
      expect(result.isServerError).toBe(false)
      expect(result.message).toBe('Network Error')
      expect(result.fieldErrors).toEqual({})
    })

    it('should handle validation errors (400)', () => {
      const validationError = {
        response: {
          status: 400,
          data: {
            message: 'Validation failed',
            errors: {
              name: 'Name is required',
              email: 'Invalid email format'
            }
          }
        }
      }

      const result = parseBackendError(validationError)

      expect(result.isValidationError).toBe(true)
      expect(result.isNetworkError).toBe(false)
      expect(result.isServerError).toBe(false)
      expect(result.statusCode).toBe(400)
      expect(result.message).toBe('Validation failed')
      expect(result.fieldErrors).toEqual({
        name: 'Name is required',
        email: 'Invalid email format'
      })
    })

    it('should handle validation errors (422)', () => {
      const validationError = {
        response: {
          status: 422,
          data: {
            details: {
              phone: 'Invalid phone number',
              position: 'Position is required'
            }
          }
        }
      }

      const result = parseBackendError(validationError)

      expect(result.isValidationError).toBe(true)
      expect(result.fieldErrors).toEqual({
        phone: 'Invalid phone number',
        position: 'Position is required'
      })
    })

    it('should handle express-validator style errors', () => {
      const expressError = {
        response: {
          status: 400,
          data: [
            { param: 'name', msg: 'Name is required' },
            { param: 'email', msg: 'Must be a valid email' }
          ]
        }
      }

      const result = parseBackendError(expressError)

      expect(result.isValidationError).toBe(true)
      expect(result.fieldErrors).toEqual({
        name: 'Name is required',
        email: 'Must be a valid email'
      })
    })

    it('should handle validation errors array format', () => {
      const validationError = {
        response: {
          status: 422,
          data: {
            validationErrors: [
              { field: 'name', message: 'Name is required' },
              { field: 'email', message: 'Invalid email' }
            ]
          }
        }
      }

      const result = parseBackendError(validationError)

      expect(result.isValidationError).toBe(true)
      expect(result.fieldErrors).toEqual({
        name: 'Name is required',
        email: 'Invalid email'
      })
    })

    it('should handle server errors (500+)', () => {
      const serverError = {
        response: {
          status: 500,
          data: { message: 'Internal server error' }
        }
      }

      const result = parseBackendError(serverError)

      expect(result.isServerError).toBe(true)
      expect(result.isValidationError).toBe(false)
      expect(result.isNetworkError).toBe(false)
      expect(result.message).toBe('Server error, please try again later')
      expect(result.statusCode).toBe(500)
    })

    it('should handle authentication errors', () => {
      const authError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      }

      const result = parseBackendError(authError)

      expect(result.message).toBe('Authentication required. Please log in again.')
      expect(result.statusCode).toBe(401)
    })

    it('should handle forbidden errors', () => {
      const forbiddenError = {
        response: {
          status: 403,
          data: { message: 'Forbidden' }
        }
      }

      const result = parseBackendError(forbiddenError)

      expect(result.message).toBe('You do not have permission to perform this action.')
      expect(result.statusCode).toBe(403)
    })

    it('should handle not found errors', () => {
      const notFoundError = {
        response: {
          status: 404,
          data: { message: 'Resource not found' }
        }
      }

      const result = parseBackendError(notFoundError)

      expect(result.message).toBe('Resource not found')
      expect(result.statusCode).toBe(404)
    })
  })

  describe('formatErrorMessage', () => {
    it('should format network errors', () => {
      const error: ParsedError = {
        isNetworkError: true,
        isValidationError: false,
        isServerError: false,
        message: 'Connection failed',
        fieldErrors: {}
      }

      expect(formatErrorMessage(error)).toBe('🔌 Connection failed')
    })

    it('should format server errors', () => {
      const error: ParsedError = {
        isNetworkError: false,
        isValidationError: false,
        isServerError: true,
        message: 'Internal error',
        fieldErrors: {}
      }

      expect(formatErrorMessage(error)).toBe('⚠️ Internal error')
    })

    it('should format validation errors with count', () => {
      const error: ParsedError = {
        isNetworkError: false,
        isValidationError: true,
        isServerError: false,
        message: 'Validation failed',
        fieldErrors: {
          name: 'Required',
          email: 'Invalid'
        }
      }

      expect(formatErrorMessage(error)).toBe('Please fix 2 validation errors')
    })

    it('should format validation errors with single error', () => {
      const error: ParsedError = {
        isNetworkError: false,
        isValidationError: true,
        isServerError: false,
        message: 'Validation failed',
        fieldErrors: {
          name: 'Required'
        }
      }

      expect(formatErrorMessage(error)).toBe('Please fix 1 validation error')
    })
  })

  describe('getFieldErrorMessage', () => {
    it('should transform common email errors', () => {
      expect(getFieldErrorMessage('email', 'unique')).toBe('This email is already registered')
      expect(getFieldErrorMessage('email', 'invalid')).toBe('Please enter a valid email address')
      expect(getFieldErrorMessage('email', 'required')).toBe('Email address is required')
    })

    it('should transform phone errors', () => {
      expect(getFieldErrorMessage('phone', 'unique')).toBe('This phone number is already registered')
      expect(getFieldErrorMessage('phone', 'invalid')).toBe('Please enter a valid phone number')
    })

    it('should transform password errors', () => {
      expect(getFieldErrorMessage('password', 'weak')).toContain('Password is too weak')
      expect(getFieldErrorMessage('password', 'mismatch')).toBe('Passwords do not match')
    })

    it('should handle generic transformations', () => {
      expect(getFieldErrorMessage('firstName', 'required')).toBe('First Name is required')
      expect(getFieldErrorMessage('lastName', 'invalid')).toBe('Last Name is invalid')
      expect(getFieldErrorMessage('username', 'unique')).toBe('This Username is already taken')
    })

    it('should extract numbers from min/max errors', () => {
      expect(getFieldErrorMessage('password', 'min 8 characters')).toBe('Password must be at least 8 characters')
      expect(getFieldErrorMessage('description', 'max 500 characters')).toBe('Description must not exceed 500 characters')
    })

    it('should return original error if no transformation found', () => {
      const originalError = 'Custom validation error'
      expect(getFieldErrorMessage('customField', originalError)).toBe(originalError)
    })
  })

  describe('isRetryableError', () => {
    it('should identify retryable errors', () => {
      const networkError: ParsedError = {
        isNetworkError: true,
        isValidationError: false,
        isServerError: false,
        message: 'Network error',
        fieldErrors: {}
      }

      const serverError: ParsedError = {
        isNetworkError: false,
        isValidationError: false,
        isServerError: true,
        message: 'Server error',
        fieldErrors: {},
        statusCode: 500
      }

      const rateLimitError: ParsedError = {
        isNetworkError: false,
        isValidationError: false,
        isServerError: false,
        message: 'Rate limited',
        fieldErrors: {},
        statusCode: 429
      }

      expect(isRetryableError(networkError)).toBe(true)
      expect(isRetryableError(serverError)).toBe(true)
      expect(isRetryableError(rateLimitError)).toBe(true)
    })

    it('should identify non-retryable errors', () => {
      const validationError: ParsedError = {
        isNetworkError: false,
        isValidationError: true,
        isServerError: false,
        message: 'Validation error',
        fieldErrors: {},
        statusCode: 400
      }

      const authError: ParsedError = {
        isNetworkError: false,
        isValidationError: false,
        isServerError: false,
        message: 'Unauthorized',
        fieldErrors: {},
        statusCode: 401
      }

      expect(isRetryableError(validationError)).toBe(false)
      expect(isRetryableError(authError)).toBe(false)
    })
  })

  describe('getRetryDelay', () => {
    it('should return custom delay for rate limiting', () => {
      const rateLimitError: ParsedError = {
        isNetworkError: false,
        isValidationError: false,
        isServerError: false,
        message: 'Rate limited',
        fieldErrors: {},
        statusCode: 429,
        rawError: {
          response: {
            headers: {
              'retry-after': '60'
            }
          }
        }
      }

      expect(getRetryDelay(rateLimitError, 1)).toBe(60000) // 60 seconds
    })

    it('should use exponential backoff', () => {
      const serverError: ParsedError = {
        isNetworkError: false,
        isValidationError: false,
        isServerError: true,
        message: 'Server error',
        fieldErrors: {},
        statusCode: 500
      }

      const delay1 = getRetryDelay(serverError, 1)
      const delay2 = getRetryDelay(serverError, 2)
      const delay3 = getRetryDelay(serverError, 3)

      expect(delay1).toBeGreaterThanOrEqual(1000) // Base delay + jitter
      expect(delay2).toBeGreaterThanOrEqual(2000) // 2x base delay
      expect(delay3).toBeGreaterThanOrEqual(4000) // 4x base delay
      
      // Should cap at 30 seconds
      expect(delay1).toBeLessThanOrEqual(30000)
      expect(delay2).toBeLessThanOrEqual(30000)
      expect(delay3).toBeLessThanOrEqual(30000)
    })

    it('should add jitter to prevent thundering herd', () => {
      const error: ParsedError = {
        isNetworkError: true,
        isValidationError: false,
        isServerError: false,
        message: 'Network error',
        fieldErrors: {}
      }

      const delays = Array.from({ length: 10 }, () => getRetryDelay(error, 1))
      const uniqueDelays = new Set(delays)
      
      // Should have some variation due to jitter
      expect(uniqueDelays.size).toBeGreaterThan(1)
    })
  })
})