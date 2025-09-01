import { describe, it, expect, beforeEach } from 'vitest'
import {
  validateField,
  validateForm,
  clearFieldError,
  hasErrors,
  getFirstErrorField,
  formatFieldName,
  validateFileUpload,
  sanitizeFormData,
  commonValidationRules
} from '../validation'
import type { ProfileFormData, FormFieldError, FormValidationRule } from '@/types/forms'

describe('validation utilities', () => {
  describe('validateField', () => {
    it('should validate required fields', () => {
      const rule: FormValidationRule = { required: true }
      
      expect(validateField('name', '', rule)).toBe('Name is required')
      expect(validateField('name', null, rule)).toBe('Name is required')
      expect(validateField('name', undefined, rule)).toBe('Name is required')
      expect(validateField('name', 'John Doe', rule)).toBeUndefined()
    })

    it('should validate string length', () => {
      const rule: FormValidationRule = { 
        required: true, 
        minLength: 3, 
        maxLength: 10 
      }
      
      expect(validateField('name', 'Jo', rule)).toBe('Must be at least 3 characters')
      expect(validateField('name', 'John', rule)).toBeUndefined()
      expect(validateField('name', 'Very long name that exceeds limit', rule))
        .toBe('Must not exceed 10 characters')
    })

    it('should validate patterns', () => {
      const rule: FormValidationRule = { 
        pattern: /^[a-zA-Z]+$/ 
      }
      
      expect(validateField('name', 'John123', rule)).toBe('Invalid format')
      expect(validateField('name', 'John', rule)).toBeUndefined()
    })

    it('should validate numbers', () => {
      const rule: FormValidationRule = { 
        min: 0, 
        max: 100 
      }
      
      expect(validateField('age', -1, rule)).toBe('Must be at least 0')
      expect(validateField('age', 101, rule)).toBe('Must not exceed 100')
      expect(validateField('age', 25, rule)).toBeUndefined()
    })

    it('should use custom validation functions', () => {
      const rule: FormValidationRule = {
        custom: (value: string) => {
          if (value === 'forbidden') return 'This value is not allowed'
          return undefined
        }
      }
      
      expect(validateField('test', 'forbidden', rule)).toBe('This value is not allowed')
      expect(validateField('test', 'allowed', rule)).toBeUndefined()
    })

    it('should skip validation for optional empty fields', () => {
      const rule: FormValidationRule = { 
        required: false, 
        minLength: 5 
      }
      
      expect(validateField('optional', '', rule)).toBeUndefined()
      expect(validateField('optional', null, rule)).toBeUndefined()
    })
  })

  describe('common validation rules', () => {
    it('should validate names correctly', () => {
      const rule = commonValidationRules.name
      
      expect(validateField('name', '', rule)).toBe('Name is required')
      expect(validateField('name', 'J', rule)).toBe('Name must be at least 2 characters')
      expect(validateField('name', 'John O\'Connor', rule)).toBeUndefined()
      expect(validateField('name', 'John123', rule)).toBe('Name contains invalid characters')
    })

    it('should validate email addresses', () => {
      const rule = commonValidationRules.email
      
      expect(validateField('email', '', rule)).toBe('Email is required')
      expect(validateField('email', 'invalid', rule)).toBe('Please enter a valid email address')
      expect(validateField('email', 'test@example.com', rule)).toBeUndefined()
    })

    it('should validate phone numbers', () => {
      const rule = commonValidationRules.phone
      
      expect(validateField('phone', '', rule)).toBe('Phone number is required')
      expect(validateField('phone', '123', rule)).toBe('Please enter a valid Sri Lankan phone number')
      expect(validateField('phone', '+94 77 123 4567', rule)).toBeUndefined()
      expect(validateField('phone', '0771234567', rule)).toBeUndefined()
    })

    it('should validate LinkedIn URLs', () => {
      const rule = commonValidationRules.linkedin
      
      expect(validateField('linkedin', '', rule)).toBeUndefined() // Optional
      expect(validateField('linkedin', 'invalid-url', rule))
        .toBe('Please enter a valid LinkedIn profile URL')
      expect(validateField('linkedin', 'https://linkedin.com/in/johndoe', rule))
        .toBeUndefined()
    })
  })

  describe('validateForm', () => {
    it('should validate multiple fields', () => {
      const formData: ProfileFormData = {
        name: '',
        position: 'Developer',
        email: 'invalid-email',
        phone: '+94 77 123 4567',
        isActive: true,
        order: 1
      }

      const errors = validateForm(formData, ['name', 'email'])
      
      expect(errors).toEqual({
        name: 'Name is required',
        email: 'Please enter a valid email address'
      })
    })

    it('should validate optional fields with values', () => {
      const formData: ProfileFormData = {
        name: 'John Doe',
        position: 'Developer',
        email: 'john@example.com',
        phone: '+94 77 123 4567',
        linkedin: 'invalid-linkedin',
        isActive: true,
        order: 1
      }

      const errors = validateForm(formData, ['name', 'email', 'phone'])
      
      expect(errors.linkedin).toBe('Please enter a valid LinkedIn profile URL')
    })

    it('should return empty object for valid form', () => {
      const formData: ProfileFormData = {
        name: 'John Doe',
        position: 'Developer',
        email: 'john@example.com',
        phone: '+94 77 123 4567',
        isActive: true,
        order: 1
      }

      const errors = validateForm(formData, ['name', 'email', 'phone'])
      expect(errors).toEqual({})
    })
  })

  describe('error utility functions', () => {
    let errors: FormFieldError

    beforeEach(() => {
      errors = {
        name: 'Name is required',
        email: 'Invalid email',
        phone: 'Phone is required'
      }
    })

    it('should clear field errors', () => {
      clearFieldError(errors, 'name')
      expect(errors.name).toBeUndefined()
      expect(errors.email).toBe('Invalid email')
    })

    it('should check if form has errors', () => {
      expect(hasErrors(errors)).toBe(true)
      expect(hasErrors({})).toBe(false)
    })

    it('should get first error field', () => {
      expect(getFirstErrorField(errors)).toBe('name')
      expect(getFirstErrorField({})).toBeNull()
    })

    it('should format field names', () => {
      expect(formatFieldName('firstName')).toBe('First Name')
      expect(formatFieldName('emailAddress')).toBe('Email Address')
      expect(formatFieldName('name')).toBe('Name')
    })
  })

  describe('validateFileUpload', () => {
    const createMockFile = (name: string, size: number, type: string): File => {
      const file = new File([''], name, { type })
      Object.defineProperty(file, 'size', { value: size })
      return file
    }

    it('should validate file size', () => {
      const largeFile = createMockFile('test.jpg', 6 * 1024 * 1024, 'image/jpeg') // 6MB
      const smallFile = createMockFile('test.jpg', 1024 * 1024, 'image/jpeg') // 1MB

      expect(validateFileUpload(largeFile)).toBe('File size must be less than 5MB')
      expect(validateFileUpload(smallFile)).toBeUndefined()
    })

    it('should validate file types', () => {
      const txtFile = createMockFile('test.txt', 1024, 'text/plain')
      const jpegFile = createMockFile('test.jpg', 1024, 'image/jpeg')

      expect(validateFileUpload(txtFile)).toContain('Invalid file type')
      expect(validateFileUpload(jpegFile)).toBeUndefined()
    })

    it('should handle missing file', () => {
      expect(validateFileUpload(null as any)).toBe('No file selected')
    })

    it('should use custom limits', () => {
      const file = createMockFile('test.jpg', 2 * 1024 * 1024, 'image/jpeg') // 2MB
      
      expect(validateFileUpload(file, 1024 * 1024)).toBe('File size must be less than 1MB')
      expect(validateFileUpload(file, 3 * 1024 * 1024)).toBeUndefined()
    })
  })

  describe('sanitizeFormData', () => {
    it('should trim string values', () => {
      const formData: ProfileFormData = {
        name: '  John Doe  ',
        position: '  Developer  ',
        email: 'john@example.com',
        phone: '+94 77 123 4567',
        isActive: true,
        order: 1
      }

      const sanitized = sanitizeFormData(formData)
      
      expect(sanitized.name).toBe('John Doe')
      expect(sanitized.position).toBe('Developer')
      expect(sanitized.email).toBe('john@example.com')
    })

    it('should remove empty optional fields', () => {
      const formData: ProfileFormData = {
        name: 'John Doe',
        position: 'Developer',
        email: 'john@example.com',
        phone: '+94 77 123 4567',
        linkedin: '',
        description: null,
        department: undefined,
        isActive: true,
        order: 1
      }

      const sanitized = sanitizeFormData(formData)
      
      expect(sanitized.linkedin).toBeUndefined()
      expect(sanitized.description).toBeUndefined()
      expect(sanitized.department).toBeUndefined()
      expect(sanitized.isActive).toBe(true) // Should preserve boolean
      expect(sanitized.order).toBe(1) // Should preserve number
    })

    it('should preserve required fields even if empty', () => {
      const formData: ProfileFormData = {
        name: 'John Doe',
        position: 'Developer',
        email: 'john@example.com',
        phone: '+94 77 123 4567',
        isActive: false, // Should be preserved even if falsy
        order: 0 // Should be preserved even if falsy
      }

      const sanitized = sanitizeFormData(formData)
      
      expect(sanitized.isActive).toBe(false)
      expect(sanitized.order).toBe(0)
    })
  })
})