# NYSC Website Fullstack Architecture Document

## Introduction

This document outlines the complete fullstack architecture for the National Youth Services Council (NYSC) Sri Lanka website, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

### Document Scope

Comprehensive documentation of the NYSC website system including:
- Frontend application built with React + Vite + TypeScript
- Backend API system with Node.js/Express
- Database architecture with PostgreSQL
- Infrastructure and deployment configuration
- Security and performance considerations

### Change Log

| Date       | Version | Description                             | Author        |
|------------|---------|----------------------------------------|---------------|
| 2025-08-09 | 2.0     | Fullstack architecture consolidation  | AI Assistant  |
| 2025-08-03 | 1.0     | Initial backend architecture          | Original      |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Frontend Entry**: `frontend/src/main.tsx` - React application entry point
- **Frontend App**: `frontend/src/App.tsx` - Main application component
- **Vite Config**: `frontend/vite.config.ts` - Build configuration
- **Backend Entry**: `backend/src/server.ts` - Express server entry point
- **API Routes**: `backend/src/routes/` - API endpoint definitions
- **Database Models**: `backend/prisma/schema.prisma` - Database schema
- **Configuration**: `.env.example`, `frontend/tailwind.config.js`

## High Level Architecture

### Technical Summary

The NYSC website is a modern fullstack application built with a React-based frontend using Vite as the build tool, connected to a Node.js/Express backend API. The system uses PostgreSQL for data persistence, Redis for caching, and is designed to be deployed on cloud infrastructure with horizontal scalability. The architecture follows a microservices-ready pattern with clear separation of concerns between frontend presentation, API layer, and data persistence.

### Platform and Infrastructure Choice

**Platform:** Cloud-native deployment (AWS/Azure/DigitalOcean)
**Key Services:** 
- Frontend hosting: CDN-backed static hosting (Cloudflare Pages/Vercel/Netlify)
- Backend API: Containerized deployment with Docker/Kubernetes
- Database: Managed PostgreSQL (RDS/Azure Database/DigitalOcean Managed DB)
- Cache: Managed Redis
- File Storage: S3-compatible object storage
**Deployment Regions:** Primary: Singapore (ap-southeast-1), Secondary: Mumbai (ap-south-1)

### Repository Structure

**Structure:** Monorepo with separate frontend and backend packages
**Monorepo Tool:** PNPM workspaces (planned)
**Package Organization:** 
- `/frontend` - React application
- `/backend` - Express API server
- `/admin` - Admin panel (planned)
- `/shared` - Shared types and utilities (planned)

### High Level Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web Browser]
        Mobile[Mobile Browser]
    end
    
    subgraph "CDN Layer"
        CF[Cloudflare CDN]
    end
    
    subgraph "Application Layer"
        Frontend[React App<br/>Vite Build]
        API[Express API<br/>Node.js]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL<br/>Primary + Replica)]
        Redis[(Redis Cache)]
        S3[File Storage<br/>S3/MinIO]
    end
    
    subgraph "External Services"
        Email[Email Service]
        SMS[GovSMS API]
    end
    
    Web --> CF
    Mobile --> CF
    CF --> Frontend
    Frontend --> API
    API --> PG
    API --> Redis
    API --> S3
    API --> Email
    API --> SMS
```

### Architectural Patterns

- **Jamstack Architecture:** Static site generation with dynamic API - *Rationale:* Optimal performance and scalability for content-heavy government website
- **Component-Based UI:** Reusable React components with TypeScript - *Rationale:* Maintainability and type safety across large codebase
- **Repository Pattern:** Abstract data access logic with Prisma ORM - *Rationale:* Enables testing and future database migration flexibility
- **API Gateway Pattern:** Single entry point for all API calls - *Rationale:* Centralized auth, rate limiting, and monitoring
- **Service Layer Pattern:** Business logic separated from controllers - *Rationale:* Testability and maintainability
- **Queue-Based Processing:** Async operations with Bull/Redis - *Rationale:* Improved performance for long-running tasks

## Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|------------|
| Frontend Language | TypeScript | 5.5.3 | Type-safe development | Type safety and better developer experience |
| Frontend Framework | React | 18.3.1 | UI component library | Industry standard, large ecosystem |
| Build Tool | Vite | 5.4.19 | Fast build and HMR | Superior development experience |
| UI Component Library | Custom + Lucide | latest | Icons and components | Lightweight, customizable |
| State Management | React Context | Built-in | Global state management | Simple requirements, no need for Redux |
| Backend Language | TypeScript | 5.x | Type-safe backend | Consistency with frontend |
| Backend Framework | Express.js | 4.x | Web application framework | Mature, flexible, large ecosystem |
| API Style | REST | - | API architecture | Simple, well-understood |
| Database | PostgreSQL | 15 | Primary data store | ACID compliance, complex queries |
| ORM | Prisma | 5.x | Database abstraction | Type-safe queries, migrations |
| Cache | Redis | 7.x | Session and data cache | High performance caching |
| File Storage | MinIO/S3 | latest | Object storage | S3-compatible, self-hostable |
| Authentication | JWT | - | Token-based auth | Stateless, scalable |
| Frontend Testing | Vitest | planned | Unit testing | Vite-native testing |
| Backend Testing | Jest | planned | Unit/integration testing | Industry standard |
| E2E Testing | Playwright | planned | End-to-end testing | Modern, reliable |
| CSS Framework | Tailwind CSS | 3.4.1 | Utility-first CSS | Rapid development, consistency |
| Containerization | Docker | latest | Application packaging | Consistent deployments |
| CI/CD | GitHub Actions | - | Automation pipeline | Integrated with repository |
| Monitoring | To be determined | - | Application monitoring | - |
| Logging | Winston | latest | Application logging | Structured logging |

## Technology Stack Details (Legacy)

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

## Data Models

### Core Business Entities

#### User Model
**Purpose:** Represents system users including youth members, club representatives, and staff

**Key Attributes:**
- `id`: UUID - Unique identifier
- `nic`: string - National Identity Card number
- `email`: string - Email address
- `mobile`: string - Contact number
- `role`: Role - User role reference
- `isActive`: boolean - Account status

**TypeScript Interface:**
```typescript
interface User {
  id: string;
  nic?: string;
  email: string;
  mobile?: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
- Has one Role
- Has many Applications
- Has many NewsArticles (as author)

#### NewsArticle Model
**Purpose:** Multilingual news and announcement content

**Key Attributes:**
- `id`: UUID - Unique identifier
- `title_si/ta/en`: string - Multilingual titles
- `content_si/ta/en`: string - Multilingual content
- `slug`: string - URL-friendly identifier
- `category`: Category - Article category
- `author`: User - Content author
- `isPublished`: boolean - Publication status

**TypeScript Interface:**
```typescript
interface NewsArticle {
  id: string;
  title_si?: string;
  title_ta?: string;
  title_en: string;
  slug: string;
  content_si?: string;
  content_ta?: string;
  content_en: string;
  category: NewsCategory;
  author: User;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
}
```

**Relationships:**
- Belongs to one Category
- Belongs to one User (author)
- Has many Tags
- Has many Comments

#### Program Model
**Purpose:** Training programs, events, and workshops

**Key Attributes:**
- `id`: UUID - Unique identifier
- `title`: Multilingual - Program title
- `programType`: string - Type of program
- `startDate`: Date - Program start
- `endDate`: Date - Program end
- `maxParticipants`: number - Capacity limit
- `status`: string - Current status

**TypeScript Interface:**
```typescript
interface Program {
  id: string;
  title_si?: string;
  title_ta?: string;
  title_en: string;
  description: MultilingualText;
  programType: ProgramType;
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants?: number;
  status: ProgramStatus;
  createdBy: User;
}
```

**Relationships:**
- Created by one User
- Has many Applications

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

## API Specification

### REST API Structure

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

## Components

### Frontend Components

#### Layout Components
**Responsibility:** Application structure and navigation

**Key Interfaces:**
- `Header.tsx` - Main navigation and language selector
- `Footer.tsx` - Site footer with links and information

**Dependencies:** React, React Router, LanguageContext, ThemeContext

**Technology Stack:** React 18, TypeScript, Tailwind CSS

#### Section Components
**Responsibility:** Homepage content sections

**Key Interfaces:**
- `HeroSection.tsx` - Hero banner with animations
- `ServicesSection.tsx` - Service showcase
- `NewsEventsSection.tsx` - Latest news display
- `LeadersSection.tsx` - Leadership showcase
- `YouthOfferings.tsx` - Youth program highlights

**Dependencies:** UI components, API services

**Technology Stack:** React, TypeScript, Lucide icons

#### UI Components
**Responsibility:** Reusable UI elements

**Key Interfaces:**
- `AnimatedBackground.tsx` - Background animations
- `HeroParticleMesh.tsx` - Particle effects

**Dependencies:** React, CSS animations

**Technology Stack:** React, TypeScript, CSS3 animations

### Backend Components

#### API Controllers
**Responsibility:** HTTP request handling and routing

**Key Interfaces:**
- `authController` - Authentication endpoints
- `newsController` - News CRUD operations
- `programController` - Program management
- `userController` - User management

**Dependencies:** Express, Service layer, Middleware

**Technology Stack:** Express.js, TypeScript

#### Service Layer
**Responsibility:** Business logic implementation

**Key Interfaces:**
- `NewsService` - News article operations
- `ProgramService` - Program management logic
- `AuthService` - Authentication logic
- `EmailService` - Email notifications

**Dependencies:** Prisma ORM, Redis, Queue system

**Technology Stack:** TypeScript, Prisma, Bull queue

#### Data Access Layer
**Responsibility:** Database operations and caching

**Key Interfaces:**
- Prisma models and queries
- Redis caching operations
- Transaction management

**Dependencies:** PostgreSQL, Redis, Prisma

**Technology Stack:** Prisma ORM, Redis client

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

## External APIs

### GovSMS API
- **Purpose:** SMS notifications for Sri Lankan users
- **Documentation:** Government SMS gateway documentation
- **Base URL:** To be configured
- **Authentication:** API key-based
- **Rate Limits:** Government-imposed limits

**Key Endpoints Used:**
- `POST /send` - Send single SMS
- `POST /bulk` - Send bulk SMS

**Integration Notes:** Requires government approval and API key

### Email Service (SMTP)
- **Purpose:** Email notifications and communications
- **Documentation:** SMTP configuration
- **Base URL:** SMTP server endpoint
- **Authentication:** SMTP credentials
- **Rate Limits:** Provider-specific

**Integration Notes:** Configure with government email server or approved provider

## Core Workflows

### User Registration and Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant DB as Database
    participant R as Redis
    
    U->>F: Fill registration form
    F->>A: POST /api/auth/register
    A->>DB: Check existing user
    A->>DB: Create user record
    A->>R: Store session
    A->>F: Return JWT token
    F->>U: Registration success
```

### News Article Publishing Flow

```mermaid
sequenceDiagram
    participant A as Admin
    participant F as Frontend
    participant API as API
    participant DB as Database
    participant C as Cache
    
    A->>F: Create article
    F->>API: POST /api/news
    API->>DB: Save article
    API->>C: Invalidate cache
    API->>F: Article created
    F->>A: Success message
```

## Frontend Architecture

### Component Architecture

#### Component Organization
```
frontend/src/
├── components/
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/        # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── NewsEventsSection.tsx
│   └── ui/              # Reusable UI components
│       ├── AnimatedBackground.tsx
│       └── HeroParticleMesh.tsx
├── contexts/            # React contexts
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
├── hooks/               # Custom hooks
├── services/            # API services
├── types/               # TypeScript types
└── utils/               # Utilities
```

### State Management Architecture

#### State Structure
```typescript
// Global state managed via React Context
interface AppState {
  theme: 'light' | 'dark';
  language: 'si' | 'ta' | 'en';
  user: User | null;
  isAuthenticated: boolean;
}
```

#### State Management Patterns
- Context API for global state
- Local component state for UI state
- Custom hooks for reusable stateful logic

### Routing Architecture

#### Route Organization
```
/                     # Homepage
/about                # About NYSC
/news                 # News listing
/news/:slug           # News detail
/programs             # Programs listing
/programs/:id         # Program detail
/services             # Services
/contact              # Contact page
/admin                # Admin panel (protected)
```

## Backend Architecture

### Service Architecture

#### Controller/Route Organization
```
backend/src/
├── routes/
│   ├── auth.routes.ts
│   ├── news.routes.ts
│   ├── program.routes.ts
│   └── user.routes.ts
├── controllers/
│   ├── authController.ts
│   ├── newsController.ts
│   └── programController.ts
├── services/
│   ├── NewsService.ts
│   ├── ProgramService.ts
│   └── AuthService.ts
└── middleware/
    ├── auth.ts
    ├── validation.ts
    └── errorHandler.ts
```

### Database Architecture

See Database Schema section for detailed schema design.

### Authentication and Authorization

#### Auth Flow
```mermaid
sequenceDiagram
    participant C as Client
    participant A as API
    participant J as JWT Service
    participant D as Database
    
    C->>A: Login request
    A->>D: Validate credentials
    D->>A: User data
    A->>J: Generate tokens
    J->>A: Access + Refresh tokens
    A->>C: Return tokens
    
    Note over C,A: Subsequent requests
    C->>A: Request with token
    A->>J: Verify token
    J->>A: Token valid
    A->>C: Protected resource
```

## Unified Project Structure

```
nysc-website/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yaml
│       └── deploy.yaml
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API services
│   │   ├── types/              # TypeScript types
│   │   └── utils/              # Utilities
│   ├── public/                 # Static assets
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                    # Express API
│   ├── src/
│   │   ├── routes/             # API routes
│   │   ├── controllers/        # Route handlers
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Express middleware
│   │   ├── utils/              # Utilities
│   │   └── server.ts           # Entry point
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # DB migrations
│   ├── tests/                  # Backend tests
│   ├── package.json
│   └── tsconfig.json
├── admin/                      # Admin panel (planned)
├── shared/                     # Shared code (planned)
│   ├── types/                  # Shared TypeScript types
│   └── constants/              # Shared constants
├── docker/                     # Docker configs
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── docs/                       # Documentation
│   ├── BACKEND_ARCHITECTURE.md
│   ├── UI_UX_AGENT.md
│   └── ADMIN_PANEL.md
├── scripts/                    # Build scripts
├── .env.example                # Environment template
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # PNPM workspace config
└── README.md
```

## Development Workflow

### Local Development Setup

#### Prerequisites
```bash
# Required software
node --version  # v20.x LTS
npm --version   # v10.x
pnpm --version  # v8.x (optional but recommended)
postgresql --version  # v15.x
redis-server --version  # v7.x
```

#### Initial Setup
```bash
# Clone repository
git clone https://github.com/nysc/website.git
cd website

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Setup database
cd backend
prisma migrate dev
prisma db seed

# Copy environment files
cp .env.example .env
cd ../frontend
cp .env.example .env.local
```

#### Development Commands
```bash
# Start all services
npm run dev:all  # Starts frontend and backend

# Start frontend only
cd frontend && npm run dev

# Start backend only  
cd backend && npm run dev

# Run tests
npm run test        # All tests
npm run test:unit   # Unit tests only
npm run test:e2e    # E2E tests
```

### Environment Configuration

#### Required Environment Variables
```bash
# Frontend (.env.local)
VITE_API_URL=http://localhost:3001
VITE_PUBLIC_URL=http://localhost:5173

# Backend (.env)
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:pass@localhost:5432/nysc
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Shared
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
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

## Deployment Architecture

### Deployment Strategy

**Frontend Deployment:**
- **Platform:** Cloudflare Pages / Vercel / Netlify
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **CDN/Edge:** Cloudflare CDN with global distribution

**Backend Deployment:**
- **Platform:** Docker containers on Kubernetes / Cloud Run
- **Build Command:** `npm run build`
- **Deployment Method:** Container orchestration

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
  
  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: cd frontend && npm ci && npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          projectName: nysc-website
  
  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t nysc-api ./backend
      - run: docker push registry/nysc-api
      - run: kubectl apply -f k8s/
```

### Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|----------|
| Development | http://localhost:5173 | http://localhost:3001 | Local development |
| Staging | https://staging.nysc.lk | https://api-staging.nysc.lk | Pre-production testing |
| Production | https://www.nysc.lk | https://api.nysc.lk | Live environment |

## Security and Performance

### Security Requirements

**Frontend Security:**
- CSP Headers: Strict Content Security Policy
- XSS Prevention: React's built-in protections + input sanitization
- Secure Storage: HTTPOnly cookies for auth tokens

**Backend Security:**
- Input Validation: Joi/Zod schemas on all endpoints
- Rate Limiting: 100 requests per 15 minutes per IP
- CORS Policy: Whitelist specific origins only

**Authentication Security:**
- Token Storage: HTTPOnly cookies + CSRF tokens
- Session Management: 15min access tokens, 7d refresh tokens
- Password Policy: Min 8 chars, complexity requirements

### Performance Optimization

**Frontend Performance:**
- Bundle Size Target: <500KB initial, <2MB total
- Loading Strategy: Code splitting, lazy loading
- Caching Strategy: Service worker + CDN caching

**Backend Performance:**
- Response Time Target: <200ms for API calls
- Database Optimization: Indexes, query optimization
- Caching Strategy: Redis for sessions and frequent queries

## Testing Strategy

### Testing Pyramid

```
       E2E Tests (10%)
      /              \
  Integration Tests (30%)
    /                  \
Unit Tests (60% coverage)
```

### Test Organization

#### Frontend Tests
```
frontend/tests/
├── unit/
│   ├── components/
│   └── hooks/
├── integration/
│   └── services/
└── e2e/
    └── workflows/
```

#### Backend Tests
```
backend/tests/
├── unit/
│   ├── services/
│   └── utils/
├── integration/
│   └── api/
└── e2e/
    └── scenarios/
```

## Coding Standards

### Critical Fullstack Rules

- **Type Sharing:** Always define types in shared package and import from there
- **API Calls:** Never make direct HTTP calls - use the service layer
- **Environment Variables:** Access only through config objects, never process.env directly
- **Error Handling:** All API routes must use the standard error handler
- **State Updates:** Never mutate state directly - use proper state management patterns
- **Async Operations:** Always handle promises with try/catch or .catch()
- **Security:** Never trust client input - validate everything server-side

### Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|----------|
| Components | PascalCase | - | `UserProfile.tsx` |
| Hooks | camelCase with 'use' | - | `useAuth.ts` |
| API Routes | - | kebab-case | `/api/user-profile` |
| Database Tables | - | snake_case | `user_profiles` |
| Services | PascalCase | PascalCase | `NewsService.ts` |
| Utils | camelCase | camelCase | `formatDate.ts` |

## Error Handling Strategy

### Error Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant F as Frontend
    participant A as API
    participant L as Logger
    
    C->>F: User action
    F->>A: API request
    A->>A: Error occurs
    A->>L: Log error
    A->>F: Error response
    F->>F: Handle error
    F->>C: User feedback
```

### Error Response Format

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
}
```

## Monitoring and Observability

### Monitoring Stack

- **Frontend Monitoring:** Sentry for error tracking
- **Backend Monitoring:** New Relic / DataDog
- **Error Tracking:** Sentry unified platform
- **Performance Monitoring:** Core Web Vitals, APM

### Key Metrics

**Frontend Metrics:**
- Core Web Vitals (LCP, FID, CLS)
- JavaScript errors
- API response times
- User interactions

**Backend Metrics:**
- Request rate
- Error rate (target <0.1%)
- Response time (p95 <500ms)
- Database query performance

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

## Technical Debt and Known Issues

### Current State Analysis

The NYSC website is currently in early development phase with the following state:

1. **Frontend Status**: Basic React + Vite setup with initial components
2. **Backend Status**: Architecture defined but not yet implemented
3. **Database**: Schema designed but migrations not yet created
4. **DevOps**: Docker configuration planned but not implemented

### Critical Technical Decisions

1. **Vite over Next.js**: Project uses Vite instead of Next.js (as originally planned in docs)
   - Impact: No SSR/SSG out of the box
   - Workaround: Consider migration to Next.js for better SEO

2. **Tailwind CSS v3**: Locked to v3.x per project requirements
   - Constraint: Cannot upgrade to v4 even when available
   - Reason: SLDDS compliance requirements

3. **Monorepo Structure**: Planned but not yet implemented
   - Current: Separate frontend folder
   - Future: Need to setup PNPM workspaces

### Workarounds and Gotchas

- **Port Configuration**: Backend hardcoded to port 3001
- **CORS Setup**: Currently commented out in vite.config.ts
- **Environment Variables**: No .env files created yet
- **TypeScript Strict Mode**: Not enabled, should be for better type safety

## Integration Points and External Dependencies

### Current External Services

None integrated yet - all planned:

| Service | Purpose | Integration Type | Status |
|---------|---------|------------------|--------|  
| GovSMS | SMS notifications | REST API | Not integrated |
| Email Server | Email notifications | SMTP | Not configured |
| Cloudflare | CDN and hosting | DNS/Pages | Partially configured |
| PostgreSQL | Database | Direct connection | Not setup |
| Redis | Caching | Direct connection | Not setup |

### Internal Integration Points

- **Frontend-Backend Communication**: Will use REST API on port 3001
- **Authentication**: JWT-based (not implemented)
- **File Upload**: Planned MinIO integration

## If Enhancement PRD Provided - Impact Analysis

*Note: This section would be populated based on specific enhancement requirements*

### Potential Enhancement Areas

 Based on current architecture, common enhancements might affect:

- **User Authentication**: Would need to implement JWT service, auth middleware
- **CMS Features**: Would require admin panel development
- **Multilingual Support**: Context providers exist but content not implemented
- **Search Functionality**: Would need Elasticsearch integration
- **Real-time Features**: Would require WebSocket implementation

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
# Frontend Development
cd frontend
npm run dev         # Start dev server on port 5173
npm run build       # Production build
npm run lint        # Run ESLint
npm run preview     # Preview production build

# Backend Development (when implemented)
cd backend
npm run dev         # Start dev server on port 3001
npm run build       # TypeScript compilation
npm run migrate     # Run Prisma migrations
npm run seed        # Seed database

# Testing (when implemented)
npm run test        # Run all tests
npm run test:unit   # Unit tests only
npm run test:e2e    # E2E tests
```

### Debugging and Troubleshooting

- **Frontend Issues**: Check browser console and Vite terminal output
- **Build Issues**: Clear `node_modules` and reinstall
- **Type Errors**: Run `tsc --noEmit` to check TypeScript
- **Tailwind Issues**: Ensure content paths are correct in config

### Project Setup from Scratch

```bash
# Clone and setup
git clone [repository]
cd nysc-website

# Frontend setup
cd frontend
npm install
cp .env.example .env.local  # When available
npm run dev

# Backend setup (when implemented)
cd ../backend  
npm install
cp .env.example .env
prisma migrate dev
npm run dev
```

---

*Document Version: 2.0 - Fullstack Architecture*  
*Last Updated: 2025-08-09*  
*Status: Living document - updates as development progresses*