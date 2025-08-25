# NYSC Translation Management System

A comprehensive backend-driven translation management system for the NYSC website, providing dynamic translation updates while maintaining backward compatibility with static files.

## 🏗️ Architecture Overview

### System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Admin Panel   │    │  Backend API    │    │   Frontend      │
│   (React App)   │◄──►│  (Express.js)   │◄──►│   (React App)   │
│   Port: 3002    │    │   Port: 3001    │    │   Port: 5173    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
```

### Data Flow

1. **Admin Panel** → Create/Update translations via web interface
2. **Backend API** → Process changes, store in database, sync to files
3. **Frontend** → Load from API (primary) or static files (fallback)
4. **Real-time Updates** → WebSocket pushes changes to all clients

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ LTS
- PostgreSQL 15+
- pnpm (recommended) or npm

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://postgres:password@localhost:5432/nysc_translations"

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed initial data from existing translation files
npm run prisma:seed

# Start backend server
npm run dev
```

Backend will be available at: `http://localhost:3001`

### 2. Admin Panel Setup

```bash
# Navigate to admin directory
cd admin

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start admin panel
npm run dev
```

Admin panel will be available at: `http://localhost:3002`

### 3. Frontend Integration

```bash
# Navigate to frontend directory
cd frontend

# Install new dependency (axios already added)
# The frontend will automatically use the API when available

# Start frontend
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 📋 Features

### ✅ Translation Management
- **CRUD Operations**: Create, read, update, delete translations
- **Multi-language Support**: English, Sinhala, Tamil
- **Namespace Organization**: Organized by component/page
- **Bulk Operations**: Mass import/export via CSV
- **Version Control**: Full translation history with rollback

### ✅ Real-time Updates
- **WebSocket Integration**: Live translation updates
- **File Synchronization**: Auto-sync to static files
- **Hot Reload**: Changes appear immediately in development

### ✅ Security & Permissions
- **Role-based Access**: ADMIN, EDITOR, TRANSLATOR, VIEWER
- **Audit Trail**: Complete change history with user tracking
- **Input Validation**: Comprehensive sanitization and validation
- **Rate Limiting**: Protection against abuse

### ✅ Developer Experience
- **Debug Panel**: Real-time connection status and statistics
- **Hybrid Loading**: API-first with file fallback
- **Import/Export**: CSV templates and bulk operations
- **Type Safety**: Full TypeScript support

## 🗄️ Database Schema

### Core Tables

```sql
translations         -- Main translation entries
├── id (UUID)
├── namespace        -- e.g., 'header', 'footer'
├── key             -- e.g., 'welcomeMessage'
├── language        -- 'en', 'si', 'ta'
├── value           -- The translated text
├── version         -- Version number
└── isActive        -- Soft delete flag

translation_versions -- Version history
├── id (UUID)
├── translationId
├── version
├── value
└── createdBy

translation_audits   -- Change tracking
├── id (UUID)
├── translationId
├── action          -- CREATE, UPDATE, DELETE
├── oldValue/newValue
├── userId
└── metadata

users               -- User management
├── id (UUID)
├── email
├── name
├── role            -- ADMIN, EDITOR, TRANSLATOR, VIEWER
└── isActive
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/translations` - Get translations with filters
- `GET /api/translations/stats` - Translation statistics
- `GET /api/translations/completeness` - Translation coverage report

### Protected Endpoints (Require Authentication)
- `POST /api/translations` - Create translation
- `PUT /api/translations/:id` - Update translation
- `DELETE /api/translations/:id` - Delete translation
- `PUT /api/translations/bulk` - Bulk update translations

### Admin Endpoints
- `POST /api/translations/import` - Import from CSV
- `POST /api/translations/export` - Export to CSV
- `POST /api/translations/sync` - Sync to files

## 📁 File Structure

```
backend/
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Initial data seeder
├── src/
│   ├── controllers/
│   │   └── translationController.ts
│   ├── services/
│   │   └── TranslationService.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── validation.ts
│   ├── routes/
│   │   └── translation.routes.ts
│   └── server.ts
└── package.json

admin/
├── src/
│   ├── components/
│   │   ├── TranslationManager.tsx
│   │   ├── TranslationForm.tsx
│   │   ├── ImportModal.tsx
│   │   └── ExportModal.tsx
│   ├── services/
│   │   └── translationApi.ts
│   └── types/
│       └── translation.ts
└── package.json

frontend/
├── src/
│   ├── lib/
│   │   ├── i18n.ts             # Enhanced with API integration
│   │   └── translationApi.ts   # API client
│   └── components/debug/
│       └── TranslationDebugPanel.tsx
└── package.json
```

## 🔐 User Roles & Permissions

| Role | View | Create | Edit Own | Edit All | Delete | Import/Export | Admin |
|------|------|--------|----------|----------|--------|---------------|-------|
| **VIEWER** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **TRANSLATOR** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **EDITOR** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **ADMIN** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## 📊 CSV Import/Export Format

### Import Format
```csv
namespace,key,language,value
common,welcomeMessage,en,Welcome to NYSC
common,welcomeMessage,si,NYSC වෙත සාදරයෙන් පිළිගන්නවා
common,welcomeMessage,ta,NYSC க்கு வரவேற்கிறோம்
header,navigation.home,en,Home
header,navigation.home,si,මුල් පිටුව
header,navigation.home,ta,முகப்பு
```

### Export Format
```csv
namespace,key,language,value,version,updatedAt
common,welcomeMessage,en,Welcome to NYSC,2,2024-01-15T10:30:00Z
common,welcomeMessage,si,NYSC වෙත සාදරයෙන් පිළිගන්නවා,1,2024-01-15T10:30:00Z
```

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error**:
```bash
# Check PostgreSQL is running
pg_ctl status

# Reset database
npm run prisma:reset
npm run prisma:seed
```

**Port Already in Use**:
```bash
# Kill process using port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in .env
PORT=3005
```

### Frontend Issues

**API Not Available**:
- Frontend automatically falls back to static files
- Check debug panel for connection status
- Verify VITE_API_URL in .env

**Translation Keys Showing**:
- Check browser console for loading errors
- Verify namespace is properly configured
- Use debug panel to check translation source

### Admin Panel Issues

**Login Failed**:
```bash
# Default admin credentials (change in production):
Email: admin@nysc.lk
Password: admin123
```

**Import Errors**:
- Check CSV format matches template
- Ensure all required columns are present
- Verify file size is under 5MB

## 🔄 Development Workflow

### Making Translation Changes

1. **Via Admin Panel** (Recommended):
   - Log in to admin panel
   - Use search/filters to find translation
   - Edit inline or use form
   - Changes sync automatically to files and database

2. **Via CSV Import**:
   - Export current translations
   - Edit in spreadsheet application
   - Import updated CSV
   - Review import results

3. **Direct File Edit** (Development only):
   - Edit JSON files in `/frontend/src/locales/`
   - Run sync API to update database
   - Or restart backend to pick up changes

### Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test

# E2E tests with admin panel
cd admin
npm run test:e2e
```

## 🚀 Production Deployment

### Environment Variables

**Backend (.env)**:
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/nysc_translations
JWT_SECRET=your-super-secure-secret-key
ALLOWED_ORIGINS=https://nysc.lk,https://admin.nysc.lk
```

**Frontend (.env.production)**:
```env
VITE_API_URL=https://api.nysc.lk
```

**Admin (.env.production)**:
```env
VITE_API_URL=https://api.nysc.lk
VITE_WS_URL=wss://api.nysc.lk/ws
```

### Deployment Checklist

- [ ] Set up production PostgreSQL database
- [ ] Configure environment variables
- [ ] Set up SSL certificates
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring and logging
- [ ] Run database migrations
- [ ] Seed initial data
- [ ] Test all endpoints
- [ ] Verify file synchronization
- [ ] Test WebSocket connections

## 📈 Monitoring

### Key Metrics
- Translation API response times
- Database query performance
- WebSocket connection count
- File sync success rate
- Import/export job status

### Logging
- All translation changes are logged
- API errors with request IDs
- WebSocket connection events
- File sync operations

## 🤝 Contributing

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

### Adding New Features
1. Create feature branch
2. Implement with tests
3. Update documentation
4. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**NYSC Translation Management System** - Empowering multilingual communication for Sri Lankan youth services.