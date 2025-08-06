import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className={`py-20 relative overflow-hidden w-full max-w-full bg-gradient-to-br ${getThemeColor('brand.primary', isDark)}/30`}>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float" />
        <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white rounded-full animate-float" />
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-white rounded-full animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            <span>Stay Connected</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Never Miss an Update
          </h2>
          
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of young Sri Lankans receiving the latest news, events, 
            and opportunities directly in their inbox
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 text-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 dark:bg-gray-800/50 dark:placeholder-gray-400 dark:border-gray-600"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto mb-8 bg-green-500 rounded-full px-8 py-4 flex items-center justify-center space-x-2">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Successfully subscribed!</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Weekly updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Event notifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Program announcements</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default NewsletterSection;