import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
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

// API Functions
export const translationApi = {
  // Get all translations with filters
  async getTranslations(filters: TranslationFilter = {}) {
    const params = new URLSearchParams();
    
    if (filters.namespace) params.append('namespace', filters.namespace);
    if (filters.language) params.append('language', filters.language);
    if (filters.search) params.append('search', filters.search);
    if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
    
    const response = await apiClient.get(`/translations?${params}`);
    return response.data;
  },

  // Get single translation by ID
  async getTranslationById(id: string) {
    const response = await apiClient.get(`/translations/${id}`);
    return response.data;
  },

  // Create new translation
  async createTranslation(data: {
    namespace: string;
    key: string;
    language: string;
    value: string;
  }) {
    const response = await apiClient.post('/translations', data);
    return response.data;
  },

  // Update translation
  async updateTranslation(id: string, data: { value: string }) {
    const response = await apiClient.put(`/translations/${id}`, data);
    return response.data;
  },

  // Delete translation
  async deleteTranslation(id: string) {
    const response = await apiClient.delete(`/translations/${id}`);
    return response.data;
  },

  // Bulk update translations
  async bulkUpdateTranslations(updates: Array<{ id: string; value: string }>): Promise<BulkUpdateResult> {
    const response = await apiClient.put('/translations/bulk', { updates });
    return response.data;
  },

  // Import translations from CSV
  async importTranslations(file: File): Promise<ImportResult> {
    const formData = new FormData();
    formData.append('csvFile', file);
    
    const response = await apiClient.post('/translations/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Export translations to CSV
  async exportTranslations(filters: TranslationFilter = {}) {
    const response = await apiClient.post('/translations/export', filters, {
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Get filename from response header if available
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'translations-export.csv';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return { success: true, message: 'Export completed successfully' };
  },

  // Sync translations to files
  async syncToFiles() {
    const response = await apiClient.post('/translations/sync');
    return response.data;
  },

  // Get translation statistics
  async getStats(): Promise<TranslationStats> {
    const response = await apiClient.get('/translations/stats');
    return response.data.data;
  },

  // Get translation completeness report
  async getCompleteness(): Promise<TranslationCompleteness[]> {
    const response = await apiClient.get('/translations/completeness');
    return response.data.data;
  },

  // Search translations
  async searchTranslations(query: string, filters: TranslationFilter = {}) {
    return this.getTranslations({
      ...filters,
      search: query,
    });
  },

  // Get namespaces
  async getNamespaces() {
    // This would typically come from a dedicated endpoint
    // For now, return static list based on the project structure
    return {
      success: true,
      data: [
        { name: 'common', description: 'Common translations used across the site' },
        { name: 'header', description: 'Header navigation and branding' },
        { name: 'footer', description: 'Footer links and information' },
        { name: 'home', description: 'Homepage content' },
        { name: 'services', description: 'Services section content' },
        { name: 'courses', description: 'Courses and training content' },
        { name: 'testimonials', description: 'User testimonials' },
        { name: 'newsevents', description: 'News and events content' },
        { name: 'dropdown', description: 'Dropdown menu items' },
      ],
    };
  },

  // Get languages
  getLanguages() {
    return {
      success: true,
      data: [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
      ],
    };
  },

  // Validate translation data
  validateTranslation(data: {
    namespace: string;
    key: string;
    language: string;
    value: string;
  }) {
    const errors: string[] = [];
    
    if (!data.namespace?.trim()) {
      errors.push('Namespace is required');
    }
    
    if (!data.key?.trim()) {
      errors.push('Key is required');
    }
    
    if (!['en', 'si', 'ta'].includes(data.language)) {
      errors.push('Invalid language code');
    }
    
    if (!data.value?.trim()) {
      errors.push('Value is required');
    }
    
    // Key format validation
    if (data.key && !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(data.key)) {
      errors.push('Key must start with a letter and contain only letters, numbers, and underscores');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Generate CSV template
  generateCSVTemplate() {
    const csvContent = 'namespace,key,language,value\n' +
      'common,sampleKey,en,Sample English value\n' +
      'common,sampleKey,si,සිංහල නියැදි අගය\n' +
      'common,sampleKey,ta,தமிழ் மாதிரி மதிப்பு\n';
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'translation-template.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  },

  // Check translation key uniqueness
  async checkKeyUniqueness(namespace: string, key: string, language: string) {
    try {
      const translations = await this.getTranslations({ namespace, language });
      return !translations.data.some((t: Translation) => 
        t.key === key && t.namespace === namespace && t.language === language
      );
    } catch (error) {
      console.error('Error checking key uniqueness:', error);
      return true; // Assume unique on error
    }
  },
};