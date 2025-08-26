import app from './app';
import { logger } from '@/config/logger';
import { prisma } from '@/config/database';
import { connectRedis } from '@/config/redis';

const PORT = process.env.PORT || 5000;

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to Redis first
    await connectRedis();
    logger.info('Connected to Redis');
    
    // Test database connection
    await prisma.$connect();
    logger.info('Connected to MySQL database');
    
    // Test database query
    const userCount = await prisma.user.count();
    logger.info(`Database ready - ${userCount} users found`);
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`, {
        environment: process.env.NODE_ENV || 'development',
        port: PORT,
        timestamp: new Date().toISOString(),
      });
      
      // Log important URLs
      const baseUrl = `http://localhost:${PORT}`;
      logger.info('Available endpoints:', {
        admin: `${baseUrl}/admin`,
        api: `${baseUrl}/api`,
        health: `${baseUrl}/health`,
      });
    });
    
    // Server error handling
    server.on('error', (error: any) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      
      const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
      
      switch (error.code) {
        case 'EACCES':
          logger.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          logger.error('Server error', { error });
          throw error;
      }
    });
    
    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully...`);
      
      server.close(async (err) => {
        if (err) {
          logger.error('Error during server shutdown', { error: err });
        }
        
        try {
          // Close database connections
          await prisma.$disconnect();
          logger.info('Database connections closed');
          
          logger.info('Server shutdown complete');
          process.exit(0);
        } catch (error) {
          logger.error('Error during graceful shutdown', { error });
          process.exit(1);
        }
      });
      
      // Force shutdown after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown due to timeout');
        process.exit(1);
      }, 30000);
    };
    
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

// Start the server
startServer().catch((error) => {
  logger.error('Server startup failed', { error });
  process.exit(1);
});