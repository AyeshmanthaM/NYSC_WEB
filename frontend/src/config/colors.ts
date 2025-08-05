// Centralized color configuration for NYSC application
export const colorConfig = {
  // Base background gradients
  background: {
    light: 'bg-gradient-to-br from-gray-50 to-blue-50',
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800'
  },
  
  // Section backgrounds
  section: {
    light: 'bg-gradient-to-br from-gray-50 to-blue-50',
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800'
  },
  
  // Primary brand colors
  brand: {
    primary: 'from-[#1aa79e] to-[#f38621]',
    primaryHover: 'from-[#148a82] to-[#e67411]',
    logo: 'from-[#1aa79e] to-[#f38621]'
  },
  
  // Text colors
  text: {
    primary: {
      light: 'text-gray-800',
      dark: 'text-white'
    },
    secondary: {
      light: 'text-gray-600',
      dark: 'text-gray-300'
    },
    muted: {
      light: 'text-gray-500',
      dark: 'text-gray-400'
    }
  },
  
  // Card backgrounds
  card: {
    light: 'bg-white',
    dark: 'bg-gray-800'
  },
  
  // Border colors
  border: {
    light: 'border-gray-200',
    dark: 'border-gray-700'
  },
  
  // Hover states
  hover: {
    light: 'hover:bg-gray-100',
    dark: 'hover:bg-gray-700'
  }
};

// Helper function to get theme-based color
export const getThemeColor = (colorPath: string, isDark: boolean): string => {
  const keys = colorPath.split('.');
  let color = colorConfig as any;
  
  for (const key of keys) {
    color = color[key];
  }
  
  if (typeof color === 'object' && color.light && color.dark) {
    return isDark ? color.dark : color.light;
  }
  
  return color;
};