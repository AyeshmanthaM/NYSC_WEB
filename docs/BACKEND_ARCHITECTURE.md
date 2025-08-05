# NYSC Website Backend Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                         │
└─────────────────┬───────────────────────┬───────────────────┘
                  │                       │
        ┌─────────▼─────────┐   ┌────────▼─────────┐
        │   Web Server 1    │   │   Web Server 2    │
        │   (Next.js SSR)   │   │   (Next.js SSR)   │
        └─────────┬─────────┘   └────────┬─────────┘
                  │                       │
        ┌─────────▼───────────────────────▼─────────┐
        │           API Gateway (Kong/Nginx)         │
        └─────────┬───────────────────────┬─────────┘
                  │                       │
        ┌─────────▼─────────┐   ┌────────▼─────────┐
        │   API Server 1    │   │   API Server 2    │
        │   (Node.js)       │   │   (Node.js)       │
        └─────────┬─────────┘   └────────┬─────────┘
                  │                       │
        ┌─────────▼───────────────────────▼─────────┐
        │              PostgreSQL                    │
        │          (Primary + Replica)               │
        └────────────────────────────────────────────┘
                  │                       │
        ┌─────────▼─────────┐   ┌────────▼─────────┐
        │    Redis Cache    │   │   File Storage    │
        │                   │   │   (S3/MinIO)      │
        └───────────────────┘   └───────────────────┘
```

## Technology Stack Details

### Core Technologies
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis
- **Queue**: Bull (Redis-based)
- **File Storage**: MinIO (S3-compatible)
- **Search**: Elasticsearch
- **Email**: Nodemailer with SMTP
- **SMS**: GovSMS API integration

### Security Stack
- **Authentication**: JWT with refresh tokens
- **Authorization**: RBAC with Casbin
- **Encryption**: bcrypt for passwords
- **Validation**: Joi/Zod schemas
- **Rate Limiting**: express-rate-limit
- **CORS**: Configured for frontend domains
- **Helmet**: Security headers

## Database Schema

### Core Tables

```sql
-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nic VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    mobile VARCHAR(20),
    password_hash VARCHAR(255),
    role_id INTEGER REFERENCES roles(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News Categories
CREATE TABLE news_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_si VARCHAR(100),
    name_ta VARCHAR(100),
    name_en VARCHAR(100),
    slug VARCHAR(100) UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES news_categories(id),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News Articles
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_si VARCHAR(255),
    title_ta VARCHAR(255),
    title_en VARCHAR(255),
    slug VARCHAR(255) UNIQUE,
    excerpt_si TEXT,
    excerpt_ta TEXT,
    excerpt_en TEXT,
    content_si TEXT,
    content_ta TEXT,
    content_en TEXT,
    featured_image VARCHAR(500),
    category_id UUID REFERENCES news_categories(id),
    author_id UUID REFERENCES users(id),
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News Tags
CREATE TABLE news_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_si VARCHAR(50),
    name_ta VARCHAR(50),
    name_en VARCHAR(50),
    slug VARCHAR(50) UNIQUE,
    usage_count INTEGER DEFAULT 0
);

-- News Article Tags (Many-to-Many)
CREATE TABLE news_article_tags (
    article_id UUID REFERENCES news_articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES news_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- News Comments
CREATE TABLE news_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID REFERENCES news_articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    parent_id UUID REFERENCES news_comments(id),
    content TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Programs and Events
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_si VARCHAR(255),
    title_ta VARCHAR(255),
    title_en VARCHAR(255),
    description_si TEXT,
    description_ta TEXT,
    description_en TEXT,
    program_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    max_participants INTEGER,
    status VARCHAR(50),
    created_by UUID REFERENCES users(id)
);

-- Applications/Registrations
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_type VARCHAR(50),
    user_id UUID REFERENCES users(id),
    program_id UUID REFERENCES programs(id),
    status VARCHAR(50),
    application_data JSONB,
    submitted_at TIMESTAMP,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP
);

-- Training Centers
CREATE TABLE training_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_si VARCHAR(255),
    name_ta VARCHAR(255),
    name_en VARCHAR(255),
    district_id INTEGER REFERENCES districts(id),
    address TEXT,
    contact_number VARCHAR(20),
    email VARCHAR(255),
    courses_offered JSONB,
    facilities JSONB,
    status VARCHAR(50)
);
```

### Supporting Tables
- `roles` - User roles and permissions
- `districts` - Sri Lankan districts
- `divisions` - Divisional secretariats
- `gn_divisions` - Grama Niladhari divisions
- `documents` - Uploaded documents
- `audit_logs` - System audit trail
- `notifications` - User notifications
- `cms_content` - Dynamic content management

## API Structure

### RESTful Endpoints

```typescript
// Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

// User Management
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/:id (admin)
GET    /api/users (admin)
PUT    /api/users/:id (admin)

// News Management
GET    /api/news                    // List with pagination & filters
GET    /api/news/featured           // Featured articles
GET    /api/news/latest             // Latest articles
GET    /api/news/popular            // Most viewed
GET    /api/news/categories         // All categories
GET    /api/news/category/:slug     // Articles by category
GET    /api/news/tags               // All tags
GET    /api/news/tag/:slug          // Articles by tag
GET    /api/news/:slug              // Single article
POST   /api/news (admin)            // Create article
PUT    /api/news/:id (admin)        // Update article
DELETE /api/news/:id (admin)        // Delete article
POST   /api/news/:id/view           // Increment view count
GET    /api/news/:id/related        // Related articles
POST   /api/news/:id/comment        // Add comment
GET    /api/news/:id/comments       // Get comments

// News Categories (Admin)
POST   /api/news/categories
PUT    /api/news/categories/:id
DELETE /api/news/categories/:id

// Programs
GET    /api/programs
POST   /api/programs
GET    /api/programs/:id
PUT    /api/programs/:id
GET    /api/programs/:id/participants

// Applications
POST   /api/applications
GET    /api/applications/my
GET    /api/applications/:id
PUT    /api/applications/:id/status

// Training Centers
GET    /api/training-centers
GET    /api/training-centers/:id
POST   /api/training-centers (admin)
PUT    /api/training-centers/:id (admin)

// File Management
POST   /api/files/upload
GET    /api/files/:id
DELETE /api/files/:id

// CMS
GET    /api/cms/content/:slug
PUT    /api/cms/content/:slug
GET    /api/cms/banners
POST   /api/cms/banners

// Reports
GET    /api/reports/programs
GET    /api/reports/training-centers
GET    /api/reports/statistics
GET    /api/reports/news-analytics
```

### API Response Format

```typescript
// Success Response
{
  "success": true,
  "data": {
    // Response data
  },
  "metadata": {
    "timestamp": "2025-08-03T10:00:00Z",
    "version": "1.0"
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "metadata": {
    "timestamp": "2025-08-03T10:00:00Z",
    "request_id": "req_12345"
  }
}

// Paginated Response
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

## Service Layer Architecture

```typescript
// Example Service Structure
// services/ProgramService.ts

export class ProgramService {
  constructor(
    private prisma: PrismaClient,
    private cache: RedisClient,
    private queue: Queue,
    private storage: StorageService
  ) {}

  async createProgram(data: CreateProgramDto): Promise<Program> {
    // Validate data
    const validated = await createProgramSchema.validate(data);
    
    // Create in database
    const program = await this.prisma.program.create({
      data: {
        ...validated,
        status: 'DRAFT'
      }
    });
    
    // Queue notification
    await this.queue.add('notify-subscribers', {
      type: 'NEW_PROGRAM',
      programId: program.id
    });
    
    // Invalidate cache
    await this.cache.del('programs:*');
    
    return program;
  }
  
  async getPrograms(filters: ProgramFilters): Promise<PaginatedResult<Program>> {
    const cacheKey = `programs:${JSON.stringify(filters)}`;
    
    // Check cache
    const cached = await this.cache.get(cacheKey);
    if (cached) return JSON.parse(cached);
    
    // Query database
    const [data, total] = await Promise.all([
      this.prisma.program.findMany({
        where: this.buildWhereClause(filters),
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.program.count({
        where: this.buildWhereClause(filters)
      })
    ]);
    
    const result = {
      data,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        pages: Math.ceil(total / filters.limit)
      }
    };
    
    // Cache result
    await this.cache.setex(cacheKey, 300, JSON.stringify(result));
    
    return result;
  }
}
```

## Queue Processing

```typescript
// Queue Workers
// workers/notificationWorker.ts

export const notificationWorker = new Worker('notifications', async (job) => {
  const { type, data } = job.data;
  
  switch (type) {
    case 'NEW_PROGRAM':
      await sendSubscriberNotification({
        subject: 'New Program Available',
        programId: data.programId
      });
      break;
      
    case 'APPLICATION_STATUS':
      await sendUserNotification({
        userId: data.userId,
        message: `Your application status: ${data.status}`
      });
      break;
      
    case 'BULK_SMS':
      await processBulkSMS(data.recipients, data.message);
      break;
      
    case 'EVENT_REMINDER':
      await sendEventReminder({
        eventId: data.eventId,
        recipients: data.recipients
      });
      break;
  }
}, {
  connection: redisConnection,
  concurrency: 5
});
```

## Middleware Stack

```typescript
// middleware/index.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

export const setupMiddleware = (app: express.Application) => {
  // Security
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
  
  // CORS
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true
  }));
  
  // Compression
  app.use(compression());
  
  // Logging
  app.use(morgan('combined'));
  
  // Rate limiting
  app.use('/api/', rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests'
  }));
  
  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  
  // Custom middleware
  app.use(requestIdMiddleware);
  app.use(languageMiddleware);
  app.use(auditLogMiddleware);
};
```

## Authentication & Authorization

```typescript
// middleware/auth.ts
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true }
    });
    
    if (!user || !user.isActive) {
      throw new Error('Invalid user');
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role.name)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
```

## Environment Configuration with Security

```env
# .env.example
NODE_ENV=development
PORT=3001

# Security: Bind to localhost only in development
HOST=127.0.0.1

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/nysc_db

# Redis - Bind to localhost
REDIS_URL=redis://127.0.0.1:6379

# JWT Secrets
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS - Restrict to local development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3002

# Security Headers
HELMET_ENABLED=true
CORS_ENABLED=true
RATE_LIMIT_ENABLED=true
```

## Port Security Middleware

```typescript
// middleware/security.ts
import { Express } from 'express';

export const setupSecurity = (app: Express) => {
  // Bind to localhost only in development
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3001;
  
  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
  
  // CORS configuration - restrict origins
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
  }));
  
  // Rate limiting
  app.use('/api/', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests',
    standardHeaders: true,
    legacyHeaders: false,
  }));
  
  // Ensure server binds to localhost only
  app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
    console.log('⚠️  Remember to close this port when done developing!');
  });
};
```

## Deployment Configuration

### Docker Setup

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:3001
    depends_on:
      - api

  api:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/nysc
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=nysc
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

## Monitoring & Logging

### Application Monitoring
- **APM**: New Relic / DataDog
- **Error Tracking**: Sentry
- **Uptime**: Pingdom / UptimeRobot
- **Metrics**: Prometheus + Grafana

### Logging Strategy
```typescript
// logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

## Testing Strategy

### Unit Tests
```typescript
// __tests__/services/YouthClubService.test.ts
describe('YouthClubService', () => {
  let service: YouthClubService;
  
  beforeEach(() => {
    service = new YouthClubService(mockPrisma, mockRedis, mockQueue, mockStorage);
  });
  
  describe('createYouthClub', () => {
    it('should create a youth club with pending status', async () => {
      const data = mockYouthClubData();
      const result = await service.createYouthClub(data);
      
      expect(result.status).toBe('PENDING_APPROVAL');
      expect(mockQueue.add).toHaveBeenCalledWith('notify-admin', expect.any(Object));
    });
  });
});
```

### Integration Tests
```typescript
// __tests__/api/youth-clubs.test.ts
describe('Youth Clubs API', () => {
  it('POST /api/youth-clubs should create a new club', async () => {
    const response = await request(app)
      .post('/api/youth-clubs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(validYouthClubData);
      
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

## Performance Optimization

### Database Optimization
- Proper indexing on frequently queried columns
- Connection pooling
- Query optimization with EXPLAIN ANALYZE
- Materialized views for complex reports

### Caching Strategy
- Redis for session storage
- Query result caching (5-minute TTL)
- Static asset caching with CDN
- API response caching for public endpoints

### Code Optimization
- Lazy loading of modules
- Efficient data structures
- Batch processing for bulk operations
- Pagination for large datasets

---

This backend architecture ensures scalability, security, and maintainability for the NYSC website while adhering to government standards and best practices.