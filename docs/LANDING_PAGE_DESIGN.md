# NYSC Landing Page Design Specification

## Design Inspiration: Lake Garda Style with NYSC Brand Colors

### Visual Design Concept

#### Hero Section Design
```
┌─────────────────────────────────────────────────────────────┐
│  NYSC Logo  |  About ▼  Programs ▼  Services ▼  Contact    │ 🔍 │ SI|TA|EN │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   [Full-width dynamic image of youth activities]             │
│                                                               │
│   ┌─────────────────────────────────────┐                   │
│   │ 🎯 HOW TO                           │                   │
│   │                                     │                   │
│   │ Empowering Youth Across Sri Lanka  │                   │
│   │ Join programs that shape your      │                   │
│   │ future and build communities       │                   │
│   │                                     │                   │
│   │ [ Start Your Journey ]              │                   │
│   └─────────────────────────────────────┘                   │
│                                                               │
│                        • • • • •                              │
└─────────────────────────────────────────────────────────────┘
```

### Color Palette (NYSC Logo Based)

```css
:root {
  /* Primary Colors from Logo */
  --nysc-red: #E53935;
  --nysc-orange: #FF6F00;
  --nysc-yellow: #FFD600;
  --nysc-green: #4CAF50;
  --nysc-teal: #00ACC1;
  
  /* Supporting Colors */
  --navy-dark: #1A237E;
  --gray-light: #F5F5F5;
  --white: #FFFFFF;
  --black: #212121;
  
  /* Gradients */
  --hero-gradient: linear-gradient(135deg, rgba(229,57,53,0.9), rgba(255,111,0,0.8));
  --wave-gradient: linear-gradient(180deg, #00ACC1, #4CAF50);
}
```

### Typography Hierarchy

```css
/* Using modern, clean fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700&display=swap');

.hero-title {
  font-family: 'Poppins', 'Noto Sans Sinhala', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--navy-dark);
}
```

## Component Specifications

### 1. Navigation Header
- **Style**: Transparent overlay on hero, becomes solid white on scroll
- **Logo**: NYSC colorful logo on left (height: 50px)
- **Menu**: Dropdown navigation with smooth animations
- **Search**: Expandable search bar with icon
- **Language**: Clean toggle buttons (SI | TA | EN)

### 2. Hero Section (Lake Garda Style)

### 3. Curved Wave Sections (Signature Lake Garda Element)


### 4. Services Grid (Modern Cards)
```
┌─────────────┬─────────────┬─────────────┐
│   🏃‍♂️        │   🎭        │   🎓        │
│             │             │             │
│   Sports    │  Cultural   │  Training   │
│   Programs  │  Activities │  Centers    │
│             │             │             │
│ [Learn →]   │ [Learn →]   │ [Learn →]   │
├─────────────┼─────────────┼─────────────┤
│   🏆        │   🌍        │   📅        │
│             │             │             │
│   Youth     │   Global    │   Event     │
│   Awards    │  Programs   │  Calendar   │
│             │             │             │
│ [Learn →]   │ [Learn →]   │ [Learn →]   │
└─────────────┴─────────────┴─────────────┘
```


### 6. Footer Design (Lake Garda Inspired)
```
┌─────────────────────────────────────────────────────────────┐
│  [Colorful wave pattern with activity icons]                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  NYSC Logo   │  QUICK LINKS      │  CONTACT          │       │
│              │  • About NYSC      │  📧 info@nysc.lk │       │
│  Empowering  │  • Programs        │  📱 +94 11 234567 │       │
│  Youth Since │  • Youth Clubs     │  📍 Colombo 07    │       │
│  1972        │  • Downloads       │                   │       │
│              │                    │  [Social Icons]   │       │
└─────────────────────────────────────────────────────────────┘
```

## Page Sections Layout

### Section 1: Hero Carousel
- Full viewport height (100vh)
- 5 rotating slides with youth activities
- Auto-play with 5-second intervals
- Pause on hover

### Section 2: Quick Stats (Animated Counters)
```
[ 25,000+ ]    [ 350+ ]      [ 250+ ]     [ 50+ ]
Youth Members  Programs    Training Centers  Districts
```

### Section 3: Services Overview
- 6 colorful cards in 3x2 grid
- Icons with NYSC brand colors
- Hover animations
- Quick access links

### Section 4: Laders Profile Display
- 6 colorful cards in 3x2 grid
- Icons with NYSC brand colors
- Hover animations
- Quick access links

### Section 5: Featured Programs
- Horizontal scrolling cards
- Category filters
- "Hot" and "New" badges
- Registration status indicators

### Section 6: Success Stories
- Testimonial carousel
- Youth achievement photos
- Quotes with names and programs

### Section 7: News & Events
- Latest 3 news items
- Upcoming events calendar widget
- "View All" link

### Section 8: Newsletter (Lake Garda Style)
```
┌─────────────────────────────────────────────────────────────┐
│  SUBSCRIBE TO OUR NEWSLETTER                                 │
│  Stay updated with youth programs and opportunities          │
│                                                              │
│  [ email@example.com ]  [ Subscribe! ]                       │
│                                                              │
│  360Gardalife newsletter is free, easy and colorful!         │
└─────────────────────────────────────────────────────────────┘
```

## Animations & Interactions

### Scroll Animations
```javascript
// Intersection Observer for fade-in effects
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

// Elements fade in and slide up on scroll
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Mouse Parallax Effect
- Hero images move slightly with mouse
- Depth effect on scroll
- Smooth transitions

## Mobile Responsive Design

### Mobile Navigation
- Hamburger menu with slide-out drawer
- Logo centered in header
- Search icon in top right

### Mobile Hero
- Reduced height (70vh)
- Simplified overlay content
- Larger touch targets

### Mobile Cards
- Single column layout
- Full-width cards
- Increased padding

## Performance Optimizations

### Image Strategy
- WebP format with fallbacks
- Lazy loading for below-fold content
- Responsive images with srcset
- Blur-up technique for hero images

### CSS Optimizations
```css
/* Critical CSS inline */
.hero, .nav, .above-fold { /* inline styles */ }

/* Non-critical CSS deferred */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Accessibility Features

### ARIA Labels
```html
<nav role="navigation" aria-label="Main navigation">
<section aria-labelledby="services-heading">
<button aria-expanded="false" aria-controls="mobile-menu">
```

### Keyboard Navigation
- Tab order follows visual hierarchy
- Skip links for main content
- Focus indicators with NYSC brand colors

### Screen Reader Support
- Descriptive alt texts
- Proper heading hierarchy
- ARIA live regions for updates

