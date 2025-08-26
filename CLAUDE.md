# NYSC Website Development Project - Claude Code Setup

## Project Overview
Development of a modern, multilingual, responsive website for the National Youth Services Council (NYSC) of Sri Lanka, featuring a unified backend architecture with integrated admin panel functionality.

## Architecture Overview

### Unified Backend Approach
- **Single Application**: Integrated backend serving both API and admin panel
- **Server-Side Rendering**: Admin panel uses EJS templates for enhanced security
- **MySQL Database**: Primary database with Prisma ORM for robust data management
- **Dual Authentication**: JWT for API, sessions for admin panel
- **Role-Based Access Control**: Comprehensive RBAC with 5 user role levels

## Project Structure

```
nysc-website/
├── .claudeignore                    # Claude ignore file
├── CLAUDE.md                        # Main Claude Code instructions (this file)
├── README.md                        # Project overview and setup guide
├── TODO.md                          # Development roadmap
├── package.json                     # Root package.json for workspace
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore patterns
│
├── docs/                            # Comprehensive documentation
│   ├── BACKEND_ARCHITECTURE.md     # Unified backend architecture
│   ├── ADMIN_PANEL.md              # SSR admin panel documentation
│   ├── API_DOCUMENTATION.md        # REST API specification
│   ├── DATABASE_SCHEMA.md          # MySQL schema documentation
│   ├── DEPLOYMENT.md               # Deployment guidelines
│   └── [legacy docs preserved]     # Existing documentation files
│
├── backend/                         # Unified Node.js/Express backend
│   ├── package.json                # Backend dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   ├── nodemon.json                # Development server config
│   ├── .env.example                # Backend environment template
│   │
│   ├── prisma/                     # Prisma ORM configuration
│   │   ├── schema.prisma           # MySQL database schema
│   │   ├── migrations/             # Database migration files
│   │   ├── seed.ts                 # Initial data seeding
│   │   └── client.ts               # Prisma client instance
│   │
│   ├── src/                        # TypeScript source code
│   │   ├── server.ts               # Application entry point
│   │   ├── app.ts                  # Express app configuration
│   │   │
│   │   ├── config/                 # Configuration modules
│   │   │   ├── database.ts         # Prisma client setup
│   │   │   ├── redis.ts            # Redis client configuration
│   │   │   ├── auth.ts             # Authentication configuration
│   │   │   └── constants.ts        # Application constants
│   │   │
│   │   ├── controllers/            # Request handlers
│   │   │   ├── api/                # REST API controllers
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── news.controller.ts
│   │   │   │   └── programs.controller.ts
│   │   │   └── admin/              # Admin panel controllers
│   │   │       ├── dashboard.controller.ts
│   │   │       ├── users.admin.controller.ts
│   │   │       ├── content.admin.controller.ts
│   │   │       └── settings.admin.controller.ts
│   │   │
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.middleware.ts  # JWT authentication
│   │   │   ├── session.middleware.ts # Session handling
│   │   │   ├── rbac.middleware.ts  # Role-based access control
│   │   │   ├── validation.middleware.ts # Input validation
│   │   │   ├── error.middleware.ts # Error handling
│   │   │   └── security.middleware.ts # Security headers
│   │   │
│   │   ├── routes/                 # Route definitions
│   │   │   ├── api/                # REST API routes
│   │   │   │   ├── index.ts        # API route aggregator
│   │   │   │   ├── auth.routes.ts  # Authentication endpoints
│   │   │   │   ├── users.routes.ts # User management API
│   │   │   │   └── public.routes.ts # Public content API
│   │   │   └── admin/              # Admin panel routes (SSR)
│   │   │       ├── index.ts        # Admin route aggregator
│   │   │       ├── auth.routes.ts  # Admin authentication
│   │   │       ├── dashboard.routes.ts # Dashboard pages
│   │   │       └── users.routes.ts # User management pages
│   │   │
│   │   ├── services/               # Business logic
│   │   │   ├── auth.service.ts     # Authentication logic
│   │   │   ├── user.service.ts     # User operations
│   │   │   ├── email.service.ts    # Email sending
│   │   │   ├── cache.service.ts    # Redis caching
│   │   │   └── activity.service.ts # Activity logging
│   │   │
│   │   ├── models/                 # Data models and types
│   │   │   ├── user.model.ts       # User model interfaces
│   │   │   ├── session.model.ts    # Session interfaces
│   │   │   └── activity.model.ts   # Activity log interfaces
│   │   │
│   │   ├── views/                  # EJS templates for admin panel
│   │   │   ├── layouts/            # Layout templates
│   │   │   │   ├── admin.ejs       # Main admin layout
│   │   │   │   ├── auth.ejs        # Authentication layout
│   │   │   │   └── error.ejs       # Error page layout
│   │   │   ├── admin/              # Admin page templates
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── index.ejs   # Dashboard page
│   │   │   │   ├── users/
│   │   │   │   │   ├── index.ejs   # User list
│   │   │   │   │   ├── create.ejs  # Create user form
│   │   │   │   │   ├── edit.ejs    # Edit user form
│   │   │   │   │   └── show.ejs    # User details
│   │   │   │   ├── content/        # Content management
│   │   │   │   │   ├── news/       # News management
│   │   │   │   │   ├── events/     # Event management
│   │   │   │   │   └── media/      # Media library
│   │   │   │   ├── reports/        # Reports and analytics
│   │   │   │   │   ├── analytics.ejs
│   │   │   │   │   └── logs.ejs
│   │   │   │   └── settings/       # System settings
│   │   │   │       ├── general.ejs
│   │   │   │       ├── email.ejs
│   │   │   │       └── security.ejs
│   │   │   ├── auth/               # Authentication pages
│   │   │   │   ├── login.ejs       # Admin login form
│   │   │   │   ├── forgot-password.ejs
│   │   │   │   └── reset-password.ejs
│   │   │   └── partials/           # Reusable components
│   │   │       ├── header.ejs      # Admin header
│   │   │       ├── sidebar.ejs     # Navigation sidebar
│   │   │       ├── footer.ejs      # Admin footer
│   │   │       ├── breadcrumb.ejs  # Breadcrumb navigation
│   │   │       ├── pagination.ejs  # Pagination component
│   │   │       ├── alerts.ejs      # Alert messages
│   │   │       └── modals/         # Modal dialogs
│   │   │           ├── confirm.ejs
│   │   │           └── error.ejs
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   ├── logger.ts           # Winston logging
│   │   │   ├── validators.ts       # Input validation
│   │   │   ├── helpers.ts          # General helpers
│   │   │   └── email-templates.ts  # Email templates
│   │   │
│   │   └── types/                  # TypeScript type definitions
│   │       ├── express.d.ts        # Extended Express types
│   │       ├── models.ts           # Model types
│   │       └── api.ts              # API response types
│   │
│   ├── public/                     # Static assets for admin panel
│   │   ├── css/                    # Stylesheets
│   │   │   ├── admin.css           # Custom admin styles
│   │   │   └── components.css      # Component-specific styles
│   │   ├── js/                     # Client-side JavaScript
│   │   │   ├── admin.js            # Core admin functionality
│   │   │   ├── charts.js           # Chart configurations
│   │   │   └── forms.js            # Form enhancements
│   │   └── images/                 # Admin panel images
│   │       └── admin/              # Admin-specific assets
│   │
│   └── tests/                      # Test files
│       ├── unit/                   # Unit tests
│       │   ├── services/           # Service tests
│       │   ├── middleware/         # Middleware tests
│       │   └── utils/              # Utility tests
│       ├── integration/            # Integration tests
│       │   ├── auth.test.ts        # Authentication tests
│       │   ├── users.test.ts       # User management tests
│       │   └── admin.test.ts       # Admin panel tests
│       └── e2e/                    # End-to-end tests
│           ├── login.test.ts       # Login workflow tests
│           └── admin-workflow.test.ts # Admin panel workflows
│
├── frontend/                       # React frontend application
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.ts             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── tsconfig.json              # TypeScript configuration
│   ├── .env.local                 # Frontend environment variables
│   │
│   ├── public/                    # Static assets
│   │   ├── images/                # Image assets
│   │   │   ├── nysc-logo.png
│   │   │   ├── hero/              # Hero section images
│   │   │   │   ├── youth-sports.jpg
│   │   │   │   ├── cultural-dance.jpg
│   │   │   │   ├── vocational-training.jpg
│   │   │   │   ├── awards-ceremony.jpg
│   │   │   │   └── international-programs.jpg
│   │   │   └── icons/             # Icon assets
│   │   ├── fonts/                 # Font files
│   │   │   ├── NotoSans-Regular.woff2
│   │   │   ├── NotoSansSinhala-Regular.woff2
│   │   │   └── NotoSansTamil-Regular.woff2
│   │   └── encrypted-locales/     # Encrypted translation files
│   │       ├── en/                # English translations
│   │       ├── si/                # Sinhala translations
│   │       └── ta/                # Tamil translations
│   │
│   ├── src/                       # React source code
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx               # App entry point
│   │   │
│   │   ├── components/            # React components
│   │   │   ├── layout/            # Layout components
│   │   │   │   ├── Header.tsx     # Site header
│   │   │   │   ├── Footer.tsx     # Site footer
│   │   │   │   └── PageLayout.tsx # Page wrapper
│   │   │   ├── sections/          # Page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── NewsEventsSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   └── [other sections]
│   │   │   └── ui/                # UI components
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Input.tsx
│   │   │       └── Modal.tsx
│   │   │
│   │   ├── pages/                 # Page components
│   │   │   ├── HomePage.tsx       # Main homepage
│   │   │   ├── directors/         # Directors pages
│   │   │   ├── divisions/         # Divisions pages
│   │   │   ├── news-events/       # News and events
│   │   │   ├── our-centers/       # Centers information
│   │   │   ├── resources/         # Resources pages
│   │   │   ├── services/          # Services pages
│   │   │   └── student/           # Student portal
│   │   │
│   │   ├── contexts/              # React contexts
│   │   │   ├── LanguageContext.tsx # Language switching
│   │   │   └── ThemeContext.tsx   # Theme management
│   │   │
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useTranslation.ts  # Translation hook
│   │   │   └── useApi.ts          # API interaction hook
│   │   │
│   │   ├── lib/                   # Utility libraries
│   │   │   ├── i18n.ts            # Internationalization
│   │   │   ├── api.ts             # API client
│   │   │   └── utils.ts           # General utilities
│   │   │
│   │   ├── types/                 # TypeScript types
│   │   │   ├── index.ts           # General types
│   │   │   ├── news.ts            # News types
│   │   │   └── program.ts         # Program types
│   │   │
│   │   └── styles/                # Styling files
│   │       ├── globals.css        # Global styles
│   │       └── components/        # Component styles
│   │
│   └── dist/                      # Built frontend assets
│
├── scripts/                       # Development and deployment scripts
│   ├── setup.sh                   # Initial project setup
│   ├── build-all.sh               # Build both frontend and backend
│   ├── deploy.sh                  # Deployment script
│   └── seed-data.sh               # Database seeding script
│
└── docker/                        # Docker configurations (future)
    ├── Dockerfile.backend         # Backend container
    ├── Dockerfile.frontend        # Frontend container
    └── docker-compose.yml         # Multi-container setup
```

## Technology Stack

### Backend Technologies
- **Runtime**: Node.js 20.x LTS
- **Framework**: Express.js 4.x with TypeScript 5.x
- **Database**: MySQL 8.0 with Prisma ORM 5.x
- **Template Engine**: EJS 3.x for server-side rendering
- **Authentication**: JWT + express-session
- **Validation**: express-validator with Zod schemas
- **Security**: Helmet, CORS, bcrypt (12 rounds)
- **Caching**: Redis for sessions and response caching
- **Email**: Nodemailer with SMTP support
- **Logging**: Winston with structured logging
- **File Upload**: Multer with validation
- **Testing**: Jest with Supertest for API testing

### Frontend Technologies  
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.x for fast development
- **Styling**: Tailwind CSS 3.x (stable version only)
- **State Management**: Zustand or React Context
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: react-i18next with encrypted locale files
- **HTTP Client**: Axios with interceptors
- **Testing**: React Testing Library with Vitest

### Supporting Technologies
- **Database**: MySQL 8.0 with connection pooling
- **Cache**: Redis 6.x for sessions and data caching
- **File Storage**: Local filesystem with S3 migration path
- **Process Manager**: PM2 for production deployment
- **Reverse Proxy**: Nginx for static files and SSL termination

## Development Guidelines

### 1. Core Principles
- **Unified Architecture**: Single backend application serving both API and admin
- **Security First**: Server-side sessions for admin, JWT for API
- **SLDDS Compliance**: Follow Sri Lanka Digital Design System
- **Multilingual Support**: Complete i18n implementation (si/ta/en)
- **Role-Based Access**: Comprehensive RBAC implementation
- **Performance Focus**: Sub-3-second load times, efficient caching

### 2. Database Design (MySQL)

#### Core Schema Entities
```sql
-- User Management
Users (id, email, password, firstName, lastName, role, isActive, emailVerified)
Profiles (userId, phone, address, city, district, avatar, bio)
Sessions (id, userId, sid, data, expiresAt, ipAddress, userAgent)
RefreshTokens (id, token, userId, expiresAt)
ActivityLogs (id, userId, action, resource, metadata, ipAddress)

-- Content Management
News (id, title, slug, content, excerpt, status, category, authorId)
Events (id, title, content, eventDate, endDate, location, capacity)
Programs (id, name, description, duration, eligibility, fee, maxParticipants)

-- System
Files (id, originalName, fileName, mimeType, size, type, uploadedBy)
Settings (key, value, type, description, updatedBy)
```

#### Role Hierarchy
1. **USER** - Basic user access, API only
2. **EDITOR** - Content creation and editing
3. **MODERATOR** - Content moderation and user monitoring
4. **ADMIN** - User management and system administration  
5. **SUPER_ADMIN** - Full system access and configuration

### 3. Authentication & Security

#### API Authentication (JWT)
- **Access Token**: 15-minute expiry, httpOnly cookie
- **Refresh Token**: 7-day expiry, httpOnly cookie  
- **Rate Limiting**: 5 login attempts per 15 minutes
- **Password Requirements**: 8+ chars, uppercase, lowercase, number, special

#### Admin Authentication (Sessions)
- **Session Store**: Redis with 24-hour expiry
- **CSRF Protection**: csurf middleware on all forms
- **Session Security**: httpOnly, secure, sameSite strict
- **IP Tracking**: Session tied to IP address
- **Activity Logging**: All admin actions logged

### 4. API Design Standards

#### RESTful Endpoints
```
Authentication:
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login  
POST   /api/auth/refresh     # Refresh tokens
GET    /api/auth/me          # Current user info
POST   /api/auth/logout      # Logout user

Users (Admin only):
GET    /api/users            # List users (paginated)
GET    /api/users/:id        # Get user details
POST   /api/users            # Create user
PUT    /api/users/:id        # Update user
DELETE /api/users/:id        # Delete user

Content:
GET    /api/public/news      # Public news articles
GET    /api/public/events    # Public events
GET    /api/public/programs  # Public programs

Protected Content (Editors+):
GET    /api/news             # Manage news articles
POST   /api/news             # Create article
PUT    /api/news/:id         # Update article
DELETE /api/news/:id         # Delete article
```

#### Admin Routes (SSR)
```
Authentication:
GET    /admin/login          # Login form
POST   /admin/auth/login     # Process login
GET    /admin/logout         # Logout

Dashboard:
GET    /admin/dashboard      # Main dashboard
GET    /admin/users          # User management
GET    /admin/content        # Content management
GET    /admin/reports        # Reports and analytics
GET    /admin/settings       # System settings
```

#### Response Format
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful",
  "pagination": { /* if applicable */ }
}
```

### 5. Frontend Development

#### React Component Structure
- **Functional Components**: Use hooks for state management
- **TypeScript**: Strict typing for all components and props
- **Custom Hooks**: Reusable logic in custom hooks
- **Context API**: Global state management for auth and theme
- **Error Boundaries**: Comprehensive error handling

#### Styling Guidelines
- **Tailwind CSS v3.x**: Utility-first styling (NO v4 beta)
- **SLDDS Colors**: Use official color palette
- **Responsive Design**: Mobile-first approach
- **Component Classes**: Consistent class naming
- **Dark Mode**: Future implementation ready

#### Internationalization
- **Languages**: Sinhala (primary), Tamil, English
- **Namespace**: Organized by page/feature
- **RTL Support**: Ready for Tamil text direction
- **Number Formatting**: Sri Lankan conventions
- **Date Formatting**: Local date formats

### 6. Testing Strategy

#### Backend Testing
```bash
# Unit Tests - Service layer and utilities
npm run test:unit

# Integration Tests - API endpoints and database
npm run test:integration  

# E2E Tests - Admin panel workflows
npm run test:e2e

# Coverage Report
npm run test:coverage
```

#### Frontend Testing
```bash  
# Component Tests
npm run test:components

# Hook Tests  
npm run test:hooks

# Integration Tests
npm run test:integration
```

### 7. Development Workflow

#### Local Development Setup
```bash
# Backend setup
cd backend
npm install
cp .env.example .env
# Configure MySQL and Redis connections
npx prisma migrate dev
npx prisma db seed
npm run dev

# Frontend setup (separate terminal)
cd frontend  
npm install
npm run dev

# Both running:
# Backend: http://localhost:5000
# Admin: http://localhost:5000/admin
# Frontend: http://localhost:5173
```

#### Environment Variables
```env
# Backend (.env)
NODE_ENV=development
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/nysc_db"
REDIS_URL="redis://localhost:6379"
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:5173

# Frontend (.env.local)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME="NYSC Sri Lanka"
VITE_DEFAULT_LANGUAGE=si
```

### 8. Performance Requirements

#### Load Time Targets
- **Homepage**: < 3 seconds on 3G
- **Admin Panel**: < 2 seconds on office connection
- **API Responses**: < 200ms average
- **Database Queries**: < 100ms average

#### Optimization Strategies
- **Backend**: Redis caching, query optimization, connection pooling
- **Frontend**: Code splitting, lazy loading, image optimization
- **Database**: Proper indexing, query optimization
- **CDN**: Static asset delivery optimization

### 9. Security Requirements

#### Data Protection
- **Encryption**: Sensitive data encrypted at rest
- **HTTPS**: SSL/TLS enforced in production
- **Input Validation**: All inputs validated and sanitized
- **XSS Protection**: Template escaping and CSP headers
- **CSRF Protection**: Token validation on forms
- **SQL Injection**: Parameterized queries via Prisma

#### Access Control
- **RBAC**: Role-based permissions on all resources
- **Session Security**: Secure session management
- **Rate Limiting**: Prevent abuse and brute force
- **IP Restrictions**: Admin access restrictions
- **Activity Logging**: Comprehensive audit trail

### 10. Accessibility Standards (WCAG 2.1 AA)
- **Color Contrast**: 4.5:1 minimum ratio
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Alternative Text**: Descriptive alt text for images
- **Language Declaration**: Proper language attributes

## Claude Code Commands

### Project Setup
```bash
# Initialize new backend
claude create backend --type express-typescript

# Set up database
claude db init --provider mysql --orm prisma

# Generate admin templates
claude generate admin --template ejs
```

### Development Commands
```bash
# Start development servers
claude dev                    # Start both backend and frontend
claude dev:backend            # Backend only
claude dev:frontend           # Frontend only
claude dev:admin              # Admin panel only

# Database operations
claude db:migrate              # Run database migrations
claude db:seed                # Seed initial data
claude db:reset               # Reset database (dev only)

# Testing
claude test                   # Run all tests
claude test:backend           # Backend tests only
claude test:frontend          # Frontend tests only
claude test:e2e               # End-to-end tests
```

### Code Generation
```bash
# Generate API resources
claude generate api users --crud
claude generate controller admin/users
claude generate service auth --jwt

# Generate frontend components
claude generate component NewsCard --props
claude generate page AdminDashboard --layout admin
claude generate hook useAuth --context

# Generate database models
claude generate model User --relations
claude generate migration add_profiles_table
```

### Build and Deploy
```bash
# Build applications
claude build                  # Build both apps
claude build:backend          # Build backend only
claude build:frontend         # Build frontend only

# Deployment
claude deploy:staging         # Deploy to staging
claude deploy:production      # Deploy to production
```

## Quality Assurance

### Code Quality Standards
- **TypeScript**: Strict mode enabled, no any types
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for linting and testing
- **SonarQube**: Code quality and security analysis

### Performance Monitoring
- **Backend**: Winston logging with structured logs
- **Frontend**: Performance API and Core Web Vitals
- **Database**: Query performance monitoring
- **Caching**: Redis performance metrics
- **Uptime**: Health check endpoints

### Error Handling
- **Global Error Handler**: Centralized error processing
- **Error Logging**: Comprehensive error tracking
- **User Feedback**: Clear error messages for users
- **Recovery Mechanisms**: Graceful degradation
- **Monitoring**: Real-time error alerting

## Deployment Strategy

### Environment Configuration
- **Development**: Local MySQL + Redis
- **Staging**: Cloud MySQL + Redis cluster
- **Production**: Managed services with clustering

### Deployment Pipeline
1. **Code Review**: GitHub PR with automated checks
2. **Testing**: Automated test suite execution
3. **Build**: Production builds with optimization
4. **Deploy**: Blue-green deployment strategy
5. **Verify**: Health checks and smoke tests
6. **Monitor**: Performance and error monitoring

### Infrastructure Requirements
- **Server**: 2+ CPU cores, 4GB RAM minimum
- **Database**: MySQL 8.0 with replication
- **Cache**: Redis cluster for high availability
- **Storage**: SSD for database, object storage for files
- **Network**: CDN for static assets, load balancer

## Maintenance & Support

### Regular Tasks
- **Security Updates**: Monthly dependency updates
- **Database Maintenance**: Weekly optimization
- **Log Rotation**: Daily log management
- **Backup Verification**: Weekly backup testing
- **Performance Review**: Monthly performance analysis

### Monitoring & Alerting
- **System Health**: CPU, memory, disk usage
- **Application Performance**: Response times, error rates
- **Database Performance**: Query times, connection pools
- **Security Events**: Failed logins, suspicious activity
- **Business Metrics**: User registrations, content engagement

## Notes for Claude

1. **Always follow SLDDS guidelines** for any UI component
2. **Ensure all user-facing text is translatable** with proper i18n keys
3. **Use semantic HTML** for accessibility compliance
4. **Implement progressive enhancement** for core functionality
5. **Consider offline functionality** for critical features
6. **Maintain consistent error handling** across all components
7. **Use environment variables** for all configuration
8. **Implement proper logging** throughout the application
9. **Follow Sri Lankan conventions** for date/time/number formats
10. **Respect cultural considerations** in design and content
11. **CRITICAL: Always use Tailwind CSS v3.x stable** - Never use v4 beta
12. **Verify MySQL compatibility** before adding new dependencies
13. **Test admin panel functionality** with all user roles
14. **Validate API endpoints** with proper authentication
15. **Ensure proper error boundaries** in React components

## Support & Resources

### Documentation
- **Architecture**: `/docs/BACKEND_ARCHITECTURE.md`
- **API Reference**: `/docs/API_DOCUMENTATION.md`
- **Admin Panel**: `/docs/ADMIN_PANEL.md`
- **Database Schema**: `/docs/DATABASE_SCHEMA.md`
- **Deployment Guide**: `/docs/DEPLOYMENT.md`

### Development Resources
- **Style Guide**: SLDDS official documentation
- **Icons**: Lucide React icon library
- **Fonts**: Noto Sans family (multi-language)
- **Colors**: SLDDS color palette implementation

### Contact & Support
- **Issue Tracker**: GitHub Issues for bug reports
- **Documentation**: Internal wiki for procedures
- **Code Review**: Mandatory PR reviews
- **Architecture Decisions**: ADR documentation