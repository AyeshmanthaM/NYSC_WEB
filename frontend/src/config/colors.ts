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
  
  // NYSC animated background colors
  animated: {
    // Core colors
    burgundy: '#932e40',
    navy: '#141b2a',
    burgundyAlt: '#ad1631ff',
    
    // Particle system colors
    particles: {
      burgundy: '#932e40',
      navy: '#141b2a'
    },
    
    // Background gradients
    backgroundGradient: {
      light: 'bg-gradient-to-br from-blue-50 via-white to-orange-50',
      dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    },
    
    // Top gradient overlay
    topGradient: {
      light: 'linear-gradient(180deg, rgba(147, 46, 64, 0.2) 0%, rgba(147, 46, 64, 0.04) 30%, rgba(147, 46, 64, 0.24) 70%, transparent 100%)',
      dark: 'linear-gradient(180deg, rgba(147, 46, 64, 0.25) 0%, rgba(130, 36, 54, 0.21) 30%, rgba(147, 46, 64, 0.16) 70%, transparent 100%)'
    },
    
    // Mesh pattern colors
    mesh: {
      light: 'rgba(20, 27, 42, 0.04)',
      dark: 'rgba(147, 46, 64, 0.08)'
    },
    
    // Animated orbs
    orbs: {
      burgundy: {
        gradient: 'radial-gradient(circle, #932e40 0%, transparent 70%)',
        opacity: {
          light: { primary: 'opacity-10', secondary: 'opacity-5' },
          dark: { primary: 'opacity-30', secondary: 'opacity-20' }
        }
      },
      navy: {
        gradient: 'radial-gradient(circle, #141b2a 0%, transparent 70%)',
        opacity: {
          light: 'opacity-8',
          dark: 'opacity-25'
        }
      }
    },
    
    // Wave patterns
    wave: {
      primary: '#932e40',
      secondary: '#141b2a',
      tertiary: '#ad1631ff'
    },
    
    // Geometric patterns
    geometric: {
      light: 'border-burgundy/5',
      dark: 'border-white/5'
    },
    
    // Canvas opacity
    canvas: {
      mesh: {
        light: 'opacity-40',
        dark: 'opacity-60'
      },
      particles: {
        light: 'opacity-50',
        dark: 'opacity-70'
      }
    },
    
    // Noise overlay
    noise: {
      light: 'opacity-10',
      dark: 'opacity-20'
    }
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