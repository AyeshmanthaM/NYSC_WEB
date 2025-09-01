// Form-specific type definitions

export interface ValidationError {
  field: string
  message: string
  code?: string
}

export interface BackendErrorResponse {
  success: false
  message?: string
  errors?: Record<string, string>
  details?: Record<string, string>
  validationErrors?: ValidationError[]
  statusCode?: number
}

export interface BackendSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
}

export type BackendResponse<T = any> = BackendSuccessResponse<T> | BackendErrorResponse

export interface FormFieldError {
  [key: string]: string
}

export interface FormState {
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
  errors: FormFieldError
}

export interface FileUploadResult {
  url: string
  fileId: string
  filename?: string
  size?: number
  mimeType?: string
}

export interface ProfileFormData {
  // Basic fields
  name: string
  position: string
  email: string
  phone: string
  image?: string
  imageFileId?: string
  linkedin?: string
  isActive: boolean
  order: number
  
  // Type-specific fields
  description?: string
  title?: string
  tenure?: string
  vision?: string
  badge?: string
  department?: string
  specialization?: string
  experience?: string
  region?: string
  province?: string
  district?: string
  headquarters?: string
  population?: string
  centers?: number
  teamRole?: string
  age?: number
  skills?: string
  
  // Allow additional dynamic fields
  [key: string]: any
}

export interface FormValidationRule {
  required?: boolean
  pattern?: RegExp
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  custom?: (value: any, formData: any) => string | undefined
}

export interface FormFieldConfig {
  key: string
  label: string
  type: 'text' | 'email' | 'tel' | 'url' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  fullWidth?: boolean
  options?: Array<{ value: string; label: string }>
  validation?: FormValidationRule
  helpText?: string
  disabled?: boolean
  readOnly?: boolean
}