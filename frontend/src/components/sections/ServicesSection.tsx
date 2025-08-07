import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ExternalLink, Users, Vote, Zap, Music, Theater, Trophy } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: any;
  stats: {
    members: number;
    programs: number;
    achievements: number;
  };
  features: string[];
}

const InteractiveServicesSection = () => {
  const { isDark } = useTheme();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const services: ServiceItem[] = [
    {
      id: 'youth-club',
      title: 'Youth Club',
      description: 'Join our vibrant youth communities across Sri Lanka. Connect, learn, and grow with like-minded young people in your area.',
      link: 'https://www.nysc.lk/page/view/youth-club',
      icon: Users,
      stats: { members: 15000, programs: 250, achievements: 180 },
      features: [
        'Community Building',
        'Leadership Training',
        'Social Activities',
        'Volunteer Opportunities',
        'Networking Events'
      ]
    },
    {
      id: 'youth-parliament',
      title: 'Youth Parliament',
      description: 'Participate in democratic processes and develop your political awareness through our youth parliament program.',
      link: 'https://www.nysc.lk/page/view/youth-parliment',
      icon: Vote,
      stats: { members: 500, programs: 12, achievements: 25 },
      features: [
        'Democratic Participation',
        'Public Speaking',
        'Policy Making',
        'Civic Education',
        'Leadership Skills'
      ]
    },
    {
      id: 'youth-dancing',
      title: 'Youth Dancing Team',
      description: 'Express yourself through traditional and modern dance forms. Join our talented dancing teams and showcase Sri Lankan culture.',
      link: 'https://www.nysc.lk/page/view/youth-dancing-team',
      icon: Zap,
      stats: { members: 2500, programs: 80, achievements: 120 },
      features: [
        'Traditional Dance',
        'Modern Choreography',
        'Cultural Performances',
        'Competition Training',
        'International Shows'
      ]
    },
    {
      id: 'youth-music',
      title: 'Youth Music Band',
      description: 'Discover your musical talents with our youth music bands. Learn instruments, compose, and perform across various genres.',
      link: 'https://www.nysc.lk/page/view/youth-music-band',
      icon: Music,
      stats: { members: 1800, programs: 60, achievements: 95 },
      features: [
        'Instrumental Training',
        'Vocal Development',
        'Music Composition',
        'Live Performances',
        'Recording Opportunities'
      ]
    },
    {
      id: 'youth-drama',
      title: 'Youth Drama Team',
      description: 'Explore the world of theater and dramatic arts. Develop acting skills and participate in meaningful productions.',
      link: 'https://www.nysc.lk/page/view/youth-drama-team',
      icon: Theater,
      stats: { members: 1200, programs: 40, achievements: 60 },
      features: [
        'Acting Workshops',
        'Script Writing',
        'Stage Production',
        'Character Development',
        'Theater Festivals'
      ]
    },
    {
      id: 'youth-sports',
      title: 'Youth Sports',
      description: 'Stay active and competitive with our comprehensive sports programs. From traditional games to modern athletics.',
      link: 'https://www.nysc.lk/page/view/sports',
      icon: Trophy,
      stats: { members: 8500, programs: 150, achievements: 300 },
      features: [
        'Athletic Training',
        'Team Sports',
        'Individual Competitions',
        'Fitness Programs',
        'International Tournaments'
      ]
    }
  ];

  // Initialize with the first service
  useEffect(() => {
    if (services.length > 0) {
      setSelectedService(services[0]);
    }
  }, []);

  const handleServiceClick = (service: ServiceItem) => {
    if (selectedService?.id === service.id) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedService(service);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      <section className={`relative py-12 overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #1aa79e 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #f38621 0%, transparent 50%)`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-3 ${
            isDark 
              ? 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20 text-[#1aa79e] border border-[#1aa79e]/30'
              : 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10 text-[#1aa79e] border border-[#1aa79e]/20'
          }`}>
            Interactive Services
          </span>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Discover Our Youth Programs
          </h2>
          <p className={`text-base mb-6 max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Click on any service tile to explore detailed information and opportunities
          </p>
        </div>

        {/* Mobile Tab Navigation */}
        <div className={`services-tabs ${
          isDark ? 'services-tabs--dark' : ''
        }`}>
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className={`services-tab ${
                selectedService?.id === service.id ? 'services-tab--active' : ''
              } ${
                isDark ? 'services-tab--dark' : ''
              }`}
            >
              {service.title.replace('Youth ', '')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side - Detail Display */}
          <div className="order-2 lg:order-1">
            <div className={`services-detail-panel ${
              isDark ? 'services-detail-panel--dark' : 'services-detail-panel--light'
            }`}>
              
              {/* Content Container */}
              <div className={`services-detail-content ${isAnimating ? 'services-detail-content--animating' : ''}`}>
                
                {selectedService && (
                  <div className="services-detail-layout">
                    
                    {/* Header Section - Fixed Height */}
                    <div className="services-header">
                      <div className="services-header__content">
                        <h3 className={`services-header__title ${
                          isDark ? 'services-header__title--dark' : 'services-header__title--light'
                        }`}>
                          {selectedService.title}
                        </h3>
                        <p className={`services-header__description ${
                          isDark ? 'services-header__description--dark' : 'services-header__description--light'
                        }`}>
                          {selectedService.description}
                        </p>
                      </div>
                      
                      {/* Service Icon - Fixed Size */}
                      <div className={`services-header__icon ${
                        isDark ? 'services-header__icon--dark' : 'services-header__icon--light'
                      }`}>
                        <selectedService.icon className="services-icon services-icon--large" />
                      </div>
                    </div>

                    {/* Stats Section - Fixed Height */}
                    <div className="services-stats">
                      <div className="services-stats__item">
                        <div className="services-stats__number services-stats__number--primary">
                          {selectedService.stats.members.toLocaleString()}+
                        </div>
                        <div className={`services-stats__label ${
                          isDark ? 'services-stats__label--dark' : 'services-stats__label--light'
                        }`}>
                          Members
                        </div>
                      </div>
                      <div className="services-stats__item">
                        <div className="services-stats__number services-stats__number--secondary">
                          {selectedService.stats.programs}+
                        </div>
                        <div className={`services-stats__label ${
                          isDark ? 'services-stats__label--dark' : 'services-stats__label--light'
                        }`}>
                          Programs
                        </div>
                      </div>
                      <div className="services-stats__item">
                        <div className="services-stats__number services-stats__number--primary">
                          {selectedService.stats.achievements}+
                        </div>
                        <div className={`services-stats__label ${
                          isDark ? 'services-stats__label--dark' : 'services-stats__label--light'
                        }`}>
                          Awards
                        </div>
                      </div>
                    </div>

                    {/* Features Section - Flexible Height */}
                    <div className="services-features">
                      <h4 className={`services-features__title ${
                        isDark ? 'services-features__title--dark' : 'services-features__title--light'
                      }`}>
                        Key Features
                      </h4>
                      <div className="services-features__list">
                        {selectedService.features.map((feature, index) => (
                          <span
                            key={index}
                            className={`services-feature-tag ${
                              isDark ? 'services-feature-tag--dark' : 'services-feature-tag--light'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Button Section - Fixed Height */}
                    <div className="services-actions">
                      <div className="services-actions__buttons">
                        <a 
                          href={selectedService.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`services-button services-button--primary ${
                            isDark ? 'services-button--primary-dark' : 'services-button--primary-light'
                          }`}
                        >
                          <span className="services-button__text">Learn More</span>
                          <ExternalLink className="services-button__icon" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Service Grid */}
          <div className="order-1 lg:order-2">
            <div className="services-grid">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const isSelected = selectedService?.id === service.id;
                
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className={`services-tile ${
                      isSelected ? 'services-tile--selected' : ''
                    } ${
                      isDark ? 'services-tile--dark' : 'services-tile--light'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Icon Section - Fixed Height */}
                    <div className="services-tile__icon-container">
                      <div className={`services-tile__icon ${
                        isSelected 
                          ? 'services-tile__icon--selected' 
                          : isDark
                            ? 'services-tile__icon--dark'
                            : 'services-tile__icon--light'
                      }`}>
                        <IconComponent className="services-icon services-icon--medium" />
                      </div>
                    </div>
                    
                    {/* Content Section - Fixed Height */}
                    <div className="services-tile__content">
                      <h3 className={`services-tile__title ${
                        isSelected
                          ? 'services-tile__title--selected'
                          : isDark 
                            ? 'services-tile__title--dark' 
                            : 'services-tile__title--light'
                      }`}>
                        {service.title}
                      </h3>
                      
                      {/* Member count */}
                      <div className={`services-tile__meta ${
                        isDark ? 'services-tile__meta--dark' : 'services-tile__meta--light'
                      }`}>
                        {service.stats.members.toLocaleString()}+ members
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className={`services-tile__indicator ${
                      isSelected ? 'services-tile__indicator--active' : ''
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Modular CSS Styles */}
      <style jsx>{`
        /* Base Layout Classes */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 12px;
          height: 500px;
          padding: 4px;
          align-items: stretch;
          justify-items: stretch;
        }

        /* Detail Panel */
        .services-detail-panel {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.5s ease;
          backdrop-filter: blur(8px);
          border-width: 1px;
          height: 500px;
        }

        .services-detail-panel--light {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(229, 231, 235, 0.5);
        }

        .services-detail-panel--dark {
          background: rgba(31, 41, 55, 0.5);
          border-color: rgba(75, 85, 99, 0.5);
        }

        .services-detail-content {
          padding: 1.5rem;
          height: 100%;
          transition: all 0.3s ease;
        }

        .services-detail-content--animating {
          opacity: 0;
          transform: scale(0.95);
        }

        .services-detail-layout {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 1.25rem;
        }

        /* Header Section */
        .services-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          min-height: 120px;
          padding-bottom: 0.5rem;
        }

        .services-header__content {
          flex: 1;
          padding-right: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100px;
        }

        .services-header__title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.25;
          letter-spacing: -0.025em;
        }

        .services-header__title--light {
          color: #111827;
        }

        .services-header__title--dark {
          color: #ffffff;
        }

        .services-header__description {
          font-size: 0.9375rem;
          line-height: 1.55;
          margin: 0;
          color: inherit;
        }

        .services-header__description--light {
          color: #6b7280;
        }

        .services-header__description--dark {
          color: #d1d5db;
        }

        .services-header__icon {
          width: 84px;
          height: 84px;
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
          border-width: 1px;
          flex-shrink: 0;
          align-self: center;
        }

        .services-header__icon--light {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(229, 231, 235, 0.5);
        }

        .services-header__icon--dark {
          background: rgba(17, 24, 39, 0.5);
          border-color: rgba(75, 85, 99, 0.5);
        }

        /* Stats Section */
        .services-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          height: 70px;
          padding: 0.75rem 0;
        }

        .services-stats__item {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .services-stats__item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -0.625rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 24px;
          background: linear-gradient(to bottom, transparent, rgba(156, 163, 175, 0.4), transparent);
        }

        .services-stats__number {
          font-size: 1.375rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.375rem;
          letter-spacing: -0.025em;
        }

        .services-stats__number--primary {
          color: #1aa79e;
        }

        .services-stats__number--secondary {
          color: #f38621;
        }

        .services-stats__label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .services-stats__label--light {
          color: #6b7280;
        }

        .services-stats__label--dark {
          color: #9ca3af;
        }

        /* Features Section */
        .services-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0;
        }

        .services-features__title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }

        .services-features__title--light {
          color: #111827;
        }

        .services-features__title--dark {
          color: #ffffff;
        }

        .services-features__list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
          align-items: flex-start;
        }

        .services-feature-tag {
          padding: 0.375rem 0.875rem;
          border-radius: 1.25rem;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: -0.0125em;
          line-height: 1;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .services-feature-tag--light {
          background: rgba(243, 244, 246, 0.8);
          color: #374151;
          border-color: rgba(229, 231, 235, 0.6);
        }

        .services-feature-tag--light:hover {
          background: rgba(229, 231, 235, 0.9);
          border-color: rgba(209, 213, 219, 0.8);
        }

        .services-feature-tag--dark {
          background: rgba(55, 65, 81, 0.8);
          color: #d1d5db;
          border-color: rgba(75, 85, 99, 0.6);
        }

        .services-feature-tag--dark:hover {
          background: rgba(75, 85, 99, 0.9);
          border-color: rgba(107, 114, 128, 0.8);
        }

        /* Actions Section */
        .services-actions {
          margin-top: auto;
          height: 80px;
          display: flex;
          align-items: center;
          padding-top: 1rem;
        }

        .services-actions__buttons {
          display: flex;
          gap: 0.75rem;
          width: 100%;
        }

        .services-button {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: -0.0125em;
          transition: all 0.3s ease;
          position: relative;
          min-height: 48px;
          border: none;
          cursor: pointer;
        }

        .services-button--primary {
          background: linear-gradient(to right, #1aa79e, #f38621);
          color: white;
        }

        .services-button--secondary {
          background: transparent;
          border: 1px solid #1aa79e;
          color: #1aa79e;
        }

        .services-button--secondary-light {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid #1aa79e;
          color: #1aa79e;
        }

        .services-button--secondary-dark {
          background: rgba(31, 41, 55, 0.9);
          border: 2px solid #1aa79e;
          color: #1aa79e;
        }

        .services-button--secondary:hover {
          background: #1aa79e;
          color: white;
          transform: translateY(-1px);
          border-color: #1aa79e;
        }

        .services-button--primary:hover {
          background: linear-gradient(to right, #148f88, #d1701a);
          color: white;
          transform: translateY(-1px);
        }

        .services-button__text {
          margin-right: 0.625rem;
        }

        .services-button__icon {
          width: 1.125rem;
          height: 1.125rem;
          transition: transform 0.2s ease;
        }

        .services-button:hover .services-button__icon {
          transform: translateX(2px);
        }

        /* Service Tiles */
        .services-tile {
          position: relative;
          cursor: pointer;
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.5s ease;
          backdrop-filter: blur(8px);
          border-width: 1px;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          align-self: stretch;
          justify-self: stretch;
        }

        .services-tile--light {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(229, 231, 235, 0.5);
        }

        .services-tile--dark {
          background: rgba(31, 41, 55, 0.8);
          border-color: rgba(75, 85, 99, 0.5);
        }

        .services-tile:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .services-tile--selected {
          border-color: #1aa79e;
          border-width: 2px;
          box-shadow: 0 25px 50px -12px rgba(26, 167, 158, 0.25);
        }

        .services-tile__icon-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0.75rem 0.5rem 0.75rem;
          min-height: 70px;
        }

        .services-tile__icon {
          width: 48px;
          height: 48px;
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .services-tile__icon--light {
          background: #f3f4f6;
          color: #1aa79e;
        }

        .services-tile__icon--dark {
          background: rgba(75, 85, 99, 0.5);
          color: #1aa79e;
        }

        .services-tile__icon--selected {
          background: #1aa79e;
          color: white;
        }

        .services-tile:hover .services-tile__icon--light {
          background: #1aa79e;
          color: white;
        }

        .services-tile:hover .services-tile__icon--dark {
          background: #1aa79e;
          color: white;
        }

        .services-tile__content {
          padding: 0.5rem 0.75rem 1rem 0.75rem;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 60px;
        }

        .services-tile__title {
          font-weight: 700;
          font-size: 0.8125rem;
          line-height: 1.1;
          margin-bottom: 0.375rem;
          transition: color 0.3s ease;
          letter-spacing: -0.025em;
        }

        .services-tile__title--light {
          color: #111827;
        }

        .services-tile__title--dark {
          color: #ffffff;
        }

        .services-tile__title--selected,
        .services-tile:hover .services-tile__title {
          color: #1aa79e;
        }

        .services-tile__meta {
          font-size: 0.6875rem;
          transition: color 0.3s ease;
          font-weight: 500;
        }

        .services-tile__meta--light {
          color: #6b7280;
        }

        .services-tile__meta--dark {
          color: #9ca3af;
        }

        .services-tile__indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, #1aa79e, #f38621);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .services-tile__indicator--active {
          opacity: 1;
        }

        /* Icon Sizes */
        .services-icon {
          transition: all 0.3s ease;
        }

        .services-icon--large {
          width: 2.5rem;
          height: 2.5rem;
          color: #1aa79e;
        }

        .services-icon--medium {
          width: 1.5rem;
          height: 1.5rem;
        }

        /* Enhanced Visual Effects */
        .services-detail-panel::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(26, 167, 158, 0.03), transparent);
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          50% { transform: translateX(0%) translateY(0%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .services-tile::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(26, 167, 158, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .services-tile:hover::after {
          left: 100%;
        }

        /* Mobile Tab Style */
        .services-tabs {
          display: none;
        }

        .services-tab {
          flex: 1;
          padding: 0.75rem 0.5rem;
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          color: #6b7280;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          line-height: 1.2;
        }

        .services-tab--active {
          color: #1aa79e;
          border-bottom-color: #1aa79e;
          background: rgba(26, 167, 158, 0.05);
        }

        .services-tab:hover:not(.services-tab--active) {
          color: #374151;
          background: rgba(0, 0, 0, 0.02);
        }

        .services-tab--dark {
          color: #9ca3af;
        }

        .services-tab--dark:hover:not(.services-tab--active) {
          color: #d1d5db;
          background: rgba(255, 255, 255, 0.05);
        }

        .services-tab--active.services-tab--dark {
          color: #1aa79e;
          background: rgba(26, 167, 158, 0.1);
        }

        /* Enhanced Shadows and Depth */
        .services-detail-panel {
          box-shadow: 
            0 10px 25px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .services-tile {
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.06),
            0 1px 4px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .services-tile:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.08),
            0 4px 10px rgba(0, 0, 0, 0.06),
            0 0 0 1px rgba(26, 167, 158, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .services-button {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Enhanced Glassmorphism */
        .services-detail-panel--light {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px) saturate(180%);
        }

        .services-detail-panel--dark {
          background: rgba(17, 24, 39, 0.7);
          border: 1px solid rgba(75, 85, 99, 0.8);
          backdrop-filter: blur(20px) saturate(150%);
        }

        .services-tile--light {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px) saturate(180%);
        }

        .services-tile--dark {
          background: rgba(31, 41, 55, 0.8);
          border: 1px solid rgba(75, 85, 99, 0.9);
          backdrop-filter: blur(16px) saturate(150%);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .services-grid {
            height: auto;
            gap: 12px;
            padding: 16px;
          }
          
          .services-detail-panel {
            height: auto;
            min-height: 520px;
          }
          
          .services-header {
            flex-direction: column;
            text-align: center;
            min-height: auto;
          }
          
          .services-header__content {
            padding-right: 0;
            margin-bottom: 1rem;
          }
          
          .services-header__icon {
            align-self: center;
          }

          .services-stats {
            gap: 0.5rem;
          }

          .services-stats__number {
            font-size: 1.125rem;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            display: none;
          }
          
          .services-tabs {
            display: flex;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 4px;
            margin-bottom: 1.5rem;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .services-tabs::-webkit-scrollbar {
            display: none;
          }

          .services-tabs--dark {
            background: rgba(31, 41, 55, 0.5);
          }
          
          .services-detail-panel {
            height: auto;
            min-height: 550px;
          }
          
          .services-header {
            min-height: 140px;
          }

          .services-header__title {
            font-size: 1.375rem;
          }

          .services-header__description {
            font-size: 0.875rem;
          }

          .services-header__icon {
            width: 72px;
            height: 72px;
          }

          .services-icon--large {
            width: 2.25rem;
            height: 2.25rem;
          }
          
          .services-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            height: 70px;
          }

          .services-stats__number {
            font-size: 1rem;
          }

          .services-stats__label {
            font-size: 0.6875rem;
          }
          
          .services-features__list {
            justify-content: center;
          }

          .services-features__title {
            text-align: center;
            font-size: 0.9375rem;
          }

          .services-feature-tag {
            font-size: 0.6875rem;
            padding: 0.1875rem 0.625rem;
          }

          .services-actions {
            height: 70px;
          }

          .services-button {
            padding: 1rem 1.5rem;
            font-size: 0.9375rem;
          }
        }

        @media (max-width: 640px) {
          .services-tab {
            font-size: 0.8125rem;
            padding: 0.625rem 0.375rem;
            min-width: 80px;
          }

          .services-stats {
            gap: 0.5rem;
          }

          .services-stats__number {
            font-size: 0.9375rem;
          }

          .services-feature-tag {
            font-size: 0.625rem;
          }
        }
      `}</style>
    </>
  );
};

export default InteractiveServicesSection;