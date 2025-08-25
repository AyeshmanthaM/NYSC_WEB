import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance for translation API
const translationApiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors gracefully
translationApiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.warn('Translation API error:', error.message);
    // Don't throw error to prevent breaking the app
    // Return empty data structure instead
    return {
      data: {
        success: false,
        data: {},
        error: error.message
      }
    };
  }
);

export interface TranslationResponse {
  success: boolean;
  data: Record<string, string>;
  error?: string;
}

/**
 * Translation API service for frontend
 * Provides methods to fetch translations from backend API
 */
export const translationApi = {
  /**
   * Fetch translations for a specific language and namespace
   */
  async getTranslations(language: string, namespace: string): Promise<Record<string, string>> {
    try {
      const response = await translationApiClient.get<{
        success: boolean;
        data: Array<{
          key: string;
          value: string;
        }>;
      }>('/translations', {
        params: {
          language,
          namespace,
          isActive: true
        }
      });

      if (response.data.success && response.data.data) {
        // Convert array to object format expected by i18next
        const translations: Record<string, string> = {};
        response.data.data.forEach((item: any) => {
          translations[item.key] = item.value;
        });
        return translations;
      }

      return {};
    } catch (error) {
      console.warn(`Failed to fetch translations for ${language}/${namespace}:`, error);
      return {};
    }
  },

  /**
   * Fetch all translations for a language
   */
  async getAllTranslations(language: string): Promise<Record<string, Record<string, string>>> {
    try {
      const response = await translationApiClient.get<{
        success: boolean;
        data: Array<{
          namespace: string;
          key: string;
          value: string;
        }>;
      }>('/translations', {
        params: {
          language,
          isActive: true
        }
      });

      if (response.data.success && response.data.data) {
        // Group by namespace
        const translationsByNamespace: Record<string, Record<string, string>> = {};
        
        response.data.data.forEach((item: any) => {
          if (!translationsByNamespace[item.namespace]) {
            translationsByNamespace[item.namespace] = {};
          }
          translationsByNamespace[item.namespace][item.key] = item.value;
        });

        return translationsByNamespace;
      }

      return {};
    } catch (error) {
      console.warn(`Failed to fetch all translations for ${language}:`, error);
      return {};
    }
  },

  /**
   * Check if API is available
   */
  async checkApiAvailability(): Promise<boolean> {
    try {
      const response = await translationApiClient.get('/translations/stats', {
        timeout: 5000
      });
      return response.data.success === true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get translation statistics (for debugging)
   */
  async getStats() {
    try {
      const response = await translationApiClient.get('/translations/stats');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch translation stats:', error);
      return null;
    }
  }
};

/**
 * WebSocket connection for real-time translation updates
 */
export class TranslationWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private onUpdateCallback?: (data: any) => void;

  constructor(onUpdate?: (data: any) => void) {
    this.onUpdateCallback = onUpdate;
    this.connect();
  }

  private connect() {
    try {
      const wsUrl = API_BASE_URL.replace(/^http/, 'ws') + '/ws';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Translation WebSocket connected');
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
        
        // Subscribe to translation updates
        this.send({
          type: 'subscribe',
          topic: 'translation_updates'
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'translation_update' && this.onUpdateCallback) {
            this.onUpdateCallback(data.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('Translation WebSocket disconnected');
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('Translation WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), 30000);
      
      console.log(`Scheduling WebSocket reconnect attempt ${this.reconnectAttempts} in ${delay}ms`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.log('Max WebSocket reconnection attempts reached');
    }
  }

  private send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}