/// <reference path="./types/express.d.ts" />
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import RedisStore from 'connect-redis';
import flash from 'connect-flash';
import path from 'path';
import { createClient } from 'redis';
import { createSessionConfig } from '@/middleware/session.middleware';
import { PrismaClient } from '@prisma/client';

// Import middleware
import { 
  helmetConfig,
  generalRateLimit,
  ipValidation,
  requestSanitization,
  securityAuditLog,
  userAgentValidation,
  securityHeaders,
  corsConfig,
  devSecurityBypass 
} from '@/middleware/security.middleware';
import { 
  preventNoSQLInjection,
  sanitizeHtml 
} from '@/middleware/validation.middleware';
import { errorHandler } from '@/middleware/error.middleware';

// Import routes
import adminRoutes from '@/routes/admin';
import apiRoutes from '@/routes/api';

// Import configuration
import { logger } from '@/config/logger';
import swaggerSpec from '@/config/swagger';

// Import Swagger UI
import swaggerUi from 'swagger-ui-express';

// Type definitions are in src/types/express.d.ts

// Create Express application
const app: express.Application = express();

// Initialize Redis client for sessions
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  logger.error('Redis connection error', { error: err });
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

// Connect to Redis
redisClient.connect().catch(err => {
  logger.error('Failed to connect to Redis', { error: err });
});

// Trust proxy (for accurate IP addresses behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware (order is important)
app.use(helmetConfig); // Security headers
app.use(securityHeaders); // Additional security headers
app.use(ipValidation); // IP validation and processing
app.use(userAgentValidation); // User-Agent validation
app.use(generalRateLimit); // Rate limiting
app.use(devSecurityBypass); // Development security bypass

// CORS configuration
app.use(cors(corsConfig));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request sanitization and validation
app.use(preventNoSQLInjection);
app.use(requestSanitization);
app.use(sanitizeHtml);

// Deferred session initialization middleware
let sessionMiddleware: any = null;
let sessionInitialized = false;

app.use((req, res, next) => {
  if (!sessionInitialized && redisClient.isReady) {
    try {
      sessionMiddleware = session(createSessionConfig());
      sessionInitialized = true;
    } catch (error) {
      logger.error('Failed to initialize session middleware', { error });
      return res.status(500).json({ 
        success: false, 
        error: { code: 'SESSION_INIT_ERROR', message: 'Session initialization failed' }
      });
    }
  }
  
  if (sessionMiddleware && sessionInitialized) {
    return sessionMiddleware(req, res, next);
  } else {
    // Session not ready, add empty session object to prevent errors
    req.session = {
      userId: undefined,
      destroy: (cb: any) => cb && cb(),
      save: (cb: any) => cb && cb(),
      regenerate: (cb: any) => cb && cb(),
      reload: (cb: any) => cb && cb(),
      touch: () => {},
      cookie: {}
    } as any;
    return next();
  }
});

// Flash messages (kept for API compatibility)
app.use(flash());

// Static files - fix path for both development and production
const publicPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '../../public')     // From dist/src/ to public/
  : path.join(__dirname, '../public');       // From src/ to public/
app.use('/admin/assets', express.static(publicPath));
app.use('/assets', express.static(publicPath));

// Serve uploaded files
const uploadsPath = path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads');
app.use('/uploads', express.static(uploadsPath, {
  setHeaders: (res, path) => {
    // Set appropriate headers for different file types
    if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif') || path.endsWith('.webp')) {
      res.set('Cache-Control', 'public, max-age=86400'); // Cache images for 1 day
    }
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// Security audit logging
app.use(securityAuditLog);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Check if the API is running and get basic system information
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                   example: 1234.56
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  });
});

// Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'NYSC Sri Lanka API Documentation',
  customfavIcon: '/assets/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha'
  }
}));

// Serve Vue.js admin SPA static files BEFORE API routes to avoid conflicts
const adminSpaPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '../../public/admin-spa')
  : path.join(__dirname, '../public/admin-spa');

// Serve static assets with proper MIME types
app.use('/admin/assets', express.static(path.join(adminSpaPath, 'assets'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// API routes
app.use('/api', apiRoutes);

// Admin API routes (for Vue SPA to consume)
app.use('/admin/api', adminRoutes);

// Root redirect to admin
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Serve Vue SPA index.html for root admin path
app.get('/admin', (_, res) => {
  res.sendFile(path.join(adminSpaPath, 'index.html'));
});

// Fallback for Vue Router - serve index.html for all other admin routes
app.get('/admin/*', (req, res) => {
  // Don't serve index.html for asset requests
  if (req.path.startsWith('/admin/assets/') || req.path.startsWith('/admin/api/')) {
    return;
  }
  res.sendFile(path.join(adminSpaPath, 'index.html'));
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn('404 Not Found', {
    path: req.originalUrl,
    method: req.method,
    ip: req.clientIp || req.ip,
    userAgent: req.get('User-Agent'),
  });

  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Resource not found',
      path: req.originalUrl,
    },
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down gracefully...');
  
  try {
    await redisClient.quit();
    logger.info('Redis connection closed');
  } catch (error) {
    logger.error('Error closing Redis connection', { error });
  }
  
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  
  try {
    await redisClient.quit();
    logger.info('Redis connection closed');
  } catch (error) {
    logger.error('Error closing Redis connection', { error });
  }
  
  process.exit(0);
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection', {
    reason,
    promise,
  });
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error });
  process.exit(1);
});

export default app;