import React from 'react';
import { Clock, Users, Award, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PopularCourses = () => {
  const { isDark } = useTheme();

  const courses = [
    {
      id: 1,
      title: 'Leadership Development Program',
      category: 'Personal Development',
      duration: '3 Months',
      enrolled: 250,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      level: 'Intermediate',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Digital Marketing Essentials',
      category: 'Digital Skills',
      duration: '6 Weeks',
      enrolled: 180,
      image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600',
      level: 'Beginner',
      price: 'Free'
    },
    {
      id: 3,
      title: 'Entrepreneurship Bootcamp',
      category: 'Business',
      duration: '2 Months',
      enrolled: 320,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      level: 'Advanced',
      price: 'Free'
    },
    {
      id: 4,
      title: 'Sports Coaching Certificate',
      category: 'Sports',
      duration: '4 Months',
      enrolled: 150,
      image: 'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=600',
      level: 'Beginner',
      price: 'Free'
    }
  ];

  return (
    <section className={`relative py-16 ${isDark ? 'bg-gray-800/70' : 'bg-white/80'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Popular Courses
            </h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Enhance your skills with our free training programs
            </p>
          </div>
          
          <button className={`hidden md:flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
            isDark 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white text-xs font-medium rounded-full">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    {course.price}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className={`font-semibold text-lg mb-2 line-clamp-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {course.title}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className={`flex items-center ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className={`flex items-center ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Users className="w-4 h-4 mr-1" />
                      {course.enrolled}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    course.level === 'Beginner' 
                      ? 'bg-green-100 text-green-700' 
                      : course.level === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
                  </span>
                  
                  <button className={`text-sm font-medium flex items-center transition-colors duration-200 ${
                    isDark 
                      ? 'text-[#1aa79e] hover:text-[#f38621]' 
                      : 'text-[#1aa79e] hover:text-[#f38621]'
                  }`}>
                    Enroll Now
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <button className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
            isDark 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;