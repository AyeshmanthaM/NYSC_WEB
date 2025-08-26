# NYSC Website Unified Backend Architecture

## Overview

This document defines the unified backend architecture for the NYSC Sri Lanka website, featuring an integrated admin panel with server-side rendering. The architecture consolidates all backend services into a single Node.js/Express application, eliminating the complexity of separate admin backends.

## Core Architecture Principles

1. **Unified Backend**: Single application serving both API and admin panel
2. **Server-Side Rendering**: EJS templates for admin interfaces
3. **MySQL Database**: Primary data store with Prisma ORM
4. **Role-Based Security**: Comprehensive RBAC implementation
5. **Session Management**: Secure server-side sessions for admin area

## Technology Stack

### Backend Technologies
- **Runtime**: Node.js 20.x LTS
- **Framework**: Express.js 4.x with TypeScript 5.x
- **Database**: MySQL 8.0
- **ORM**: Prisma 5.x
- **Template Engine**: EJS 3.x
- **Authentication**: JWT + express-session
- **Validation**: express-validator
- **Security**: Helmet, CORS, bcrypt

### Supporting Services
- **Cache**: Redis for sessions and caching
- **File Storage**: Local filesystem / S3-compatible storage
- **Email**: Nodemailer with SMTP
- **Monitoring**: Winston for logging

## Project Structure

```
backend/
├── src/
│   ├── server.ts                 # Application entry point
│   ├── app.ts                    # Express app configuration
│   ├── config/
│   │   ├── database.ts          # Prisma client setup
│   │   ├── redis.ts             # Redis client
│   │   ├── auth.ts              # Auth configuration
│   │   └── constants.ts         # App constants
│   ├── controllers/
│   │   ├── api/                 # REST API controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── news.controller.ts
│   │   │   └── programs.controller.ts
│   │   └── admin/               # Admin panel controllers
│   │       ├── dashboard.controller.ts
│   │       ├── users.admin.controller.ts
│   │       ├── content.admin.controller.ts
│   │       └── settings.admin.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts   # JWT verification
│   │   ├── session.middleware.ts # Session handling
│   │   ├── rbac.middleware.ts   # Role checking
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── security.middleware.ts
│   ├── routes/
│   │   ├── api/                 # API route definitions
│   │   │   ├── index.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── users.routes.ts
│   │   │   └── public.routes.ts
│   │   └── admin/               # Admin routes (SSR)
│   │       ├── index.ts
│   │       ├── auth.routes.ts
│   │       └── dashboard.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── email.service.ts
│   │   ├── cache.service.ts
│   │   └── activity.service.ts
│   ├── models/                  # Data models
│   │   ├── user.model.ts
│   │   ├── session.model.ts
│   │   └── activity.model.ts
│   ├── views/                   # EJS templates
│   │   ├── layouts/
│   │   │   ├── admin.ejs
│   │   │   └── auth.ejs
│   │   ├── admin/
│   │   │   ├── dashboard.ejs
│   │   │   ├── users/
│   │   │   ├── content/
│   │   │   └── settings/
│   │   ├── auth/
│   │   │   ├── login.ejs
│   │   │   └── forgot-password.ejs
│   │   └── partials/
│   │       ├── header.ejs
│   │       ├── sidebar.ejs
│   │       ├── footer.ejs
│   │       └── alerts.ejs
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── email-templates.ts
│   └── types/
│       ├── express.d.ts         # Extended Request type
│       ├── models.ts
│       └── api.ts
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Migration files
│   ├── seed.ts                  # Seed data
│   └── client.ts               # Prisma client instance
├── public/                      # Static assets
│   ├── css/
│   │   ├── admin.css
│   │   └── tailwind.css
│   ├── js/
│   │   ├── admin.js
│   │   └── common.js
│   └── images/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   ├── setup.sh
│   └── build.sh
├── .env.example
├── .eslintrc.json
├── tsconfig.json
├── nodemon.json
└── package.json
```

## Database Design (MySQL)

### Core Schema

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// User Management
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  firstName     String?
  lastName      String?
  role          Role      @default(USER)
  isActive      Boolean   @default(true)
  emailVerified Boolean   @default(false)
  lastLogin     DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  profile       Profile?
  sessions      Session[]
  activities    ActivityLog[]
  refreshTokens RefreshToken[]
  
  @@index([email])
  @@index([role])
  @@map("users")
}

enum Role {
  USER
  EDITOR
  MODERATOR
  ADMIN
  SUPER_ADMIN
}

model Profile {
  id          String    @id @default(cuid())
  userId      String    @unique
  phone       String?
  address     String?
  city        String?
  district    String?
  avatar      String?
  bio         String?   @db.Text
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("profiles")
}

model Session {
  id          String    @id @default(cuid())
  userId      String
  sid         String    @unique
  data        Json
  expiresAt   DateTime
  ipAddress   String?
  userAgent   String?   @db.Text
  createdAt   DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([sid])
  @@index([userId])
  @@map("sessions")
}

model RefreshToken {
  id          String    @id @default(cuid())
  token       String    @unique
  userId      String
  expiresAt   DateTime
  createdAt   DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([token])
  @@map("refresh_tokens")
}

model ActivityLog {
  id          String    @id @default(cuid())
  userId      String
  action      String
  resource    String?
  resourceId  String?
  metadata    Json?
  ipAddress   String?
  userAgent   String?   @db.Text
  createdAt   DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("activity_logs")
}
```

## Authentication System

### Authentication Flow

#### API Authentication (JWT)
```typescript
// Login endpoint
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "jwt.token.here",
    "refreshToken": "refresh.token.here"
  }
}
```

#### Admin Authentication (Sessions)
```typescript
// Admin login flow
GET  /admin/login          → Render login page
POST /admin/auth/login     → Process credentials
                          → Create session
                          → Redirect to dashboard
```

### Security Implementation

```typescript
// Auth middleware for API
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken || 
                req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = await userService.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Session middleware for admin
export const authenticateSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    return res.redirect('/admin/login');
  }
  next();
};
```

## Role-Based Access Control

### Permission Matrix

| Feature | USER | EDITOR | MODERATOR | ADMIN | SUPER_ADMIN |
|---------|------|--------|-----------|-------|-------------|
| **API Access** |
| View Content | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create Content | - | ✓ | ✓ | ✓ | ✓ |
| Edit Own Content | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edit Any Content | - | - | ✓ | ✓ | ✓ |
| Delete Content | - | - | ✓ | ✓ | ✓ |
| **Admin Panel Access** |
| Access Dashboard | - | ✓ | ✓ | ✓ | ✓ |
| Manage Users | - | - | - | ✓ | ✓ |
| View Reports | - | ✓ | ✓ | ✓ | ✓ |
| System Settings | - | - | - | - | ✓ |
| View Logs | - | - | ✓ | ✓ | ✓ |

### RBAC Implementation

```typescript
// Role-based middleware
export const requireRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Usage in routes
router.get('/admin/users',
  authenticateSession,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  usersController.listUsers
);
```

## Admin Panel Features

### Core Modules

1. **Dashboard**
   - Statistics widgets
   - Recent activities
   - Quick actions
   - System health

2. **User Management**
   - User list with pagination
   - User creation/editing
   - Role assignment
   - Activity tracking
   - Bulk operations

3. **Content Management**
   - News articles
   - Events calendar
   - Media library
   - Categories/tags

4. **Reports**
   - User statistics
   - Content analytics
   - System logs
   - Export functionality

5. **Settings**
   - Site configuration
   - Email templates
   - Maintenance mode
   - Backup/restore

### Server-Side Rendering

```javascript
// Admin dashboard controller
export const dashboard = async (req: Request, res: Response) => {
  try {
    const [users, articles, events, activities] = await Promise.all([
      userService.getCount(),
      newsService.getCount(),
      eventService.getCount(),
      activityService.getRecent(10)
    ]);
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      layout: 'layouts/admin',
      user: req.user,
      stats: {
        users,
        articles,
        events
      },
      activities,
      helpers: {
        formatDate,
        formatRole
      }
    });
  } catch (error) {
    next(error);
  }
};
```

### EJS Template Structure

```html
<!-- views/layouts/admin.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= title %> - NYSC Admin</title>
  <link rel="stylesheet" href="/css/admin.css">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="flex h-screen bg-gray-100">
    <%- include('../partials/sidebar') %>
    <div class="flex-1 flex flex-col">
      <%- include('../partials/header') %>
      <main class="flex-1 p-6">
        <%- include('../partials/alerts') %>
        <%- body %>
      </main>
    </div>
  </div>
  <script src="/js/admin.js"></script>
</body>
</html>
```

## API Design

### RESTful Endpoints

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me

Users:
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id

Content:
GET    /api/news
GET    /api/news/:id
POST   /api/news
PUT    /api/news/:id
DELETE /api/news/:id

Admin (SSR):
GET    /admin/login
POST   /admin/auth/login
GET    /admin/logout
GET    /admin/dashboard
GET    /admin/users
GET    /admin/users/:id/edit
POST   /admin/users/:id
DELETE /admin/users/:id
```

### Response Format

```typescript
// Success response
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}

// Error response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": []
  }
}

// Paginated response
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Security Measures

### Security Middleware Stack

```typescript
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests
  message: 'Too many login attempts'
});

app.use('/api/auth/login', authLimiter);
app.use('/admin/auth/login', authLimiter);

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redis }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  name: 'nysc.sid'
}));
```

### Security Best Practices

1. **Input Validation**
   - express-validator for all inputs
   - Parameterized queries via Prisma
   - XSS protection in templates

2. **Authentication**
   - Bcrypt (12 rounds) for passwords
   - JWT with short expiration
   - Secure session management

3. **Data Protection**
   - HTTPS enforcement
   - Secure cookies
   - CSRF protection

4. **Monitoring**
   - Activity logging
   - Failed login tracking
   - Anomaly detection

## Performance Optimization

### Caching Strategy

```typescript
// Redis caching service
export class CacheService {
  private redis: Redis;
  
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }
  
  async set(key: string, value: any, ttl?: number): Promise<void> {
    const data = JSON.stringify(value);
    if (ttl) {
      await this.redis.setex(key, ttl, data);
    } else {
      await this.redis.set(key, data);
    }
  }
  
  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length) {
      await this.redis.del(...keys);
    }
  }
}
```

### Database Optimization

- Connection pooling
- Query optimization
- Indexed columns
- Lazy loading relations
- Pagination by default

## Development Setup

### Prerequisites
- Node.js 20.x
- MySQL 8.0
- Redis 6.x
- npm or pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/nysc/website.git
cd website/backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="mysql://user:password@localhost:3306/nysc_db"

# Redis
REDIS_URL="redis://localhost:6379"

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
SESSION_SECRET=your-session-secret

# Frontend
FRONTEND_URL=http://localhost:5173

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Admin
DEFAULT_ADMIN_EMAIL=admin@nysc.lk
DEFAULT_ADMIN_PASSWORD=SecurePassword123!
```

## Testing

### Test Structure

```
tests/
├── unit/
│   ├── services/
│   ├── middleware/
│   └── utils/
├── integration/
│   ├── auth.test.ts
│   ├── users.test.ts
│   └── admin.test.ts
└── e2e/
    ├── login.test.ts
    └── admin-workflow.test.ts
```

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## Deployment

### Production Build

```bash
# Build TypeScript
npm run build

# Run migrations
npx prisma migrate deploy

# Start production server
npm start
```

### Docker Deployment

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production
RUN npx prisma generate

# Copy source code
COPY . .

# Build application
RUN npm run build

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

### Health Checks

```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis()
    }
  };
  
  res.status(200).json(health);
});
```

## Monitoring & Logging

### Logging Configuration

```typescript
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## Maintenance

### Database Backup

```bash
# Backup database
mysqldump -u user -p nysc_db > backup.sql

# Restore database
mysql -u user -p nysc_db < backup.sql
```

### Updates & Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## Support

For issues and questions:
- Documentation: `/docs`
- Issue Tracker: GitHub Issues
- Email: support@nysc.lk