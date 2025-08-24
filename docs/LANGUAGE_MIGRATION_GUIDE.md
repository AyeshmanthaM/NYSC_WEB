# Language Migration Guide - NYSC Website

## Overview
This guide documents the process of migrating components from the legacy `CompatibilityLanguageContext` to the modern translation system using `react-i18next` with namespace-based translations.

## Table of Contents
1. [Understanding the Translation Systems](#understanding-the-translation-systems)
2. [Migration Process Step-by-Step](#migration-process-step-by-step)
3. [Common Patterns and Solutions](#common-patterns-and-solutions)
4. [Troubleshooting](#troubleshooting)
5. [Quick Reference](#quick-reference)

## Understanding the Translation Systems

### Legacy System (CompatibilityLanguageContext)
- Uses a single context for all translations
- Translation keys are nested: `t('section.subsection.key')`
- No namespace separation
- Import: `import { useLanguage } from '../../contexts/CompatibilityLanguageContext';`

### Modern System (react-i18next with namespaces)
- Uses namespace-based organization
- Translation keys use namespace prefix: `t('namespace:key')` or just `t('key')` when namespace is specified
- Better code splitting and lazy loading
- Import: `import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';`

## Migration Process Step-by-Step

### Step 1: Update Component Imports

**Before:**
```typescript
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
```

**After:**
```typescript
// For single namespace
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

// For multiple namespaces
import { useMultipleNamespaces } from '../../hooks/useTranslationWithNamespace';

// If you need currentLanguage
import { useModernLanguage } from '../../contexts/ModernLanguageContext';
```

### Step 2: Update Hook Usage

**Before:**
```typescript
const { t, currentLanguage } = useLanguage();
```

**After (Single Namespace):**
```typescript
const { t, ready } = useTranslationWithNamespace('namespace-name');
// If you need currentLanguage
const { currentLanguage } = useModernLanguage();
```

**After (Multiple Namespaces):**
```typescript
const { t, ready } = useMultipleNamespaces(['namespace1', 'namespace2']);
const { currentLanguage } = useModernLanguage();
```

### Step 3: Add Loading State

Always add a loading state check before rendering the component:

```typescript
// Show loading state while translations are not ready
if (!ready) {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    </section>
  );
}
```

### Step 4: Update Translation Keys

**Before (nested format):**
```typescript
t('section.subsection.key')
t('newsEvents.news.badge')
t('popularCourses.courses.hotelManagement.title')
```

**After (namespace format):**
```typescript
// When using a single namespace, just use the key
t('key')
t('news.badge')
t('hotelManagement.title')

// When using multiple namespaces, specify which namespace
t('namespace:key')
t('newsevents:news.badge')
t('courses:hotelManagement.title')
t('common:newsletterTitle')
```

### Step 5: Create/Update Translation Files

Translation files are located in `/src/locales/[language]/[namespace].json`

**File Structure:**
```
src/locales/
├── en/
│   ├── common.json       # Common UI strings
│   ├── home.json         # Homepage specific
│   ├── services.json     # Services page
│   ├── courses.json      # Courses section
│   ├── testimonials.json # Testimonials section
│   └── newsevents.json   # News and events
├── si/
│   └── (same structure as en)
└── ta/
    └── (same structure as en)
```

**Example translation file (`courses.json`):**
```json
{
  "badge": "Popular Courses",
  "title": "Popular Training Programs",
  "subtitle": "Discover our courses",
  "categories": {
    "hospitality": "Hospitality & Tourism",
    "it": "Information Technology"
  },
  "hotelManagement": {
    "title": "Hotel Management",
    "description": "Comprehensive training...",
    "institute": "NYSC Tourism Training Institute"
  }
}
```

### Step 6: Handle Arrays in Translations

When translations return arrays (like feature lists), add a helper function:

```typescript
const getFeatureArray = (translationKey: string): string[] => {
  const result = t(translationKey);
  if (Array.isArray(result)) {
    return result;
  }
  return [];
};

// Usage
const features = getFeatureArray('careerFeatures');
```

## Common Patterns and Solutions

### Pattern 1: Component with Static Leader/Person Names

For components with names and titles that don't change often:

```typescript
// In translation file (home.json)
{
  "leaders": {
    "minister": {
      "name": "Hon. Sunil Kumara Gamage",
      "position": "Minister of Youth Affairs and Sports"
    }
  }
}

// In component
const leaders = [
  {
    name: t('leaders.minister.name'),
    position: t('leaders.minister.position')
  }
];
```

### Pattern 2: Dynamic Content with Translation Keys

For dynamic content like news articles with hardcoded data:

```typescript
const news = [
  {
    id: 1,
    title: 'NYSC Digital Skills Program Reaches 5,000 Youth',
    // ... other hardcoded content
    tag: 'Technology', // This is used for category display
  }
];

// Still translate UI elements
<span>{t('news.trending')}</span>
<button>{t('news.exploreAll')}</button>
```

### Pattern 3: Newsletter Subscription (Shared Translations)

For components that appear in multiple places, use the `common` namespace:

```typescript
// Add to common.json
{
  "newsletterTitle": "Stay Updated",
  "emailPlaceholder": "Enter your email address",
  "subscribeButton": "Subscribe"
}

// Use with namespace prefix
t('common:newsletterTitle')
```

### Pattern 4: Date Formatting with Language

```typescript
const { currentLanguage } = useModernLanguage();

// Format date based on current language
new Date().toLocaleDateString(
  currentLanguage === 'si' ? 'si-LK' : 
  currentLanguage === 'ta' ? 'ta-LK' : 
  'en-US',
  {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
);
```

## Troubleshooting

### Issue 1: "Module not found" for useMultipleNamespaces

**Problem:** Import error when trying to use `useMultipleNamespaces`

**Solution:** Import from the correct file:
```typescript
import { useMultipleNamespaces } from '../../hooks/useTranslationWithNamespace';
```

### Issue 2: "useLanguage must be used within a LanguageProvider"

**Problem:** React context error when component hasn't been migrated

**Solution:** Complete the migration by updating imports and hook usage as shown in Steps 1-2

### Issue 3: Translation Keys Showing Instead of Text

**Problem:** Raw translation keys displayed (e.g., "newsEvents.news.badge")

**Solution:** 
1. Check that translation files exist in all language folders
2. Verify namespace is loaded in the component
3. Update key format from nested to namespace format

### Issue 4: "Rendered more hooks than during the previous render"

**Problem:** This critical React error occurs when hooks are called conditionally or after early returns, violating React's Rules of Hooks.

**Root Cause:** When migrating components to the modern translation system, developers often add the loading state check (`if (!ready) return ...`) without realizing that some hooks (like `useState`, `useEffect`, etc.) are declared after this conditional return. React requires that hooks must be called in the exact same order on every render.

**Example of Incorrect Code:**
```typescript
const Component = () => {
  const { t, ready } = useTranslationWithNamespace('namespace');
  const { isDark } = useTheme();
  
  // ❌ WRONG: Early return before all hooks
  if (!ready) {
    return <LoadingSpinner />;
  }
  
  // ❌ These hooks won't be called when !ready, causing the error
  const [state, setState] = useState(0);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Some effect
  }, []);
  
  return <div>...</div>;
};
```

**Solution:** Always declare ALL hooks at the top of the component, before any conditional logic:
```typescript
const Component = () => {
  // ✅ CORRECT: All hooks declared first
  const { t, ready } = useTranslationWithNamespace('namespace');
  const { isDark } = useTheme();
  const [state, setState] = useState(0);
  const [data, setData] = useState([]);
  
  // ✅ useEffect and other hooks also before conditionals
  useEffect(() => {
    // Some effect
  }, []);
  
  // ✅ NOW you can have conditional returns
  if (!ready) {
    return <LoadingSpinner />;
  }
  
  // Rest of component logic
  return <div>...</div>;
};
```

**Prevention Checklist:**
1. **Hook Order Rule**: Always declare hooks in this order:
   - Context hooks (`useTheme`, `useTranslationWithNamespace`, etc.)
   - State hooks (`useState`)
   - Ref hooks (`useRef`)
   - Effect hooks (`useEffect`, `useLayoutEffect`)
   - Custom hooks
   - THEN conditional returns and logic

2. **Migration Steps to Avoid This Issue:**
   - First, identify ALL hooks in the component
   - Move them to the top, maintaining their relative order
   - Add the loading state check AFTER all hooks
   - Test that the component renders without errors

3. **Common Patterns That Cause This Error:**
   - Adding loading state before existing `useEffect` hooks
   - Declaring state variables after conditional returns
   - Having hooks inside if statements or loops
   - Calling hooks inside callback functions

4. **ESLint Rule:** Enable the `react-hooks/rules-of-hooks` ESLint rule to catch these errors during development:
```json
{
  "extends": ["plugin:react-hooks/recommended"]
}
```

## Quick Reference

### Namespace Naming Conventions
- `common` - Shared UI strings (buttons, forms, navigation)
- `home` - Homepage specific content
- `services` - Services and programs
- `courses` - Training courses and education
- `testimonials` - Success stories and testimonials
- `newsevents` - News, events, and gallery
- `header` - Header navigation
- `dropdown` - Dropdown menu items

### Component Migration Checklist

- [ ] Update imports to use modern translation hooks
- [ ] Replace `useLanguage()` with appropriate modern hook
- [ ] **CRITICAL: Ensure ALL hooks are declared before any conditional returns**
- [ ] Add `ready` check and loading state AFTER all hooks
- [ ] Update all translation keys to namespace format
- [ ] Create/update translation JSON files for all languages
- [ ] Handle array translations with helper function if needed
- [ ] Test language switching for all three languages
- [ ] Verify no console errors or warnings
- [ ] Check for "Rendered more hooks" errors in console

### Batch Update Commands for Translation Keys

When migrating a component with many translation keys, use MultiEdit for efficiency:

```typescript
// Example: Update multiple keys at once
const edits = [
  { old_string: "t('section.key1')", new_string: "t('namespace:key1')" },
  { old_string: "t('section.key2')", new_string: "t('namespace:key2')" },
  // ... more replacements
];
```

## Best Practices

1. **Always add loading states** - Prevents flash of untranslated content
2. **Use appropriate namespaces** - Don't put everything in common
3. **Keep translations organized** - Group related translations together
4. **Test all languages** - Verify translations work for en, si, and ta
5. **Handle missing translations gracefully** - Provide fallbacks where appropriate
6. **Use TypeScript** - Helps catch translation key typos
7. **Document special cases** - Note any non-standard implementations

## Migration Priority

When migrating a large application, prioritize in this order:

1. **Critical user-facing pages** (Home, Services, Contact)
2. **High-traffic components** (Navigation, Headers, Footers)
3. **Forms and interactive elements** (Registration, Applications)
4. **Static content pages** (About, Policies)
5. **Admin/internal pages** (Lower priority)

## Summary

The migration from CompatibilityLanguageContext to the modern translation system involves:

1. **Updating imports and hooks** - Use modern translation hooks
2. **Adding loading states** - Prevent untranslated content flash
3. **Converting translation keys** - From nested to namespace format
4. **Creating translation files** - Organized by namespace and language
5. **Testing thoroughly** - Verify all languages work correctly

Following this guide ensures consistent implementation across all components and pages, making the application fully multilingual with proper namespace organization and loading states.