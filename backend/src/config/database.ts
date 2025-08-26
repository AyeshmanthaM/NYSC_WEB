import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Prisma Client configuration
const prismaClientOptions = {
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ] as const,
  errorFormat: 'pretty' as const,
};

// Create Prisma Client instance
const createPrismaClient = (): PrismaClient => {
  const client = new PrismaClient(prismaClientOptions as any);

  // Log queries in development
  if (process.env.NODE_ENV === 'development') {
    (client.$on as any)('query', (e: any) => {
      logger.debug('Query executed', {
        query: e.query,
        params: e.params,
        duration: e.duration,
      });
    });
  }

  // Log errors
  (client.$on as any)('error', (e: any) => {
    logger.error('Database error', {
      target: e.target,
      message: e.message,
    });
  });

  // Log warnings
  (client.$on as any)('warn', (e: any) => {
    logger.warn('Database warning', {
      target: e.target,
      message: e.message,
    });
  });

  return client;
};

// Use singleton pattern for Prisma Client
const prisma = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Connection health check
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database connection failed', { error });
    return false;
  }
};

// Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection', { error });
  }
};

export { prisma };
export default prisma;