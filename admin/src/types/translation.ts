// Translation type definitions for admin panel

export interface Translation {
  id: string;
  namespace: string;
  key: string;
  language: string;
  value: string;
  version: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  versions?: TranslationVersion[];
  audits?: TranslationAudit[];
}

export interface TranslationVersion {
  id: string;
  translationId: string;
  version: number;
  value: string;
  createdAt: string;
  createdBy?: string;
}

export interface TranslationAudit {
  id: string;
  translationId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH';
  oldValue?: string;
  newValue?: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export interface TranslationFilter {
  namespace?: string;
  language?: string;
  search?: string;
  isActive?: boolean;
}

export interface TranslationStats {
  total: number;
  byLanguage: Array<{
    language: string;
    count: number;
  }>;
  byNamespace: Array<{
    namespace: string;
    count: number;
  }>;
  recentlyUpdated: number;
}

export interface TranslationCompleteness {
  namespace: string;
  language: string;
  total: number;
  translated: number;
  missing: number;
  missingKeys: string[];
  percentage: number;
}

export interface BulkUpdateResult {
  summary: {
    total: number;
    successful: number;
    errors: number;
  };
  results: Array<{
    id: string;
    success: boolean;
    data?: Translation;
    error?: string;
  }>;
}

export interface ImportResult {
  success: number;
  errors: Array<{
    row: number;
    error: string;
    data: any;
  }>;
}

export interface TranslationNamespace {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'TRANSLATOR' | 'VIEWER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  metadata?: {
    timestamp: string;
    version?: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Form data types
export interface CreateTranslationData {
  namespace: string;
  key: string;
  language: string;
  value: string;
}

export interface UpdateTranslationData {
  value: string;
}

export interface BulkUpdateData {
  updates: Array<{
    id: string;
    value: string;
  }>;
}

export interface ExportFilters extends TranslationFilter {
  format?: 'csv';
}

// Utility types
export type Language = 'en' | 'si' | 'ta';

export type Namespace = 
  | 'common'
  | 'header'
  | 'dropdown'
  | 'home'
  | 'services'
  | 'courses'
  | 'testimonials'
  | 'newsevents'
  | 'footer';

export type UserRole = 'ADMIN' | 'EDITOR' | 'TRANSLATOR' | 'VIEWER';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH';

// Error types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: ValidationError[];
  timestamp?: string;
  requestId?: string;
}

// WebSocket message types
export interface WebSocketMessage {
  type: 'translation_update' | 'subscribed' | 'error';
  data?: any;
  message?: string;
}