import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor } from '../config/colors';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { isDark } = useTheme();

  const testimonials = [
    {
      name: 'Chamika Rathnayake',
      age: 22,
      program: 'Sports Excellence Program',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: "NYSC transformed my life completely. From a shy teenager to representing Sri Lanka in international athletics, this journey has been incredible. The mentorship and support I received here shaped not just my athletic career, but my entire personality.",
      achievement: 'National Athletics Champion',
      rating: 5
    },
    {
      name: 'Kavya Wickramasinghe',
      age: 20,
      program: 'Cultural Heritage Arts',
      image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: "Through NYSC's cultural programs, I discovered my passion for traditional Sri Lankan dance. Now I'm preserving our heritage while inspiring young girls in my community. The confidence and skills I gained here are invaluable.",
      achievement: 'Cultural Ambassador',
      rating: 5
    },
    {
      name: 'Ravindu Perera',
      age: 24,
      program: 'Leadership Development',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: "The leadership training at NYSC equipped me with skills I never knew I had. Today, I'm running my own social enterprise, creating jobs for youth in rural areas. None of this would have been possible without NYSC's guidance.",
      achievement: 'Social Entrepreneur',
      rating: 5
    },
    {
      name: 'Thisari Fernando',
      age: 21,
      program: 'Community Service Initiative',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: "NYSC taught me that even small actions can create big changes. Through community service projects, I've helped improve education facilities in 10 villages. The satisfaction of making a real difference is unmatched.",
      achievement: 'Community Impact Leader',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className={`py-20 relative overflow-hidden bg-gradient-to-br ${getThemeColor('brand.primary', isDark)}/20`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-32 translate-y-32 md:translate-x-48 md:translate-y-48" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lives Transformed
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Hear from young Sri Lankans whose lives have been transformed through NYSC programs. 
            Their stories inspire us to continue our mission of youth empowerment.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg"
                  />
                  <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${getThemeColor('brand.primary', isDark)} text-white p-2 rounded-full`}>
                    <Quote className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating */}
                <div className="flex justify-center md:justify-start space-x-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                {/* Profile Info */}
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-gray-800">
                    {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].age}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {testimonials[currentTestimonial].program}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].achievement}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 md:-translate-x-4 bg-white shadow-lg hover:shadow-xl text-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 md:translate-x-4 bg-white shadow-lg hover:shadow-xl text-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Your Success Story Starts Here
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of young Sri Lankans who have transformed their lives through NYSC. 
            Your journey to success begins with a single step.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;