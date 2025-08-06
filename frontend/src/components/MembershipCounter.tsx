import React, { useEffect, useState } from 'react';
import { Users, Building, MapPin, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const MembershipCounter = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('membership-counter');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const counters = [
    {
      id: 1,
      label: 'Active Members',
      value: 50000,
      suffix: '+',
      icon: Users,
      color: 'from-[#1aa79e] to-[#16857d]'
    },
    {
      id: 2,
      label: 'Youth Clubs',
      value: 200,
      suffix: '+',
      icon: Building,
      color: 'from-[#f38621] to-[#e06b0a]'
    },
    {
      id: 3,
      label: 'Districts Covered',
      value: 25,
      suffix: '',
      icon: MapPin,
      color: 'from-[#1aa79e] to-[#16857d]'
    },
    {
      id: 4,
      label: 'Awards Given',
      value: 1500,
      suffix: '+',
      icon: Award,
      color: 'from-[#f38621] to-[#e06b0a]'
    }
  ];

  const CounterAnimation = ({ end, suffix }: { end: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;
      
      const duration = 2000;
      const steps = 50;
      const stepDuration = duration / steps;
      const increment = end / steps;
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, [isVisible, end]);

    return (
      <span className="text-4xl font-bold">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section 
      id="membership-counter"
      className={`py-16 relative overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-orange-50'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Impact in Numbers
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Empowering Sri Lankan youth through comprehensive programs and initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter) => {
            const IconComponent = counter.icon;
            return (
              <div
                key={counter.id}
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark ? 'bg-gray-900/50' : 'bg-white/80'
                } backdrop-blur-sm border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${counter.color} 
                  p-4 transition-transform duration-300 hover:rotate-12`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>
                
                <div className={`bg-gradient-to-r ${counter.color} bg-clip-text text-transparent`}>
                  <CounterAnimation end={counter.value} suffix={counter.suffix} />
                </div>
                
                <p className={`mt-2 text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {counter.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipCounter;