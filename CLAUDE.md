# NYSC Website Development Project - Claude Code Setup

## Project Overview
Development of a modern, multilingual, responsive website for the National Youth Services Council (NYSC) of Sri Lanka, following the Sri Lanka Digital Design System (SLDDS) standards.

## Project Structure
```
nysc-website/
├── .claudeignore                    # Claude ignore file
├── CLAUDE.md                        # Main Claude Code instructions
├── PROJECT_STRUCTURE.md             # This file
├── TODO.md                          # Development roadmap
├── README.md                        # Project readme
├── package.json                     # Root package.json
├── pnpm-workspace.yaml             # PNPM workspace config
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore file
│
├── docs/                           # Documentation
│   ├── UI_UX_AGENT.md             # UI/UX design guidelines
│   ├── BACKEND_ARCHITECTURE.md     # Backend technical specs
│   ├── ADMIN_PANEL.md             # Admin panel specifications
│   ├── LANDING_PAGE_DESIGN.md     # Landing page design specs
│   └── API_DOCUMENTATION.md       # API docs (to be created)
│
├── frontend/                       # Next.js frontend application
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts         # Tailwind with NYSC colors
│   ├── tsconfig.json
│   ├── .env.local
│   │
│   ├── public/
│   │   ├── images/
│   │   │   ├── nysc-logo.png
│   │   │   ├── hero/
│   │   │   │   ├── youth-sports.jpg
│   │   │   │   ├── cultural-dance.jpg
│   │   │   │   ├── vocational-training.jpg
│   │   │   │   ├── awards-ceremony.jpg
│   │   │   │   └── international-programs.jpg
│   │   │   └── icons/
│   │   ├── fonts/
│   │   │   ├── NotoSans-Regular.woff2
│   │   │   ├── NotoSansSinhala-Regular.woff2
│   │   │   └── NotoSansTamil-Regular.woff2
│   │   └── locales/
│   │       ├── en/
│   │       │   ├── common.json
│   │       │   ├── home.json
│   │       │   └── news.json
│   │       ├── si/
│   │       │   ├── common.json
│   │       │   ├── home.json
│   │       │   └── news.json
│   │       └── ta/
│   │           ├── common.json
│   │           ├── home.json
│   │           └── news.json
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── [locale]/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── news/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [slug]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── category/
│   │   │   │   │       └── [category]/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── programs/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── contact/
│   │   │   │       └── page.tsx
│   │   │   └── api/
│   │   │       └── [...route]/
│   │   │           └── route.ts
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── LanguageSelector.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── QuickServices.tsx
│   │   │   │   ├── Statistics.tsx
│   │   │   │   └── Newsletter.tsx
│   │   │   ├── news/
│   │   │   │   ├── NewsFeed.tsx
│   │   │   │   ├── NewsCard.tsx
│   │   │   │   ├── CategoryFilter.tsx
│   │   │   │   └── FeaturedArticles.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Input.tsx
│   │   │       └── Modal.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── utils.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useTranslation.ts
│   │   │   ├── useApi.ts
│   │   │   └── useIntersectionObserver.ts
│   │   │
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   ├── news.ts
│   │   │   └── program.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── components/
│   │   │
│   │   └── config/
│   │       ├── newsCategories.ts
│   │       ├── navigation.ts
│   │       └── seo.ts
│   │
│   └── tests/
│       ├── components/
│       └── e2e/
│
├── backend/                        # Express.js backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── nodemon.json
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── server.ts
│   │   ├── app.ts
│   │   │
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── redis.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── newsController.ts
│   │   │   ├── programController.ts
│   │   │   └── userController.ts
│   │   │
│   │   ├── services/
│   │   │   ├── NewsService.ts
│   │   │   ├── ProgramService.ts
│   │   │   ├── AuthService.ts
│   │   │   └── EmailService.ts
│   │   │
│   │   ├── models/
│   │   │   └── index.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── news.routes.ts
│   │   │   └── program.routes.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── validation.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── rateLimiter.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── workers/
│   │   │   ├── notificationWorker.ts
│   │   │   └── emailWorker.ts
│   │   │
│   │   └── types/
│   │       └── index.d.ts
│   │
│   └── tests/
│       ├── unit/
│       └── integration/
│
├── admin/                          # Admin panel (React)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   │
│   ├── public/
│   │   └── admin-assets/
│   │
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── News/
│   │   │   ├── Programs/
│   │   │   └── Users/
│   │   │
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Charts/
│   │   │   └── Forms/
│   │   │
│   │   └── services/
│   │       └── api.ts
│   │
│   └── dist/
│
├── shared/                         # Shared code between packages
│   ├── types/
│   │   ├── index.ts
│   │   ├── news.types.ts
│   │   ├── user.types.ts
│   │   └── program.types.ts
│   │
│   └── constants/
│       ├── index.ts
│       └── categories.ts
│
├── scripts/                        # Build and utility scripts
│   ├── setup.sh
│   ├── build-all.sh
│   └── deploy.sh
│
├── docker/                         # Docker configurations
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── Dockerfile.admin
│   └── docker-compose.yml
│
└── .github/                        # GitHub workflows
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

## Development Guidelines

### 1. Technology Stack
- **Frontend**: Next.js 14+ with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Admin Panel**: React Admin or custom React dashboard
- **Styling**: Tailwind CSS v3.x (stable version only, following SLDDS guidelines)
- **State Management**: Zustand or Context API
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: next-i18next for multilingual support

**IMPORTANT**: Always use Tailwind CSS version 3.x (stable) throughout the project. Do not upgrade to version 4 or use any beta/alpha versions. Ensure all Tailwind-related dependencies are compatible with v3.x.

### 2. SLDDS Compliance Requirements

#### Color System Implementation
```typescript
// src/styles/theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1'
    },
    secondary: {
      50: '#FFF9C4',
      100: '#FFF59D',
      200: '#FFF176',
      300: '#FFEE58',
      400: '#FFEB3B',
      500: '#FDD835',
      600: '#FBC02D',
      700: '#F9A825',
      800: '#F57F17',
      900: '#F57C00'
    },
    status: {
      success: { /* green shades */ },
      warning: { /* yellow shades */ },
      error: { /* red shades */ },
      info: { /* blue shades */ }
    }
  }
}
```

#### Typography
- Font Family: Noto Sans (Sinhala, Tamil, English)
- Base font size: 16px
- Line height: 1.5
- Heading scale: 64px, 48px, 32px, 24px, 20px, 18px, 16px

#### Spacing Scale
- Use 4px base unit: 4, 8, 16, 24, 32, 48, 64

#### Tailwind CSS Requirements
- **Version**: Must use Tailwind CSS v3.x (stable) only
- **Configuration**: Use TypeScript for tailwind.config.ts
- **Content Paths**: Ensure proper content scanning for all components
- **Safelist**: Include all SLDDS color variants in safelist
- **Plugins**: Use official Tailwind plugins (@tailwindcss/forms, @tailwindcss/typography, @tailwindcss/aspect-ratio)
- **No Tailwind v4**: Do not use or upgrade to Tailwind CSS v4 (beta/alpha)
- **Compatibility**: Ensure all related packages are v3-compatible

### 3. Key Features Implementation

#### Multilingual Support
```typescript
// i18n configuration
const languages = ['si', 'ta', 'en'];
const defaultLanguage = 'si';
```

#### User Roles
1. Public Visitors
2. Youth Members
3. Club Representatives
4. NYSC Staff
5. Administrators

#### Core Modules
1. **Home Page**: Dynamic content, news slider, quick links
2. **About NYSC**: Organization info, leadership
3. **Programs & Services**: Training, cultural, sports programs
4. **Sports Development**: Club directory, event management
5. **Cultural Programs**: Event calendar, applications
6. **Youth Awards**: Nomination system, archives
7. **Vocational Training**: Center directory, course listings
8. **Foreign Affairs**: International programs
9. **Office Directory**: Locations, facility booking
10. **Media Gallery**: Photo/video management
11. **Downloads**: Document repository
12. **Contact Us**: Forms, maps, directory

### 4. Accessibility Standards (WCAG 2.1 AA)
- Minimum color contrast ratio: 4.5:1
- Full keyboard navigation
- Screen reader optimization with ARIA labels
- Multilingual alt text for images
- Respects `prefers-reduced-motion`

### 5. Performance Requirements
- Page load time: < 3 seconds
- Mobile-first responsive design
- Image optimization (WebP/AVIF)
- Lazy loading implementation
- SSL/HTTPS enforcement

### 6. Security Requirements
- CSRF protection
- XSS prevention
- Input validation and sanitization
- Secure authentication (JWT)
- Data encryption


## Development Workflow

### Phase 1: Foundation 
- Set up project structure
- Configure SLDDS design system
- Implement multilingual support
- Create base components

### Phase 2: Core Features
- Public pages (Home, About, Services)
- User authentication system
- Basic CMS functionality
- Form builders

### Phase 3: Advanced Features 
- Youth club registration system
- Event management
- Document management
- Media galleries

### Phase 4: Admin Panel 
- User management
- Content management
- Reports and analytics
- System configuration

### Phase 5: Testing & Deployment 
- Accessibility testing
- Performance optimization
- Security audit
- Deployment preparation


## Claude Code Commands

### Initial Setup
```bash
# Create project structure
claude create-project nysc-website

# Install dependencies
claude install-deps

# Set up database
claude setup-db
```

### Development Commands
```bash
# Start development servers
claude dev

# Run tests
claude test

# Build for production
claude build

# Deploy
claude deploy
```

### Component Generation
```bash
# Generate SLDDS-compliant component
claude generate component Button --sldds

# Generate page with i18n
claude generate page Programs --multilingual

# Generate API endpoint
claude generate api youth-clubs
```


## UI/UX Agent Configuration

### Design Principles
1. **User-Centric**: Focus on youth audience needs
2. **Task Simplification**: Minimize steps for common tasks
3. **Mobile-First**: Optimize for mobile devices
4. **Multilingual**: Equal quality across all languages
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Minimalist**: Clean, uncluttered interfaces
7. **Consistent**: Unified experience across sections

### Component Library
- Follow SLDDS component specifications
- Use Tailwind utility classes only
- Maintain consistent spacing and typography
- Implement proper state management

### Responsive Breakpoints
- xs: <480px (Mobile)
- sm: 481-768px (Tablet)
- md: 769-1024px (Small laptop)
- lg: 1025-1440px (Desktop)
- xl: >1440px (Widescreen)

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- API endpoint testing with Jest
- Form validation testing

### Integration Tests
- User flow testing
- API integration testing
- Database transaction testing

### E2E Tests
- Critical user journeys
- Cross-browser testing
- Mobile responsiveness

### Accessibility Tests
- Automated WCAG testing
- Screen reader testing
- Keyboard navigation testing

## Documentation Requirements

### Code Documentation
- JSDoc comments for functions
- README files for each module
- API documentation with Swagger

### User Documentation
- User guides in all three languages
- Video tutorials
- FAQ sections

### Technical Documentation
- Architecture diagrams
- Database schema
- Deployment guide

## Monitoring & Analytics

### Performance Monitoring
- Core Web Vitals tracking
- Server response times
- Database query optimization

### User Analytics
- Google Analytics 4 integration
- Custom event tracking
- User journey analysis

### Error Tracking
- Sentry integration
- Custom error logging
- Alert system setup

## Notes for Claude

1. Always follow SLDDS guidelines for any UI component
2. Ensure all user-facing text is translatable
3. Use semantic HTML for accessibility
4. Implement progressive enhancement
5. Consider offline functionality for critical features
6. Maintain consistent error handling patterns
7. Use environment variables for configuration
8. Implement proper logging throughout
9. Follow Sri Lankan date/time formats
10. Respect cultural considerations in design
11. **CRITICAL**: Always use Tailwind CSS v3.x (stable) - Never use v4 or any beta versions
12. Verify Tailwind version compatibility before adding any new dependencies

