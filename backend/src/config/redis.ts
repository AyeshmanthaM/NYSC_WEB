import { createClient, RedisClientType } from 'redis';
import { logger } from './logger';

let redisClient: RedisClientType;

// Redis configuration
const redisConfig = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    connectTimeout: 60000,
    lazyConnect: true,
  },
  retryDelayOnFailover: 100,
  enableAutoPipelining: true,
};

// Create Redis client
export const createRedisClient = (): RedisClientType => {
  const client = createClient(redisConfig);

  // Error handling
  client.on('error', (error) => {
    logger.error('Redis error', { error: error.message });
  });

  client.on('connect', () => {
    logger.info('Redis connected successfully');
  });

  client.on('ready', () => {
    logger.info('Redis client ready');
  });

  client.on('reconnecting', () => {
    logger.warn('Redis reconnecting...');
  });

  client.on('end', () => {
    logger.warn('Redis connection ended');
  });

  return client as any;
};

// Initialize Redis connection
export const connectRedis = async (): Promise<void> => {
  try {
    if (!redisClient) {
      redisClient = createRedisClient();
    }

    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    // Test connection
    await redisClient.ping();
    logger.info('Redis connection established');
  } catch (error) {
    logger.error('Failed to connect to Redis', { error });
    throw error;
  }
};

// Disconnect Redis
export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient && redisClient.isOpen) {
      await redisClient.disconnect();
      logger.info('Redis disconnected');
    }
  } catch (error) {
    logger.error('Error disconnecting from Redis', { error });
  }
};

// Health check
export const checkRedisConnection = async (): Promise<boolean> => {
  try {
    if (!redisClient || !redisClient.isOpen) {
      return false;
    }
    
    const result = await redisClient.ping();
    return result === 'PONG';
  } catch (error) {
    logger.error('Redis health check failed', { error });
    return false;
  }
};

// Get Redis client instance
export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

// Redis key helpers
export const createKey = (prefix: string, ...parts: string[]): string => {
  const keyPrefix = process.env.REDIS_PREFIX || 'nysc:';
  return `${keyPrefix}${prefix}:${parts.join(':')}`;
};

// Cache utilities
export class RedisCache {
  private client: RedisClientType;
  private defaultTTL: number;

  constructor(client: RedisClientType, defaultTTL = 3600) {
    this.client = client;
    this.defaultTTL = defaultTTL;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Redis get error', { key, error });
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      const expiry = ttl || this.defaultTTL;
      
      await this.client.setEx(key, expiry, serialized);
      return true;
    } catch (error) {
      logger.error('Redis set error', { key, error });
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      const result = await this.client.del(key);
      return result > 0;
    } catch (error) {
      logger.error('Redis delete error', { key, error });
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result > 0;
    } catch (error) {
      logger.error('Redis exists error', { key, error });
      return false;
    }
  }

  async increment(key: string, ttl?: number): Promise<number> {
    try {
      const result = await this.client.incr(key);
      
      if (ttl && result === 1) {
        await this.client.expire(key, ttl);
      }
      
      return result;
    } catch (error) {
      logger.error('Redis increment error', { key, error });
      return 0;
    }
  }

  async deletePattern(pattern: string): Promise<number> {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length === 0) return 0;
      
      const result = await this.client.del(keys);
      return result;
    } catch (error) {
      logger.error('Redis delete pattern error', { pattern, error });
      return 0;
    }
  }
}

export { redisClient };