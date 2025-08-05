# NYSC Admin Panel Specification

## Overview
The NYSC Admin Panel is a comprehensive content management and administration system designed for managing all aspects of the NYSC website, following SLDDS guidelines while providing an efficient workflow for administrators.

## Admin Panel Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **UI Library**: Ant Design Pro / Material-UI (customized for SLDDS)
- **State Management**: Redux Toolkit + RTK Query
- **Charts**: Recharts / Chart.js
- **Forms**: React Hook Form + Yup
- **Tables**: React Table v8
- **Rich Text Editor**: TinyMCE / Quill
- **File Management**: React Dropzone

## User Roles & Permissions

### Role Hierarchy
1. **Super Admin**
   - Full system access
   - User management
   - System configuration
   - All permissions

2. **Administrator**
   - Content management
   - Program management
   - Report generation
   - User approval

3. **Content Manager**
   - CMS operations
   - Media management
   - News and events

4. **Program Officer**
   - Program creation/editing
   - Application review
   - Participant management

5. **District Coordinator**
   - District-level operations
   - Local event management
   - Training center coordination

## Admin Dashboard

### Main Dashboard Layout
```
┌─────────────────────────────────────────────────────────────┐
│ NYSC Admin Panel                    [🔔] [👤 Admin] [Logout] │
├─────────────┬───────────────────────────────────────────────┤
│             │                                                 │
│  Sidebar    │              Main Content Area                 │
│  Menu       │                                                 │
│             │  ┌─────────┬─────────┬─────────┬─────────┐   │
│ ▼ Dashboard │  │ Active  │ Pending │ Total   │ Today's │   │
│ ▼ Content   │  │ Users   │ Apps    │ Centers │ Events  │   │
│ ▼ Programs  │  │  2,456  │   145   │   234   │    8    │   │
│ ▼ Users     │  └─────────┴─────────┴─────────┴─────────┘   │
│ ▼ Reports   │                                                 │
│ ▼ Settings  │  [Chart: User Growth]  [Chart: Applications]  │
│             │                                                 │
│             │  Recent Activities Table                       │
└─────────────┴───────────────────────────────────────────────┘
```

### Dashboard Widgets

#### 1. Statistics Cards
```typescript
interface StatCard {
  title: string;
  value: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'stable';
  icon: ReactNode;
  color: string;
}

// Examples:
- Total Youth Members
- Active Programs
- Pending Applications
- Today's Registrations
```

#### 2. Activity Charts
- User registration trends (Line chart)
- Program participation (Bar chart)
- District-wise distribution (Map visualization)
- Application status (Pie chart)

#### 3. Recent Activities Feed
- New registrations
- Application submissions
- Content updates
- System alerts

## Content Management System (CMS)

### Page Builder
```typescript
interface PageBuilder {
  sections: Section[];
  metadata: PageMetadata;
  seo: SEOSettings;
  multilingual: {
    si: Content;
    ta: Content;
    en: Content;
  };
}

// Drag-and-drop sections:
- Hero Banner
- Content Blocks
- Image Gallery
- Video Embed
- Forms
- Cards Grid
- Accordion
- Timeline
```

### Content Types

#### 1. Static Pages
- About Us sections
- Policy pages
- Help/FAQ
- Terms & Conditions

#### 2. Dynamic Content
- News articles
- Event listings
- Announcements
- Success stories

#### 3. Media Management
```
Media Library/
├── Images/
│   ├── Banners/
│   ├── Gallery/
│   └── Documents/
├── Videos/
├── Documents/
│   ├── PDFs/
│   ├── Forms/
│   └── Reports/
└── Audio/
```

### Multilingual Editor
```typescript
interface MultilingualEditor {
  activeLanguage: 'si' | 'ta' | 'en';
  content: {
    si: string;
    ta: string;
    en: string;
  };
  autoTranslate: boolean; // Google Translate API
  preview: boolean;
}
```

## Program Management

### Program Creation Workflow
1. **Basic Information**
   - Program title (trilingual)
   - Description
   - Category
   - Duration

2. **Eligibility Criteria**
   - Age range
   - Educational qualifications
   - District restrictions
   - Special requirements

3. **Schedule & Venues**
   - Start/End dates
   - Registration deadline
   - Venue selection
   - Capacity

4. **Application Form Builder**
   - Drag-drop form fields
   - Validation rules
   - Document requirements
   - Custom fields

### Application Review System
```
Application List View:
┌────┬───────────┬──────────┬─────────┬──────────┬─────────┐
│ ID │ Applicant │ Program  │ Status  │ Applied  │ Actions │
├────┼───────────┼──────────┼─────────┼──────────┼─────────┤
│001 │ John Doe  │ Youth... │ Pending │ 2 days   │ [👁][✓] │
└────┴───────────┴──────────┴─────────┴──────────┴─────────┘

Filters: Status | Program | Date Range | District
Bulk Actions: Approve | Reject | Export
```

### Review Interface
- Application details view
- Document verification
- Scoring/Rating system
- Comments/Notes
- Status workflow
- Email notifications

## User Management

### User Directory
```typescript
interface UserManagement {
  filters: {
    role: Role[];
    status: Status[];
    district: District[];
    dateRange: DateRange;
  };
  bulkActions: {
    activate: boolean;
    deactivate: boolean;
    resetPassword: boolean;
    export: boolean;
  };
  permissions: Permission[];
}
```

### User Profile Management
- Personal information
- Role assignment
- Permission management
- Activity history
- Login sessions
- Password reset

## News Management System

### News Dashboard
```
News Overview:
┌────────────┬────────────┬────────────┬────────────┐
│ Published  │ Draft      │ Views Today│ Comments   │
│    156     │    23      │   1,245    │    89      │
└────────────┴────────────┴────────────┴────────────┘

[Chart: Article Views - Last 30 Days]
[Chart: Popular Categories]
```

### Article Management

#### Article Editor
```typescript
interface ArticleEditor {
  // Multilingual fields
  title: { si: string; ta: string; en: string }
  excerpt: { si: string; ta: string; en: string }
  content: { si: string; ta: string; en: string }
  
  // Metadata
  category: CategorySelect
  tags: TagInput[]
  featuredImage: ImageUpload
  
  // Publishing options
  status: 'draft' | 'published' | 'scheduled'
  publishDate: DateTime
  isFeatured: boolean
  
  // SEO
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
}
```

#### Rich Text Editor Features
- TinyMCE/Quill integration
- Image upload with gallery
- Video embedding
- Table support
- Code highlighting
- Multilingual spell check

### Category Management
```
Categories:
├── Sports & Recreation
│   ├── District Sports
│   ├── National Events
│   └── Training Programs
├── Cultural Programs
│   ├── Traditional Arts
│   ├── Modern Arts
│   └── Festivals
├── Youth Development
│   ├── Leadership
│   ├── Skills Training
│   └── Career Guidance
└── Announcements
    ├── Recruitment
    ├── Results
    └── General Notices
```

### News Analytics

#### Metrics Dashboard
- Total articles published
- Total page views
- Average reading time
- Popular articles ranking
- Category performance
- Author contributions
- Geographic distribution of readers
- Device/browser statistics

#### Content Performance
```
Top Articles This Month:
┌────┬─────────────────────────┬────────┬──────────┐
│ #  │ Title                   │ Views  │ Shares   │
├────┼─────────────────────────┼────────┼──────────┤
│ 1  │ Youth Awards 2025...    │ 5,234  │   423    │
│ 2  │ New Training Center...  │ 3,456  │   234    │
│ 3  │ Sports Meet Results...  │ 2,890  │   189    │
└────┴─────────────────────────┴────────┴──────────┘
```

### Comment Moderation
- Automated spam filtering
- Manual approval queue
- Bulk actions (approve/reject/delete)
- User blocking
- Profanity filter

### News Workflow

#### Editorial Process
1. **Draft Creation**
   - Author creates article
   - Saves as draft
   - Previews in all languages

2. **Review Process**
   - Editor reviews content
   - Checks translations
   - Verifies facts and sources

3. **Publishing**
   - Schedule or immediate publish
   - Social media auto-posting
   - Email newsletter integration

4. **Post-Publishing**
   - Monitor engagement
   - Update as needed
   - Archive old content

## Reporting System

### Report Types

#### 1. Statistical Reports
- User demographics
- Program participation
- Geographic distribution
- Growth trends

#### 2. Operational Reports
- Application processing time
- User activity logs
- System performance
- Error reports

#### 3. Custom Reports
```typescript
interface ReportBuilder {
  dataSource: string[];
  filters: Filter[];
  columns: Column[];
  groupBy?: string;
  sortBy?: string;
  format: 'pdf' | 'excel' | 'csv';
}
```

### Report Templates
- Monthly activity report
- District-wise summary
- Program effectiveness
- Financial summary
- User engagement metrics

## System Configuration

### General Settings
- Site information
- Contact details
- Social media links
- Email templates
- SMS templates

### Integration Settings
- Payment gateway
- SMS gateway
- Email SMTP
- Google Maps API
- Analytics

### Workflow Configuration
- Approval chains
- Email notifications
- Status definitions
- Form validations

## Advanced Features

### Bulk Operations
```typescript
interface BulkOperations {
  selection: string[];
  actions: {
    approve: () => void;
    reject: () => void;
    export: () => void;
    delete: () => void;
    notify: () => void;
  };
  progress: {
    total: number;
    completed: number;
    failed: number;
  };
}
```

### Notification Center
- System alerts
- User activities
- Pending approvals
- Error notifications
- Performance alerts

### Audit Trail
```
Audit Log Entry:
{
  timestamp: "2025-08-03T10:30:00Z",
  user: "admin@nysc.lk",
  action: "UPDATE",
  resource: "youth_club",
  resourceId: "123",
  changes: {
    status: { from: "pending", to: "approved" }
  },
  ip: "192.168.1.1"
}
```

## Mobile Admin App

### Key Features
- Dashboard overview
- Quick approvals
- Push notifications
- Basic content updates
- Emergency alerts

### Offline Capabilities
- Cached data viewing
- Queue actions for sync
- Local storage management

## Security Features

### Access Control
- IP whitelisting
- 2FA authentication
- Session management
- Password policies
- Activity monitoring

### Data Protection
- Encryption at rest
- Secure file uploads
- API rate limiting
- CSRF protection
- XSS prevention

## Performance Optimization

### Frontend Optimization
- Code splitting
- Lazy loading
- Component memoization
- Virtual scrolling for tables
- Optimistic UI updates

### Backend Integration
- GraphQL for complex queries
- Webhook support
- Real-time updates (WebSocket)
- Batch API calls
- Response caching

## Admin Panel Themes

### SLDDS Compliant Theme
```css
/* Admin theme following SLDDS */
:root {
  --admin-primary: #1976D2;
  --admin-secondary: #FDD835;
  --admin-success: #4CAF50;
  --admin-warning: #FF9800;
  --admin-error: #F44336;
  --admin-bg: #F5F5F5;
  --admin-sidebar: #263238;
}
```

### Dark Mode Support
- Toggle in user preferences
- Persistent across sessions
- Adjusted color contrasts
- Reduced eye strain

## Training & Documentation

### In-App Help
- Contextual tooltips
- Video tutorials
- Help documentation
- FAQ section

### User Guides
- Role-based guides
- Feature walkthroughs
- Best practices
- Troubleshooting

## Deployment Considerations

### Environment Setup
```env
# Admin Panel Environment Variables
REACT_APP_API_URL=https://api.nysc.lk
REACT_APP_ADMIN_URL=https://admin.nysc.lk
REACT_APP_TINYMCE_KEY=your-key
REACT_APP_GOOGLE_MAPS_KEY=your-key
REACT_APP_SENTRY_DSN=your-dsn
```

### Build Configuration
```json
{
  "scripts": {
    "build:admin": "REACT_APP_BUILD_TARGET=admin react-scripts build",
    "deploy:admin": "npm run build:admin && deploy-script"
  }
}
```
