# Color Usage Guide

## Centralized Color System

All colors are now centralized in `/src/config/colors.ts`. This provides:

### 1. Consistent brand colors across the application
### 2. Theme-aware color utilities  
### 3. Organized color categories
### 4. Easy maintenance and updates

## Usage Examples

### Import the colors
```typescript
import { colors, getThemeColor, getBrandGradient } from '../../config/colors';
```

### Basic Usage

#### Brand Colors
```jsx
// Brand primary color
className={colors.brand.primary.text} // text-[#1aa79e]

// Brand gradient
className={colors.brand.gradient.primary} // bg-gradient-to-r from-[#1aa79e] to-[#f38621]

// Brand gradient text
className={colors.brand.gradient.text} // bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent
```

#### Theme-aware Colors
```jsx
// Text colors that adapt to theme
className={getThemeColor('text.primary', isDark)} // text-gray-900 (light) / text-white (dark)
className={getThemeColor('text.secondary', isDark)} // text-gray-600 (light) / text-gray-300 (dark)

// Background colors
className={getThemeColor('background.primary', isDark)} // bg-gray-50 (light) / bg-gray-900 (dark)
className={getThemeColor('card.primary', isDark)} // bg-white/90 (light) / bg-gray-800/80 (dark)

// Border colors
className={getThemeColor('border.primary', isDark)} // border-gray-200 (light) / border-gray-700 (dark)
```

### Advanced Usage

#### Badges
```jsx
// Brand badge
className={getThemeColor('badge.brand', isDark)}

// NVQ badge
className={colors.badge.nvq}

// Course type badges
className={colors.badge.fullTime} // or colors.badge.partTime
```

#### Buttons
```jsx
// Primary button with gradient
className={`${colors.button.primary.base} ${colors.button.primary.hover} ${colors.button.primary.shadow}`}

// Secondary button (theme-aware)
className={getThemeColor('button.secondary', isDark)}
```

#### Interactive States
```jsx
// Hover effects
className={colors.hover.text.brand} // hover:text-[#1aa79e]
className={getThemeColor('hover.background', isDark)}

// Focus rings
className={`${colors.focus.ring.brand} ${getThemeColor('focus.ring.offset', isDark)}`}
```

#### Special Effects
```jsx
// Glowing effects
className={colors.effects.glow.brand} // shadow-2xl shadow-[#1aa79e]/25

// Animated blobs
className={colors.effects.blob.primary}

// Star ratings
className={colors.star.filled} // text-yellow-400 fill-yellow-400
```

## Utility Functions

```typescript
// Quick access functions
getBrandGradient() // Returns: bg-gradient-to-r from-[#1aa79e] to-[#f38621]
getBrandText() // Returns: text-[#1aa79e]
getCardBackground(isDark) // Returns theme-appropriate card background
getTextPrimary(isDark) // Returns theme-appropriate primary text color
getTextSecondary(isDark) // Returns theme-appropriate secondary text color
getBorderPrimary(isDark) // Returns theme-appropriate border color
```

## Migration Strategy

### Before (hardcoded colors):
```jsx
className="bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white"
className={isDark ? 'text-white' : 'text-gray-900'}
```

### After (centralized colors):
```jsx
className={colors.brand.gradient.primary + ' text-white'}
className={getThemeColor('text.primary', isDark)}
```

## Benefits

1. **Consistency**: All components use the same color values
2. **Maintainability**: Change colors in one place
3. **Theme Support**: Automatic light/dark theme handling
4. **Type Safety**: TypeScript support for color paths
5. **Performance**: No runtime color calculations
6. **Scalability**: Easy to add new color variations

## Color Categories

- `colors.brand` - Primary NYSC brand colors
- `colors.background` - Background colors and gradients  
- `colors.text` - Text colors for all scenarios
- `colors.border` - Border colors and variations
- `colors.card` - Card and component backgrounds
- `colors.button` - Button color schemes
- `colors.badge` - Badge and tag colors
- `colors.hover` - Interactive hover states
- `colors.focus` - Focus ring colors
- `colors.effects` - Special visual effects
- `colors.star` - Rating star colors
- `colors.animated` - Legacy animated background colors