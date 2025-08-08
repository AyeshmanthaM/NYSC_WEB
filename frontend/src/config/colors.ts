// Centralized color configuration for NYSC application
export const colors = {
  // Raw color values (HEX)
  raw: {
    nysc: {
      primary: '#1aa79e',    // Teal
      secondary: '#f38621',  // Orange
      primaryHover: '#148a82',
      secondaryHover: '#e67411'
    },
    animated: {
      burgundy: '#932e40',
      navy: '#141b2a',
      burgundyAlt: '#ad1631ff'
    },
    star: '#fbbf24', // yellow-400
    status: {
      success: '#22c55e', // green-500
      warning: '#f59e0b', // amber-500
      error: '#ef4444',   // red-500
      info: '#3b82f6'     // blue-500
    }
  },

  // Brand colors - primary NYSC colors
  brand: {
    primary: {
      base: '#1aa79e',
      text: 'text-[#1aa79e]',
      bg: 'bg-[#1aa79e]',
      border: 'border-[#1aa79e]'
    },
    secondary: {
      base: '#f38621', 
      text: 'text-[#f38621]',
      bg: 'bg-[#f38621]',
      border: 'border-[#f38621]'
    },
    gradient: {
      primary: 'bg-gradient-to-r from-[#1aa79e] to-[#f38621]',
      primaryReverse: 'bg-gradient-to-r from-[#f38621] to-[#1aa79e]',
      text: 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent',
      hover: 'hover:bg-gradient-to-r hover:from-[#148a82] hover:to-[#e67411]'
    }
  },

  // Background colors
  background: {
    primary: {
      light: 'bg-gray-50',
      dark: 'bg-gray-900'
    },
    secondary: {
      light: 'bg-white',
      dark: 'bg-gray-800'
    },
    tertiary: {
      light: 'bg-gray-100',
      dark: 'bg-gray-700'
    },
    // Complex gradients
    gradient: {
      light: 'bg-gradient-to-br from-gray-50 to-blue-50',
      dark: 'bg-gradient-to-br from-gray-900 to-gray-800',
      subtle: {
        light: 'bg-gray-50/80',
        dark: 'bg-gray-900/60'
      },
      brand: {
        light: 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10',
        dark: 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20'
      }
    }
  },

  // Text colors
  text: {
    primary: {
      light: 'text-gray-900',
      dark: 'text-white'
    },
    secondary: {
      light: 'text-gray-600', 
      dark: 'text-gray-300'
    },
    muted: {
      light: 'text-gray-500',
      dark: 'text-gray-400'
    },
    inverse: {
      light: 'text-white',
      dark: 'text-gray-900'
    },
    brand: {
      primary: 'text-[#1aa79e]',
      secondary: 'text-[#f38621]',
      gradient: 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent'
    }
  },

  // Border colors
  border: {
    primary: {
      light: 'border-gray-200',
      dark: 'border-gray-700'
    },
    secondary: {
      light: 'border-gray-300',
      dark: 'border-gray-600'
    },
    subtle: {
      light: 'border-gray-200/50',
      dark: 'border-gray-700/50'
    },
    brand: {
      primary: 'border-[#1aa79e]',
      secondary: 'border-[#f38621]',
      subtle: {
        light: 'border-[#1aa79e]/20',
        dark: 'border-[#1aa79e]/30'
      }
    }
  },

  // Card and component backgrounds
  card: {
    primary: {
      light: 'bg-white/90',
      dark: 'bg-gray-800/80'
    },
    secondary: {
      light: 'bg-white/80',
      dark: 'bg-gray-900/90'
    },
    glassy: {
      light: 'bg-white/90 backdrop-blur-sm',
      dark: 'bg-gray-800/80 backdrop-blur-sm'
    }
  },

  // Interactive states
  hover: {
    background: {
      light: 'hover:bg-gray-100',
      dark: 'hover:bg-gray-700'
    },
    text: {
      brand: 'hover:text-[#1aa79e]',
      primary: {
        light: 'hover:text-gray-700',
        dark: 'hover:text-gray-200'
      }
    },
    shadow: {
      brand: 'hover:shadow-[#1aa79e]/25',
      subtle: {
        light: 'hover:shadow-lg',
        dark: 'hover:shadow-xl'
      }
    }
  },

  // Focus states
  focus: {
    ring: {
      brand: 'focus:ring-[#1aa79e]/50',
      offset: {
        light: 'focus:ring-offset-white',
        dark: 'focus:ring-offset-gray-900'
      }
    }
  },

  // Button styles
  button: {
    primary: {
      base: 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white',
      hover: 'hover:from-[#148a82] hover:to-[#e67411]',
      shadow: 'shadow-lg hover:shadow-[#1aa79e]/25'
    },
    secondary: {
      light: 'bg-white/90 text-gray-700 border border-gray-200 hover:bg-gray-50',
      dark: 'bg-gray-800/90 text-white border border-gray-600 hover:bg-gray-700'
    },
    ghost: {
      light: 'text-gray-700 hover:bg-gray-100',
      dark: 'text-gray-300 hover:bg-gray-700'
    },
    outline: {
      brand: 'border-[#1aa79e] text-[#1aa79e] hover:bg-[#1aa79e] hover:text-white'
    }
  },

  // Badge colors
  badge: {
    brand: {
      light: 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10 text-[#1aa79e] border border-[#1aa79e]/20',
      dark: 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20 text-[#1aa79e] border border-[#1aa79e]/30'
    },
    nvq: 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white',
    fullTime: 'bg-green-100 text-green-700 border border-green-200',
    partTime: 'bg-blue-100 text-blue-700 border border-blue-200',
    category: {
      light: 'bg-white/90 text-[#1aa79e] border border-[#1aa79e]/20',
      dark: 'bg-gray-900/80 text-[#1aa79e] border border-[#1aa79e]/20'
    }
  },

  // Star ratings
  star: {
    filled: 'text-yellow-400 fill-yellow-400',
    empty: 'text-gray-300 fill-none'
  },

  // Special effects and animations
  effects: {
    glow: {
      brand: 'shadow-2xl shadow-[#1aa79e]/25',
      subtle: {
        light: 'shadow-lg shadow-black/5',
        dark: 'shadow-xl shadow-black/25'
      }
    },
    blob: {
      primary: 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20',
      secondary: 'bg-gradient-to-r from-[#f38621]/20 to-[#1aa79e]/20'
    },
    shimmer: 'bg-gradient-to-r from-transparent via-[#1aa79e]/10 to-transparent',
    pulse: 'animate-pulse opacity-75'
  },

  // Legacy animated background system (for HeroParticleMesh)
  animated: {
    burgundy: '#932e40',
    navy: '#141b2a',
    burgundyAlt: '#ad1631ff',
    particles: {
      burgundy: '#932e40',
      navy: '#141b2a'
    },
    backgroundGradient: {
      light: 'bg-gradient-to-br from-blue-50 via-white to-orange-50',
      dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    },
    topGradient: {
      light: 'linear-gradient(180deg, rgba(147, 46, 64, 0.2) 0%, rgba(147, 46, 64, 0.04) 30%, rgba(147, 46, 64, 0.24) 70%, transparent 100%)',
      dark: 'linear-gradient(180deg, rgba(147, 46, 64, 0.25) 0%, rgba(130, 36, 54, 0.21) 30%, rgba(147, 46, 64, 0.16) 70%, transparent 100%)'
    },
    mesh: {
      light: 'rgba(20, 27, 42, 0.04)',
      dark: 'rgba(147, 46, 64, 0.08)'
    },
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
    wave: {
      primary: '#932e40',
      secondary: '#141b2a',
      tertiary: '#ad1631ff'
    },
    geometric: {
      light: 'border-burgundy/5',
      dark: 'border-white/5'
    },
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
    noise: {
      light: 'opacity-10',
      dark: 'opacity-20'
    }
  }
};

// Legacy support - keep the old structure for existing code
export const colorConfig = colors;

// Helper function to get theme-based color
export const getThemeColor = (colorPath: string, isDark: boolean): string => {
  const keys = colorPath.split('.');
  let color: any = colors;
  
  for (const key of keys) {
    color = color[key];
    if (!color) return '';
  }
  
  if (typeof color === 'object' && color !== null && 'light' in color && 'dark' in color) {
    return isDark ? color.dark : color.light;
  }
  
  return typeof color === 'string' ? color : '';
};

// Utility functions for common color operations
export const getBrandGradient = () => colors.brand.gradient.primary;
export const getBrandText = () => colors.text.brand.primary;
export const getCardBackground = (isDark: boolean) => getThemeColor('card.primary', isDark);
export const getTextPrimary = (isDark: boolean) => getThemeColor('text.primary', isDark);
export const getTextSecondary = (isDark: boolean) => getThemeColor('text.secondary', isDark);
export const getBorderPrimary = (isDark: boolean) => getThemeColor('border.primary', isDark);