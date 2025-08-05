# Claude Code Project Setup Guide for NYSC Website

## ✅ Compatibility Status

All files have been checked and are **fully compatible**. The project uses:
- **Monorepo Structure**: PNPM workspaces managing frontend, backend, and admin
- **Consistent Dependencies**: No version conflicts between packages
- **Shared Types**: Common TypeScript definitions in `/shared`
- **Unified Configuration**: Single source of truth for colors, categories, etc.

## 📁 Complete File Organization

Here's exactly where each file should be placed:

```
nysc-website/
│
├── 📄 CLAUDE.md                    ✓ (Root - Main Claude instructions)
├── 📄 .claudeignore                ✓ (Root - Claude ignore patterns)
├── 📄 TODO.md                      ✓ (Root - Development roadmap)
├── 📄 PROJECT_STRUCTURE.md         ✓ (Root - This structure guide)
├── 📄 README.md                    ✓ (Root - Project documentation)
├── 📄 package.json                 ✓ (Root - Monorepo config)
├── 📄 pnpm-workspace.yaml          ✓ (Root - PNPM workspace)
├── 📄 .env.example                 ✓ (Root - Environment template)
├── 📄 setup.sh                     ✓ (Root - Setup script)
│
├── 📁 docs/
│   ├── 📄 UI_UX_AGENT.md          ✓ (Design guidelines)
│   ├── 📄 BACKEND_ARCHITECTURE.md  ✓ (Backend specs)
│   ├── 📄 ADMIN_PANEL.md          ✓ (Admin specifications)
│   └── 📄 LANDING_PAGE_DESIGN.md  ✓ (Landing page design)
│
├── 📁 frontend/
│   ├── 📄 package.json            ✓ (Frontend dependencies)
│   ├── 📄 tailwind.config.ts      ✓ (NYSC brand colors)
│   │
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   │   └── 📄 Header.tsx  ✓ (Navigation component)
│       │   ├── home/
│       │   │   └── 📄 Hero.tsx    ✓ (Hero carousel)
│       │   └── news/
│       │       └── 📄 NewsFeed.tsx ✓ (News component)
│       └── config/
│           └── 📄 newsCategories.ts ✓ (News categories)
│
├── 📁 backend/
│   ├── 📄 package.json            ✓ (Backend dependencies)
│   ├── prisma/
│   │   └── 📄 schema.prisma       ✓ (Database schema)
│   └── src/
│       └── services/
│           └── 📄 NewsService.ts   ✓ (News service)
│
└── 📁 scripts/
    └── 📄 setup.sh                ✓ (Already in root)
```

## 🚀 Step-by-Step Setup Instructions

### Step 1: Create Project Directory
```bash
mkdir nysc-website
cd nysc-website
```

### Step 2: Initialize Git (Optional but Recommended)
```bash
git init
```

### Step 3: Create All Directories
```bash
# Run this command to create the complete folder structure
mkdir -p docs frontend/{public/{images/{hero,icons},fonts,locales/{en,si,ta}},src/{app,components/{common,home,news,ui},lib,hooks,types,styles,config}} backend/{prisma,src/{controllers,services,models,routes,middleware,utils,workers,types}} admin/src/{pages,components,services} shared/{types,constants} scripts
```

### Step 4: Copy Root Files
Place these files in the root directory:
- `CLAUDE.md`
- `.claudeignore`
- `TODO.md`
- `PROJECT_STRUCTURE.md`
- `.env.example`
- `setup.sh` (make it executable: `chmod +x setup.sh`)

### Step 5: Copy Documentation Files
```bash
# Place in docs/ folder
cp UI_UX_AGENT.md ./docs/
cp BACKEND_ARCHITECTURE.md ./docs/
cp ADMIN_PANEL.md ./docs/
cp LANDING_PAGE_DESIGN.md ./docs/
```

### Step 6: Set Up Package Files
```bash
# Root package.json
cat > package.json << 'EOF'
[Insert root package.json content]
EOF

# PNPM workspace
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'frontend'
  - 'backend'
  - 'admin'
  - 'shared'
EOF
```

### Step 7: Set Up Frontend Files
```bash
# Frontend package.json
cat > frontend/package.json << 'EOF'
[Insert frontend package.json content]
EOF

# Copy component files
cp tailwind.config.ts ./frontend/
cp Header.tsx ./frontend/src/components/common/
cp Hero.tsx ./frontend/src/components/home/
cp NewsFeed.tsx ./frontend/src/components/news/
cp newsCategories.ts ./frontend/src/config/
```

### Step 8: Set Up Backend Files
```bash
# Backend package.json
cat > backend/package.json << 'EOF'
[Insert backend package.json content]
EOF

# Copy service files
cp NewsService.ts ./backend/src/services/
cp schema.prisma ./backend/prisma/
```

### Step 9: Create Additional Required Files

#### Frontend: next.config.js
```javascript
// frontend/next.config.js
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['localhost', 'cdn.nysc.lk'],
  },
}

module.exports = nextConfig
```

#### Frontend: next-i18next.config.js
```javascript
// frontend/next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'si', 'ta'],
  },
}
```

#### Backend: tsconfig.json
```json
// backend/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowJs": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### Backend: nodemon.json
```json
// backend/nodemon.json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/server.ts"
}
```

### Step 10: Install Dependencies
```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install all dependencies
pnpm install
```

### Step 11: Set Up Environment
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your actual values
nano .env  # or use your preferred editor
```

### Step 12: Initialize Database
```bash
# Generate Prisma client
pnpm --filter backend db:generate

# Run migrations (make sure PostgreSQL is running)
pnpm --filter backend db:migrate
```

## 🔍 Verification Checklist

Run these commands to verify everything is set up correctly:

```bash
# Check file structure
find . -type f -name "*.md" | grep -E "(CLAUDE|TODO|UI_UX|BACKEND|ADMIN|LANDING)" 

# Check if all packages are recognized
pnpm ls --depth 0

# Test if scripts work
pnpm run --parallel type-check

# Check Prisma setup
cd backend && npx prisma validate
```

## 🎯 Claude Code Specific Setup

For Claude Code to work optimally:

1. **Ensure CLAUDE.md is in root**: This is the main instruction file
2. **Check .claudeignore**: Make sure it's excluding node_modules and build files
3. **Verify file paths**: All imports in the code files should use correct relative paths

## 🚦 Ready to Start Development

Once setup is complete, you can:

```bash
# Start all development servers
pnpm dev

# Or start individually
pnpm dev:frontend  # http://localhost:3000
pnpm dev:backend   # http://localhost:3001
pnpm dev:admin     # http://localhost:3002

# IMPORTANT: When done developing, always run:
pnpm stop-all

# Or manually check and close ports:
pnpm check:ports
```

## 🔒 Port Security Reminder

**ALWAYS close ports after development:**

```bash
# Quick stop all services
pnpm stop-all

# Check if ports are still open
pnpm check:ports

# Use the port manager script
./scripts/port-manager.sh stop
```

**Security Best Practices:**
1. Never leave development servers running unattended
2. Use firewall rules to restrict access to localhost only
3. Set up proper security headers in production
4. Use environment variables for all sensitive configuration
5. Enable HTTPS in production environments

## 🐛 Troubleshooting

### Common Issues:

1. **Module not found errors**: 
   - Run `pnpm install` again
   - Check if file paths are correct

2. **Database connection errors**:
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env

3. **Port already in use**:
   - Change ports in .env or package.json scripts

4. **TypeScript errors**:
   - Run `pnpm --filter [package] type-check`
   - Ensure all types are properly imported

## ✨ Final Notes

- All files are compatible and ready for Claude Code
- The monorepo structure allows independent development of each package
- Shared types ensure consistency across packages
- The setup supports hot-reloading for all services

Your NYSC website project is now fully configured for Claude Code development!