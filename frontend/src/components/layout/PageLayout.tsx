import { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { ChevronRight, Home } from 'lucide-react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const PageLayout = ({ children, title, subtitle, breadcrumbs }: PageLayoutProps) => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen pt-20">
      {/*Page Header */}
      {(title || breadcrumbs) && (
        <div className={`relative py-8 ${getThemeColor('card.glassy', isDark)} border-b ${getThemeColor('border.subtle', isDark)}`}>
          <div className="absolute inset-0 opacity-5">
            <div className={`absolute inset-0 ${colors.brand.gradient.primary}`}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="mt-2" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                      {index === 0 && (
                        <Home className={`w-4 h-4 mr-2 ${colors.brand.secondary.text}`} />
                      )}
                      {index > 0 && (
                        <ChevronRight className={`w-4 h-4 mx-2 ${getThemeColor('text.muted', isDark)}`} />
                      )}
                      {crumb.href ? (
                        <a
                          href={crumb.href}
                          className={`${getThemeColor('text.secondary', isDark)} ${colors.hover.text.brand} transition-all duration-300 hover:underline decoration-2 underline-offset-4`}
                        >
                          {crumb.label}
                        </a>
                      ) : (
                        <span className={`${colors.brand.primary.text} font-semibold px-3 py-1 rounded-full ${getThemeColor('badge.brand', isDark)}`}>
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Enhanced Page Title */}
            {title && (
              <div className="text-center">
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${colors.brand.gradient.text} leading-tight`}>
                  {title}
                </h1>
                {subtitle && (
                  <div className={`relative max-w-4xl mx-auto`}>
                    <p className={`text-sm md:text-base ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                      {subtitle}
                    </p>
                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 ${colors.brand.gradient.primary} rounded-full`}></div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-2 left-2 w-12 h-12 rounded-full opacity-10">
            <div className={`w-full h-full ${colors.brand.gradient.primary} rounded-full animate-pulse`}></div>
          </div>
          <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full opacity-10">
            <div className={`w-full h-full ${colors.brand.gradient.primaryReverse} rounded-full animate-pulse`}></div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="pb-8 pt-8 relative">
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;