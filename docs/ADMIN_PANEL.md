# NYSC Admin Panel - Integrated SSR Architecture

## Overview

The NYSC Admin Panel is an integrated server-side rendered (SSR) administration interface built directly into the main backend application. This document outlines the architecture, features, and implementation details of the admin panel using EJS templates and Express.js.

## Architecture Approach

### Why Server-Side Rendering?

1. **Enhanced Security**: Server-side sessions, no exposed API tokens in browser
2. **Better SEO**: Crawlable admin pages for internal documentation
3. **Simplified Architecture**: No separate SPA to maintain
4. **Faster Initial Load**: Pre-rendered HTML reduces time to first paint
5. **Progressive Enhancement**: Works without JavaScript, enhanced with it

### Integration Benefits

- **Single Codebase**: Admin and API share services, models, and utilities
- **Unified Authentication**: Same auth system for API and admin
- **Shared Resources**: Database connections, cache, and configurations
- **Simplified Deployment**: One application to deploy and maintain

## Technical Stack

- **Template Engine**: EJS 3.x for server-side rendering
- **CSS Framework**: Tailwind CSS 3.x via CDN
- **Backend Framework**: Express.js with TypeScript
- **Session Store**: Redis for scalable session management
- **Form Handling**: Native HTML forms with CSRF protection
- **Client Enhancement**: Vanilla JavaScript for progressive enhancement

## Directory Structure

```
backend/src/
├── views/                     # EJS templates
│   ├── layouts/
│   │   ├── admin.ejs         # Main admin layout
│   │   ├── auth.ejs          # Authentication layout
│   │   └── error.ejs         # Error page layout
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── index.ejs     # Dashboard page
│   │   ├── users/
│   │   │   ├── index.ejs     # User list
│   │   │   ├── create.ejs    # Create user form
│   │   │   ├── edit.ejs      # Edit user form
│   │   │   └── show.ejs      # User details
│   │   ├── content/
│   │   │   ├── news/
│   │   │   ├── events/
│   │   │   └── media/
│   │   ├── reports/
│   │   │   ├── analytics.ejs
│   │   │   └── logs.ejs
│   │   └── settings/
│   │       ├── general.ejs
│   │       ├── email.ejs
│   │       └── security.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   ├── forgot-password.ejs
│   │   └── reset-password.ejs
│   └── partials/              # Reusable components
│       ├── header.ejs
│       ├── sidebar.ejs
│       ├── footer.ejs
│       ├── breadcrumb.ejs
│       ├── pagination.ejs
│       ├── alerts.ejs
│       └── modals/
│           ├── confirm.ejs
│           └── error.ejs
├── controllers/admin/          # Admin controllers
│   ├── dashboard.controller.ts
│   ├── users.controller.ts
│   ├── content.controller.ts
│   ├── reports.controller.ts
│   └── settings.controller.ts
├── routes/admin/              # Admin routes
│   ├── index.ts
│   ├── auth.routes.ts
│   ├── dashboard.routes.ts
│   ├── users.routes.ts
│   └── content.routes.ts
└── public/                    # Static assets
    ├── css/
    │   ├── admin.css         # Custom admin styles
    │   └── components.css    # Component styles
    ├── js/
    │   ├── admin.js          # Admin JavaScript
    │   ├── charts.js         # Chart configurations
    │   └── forms.js          # Form enhancements
    └── images/
        └── admin/            # Admin-specific images
```

## Authentication & Authorization

### Session-Based Authentication

```typescript
// Session configuration
app.use(session({
  name: 'nysc.admin.sid',
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
    prefix: 'sess:admin:',
    ttl: 24 * 60 * 60 // 24 hours
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'strict'
  }
}));
```

### Login Flow

```typescript
// Login controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    // Validate credentials
    const user = await authService.validateCredentials(email, password);
    
    // Check admin permissions
    if (!['EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      throw new Error('Insufficient permissions');
    }
    
    // Create session
    req.session.userId = user.id;
    req.session.userRole = user.role;
    req.session.userName = user.name;
    
    // Log activity
    await activityService.log({
      userId: user.id,
      action: 'ADMIN_LOGIN',
      ipAddress: req.ip
    });
    
    // Redirect to dashboard
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.render('auth/login', {
      error: 'Invalid credentials',
      layout: 'layouts/auth'
    });
  }
};
```

### Middleware Protection

```typescript
// Admin authentication middleware
export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.redirect('/admin/login?redirect=' + encodeURIComponent(req.originalUrl));
  }
  next();
};

// Role-based access control
export const requireAdminRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.session.userRole)) {
      return res.status(403).render('errors/403', {
        layout: 'layouts/error'
      });
    }
    next();
  };
};
```

## User Roles & Permissions

### Role Hierarchy

1. **SUPER_ADMIN**
   - Full system access
   - User management
   - System configuration
   - All permissions

2. **ADMIN**
   - Content management
   - User management (except super admins)
   - Report generation
   - Most system settings

3. **MODERATOR**
   - Content moderation
   - User activity monitoring
   - Report viewing
   - Limited settings access

4. **EDITOR**
   - Content creation/editing
   - Media management
   - Own content management

5. **USER**
   - No admin panel access
   - API access only

### Permission Matrix

| Feature | USER | EDITOR | MODERATOR | ADMIN | SUPER_ADMIN |
|---------|------|--------|-----------|-------|-------------|
| **Dashboard Access** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Content Management** |
| View Content | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Content | ❌ | ✅ | ✅ | ✅ | ✅ |
| Edit Own Content | ❌ | ✅ | ✅ | ✅ | ✅ |
| Edit Any Content | ❌ | ❌ | ✅ | ✅ | ✅ |
| Delete Content | ❌ | ❌ | ✅ | ✅ | ✅ |
| **User Management** |
| View Users | ❌ | ❌ | ✅ | ✅ | ✅ |
| Create Users | ❌ | ❌ | ❌ | ✅ | ✅ |
| Edit Users | ❌ | ❌ | ❌ | ✅ | ✅ |
| Delete Users | ❌ | ❌ | ❌ | ✅ | ✅ |
| Assign Roles | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Reports** |
| View Reports | ❌ | ✅ | ✅ | ✅ | ✅ |
| Generate Reports | ❌ | ❌ | ✅ | ✅ | ✅ |
| Export Data | ❌ | ❌ | ✅ | ✅ | ✅ |
| **System Settings** |
| View Settings | ❌ | ❌ | ❌ | ✅ | ✅ |
| Modify Settings | ❌ | ❌ | ❌ | ❌ | ✅ |
| System Maintenance | ❌ | ❌ | ❌ | ❌ | ✅ |

## Core Features

### 1. Dashboard

The dashboard provides an at-a-glance overview of system status and recent activities.

#### Dashboard Widgets

- **Statistics Cards**
  - Total Users
  - Active Sessions
  - Content Items
  - Pending Approvals

- **Activity Feed**
  - Recent logins
  - Content updates
  - User registrations
  - System events

- **Quick Actions**
  - Create new content
  - Add user
  - View reports
  - System settings

- **Charts & Analytics**
  - User growth trend
  - Content engagement
  - System performance
  - Geographic distribution

```typescript
// Dashboard controller
export const dashboard = async (req: Request, res: Response) => {
  const [stats, recentUsers, recentContent, activities] = await Promise.all([
    dashboardService.getStats(),
    userService.getRecent(5),
    contentService.getRecent(10),
    activityService.getRecent(15)
  ]);
  
  res.render('admin/dashboard/index', {
    title: 'Dashboard',
    layout: 'layouts/admin',
    user: req.session,
    stats,
    recentUsers,
    recentContent,
    activities,
    scripts: ['/js/charts.js']
  });
};
```

### 2. User Management

Complete user lifecycle management with role-based permissions.

#### Features

- **User List**
  - Sortable columns
  - Search functionality
  - Filter by role/status
  - Bulk actions

- **User Creation**
  - Form validation
  - Role assignment
  - Email notification
  - Password generation

- **User Editing**
  - Profile updates
  - Role changes
  - Password reset
  - Account status

- **Activity Tracking**
  - Login history
  - Action logs
  - IP tracking
  - Session management

### 3. Content Management System

#### News Management
- Create/Edit/Delete articles
- Rich text editor
- Image upload
- Category assignment
- Publication scheduling
- SEO metadata

#### Event Management
- Event calendar
- Registration handling
- Venue management
- Attendee tracking
- Email notifications

#### Media Library
- Image upload/management
- File organization
- Thumbnail generation
- Metadata editing
- CDN integration

### 4. Program Management

- **Training Programs**
  - Course creation
  - Curriculum management
  - Instructor assignment
  - Student enrollment
  - Progress tracking

- **Youth Clubs**
  - Club registration
  - Member management
  - Activity planning
  - Performance metrics

- **Awards System**
  - Nomination handling
  - Review process
  - Winner selection
  - Certificate generation

### 5. Reports & Analytics

#### Available Reports
- User Statistics
- Content Performance
- Program Enrollment
- Financial Summary
- Activity Logs
- System Health

#### Export Options
- CSV format
- PDF generation
- Excel spreadsheets
- Print-friendly views

### 6. System Settings

#### Configuration Areas

- **General Settings**
  - Site information
  - Contact details
  - Logo management
  - Footer content

- **Email Configuration**
  - SMTP settings
  - Email templates
  - Notification rules
  - Test sending

- **Security Settings**
  - Password policies
  - Session timeout
  - IP restrictions
  - 2FA configuration

- **Maintenance Mode**
  - Enable/disable site
  - Custom message
  - Allowed IPs
  - Scheduled maintenance

## UI Components

### Layout Template

```ejs
<!-- views/layouts/admin.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= typeof title !== 'undefined' ? title + ' - ' : '' %>NYSC Admin</title>
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#1976D2',
            secondary: '#FDD835'
          }
        }
      }
    }
  </script>
  
  <!-- Custom styles -->
  <link rel="stylesheet" href="/css/admin.css">
  
  <!-- Page-specific styles -->
  <% if (typeof styles !== 'undefined') { %>
    <% styles.forEach(style => { %>
      <link rel="stylesheet" href="<%= style %>">
    <% }) %>
  <% } %>
</head>
<body class="bg-gray-100">
  <div class="flex h-screen">
    <!-- Sidebar -->
    <%- include('../partials/sidebar', { user: user }) %>
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <%- include('../partials/header', { user: user }) %>
      
      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6">
        <!-- Alerts -->
        <%- include('../partials/alerts') %>
        
        <!-- Breadcrumb -->
        <% if (typeof breadcrumb !== 'undefined') { %>
          <%- include('../partials/breadcrumb', { items: breadcrumb }) %>
        <% } %>
        
        <!-- Page body -->
        <%- body %>
      </main>
      
      <!-- Footer -->
      <%- include('../partials/footer') %>
    </div>
  </div>
  
  <!-- Core JavaScript -->
  <script src="/js/admin.js"></script>
  
  <!-- Page-specific scripts -->
  <% if (typeof scripts !== 'undefined') { %>
    <% scripts.forEach(script => { %>
      <script src="<%= script %>"></script>
    <% }) %>
  <% } %>
</body>
</html>
```

### Form Components

```ejs
<!-- Reusable form field partial -->
<!-- views/partials/form-field.ejs -->
<div class="mb-4">
  <label for="<%= field.id %>" class="block text-sm font-medium text-gray-700 mb-2">
    <%= field.label %>
    <% if (field.required) { %>
      <span class="text-red-500">*</span>
    <% } %>
  </label>
  
  <% if (field.type === 'select') { %>
    <select 
      id="<%= field.id %>"
      name="<%= field.name %>"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      <%= field.required ? 'required' : '' %>
    >
      <% field.options.forEach(option => { %>
        <option value="<%= option.value %>" <%= field.value === option.value ? 'selected' : '' %>>
          <%= option.label %>
        </option>
      <% }) %>
    </select>
  <% } else if (field.type === 'textarea') { %>
    <textarea
      id="<%= field.id %>"
      name="<%= field.name %>"
      rows="<%= field.rows || 4 %>"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      <%= field.required ? 'required' : '' %>
    ><%= field.value || '' %></textarea>
  <% } else { %>
    <input
      type="<%= field.type || 'text' %>"
      id="<%= field.id %>"
      name="<%= field.name %>"
      value="<%= field.value || '' %>"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      <%= field.required ? 'required' : '' %>
      <%= field.pattern ? `pattern="${field.pattern}"` : '' %>
    >
  <% } %>
  
  <% if (field.help) { %>
    <p class="text-sm text-gray-600 mt-1"><%= field.help %></p>
  <% } %>
  
  <% if (field.error) { %>
    <p class="text-sm text-red-500 mt-1"><%= field.error %></p>
  <% } %>
</div>
```

### Table Component

```ejs
<!-- Reusable data table partial -->
<!-- views/partials/data-table.ejs -->
<div class="bg-white rounded-lg shadow overflow-hidden">
  <div class="p-6 border-b border-gray-200">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800"><%= table.title %></h2>
      <% if (table.actions) { %>
        <div class="flex gap-2">
          <% table.actions.forEach(action => { %>
            <a href="<%= action.url %>" class="btn btn-<%= action.type || 'primary' %>">
              <%= action.label %>
            </a>
          <% }) %>
        </div>
      <% } %>
    </div>
  </div>
  
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <% table.columns.forEach(column => { %>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <%= column.label %>
            </th>
          <% }) %>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <% table.rows.forEach(row => { %>
          <tr class="hover:bg-gray-50">
            <% table.columns.forEach(column => { %>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <% if (column.render) { %>
                  <%- column.render(row) %>
                <% } else { %>
                  <%= row[column.key] %>
                <% } %>
              </td>
            <% }) %>
          </tr>
        <% }) %>
      </tbody>
    </table>
  </div>
  
  <% if (table.pagination) { %>
    <div class="p-6 border-t border-gray-200">
      <%- include('./pagination', { pagination: table.pagination }) %>
    </div>
  <% } %>
</div>
```

## Security Implementation

### CSRF Protection

```typescript
import csrf from 'csurf';

// Initialize CSRF protection
const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Apply to admin routes
adminRouter.use(csrfProtection);

// Make token available to all views
adminRouter.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

### Input Validation

```typescript
import { body, validationResult } from 'express-validator';

// Validation rules
export const userValidationRules = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom(async (email) => {
      const exists = await userService.findByEmail(email);
      if (exists) throw new Error('Email already in use');
    }),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character'),
  body('firstName').trim().escape().notEmpty(),
  body('lastName').trim().escape().notEmpty(),
  body('role').isIn(['USER', 'EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'])
];

// Validation middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('back');
  }
  next();
};
```

### XSS Protection

```typescript
import DOMPurify from 'isomorphic-dompurify';

// Sanitize rich text content
export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
};

// Use in templates
app.locals.sanitizeHtml = sanitizeHtml;
```

## Performance Optimization

### Caching Strategy

```typescript
// Page caching middleware
const pageCache = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `page:${req.originalUrl}`;
    
    cache.get(key, (err, data) => {
      if (data) {
        return res.send(data);
      }
      
      // Store original render method
      const originalRender = res.render;
      
      // Override render method
      res.render = function(view: string, options: any) {
        // Render the view
        originalRender.call(this, view, options, (err, html) => {
          if (!err) {
            // Cache the rendered HTML
            cache.setex(key, duration, html);
          }
          res.send(html);
        });
      };
      
      next();
    });
  };
};

// Apply to specific routes
router.get('/admin/reports', pageCache(300), reportsController.index);
```

### Database Query Optimization

```typescript
// Efficient pagination with cursor
export const getPaginatedUsers = async (cursor?: string, limit = 20) => {
  const query = {
    take: limit + 1,
    orderBy: { createdAt: 'desc' as const },
    include: {
      profile: true,
      _count: {
        select: { activities: true }
      }
    }
  };
  
  if (cursor) {
    query.cursor = { id: cursor };
    query.skip = 1;
  }
  
  const users = await prisma.user.findMany(query);
  
  const hasMore = users.length > limit;
  const data = hasMore ? users.slice(0, -1) : users;
  
  return {
    data,
    nextCursor: hasMore ? data[data.length - 1].id : null
  };
};
```

## Testing

### Integration Tests

```typescript
import request from 'supertest';
import app from '../app';

describe('Admin Panel', () => {
  let agent: request.SuperTest<request.Test>;
  let sessionCookie: string;
  
  beforeAll(async () => {
    agent = request.agent(app);
    
    // Login as admin
    const res = await agent
      .post('/admin/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Test123!@#'
      });
    
    sessionCookie = res.headers['set-cookie'];
  });
  
  describe('Dashboard', () => {
    it('should render dashboard for authenticated admin', async () => {
      const res = await agent
        .get('/admin/dashboard')
        .set('Cookie', sessionCookie);
      
      expect(res.status).toBe(200);
      expect(res.text).toContain('Dashboard');
    });
    
    it('should redirect to login for unauthenticated users', async () => {
      const res = await request(app)
        .get('/admin/dashboard');
      
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('/admin/login');
    });
  });
  
  describe('User Management', () => {
    it('should create a new user', async () => {
      const res = await agent
        .post('/admin/users')
        .set('Cookie', sessionCookie)
        .send({
          email: 'newuser@test.com',
          firstName: 'New',
          lastName: 'User',
          password: 'Pass123!@#',
          role: 'EDITOR'
        });
      
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('/admin/users');
    });
  });
});
```

## Deployment

### Production Configuration

```typescript
// Production optimizations
if (process.env.NODE_ENV === 'production') {
  // Enable view caching
  app.set('view cache', true);
  
  // Compress responses
  app.use(compression());
  
  // Serve static files with caching
  app.use(express.static('public', {
    maxAge: '1d',
    etag: true
  }));
  
  // Force HTTPS
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

### Environment Variables

```env
# Admin Configuration
ADMIN_BASE_PATH=/admin
ADMIN_SESSION_NAME=nysc.admin.sid
ADMIN_SESSION_SECRET=complex-random-string-here
ADMIN_SESSION_TIMEOUT=86400000
ADMIN_COOKIE_SECURE=true
ADMIN_COOKIE_HTTPONLY=true
ADMIN_MAX_LOGIN_ATTEMPTS=5
ADMIN_LOCKOUT_DURATION=900000
ADMIN_PASSWORD_MIN_LENGTH=8
ADMIN_ENABLE_2FA=false
ADMIN_LOG_LEVEL=info
```

## Monitoring & Maintenance

### Activity Logging

```typescript
// Activity logger middleware
export const logActivity = (action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    const originalRedirect = res.redirect;
    
    res.json = function(data: any) {
      if (res.statusCode < 400) {
        activityService.log({
          userId: req.session.userId,
          action,
          resource: req.baseUrl + req.path,
          method: req.method,
          ipAddress: req.ip
        });
      }
      return originalJson.call(this, data);
    };
    
    res.redirect = function(url: string) {
      activityService.log({
        userId: req.session.userId,
        action,
        resource: req.baseUrl + req.path,
        method: req.method,
        ipAddress: req.ip
      });
      return originalRedirect.call(this, url);
    };
    
    next();
  };
};
```

### Health Monitoring

```typescript
// Admin panel health check
app.get('/admin/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      sessions: await checkSessions()
    }
  };
  
  res.json(health);
});
```

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
   - TOTP implementation
   - Backup codes
   - SMS verification

2. **Advanced Analytics**
   - Real-time dashboards
   - Custom report builder
   - Data visualization

3. **Workflow Automation**
   - Content approval workflows
   - Scheduled tasks
   - Email automation

4. **API Integration**
   - RESTful admin API
   - GraphQL support
   - Webhook management

5. **Mobile Responsiveness**
   - Fully responsive design
   - Touch-optimized interfaces
   - Mobile app integration

6. **Internationalization**
   - Multi-language support
   - RTL language support
   - Locale management