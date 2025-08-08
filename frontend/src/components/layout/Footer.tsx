import { 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Send,
  Bell
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import { colors, getThemeColor } from '../../config/colors';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  
  const quickLinks = [
    { key: 'links.aboutNYSC', label: t('links.aboutNYSC') },
    { key: 'links.programs', label: t('links.programs') },
    { key: 'links.youthClubs', label: t('links.youthClubs') },
    { key: 'links.downloads', label: t('links.downloads') },
    { key: 'links.annualReports', label: t('links.annualReports') },
    { key: 'links.contactUs', label: t('links.contactUs') }
  ];

  const programs = [
    { key: 'programsList.sportsExcellence', label: t('programsList.sportsExcellence') },
    { key: 'programsList.culturalActivities', label: t('programsList.culturalActivities') },
    { key: 'programsList.leadershipTraining', label: t('programsList.leadershipTraining') },
    { key: 'programsList.communityService', label: t('programsList.communityService') },
    { key: 'programsList.skillDevelopment', label: t('programsList.skillDevelopment') },
    { key: 'programsList.youthAwards', label: t('programsList.youthAwards') }
  ];

  return (
    <footer className={`relative overflow-hidden w-full max-w-full ${getThemeColor('background.gradient.subtle', isDark)}`}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231aa79e' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='53' cy='7' r='2'/%3E%3Ccircle cx='7' cy='53' r='2'/%3E%3Ccircle cx='53' cy='53' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 pt-10 pb-2 relative z-10">
        
        {/* Newsletter Subscription Section */}
        <div className={`rounded-3xl p-6 mb-6 ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} backdrop-blur-sm shadow-xl`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`p-4 rounded-2xl ${getThemeColor('background.gradient.brand', isDark)} mr-4`}>
                <Bell className={`w-8 h-8 ${colors.brand.primary.text}`} />
              </div>
              <div className="text-left">
                <h3 className={`text-2xl font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {t('footer.newsletterTitle')}
                </h3>
                <p className={`text-lg ${getThemeColor('text.secondary', isDark)}`}>
                  {t('footer.newsletterDescription')}
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className={`flex-1 px-6 py-4 rounded-2xl border ${getThemeColor('input.primary', isDark)} focus:outline-none focus:ring-2 ${colors.focus.ring.brand} focus:border-transparent transition-all duration-300`}
                required
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                  isSubscribed
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : `${colors.button.primary.base} ${colors.button.primary.shadow}`
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>{t('footer.subscribedMessage')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('footer.subscribeButton')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-4">
          {/* Company Info */}
          <div className="lg:pr-8">
            <div className="flex items-center space-x-4 ">
              <div className="w-32 h-24 flex items-center justify-center">
                <img 
                  src="/assets/svg/profile_NYSC.svg" 
                  alt="National Youth Services Council Logo"
                  className="w-full h-full object-contain filter drop-shadow-lg"
                />
              </div>
            </div>
            
            <p className={`mb-2 leading-relaxed text-lg font-semibold ${colors.brand.gradient.text}`}>
              {t('footer.empoweringYouth')}
            </p>
            
            <p className={`text-sm mb-4 leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
              {t('footer.organizationDescription')}
            </p>
            
            {/* Social Media with Monochrome Design */}
            <div className="flex space-x-4">
              {[
                { 
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  ), 
                  label: 'Twitter',
                  href: '#'
                },
                { 
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  ), 
                  label: 'Facebook',
                  href: '#'
                },
                { 
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.12.112.225.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  ), 
                  label: 'Instagram',
                  href: '#'
                },
                { 
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ), 
                  label: 'YouTube',
                  href: '#'
                }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg ${getThemeColor('button.secondary', isDark)} hover:${colors.brand.primary.bg} hover:text-white border ${getThemeColor('border.subtle', isDark)} hover:${colors.border.brand.subtle} shadow-md`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`${getThemeColor('text.secondary', isDark)} ${colors.hover.text.brand} transition-colors duration-300 flex items-center space-x-2 group`}
                  >
                    <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 ${colors.brand.primary.text}`} />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>{t('footer.programs')}</h3>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`${getThemeColor('text.secondary', isDark)} hover:${colors.brand.secondary.text} transition-colors duration-300 flex items-center space-x-2 group`}
                  >
                    <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 ${colors.brand.secondary.text}`} />
                    <span>{program.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>{t('footer.contact')}</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${getThemeColor('card.secondary', isDark)} border ${getThemeColor('border.subtle', isDark)}`}>
                  <Mail className={`w-5 h-5 ${getThemeColor('text.muted', isDark)}`} />
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>
                    info@nysc.lk
                  </p>
                  <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    {t('footer.generalInquiries')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${getThemeColor('card.secondary', isDark)} border ${getThemeColor('border.subtle', isDark)}`}>
                  <Phone className={`w-5 h-5 ${getThemeColor('text.muted', isDark)}`} />
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>
                    +94 11 234 5678
                  </p>
                  <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    {t('footer.officeHours')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${getThemeColor('card.secondary', isDark)} border ${getThemeColor('border.subtle', isDark)}`}>
                  <MapPin className={`w-5 h-5 ${getThemeColor('text.muted', isDark)}`} />
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>
                    {t('footer.organizationAddress')}
                  </p>
                  <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    {t('footer.location')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className={`border-t ${getThemeColor('border.subtle', isDark)} pt-4 flex flex-col lg:flex-row justify-between items-center gap-8`}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
              © {currentYear} {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-2">
              <span className={`text-xs ${getThemeColor('text.muted', isDark)}`}>{t('footer.madeWith')}</span>
              <span className="text-red-500 animate-pulse">♥</span>
              <span className={`text-xs ${getThemeColor('text.muted', isDark)}`}>{t('footer.forYouth')}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { label: t('footer.privacyPolicy'), href: '#' },
              { label: t('footer.termsOfService'), href: '#' },
              { label: t('footer.accessibility'), href: '#' },
              { label: t('footer.sitemap'), href: '#' }
            ].map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className={`text-sm ${getThemeColor('text.muted', isDark)} ${colors.hover.text.brand} transition-colors duration-300 relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${colors.brand.gradient.primary} transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;