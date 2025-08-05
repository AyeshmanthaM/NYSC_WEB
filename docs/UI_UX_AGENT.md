# UI/UX Design Agent Configuration for NYSC Website

## Agent Profile
**Role**: Senior UI/UX Designer specializing in government digital services  
**Expertise**: SLDDS compliance, accessibility, multilingual interfaces, youth-focused design

## Design Philosophy

### Core Principles
1. **Youth-Centric Design**: Modern, vibrant, and engaging while maintaining government credibility
2. **Cultural Sensitivity**: Respect Sri Lankan cultural values and visual preferences
3. **Inclusive by Default**: Design for users aged 15-35 primarily, but accessible to all
4. **Mobile-First**: 70% of users expected on mobile devices
5. **Performance-Conscious**: Optimize for low-bandwidth connections
6. **Modern UI Framework**: Built with @once-ui-system/core for contemporary design patterns
7. **Dual Theme Support**: Mandatory dark and light mode with seamless switching

## Visual Design Guidelines

### Color Application Strategy (Based on NYSC Logo)

#### Primary Palette Usage
- **Red (#E53935)**: Primary actions, important CTAs, headers
- **Orange (#FF6F00)**: Secondary actions, hover states, youth energy
- **Yellow (#FFD600)**: Highlights, badges, notifications
- **Green (#4CAF50)**: Success states, nature, growth
- **Teal (#00ACC1)**: Links, secondary navigation, water/lake theme

#### Supporting Colors
- **Dark Navy (#1A237E)**: Text, navigation backgrounds
- **Light Gray (#F5F5F5)**: Page backgrounds
- **White (#FFFFFF)**: Card backgrounds, clean spaces
- **Gradient Overlays**: Using curved wave patterns like Lake Garda site

#### Semantic Colors
- Success: Green (#4CAF50)
- Warning: Amber (#FFC107)
- Error: Red (#F44336)
- Info: Light Blue (#2196F3)

### Typography Hierarchy

```css
/* Sinhala/Tamil specific adjustments */
.si, .ta {
  line-height: 1.8; /* More space for complex scripts */
  letter-spacing: 0.02em;
}

/* Heading scales */
.h1 { font-size: 3rem; font-weight: 700; } /* 48px */
.h2 { font-size: 2.25rem; font-weight: 600; } /* 36px */
.h3 { font-size: 1.875rem; font-weight: 600; } /* 30px */
.h4 { font-size: 1.5rem; font-weight: 500; } /* 24px */
.h5 { font-size: 1.25rem; font-weight: 500; } /* 20px */
.body { font-size: 1rem; font-weight: 400; } /* 16px */
.small { font-size: 0.875rem; font-weight: 400; } /* 14px */
```

### Component Design Patterns

#### 1. Hero Section
- Full-width dynamic banner with youth activities
- Overlaid text with high contrast backgrounds
- Quick action buttons for popular services
- Auto-rotating with pause on hover

#### 2. Service Cards
```
┌─────────────────┐
│ 🎯 Icon (48px)  │
│                 │
│ Service Title   │
│ Brief desc...   │
│                 │
│ [Learn More →]  │
└─────────────────┘
```

#### 3. Youth Club Registration Form
- Step indicator with icons
- Progress bar showing completion
- Inline validation with helpful messages
- Auto-save functionality
- Mobile-optimized multi-step layout

#### 4. Event Cards
```
┌─────────────────────┐
│ [Event Image]       │
│ Category Badge      │
├─────────────────────┤
│ Event Title         │
│ 📅 Date | 📍 Location│
│ Brief description...│
│ [Register] [Info]   │
└─────────────────────┘
```

### Interaction Patterns

#### Micro-interactions
- Button hover: Subtle elevation + color shift
- Form focus: Blue glow with 2px border
- Success states: Green checkmark animation
- Loading: Skeleton screens, not spinners

#### Animations
```javascript
// Standard timing functions
const transitions = {
  fast: '150ms ease-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out'
};

// Respect reduced motion
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

### Page-Specific Designs

#### 1. Homepage
- Hero carousel (3-5 slides)
- Quick services grid (6 icons)
- Latest news ticker
- Upcoming events calendar widget
- Success stories section
- Footer with all links

#### 2. Youth Club Registration
- Illustrated step headers
- District/division selector with maps
- Photo upload with preview
- Digital signature pad
- PDF preview before submission

#### 3. Sports Portal
- Live scores widget
- Tournament brackets
- Photo galleries with lightbox
- Registration status badges
- Leaderboards with animations

#### 4. Cultural Programs
- Event calendar with filters
- Video galleries
- Application wizard
- Participant showcases
- Social sharing integration

### Mobile-Specific Patterns

#### Navigation
- Hamburger menu with slide-out drawer
- Sticky bottom navigation for key actions
- Breadcrumb compression
- Search as primary action

#### Forms
- One field per screen on complex forms
- Native date/time pickers
- Camera integration for uploads
- Touch-friendly 44px minimum targets

### Accessibility Enhancements

#### Visual
- High contrast mode toggle
- Font size controls (A-, A, A+)
- Dyslexia-friendly font option
- Color blind safe palettes

#### Navigation
- Skip links
- Keyboard shortcuts overlay
- Focus indicators (2px minimum)
- ARIA live regions for updates

### Dark Mode Implementation with @once-ui-system/core

**Required Theme Toggle Component:**
```tsx
// components/common/ThemeToggle.tsx
import { useTheme } from '@once-ui-system/core';
import { SunIcon, MoonIcon } from '@once-ui-system/icons';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
```

**CSS Custom Properties for Once UI Integration:**
```css
/* Light theme variables matching NYSC brand */
[data-theme="light"] {
  /* NYSC Brand Colors - N.Y.S.C */
  --color-primary: #B91C3C;       /* Deep burgundy (N) */
  --color-secondary: #F56500;     /* Vibrant orange (Y) */
  --color-accent: #EAB308;        /* Golden yellow (S) */
  --color-success: #059669;       /* Forest green (C) */
  
  /* Youth Club inspired colors */
  --color-info: #00B4A6;          /* Turquoise teal */
  --color-warning: #FFD23F;       /* Warm golden */
  --color-error: #DC2626;         /* Clean red */
  
  /* Surface system */
  --color-background: #FFFFFF;
  --color-surface: #FAFAFA;
  --color-surface-variant: #F1F5F9;
  --color-surface-inverse: #1E293B;
  
  /* Text system */
  --color-on-background: #1E293B;
  --color-on-surface: #334155;
  --color-on-primary: #FFFFFF;
  --color-on-secondary: #FFFFFF;
  
  /* Border system */
  --color-outline: #CBD5E1;
  --color-outline-variant: #E2E8F0;
}

[data-theme="dark"] {
  /* Adjusted brand colors for dark mode accessibility */
  --color-primary: #EF4444;       /* Accessible red */
  --color-secondary: #FB923C;     /* Warm orange */
  --color-accent: #FDE047;        /* Bright yellow */
  --color-success: #10B981;       /* Emerald green */
  
  /* Dark mode supporting colors */
  --color-info: #22D3EE;          /* Cyan blue */
  --color-warning: #FBBF24;       /* Amber */
  --color-error: #F87171;         /* Rose red */
  
  /* Dark surface system */
  --color-background: #0F172A;    /* Slate 900 */
  --color-surface: #1E293B;       /* Slate 800 */
  --color-surface-variant: #334155; /* Slate 700 */
  --color-surface-inverse: #F8FAFC;
  
  /* Dark text system */
  --color-on-background: #F8FAFC;
  --color-on-surface: #E2E8F0;
  --color-on-primary: #FFFFFF;
  --color-on-secondary: #000000;
  
  /* Dark border system */
  --color-outline: #475569;       /* Slate 600 */
  --color-outline-variant: #64748B; /* Slate 500 */
}

/* Gradient system inspired by the artistic youth club design */
.gradient-nysc-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}

.gradient-nysc-accent {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-warning) 100%);
}

.gradient-youth-energy {
  background: linear-gradient(135deg, var(--color-info) 0%, var(--color-success) 100%);
}
```

**System Preference Detection:**
```typescript
// utils/themeDetection.ts
export const detectSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }
  return 'light';
};
```

## Design System Components

## Modern UI Framework Integration

### @once-ui-system/core Configuration
This project MUST use `@once-ui-system/core` as the primary UI framework for modern, consistent components:

```bash
# Installation
npm install @once-ui-system/core
```

**Benefits:**
- Modern design patterns with built-in dark/light mode support
- Consistent component library optimized for performance
- WCAG 2.1 AA accessibility compliance out of the box
- TypeScript support with excellent developer experience
- Seamless theme switching capabilities

### Theme System Requirements

#### Dark Mode & Light Mode Support
**MANDATORY FEATURE**: Both dark and light themes must be implemented with smooth transitions.

**Theme Toggle Placement:**
- Position: Header, to the right of the language selector
- Style: Icon-based toggle button (sun/moon icons)
- Behavior: Instant theme switching with system preference detection
- Persistence: User preference saved in localStorage

**Theme Implementation:**
```typescript
// Theme configuration using @once-ui-system/core based on NYSC brand colors
import { createTheme } from '@once-ui-system/core';

const lightTheme = createTheme({
  colors: {
    // Primary palette from NYSC logo
    primary: '#B91C3C',        // Deep burgundy red (N)
    secondary: '#F56500',      // Vibrant orange (Y)  
    accent: '#EAB308',         // Golden yellow (S)
    success: '#059669',        // Forest green (C)
    
    // Surface colors
    background: '#FFFFFF',
    surface: '#FAFAFA',
    surfaceVariant: '#F1F5F9',
    
    // Text colors
    onBackground: '#1E293B',
    onSurface: '#334155',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    
    // Supporting colors from Youth Club design
    info: '#00B4A6',          // Turquoise teal
    warning: '#FFD23F',       // Warm golden
    error: '#DC2626',         // Error red
    
    // Border and outline
    outline: '#CBD5E1',
    outlineVariant: '#E2E8F0'
  }
});

const darkTheme = createTheme({
  colors: {
    // Adjusted primary palette for dark mode
    primary: '#EF4444',        // Lighter red for better contrast
    secondary: '#FB923C',      // Softer orange
    accent: '#FDE047',         // Brighter yellow for visibility
    success: '#10B981',        // Brighter green
    
    // Dark surface colors
    background: '#0F172A',     // Deep slate
    surface: '#1E293B',       // Slate 800
    surfaceVariant: '#334155', // Slate 700
    
    // Dark text colors
    onBackground: '#F8FAFC',
    onSurface: '#E2E8F0',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    
    // Supporting colors adjusted for dark mode
    info: '#22D3EE',          // Cyan for better visibility
    warning: '#FBBF24',       // Amber warning
    error: '#F87171',         // Lighter error red
    
    // Dark border and outline
    outline: '#475569',       // Slate 600
    outlineVariant: '#64748B' // Slate 500
  }
});
```

**Header Layout:**
```
[NYSC Logo] [Navigation Menu] ............ [Language: EN ▼] [🌙/☀️] [Search 🔍]
```

### Core Components Library

1. **Buttons** (using @once-ui-system/core)
   - Primary (filled)
   - Secondary (outlined)
   - Text (minimal)
   - Icon buttons
   - Loading states
   - Theme-aware styling

2. **Forms**
   - Text inputs with floating labels
   - Select dropdowns with search
   - Radio/checkbox groups
   - File uploaders with drag-drop
   - Multi-step forms

3. **Cards**
   - Content cards
   - Interactive cards
   - Media cards
   - Stat cards

4. **Navigation**
   - Top navbar
   - Side navigation
   - Breadcrumbs
   - Pagination
   - Tabs

5. **Feedback**
   - Alerts
   - Toasts
   - Modals
   - Progress indicators

### Custom NYSC Components

1. **Youth Profile Card**
2. **Event Registration Widget**
3. **Club Directory Item**
4. **Award Showcase**
5. **Training Center Locator**
6. **Quick Apply Forms**

## Responsive Breakpoint Strategies

### Mobile (< 480px)
- Single column layouts
- Collapsed navigation
- Full-width components
- Vertical forms

### Tablet (481-768px)
- 2-column grids
- Condensed navigation
- Mixed orientations
- Modal forms

### Desktop (> 769px)
- Multi-column layouts
- Full navigation
- Side-by-side comparisons
- Inline forms

## Performance Optimization

### Image Guidelines
- Hero images: 1920x800 max, WebP format
- Thumbnails: 400x300, lazy loaded
- Icons: SVG sprites
- User uploads: Client-side compression

### CSS Strategy
- Utility-first with Tailwind
- Critical CSS inline
- Component-level code splitting
- PurgeCSS for production

## Testing Checklist

### Visual Testing
- [ ] All three languages render correctly
- [ ] Color contrast passes WCAG AA in both light and dark modes
- [ ] Dark mode theme toggle works smoothly
- [ ] System theme preference is detected correctly
- [ ] Theme persistence works across page reloads
- [ ] @once-ui-system/core components render correctly in both themes
- [ ] Touch targets are 44px minimum
- [ ] Images have proper alt text
- [ ] Forms are clearly labeled

### Interaction Testing
- [ ] Keyboard navigation works throughout
- [ ] Screen readers announce properly
- [ ] Focus management is logical
- [ ] Error messages are helpful
- [ ] Loading states are clear

### Device Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Desktop browsers
- [ ] Slow 3G simulation
- [ ] Offline functionality

## Figma Structure

```
NYSC Website Design System/
├── 🎨 Foundations/
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Icons
├── 🧩 Components/
│   ├── Buttons
│   ├── Forms
│   ├── Cards
│   └── Navigation
├── 📱 Templates/
│   ├── Homepage
│   ├── Service Pages
│   ├── Forms
│   └── Admin
└── 🌐 Prototypes/
    ├── User Journey
    ├── Mobile Flow
    └── Admin Flow
```

## Handoff Specifications

### For Developers
- Component specs with all states
- Spacing and sizing tokens
- Animation timings
- Accessibility notes
- Response behavior documentation

### Asset Delivery
- SVG icons in sprite format
- Image assets in multiple formats
- Color palette (JSON/CSS)
- Typography scale (CSS/SCSS)
- Spacing system (CSS variables)

## Monthly Design Reviews

### Metrics to Track
- Task completion rates
- Error rates on forms
- Time to complete registration
- Mobile vs desktop usage
- Accessibility issues reported

### Iteration Process
1. Collect user feedback
2. Analyze usage patterns
3. A/B test improvements
4. Roll out incrementally
5. Document learnings

## Design Inspiration Sources

### Government Sites
- UK GOV.UK
- Singapore gov.sg
- Estonia e-Estonia
- Canada.ca

### Youth Platforms
- UNESCO Youth
- UN Youth
- Commonwealth Youth

### Local Context
- Sri Lankan cultural motifs
- Traditional color meanings
- Local UX patterns
- Regional preferences

