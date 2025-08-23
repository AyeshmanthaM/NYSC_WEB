import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Camera, Play, Download, Share2, Heart } from 'lucide-react';

const PhotoGallery = () => {
  const { isDark } = useTheme();

  const galleries = [
    {
      title: "Youth Excellence Awards 2024",
      description: "Highlights from the annual youth awards ceremony",
      imageCount: 45,
      videoCount: 3,
      date: "December 2024",
      category: "Awards",
      featured: true
    },
    {
      title: "Vocational Training Centers",
      description: "Modern facilities and training programs",
      imageCount: 32,
      videoCount: 2,
      date: "November 2024",
      category: "Education"
    },
    {
      title: "Cultural Heritage Festival",
      description: "Traditional performances and cultural celebrations",
      imageCount: 67,
      videoCount: 5,
      date: "October 2024",
      category: "Culture"
    },
    {
      title: "Youth Leadership Summit",
      description: "Young leaders from across Sri Lanka",
      imageCount: 28,
      videoCount: 1,
      date: "September 2024",
      category: "Leadership"
    },
    {
      title: "Sports Development Programs",
      description: "Athletic training and competitions", 
      imageCount: 54,
      videoCount: 4,
      date: "August 2024",
      category: "Sports"
    },
    {
      title: "International Exchange Programs",
      description: "Global partnerships and cultural exchange",
      imageCount: 41,
      videoCount: 2,
      date: "July 2024",
      category: "International"
    }
  ];

  const categories = [
    { name: "All", count: 267, active: true },
    { name: "Awards", count: 45, active: false },
    { name: "Education", count: 86, active: false },
    { name: "Culture", count: 67, active: false },
    { name: "Sports", count: 54, active: false },
    { name: "Leadership", count: 28, active: false }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News & Events", href: "/news-events" },
    { label: "Photo Gallery" }
  ];

  return (
    <PageLayout 
      title="Photo Gallery" 
      subtitle="Visual highlights from NYSC events, programs, and activities showcasing the vibrant youth community of Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className={`mb-12 ${getThemeColor('background.card', isDark)} rounded-2xl p-6`}>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                  category.active
                    ? 'bg-primary-500 text-white'
                    : isDark
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Gallery */}
        {galleries.filter(gallery => gallery.featured).map((gallery, index) => (
          <div key={index} className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold mb-4">
                  Featured Gallery
                </div>
                <h2 className={`text-3xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                  {gallery.title}
                </h2>
                <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                  {gallery.description}
                </p>
                <div className="flex items-center space-x-6 mb-6 text-sm">
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 mr-2 text-primary-500" />
                    <span className={getThemeColor('text.secondary', isDark)}>{gallery.imageCount} Photos</span>
                  </div>
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-2 text-primary-500" />
                    <span className={getThemeColor('text.secondary', isDark)}>{gallery.videoCount} Videos</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700`}>
                    {gallery.category}
                  </span>
                </div>
                <button className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                  View Gallery
                </button>
              </div>
              <div className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-8 text-center`}>
                <Camera className="w-24 h-24 mx-auto mb-4 text-primary-500" />
                <p className={`${getThemeColor('text.secondary', isDark)}`}>
                  High-resolution photos and videos from the {gallery.title}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleries.filter(gallery => !gallery.featured).map((gallery, index) => (
            <div key={index} className={`${getThemeColor('background.card', isDark)} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group`}>
              <div className={`${getThemeColor('background.secondary', isDark)} p-8 text-center relative overflow-hidden`}>
                <Camera className="w-16 h-16 mx-auto mb-4 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-primary-500 text-white`}>
                    {gallery.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)} group-hover:text-primary-600 transition-colors`}>
                  {gallery.title}
                </h3>
                <p className={`${getThemeColor('text.secondary', isDark)} text-sm mb-4 leading-relaxed`}>
                  {gallery.description}
                </p>
                <div className="flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Camera className="w-3 h-3 mr-1 text-primary-500" />
                      <span className={getThemeColor('text.secondary', isDark)}>{gallery.imageCount}</span>
                    </div>
                    <div className="flex items-center">
                      <Play className="w-3 h-3 mr-1 text-primary-500" />
                      <span className={getThemeColor('text.secondary', isDark)}>{gallery.videoCount}</span>
                    </div>
                  </div>
                  <span className={getThemeColor('text.tertiary', isDark)}>{gallery.date}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors">
                    View
                  </button>
                  <button className={`px-3 py-2 border border-primary-500 text-primary-500 rounded-lg text-sm hover:bg-primary-500 hover:text-white transition-all`}>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Actions */}
        <div className={`${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Share Your Moments
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Have photos or videos from NYSC events? Share your memories with the community and help us showcase 
            the amazing work of Sri Lankan youth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              <Camera className="w-4 h-4 mr-2" />
              Submit Photos
            </button>
            <button className={`inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all`}>
              <Download className="w-4 h-4 mr-2" />
              Download Pack
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PhotoGallery;