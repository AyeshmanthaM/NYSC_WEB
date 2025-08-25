import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Users, MapPin, Phone, Mail, Award, Search, Filter, ArrowLeft, Building, UserCheck, Crown } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const BoardMembersPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Clubs", href: "/services/youth-clubs" },
    { label: "Board Members" }
  ];

  // Complete board members data
  const boardMembers = [
    {
      id: 1,
      name: "Mr. Pasindu Guneratne",
      position: "Chairman",
      district: "-",
      phone: "-",
      image: "/upload/leader/-154598500141_36604640765_1655456152_n.jpg",
      category: "leadership",
      responsibilities: ["Overall leadership", "Strategic planning", "Board governance"]
    },
    {
      id: 2,
      name: "Mr. Sathira Kithmina",
      position: "Vice Chairman",
      district: "-",
      phone: "076 881 5227",
      image: "/images/sammelanaya/00.jpeg",
      category: "leadership",
      responsibilities: ["Deputy leadership", "Operations oversight", "Strategic support"]
    },
    {
      id: 3,
      name: "Mr. A. M. Tharindu Naveen Kumara",
      position: "Secretary",
      district: "Kandy",
      phone: "070 248 2522",
      image: "/images/sammelanaya/01.jpeg",
      category: "core",
      responsibilities: ["Board administration", "Meeting coordination", "Official correspondence"]
    },
    {
      id: 4,
      name: "Mr. Ranil Madanayaka",
      position: "Treasurer",
      district: "Rathnapura",
      phone: "070 495 9236",
      image: "/images/sammelanaya/02.jpg",
      category: "core",
      responsibilities: ["Financial management", "Budget oversight", "Financial reporting"]
    },
    {
      id: 5,
      name: "Mr. S. M. Mihindu Rusith",
      position: "Organizer",
      district: "Puthlam",
      phone: "076 333 9739",
      image: "/images/sammelanaya/03.jpeg",
      category: "core",
      responsibilities: ["Event coordination", "Program management", "Activity planning"]
    },
    {
      id: 6,
      name: "Mr. S. A. A. S. Mahadiwulwewa",
      position: "Vice Chairman II",
      district: "Anuradapura",
      phone: "070 586 2271",
      image: "/images/sammelanaya/04.jpeg",
      category: "leadership",
      responsibilities: ["Regional coordination", "Policy implementation", "Strategic oversight"]
    },
    {
      id: 7,
      name: "Mr. K. A. Chamith Shehara Indunil",
      position: "Vice Chairman III",
      district: "Hambanthota",
      phone: "070 248 1548",
      image: "/images/sammelanaya/05.jpg",
      category: "leadership",
      responsibilities: ["District liaison", "Program oversight", "Strategic development"]
    },
    {
      id: 8,
      name: "Mr. R. Gautham Chandran",
      position: "Deputy Secretary I",
      district: "Kegalla",
      phone: "070 494 7308",
      image: "/images/sammelanaya/06.jpeg",
      category: "administrative",
      responsibilities: ["Administrative support", "Documentation", "Communication"]
    },
    {
      id: 9,
      name: "Mr. A. J. M. Saniru Ridmika",
      position: "Deputy Secretary II",
      district: "Badulla",
      phone: "077 545 4710",
      image: "/images/sammelanaya/07.jpg",
      category: "administrative",
      responsibilities: ["Record keeping", "Meeting minutes", "Official communications"]
    },
    {
      id: 10,
      name: "Mr. N. M. A. S. B. Nawarathna",
      position: "Vice Organizer",
      district: "Kaluthara",
      phone: "071 625 6011",
      image: "/images/sammelanaya/08.jpg",
      category: "administrative",
      responsibilities: ["Event support", "Program assistance", "Organizational tasks"]
    },
    {
      id: 11,
      name: "Mr. Gayan Chathuranga Gamage",
      position: "Chairman, Educational Counseling Bureau",
      district: "Galle",
      phone: "077 824 5104",
      image: "/images/sammelanaya/09.jpg",
      category: "bureau",
      responsibilities: ["Educational guidance", "Career counseling", "Youth development"]
    },
    {
      id: 12,
      name: "Mr. E. K. A. Nuwan Deemantha Bandara",
      position: "Chairman, Planning, Research & Innovation Bureau",
      district: "Mullathivu",
      phone: "070 248 9645",
      image: "/images/sammelanaya/10.jpg",
      category: "bureau",
      responsibilities: ["Strategic planning", "Research coordination", "Innovation initiatives"]
    },
    {
      id: 13,
      name: "Mr. K. A. Sampath Sandun Kumara",
      position: "Chairman, National Development Bureau",
      district: "Colombo",
      phone: "0775214553",
      image: "/images/sammelanaya/11.jpg",
      category: "bureau",
      responsibilities: ["National programs", "Development projects", "Policy coordination"]
    },
    {
      id: 14,
      name: "Mr. M. Shan",
      position: "Chairman, Sports, Various External Activities Bureau",
      district: "Colombo 1",
      phone: "0757629902",
      image: "/images/sammelanaya/12.jpg",
      category: "bureau",
      responsibilities: ["Sports programs", "External activities", "International relations"]
    },
    {
      id: 15,
      name: "Mr. B. D. Imantha Priyasad Wimalaweera",
      position: "Chairman, Cultural Bureau",
      district: "Mathale",
      phone: "071 727 3487",
      image: "/images/sammelanaya/13.jpeg",
      category: "bureau",
      responsibilities: ["Cultural programs", "Heritage preservation", "Arts promotion"]
    },
    {
      id: 16,
      name: "Miss. R. M. Kalpani Sewwandi Rathnayaka",
      position: "Chairman, Awards Presentation Bureau",
      district: "Monaragala",
      phone: "070 495 9079",
      image: "/images/sammelanaya/14.jpg",
      category: "bureau",
      responsibilities: ["Awards coordination", "Recognition programs", "Achievement tracking"]
    },
    {
      id: 17,
      name: "W. G. Chanaka Sri Madusanka",
      position: "Chairman, Foreign Bureau",
      district: "Polonnaruwa",
      phone: "070 345 4928 / 0711065546",
      image: "/images/sammelanaya/15.jpg",
      category: "bureau",
      responsibilities: ["International relations", "Exchange programs", "Global partnerships"]
    },
    {
      id: 18,
      name: "Mr. T. Anujan",
      position: "Chairman, Communication Project & Youth Relation Bureau",
      district: "Kilinochchi",
      phone: "077 919 8474",
      image: "/images/sammelanaya/16.jpg",
      category: "bureau",
      responsibilities: ["Communication strategy", "Youth engagement", "Public relations"]
    },
    {
      id: 19,
      name: "Mr. N. A. K. K. C. Nishshanka",
      position: "Chairman, Social & Welfare Service Bureau",
      district: "Gampaha",
      phone: "077 174 0015",
      image: "/images/sammelanaya/17.jpg",
      category: "bureau",
      responsibilities: ["Social services", "Welfare programs", "Community support"]
    },
    {
      id: 20,
      name: "Mr. S. M. Tharindu Sampath",
      position: "Chairman, Funds Bureau",
      district: "Rathnapura",
      phone: "070 248 7362",
      image: "/images/sammelanaya/18.jpg",
      category: "bureau",
      responsibilities: ["Fund management", "Resource allocation", "Financial planning"]
    },
    {
      id: 21,
      name: "Mr. U. Nitharshan",
      position: "Chairman, Entrepreneurship & Business Development Bureau",
      district: "Jaffna",
      phone: "077 984 6663",
      image: "/images/sammelanaya/19.jpg",
      category: "bureau",
      responsibilities: ["Business development", "Entrepreneurship support", "Economic initiatives"]
    },
    {
      id: 22,
      name: "Mr. A. A. M. A. Sifnas",
      position: "Chairman, Global Conservation Bureau",
      district: "Ampara",
      phone: "075 580 2858",
      image: "/images/sammelanaya/20.jpg",
      category: "bureau",
      responsibilities: ["Environmental conservation", "Sustainability programs", "Climate action"]
    },
    {
      id: 23,
      name: "Mr. M. K. Sadeep Tharaka",
      position: "Chairman, Civil Organization Coordinating Bureau",
      district: "Mathara",
      phone: "071 086 5333",
      image: "/images/sammelanaya/21.jpg",
      category: "bureau",
      responsibilities: ["NGO coordination", "Civil society engagement", "Partnership building"]
    },
    {
      id: 24,
      name: "Mr. P. G. Chinthaka Danushka",
      position: "Chairman of Central Auditing Committee",
      district: "Polonnaruwa",
      phone: "070 248 4631",
      image: "/images/sammelanaya/22.jpeg",
      category: "committee",
      responsibilities: ["Financial auditing", "Compliance oversight", "Risk assessment"]
    },
    {
      id: 25,
      name: "Mr. N. J. Kawish Dilshan",
      position: "Chairman of Central Disciplinary Committee",
      district: "Anuradapura",
      phone: "070 220 8967",
      image: "/images/sammelanaya/23.jpeg",
      category: "committee",
      responsibilities: ["Disciplinary matters", "Ethics oversight", "Code of conduct"]
    }
    // Adding a few more key members to demonstrate the complete system
  ];

  // Filter categories
  const filterCategories = [
    { id: 'all', label: 'All Members', count: boardMembers.length },
    { id: 'leadership', label: 'Leadership', count: boardMembers.filter(m => m.category === 'leadership').length },
    { id: 'core', label: 'Core Positions', count: boardMembers.filter(m => m.category === 'core').length },
    { id: 'bureau', label: 'Bureau Chairs', count: boardMembers.filter(m => m.category === 'bureau').length },
    { id: 'committee', label: 'Committee Members', count: boardMembers.filter(m => m.category === 'committee').length },
    { id: 'administrative', label: 'Administrative', count: boardMembers.filter(m => m.category === 'administrative').length }
  ];

  // Filter and search logic
  const filteredMembers = boardMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || member.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'leadership': return Crown;
      case 'core': return UserCheck;
      case 'bureau': return Building;
      case 'committee': return Users;
      case 'administrative': return Award;
      default: return Users;
    }
  };

  return (
    <PageLayout 
      title="Board Members Directory" 
      subtitle="Complete directory of Sri Lanka Federation of Youth Clubs board members"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/services/youth-clubs"
            className={`inline-flex items-center px-4 py-2 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Youth Clubs
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className={`mb-8 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-6`}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getThemeColor('text.muted', isDark)}`} />
                <input
                  type="text"
                  placeholder="Search by name, position, or district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
              </div>
            </div>

            {/* Filter */}
            <div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getThemeColor('text.muted', isDark)}`} />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} focus:outline-none focus:ring-2 focus:ring-primary-500`}
                >
                  {filterCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between">
            <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
              Showing {filteredMembers.length} of {boardMembers.length} members
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={`text-sm px-3 py-1 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-md hover:scale-105 transition-transform`}
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Board Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
            const CategoryIcon = getCategoryIcon(member.category);
            
            return (
              <div 
                key={member.id}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:shadow-xl transition-all duration-300 group`}
              >
                {/* Profile Image */}
                <div className="relative mb-4 mx-auto w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3 className={`text-sm font-bold mb-2 ${getThemeColor('text.primary', isDark)} leading-tight`}>
                    {member.name}
                  </h3>
                  
                  <div className={`inline-flex items-center px-2 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full mb-3`}>
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {member.category === 'leadership' ? 'Leadership' : 
                     member.category === 'core' ? 'Core' :
                     member.category === 'bureau' ? 'Bureau' :
                     member.category === 'committee' ? 'Committee' : 'Admin'}
                  </div>

                  <p className={`text-xs ${getThemeColor('text.secondary', isDark)} mb-3 leading-tight`}>
                    {member.position}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center">
                    <MapPin className={`w-3 h-3 mr-2 ${colors.brand.primary.text} flex-shrink-0`} />
                    <span className={`${getThemeColor('text.secondary', isDark)} truncate`}>
                      {member.district || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className={`w-3 h-3 mr-2 ${colors.brand.primary.text} flex-shrink-0`} />
                    <span className={`${getThemeColor('text.secondary', isDark)} truncate`}>
                      {member.phone || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                {member.responsibilities && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className={`text-xs font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                      Key Responsibilities:
                    </h4>
                    <ul className={`text-xs ${getThemeColor('text.secondary', isDark)} space-y-1`}>
                      {member.responsibilities.slice(0, 2).map((resp, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1 h-1 bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span className="leading-tight">{resp}</span>
                        </li>
                      ))}
                      {member.responsibilities.length > 2 && (
                        <li className={`text-xs ${colors.brand.primary.text} font-semibold`}>
                          +{member.responsibilities.length - 2} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <div className={`text-center py-16 ${getThemeColor('card.glassy', isDark)} rounded-xl`}>
            <Users className={`w-16 h-16 mx-auto mb-4 ${getThemeColor('text.muted', isDark)}`} />
            <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
              No members found
            </h3>
            <p className={`${getThemeColor('text.secondary', isDark)} mb-4`}>
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Contact Information */}
        <div className={`mt-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 text-center`}>
          <h3 className={`text-xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            Need to Contact a Board Member?
          </h3>
          <p className={`${getThemeColor('text.secondary', isDark)} mb-6 max-w-2xl mx-auto`}>
            For official inquiries, please contact the relevant board member directly using the contact information provided above, 
            or reach out through the main NYSC office for proper coordination.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact NYSC Office
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default BoardMembersPage;