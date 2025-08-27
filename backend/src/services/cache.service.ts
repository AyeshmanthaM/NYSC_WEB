import { createClient, RedisClientType } from 'redis';

class CacheService {
  private redis: RedisClientType | null = null;
  private enabled = false;

  constructor() {
    try {
      // Check if Redis URL is configured
      if (process.env.REDIS_URL) {
        this.redis = createClient({
          url: process.env.REDIS_URL
        });
        
        this.redis.on('connect', () => {
          console.log('✅ Redis connected');
          this.enabled = true;
        });

        this.redis.on('error', (error: any) => {
          console.warn('⚠️ Redis connection error:', error.message);
          this.enabled = false;
        });

        // Connect to Redis
        this.redis.connect().catch(() => {
          console.warn('⚠️ Failed to connect to Redis');
          this.enabled = false;
        });
      }
    } catch (error) {
      console.warn('⚠️ Redis initialization failed:', (error as Error).message);
    }
  }

  async get(key: string): Promise<any> {
    if (!this.enabled || !this.redis) return null;
    
    try {
      const value = await this.redis.get(this.getKey(key));
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<boolean> {
    if (!this.enabled || !this.redis) return false;
    
    try {
      const serialized = JSON.stringify(value);
      await this.redis.setEx(this.getKey(key), ttlSeconds, serialized);
      return true;
    } catch (error) {
      console.warn('Cache set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.enabled || !this.redis) return false;
    
    try {
      await this.redis.del(this.getKey(key));
      return true;
    } catch (error) {
      console.warn('Cache delete error:', error);
      return false;
    }
  }

  async deletePattern(pattern: string): Promise<boolean> {
    if (!this.enabled || !this.redis) return false;
    
    try {
      const keys = await this.redis.keys(this.getKey(pattern));
      if (keys.length > 0) {
        await this.redis.del(keys);
      }
      return true;
    } catch (error) {
      console.warn('Cache delete pattern error:', error);
      return false;
    }
  }

  async flush(): Promise<boolean> {
    if (!this.enabled || !this.redis) return false;
    
    try {
      await this.redis.flushDb();
      return true;
    } catch (error) {
      console.warn('Cache flush error:', error);
      return false;
    }
  }

  private getKey(key: string): string {
    const prefix = process.env.CACHE_PREFIX || 'nysc:';
    return `${prefix}${key}`;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.disconnect();
    }
  }
}

export const cacheService = new CacheService();