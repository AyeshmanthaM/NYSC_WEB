import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, MapPin, Building } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor } from '../config/colors';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const stats = [
    { icon: Users, value: 25000, suffix: '+', label: 'Youth Members', color: 'from-blue-500 to-blue-600' },
    { icon: Award, value: 350, suffix: '+', label: 'Programs', color: 'from-green-500 to-green-600' },
    { icon: Building, value: 250, suffix: '+', label: 'Training Centers', color: 'from-orange-500 to-orange-600' },
    { icon: MapPin, value: 50, suffix: '+', label: 'Districts', color: 'from-purple-500 to-purple-600' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const end = value;

      const timer = setInterval(() => {
        start += Math.ceil(end / (duration / 16));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            Our Impact in Numbers
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${getThemeColor('text.secondary', isDark)}`}>
            Transforming lives and building communities across Sri Lanka through youth empowerment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${getThemeColor('card', isDark)} ${getThemeColor('hover', isDark)}`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Stats */}
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              <p className={`font-medium ${getThemeColor('text.secondary', isDark)}`}>{stat.label}</p>

              {/* Decorative Element */}
              <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-full`} />
            </div>
          ))}
        </div>

        {/* Achievement Banner */}
        <div className={`mt-16 rounded-2xl p-8 text-center bg-gradient-to-r ${getThemeColor('brand.primary', isDark)} text-white`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Empowering Youth Since 1972
          </h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            For over 50 years, NYSC has been the cornerstone of youth development in Sri Lanka, 
            creating opportunities, building leaders, and fostering positive change in communities nationwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;