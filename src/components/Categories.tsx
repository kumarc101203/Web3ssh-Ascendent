import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, Camera, PenTool, Megaphone, Music, Globe, Briefcase } from 'lucide-react';

const categories = [
  {
    icon: Code,
    title: 'Programming & Tech',
    description: 'Smart contracts, DApps, and blockchain development',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'from-blue-600 to-blue-700',
    bgColor: 'from-blue-50 to-blue-100',
    route: 'programming'
  },
  {
    icon: Palette,
    title: 'Graphics & Design',
    description: 'NFT art, logos, and visual content creation',
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'from-purple-600 to-purple-700',
    bgColor: 'from-purple-50 to-purple-100',
    route: 'design'
  },
  {
    icon: PenTool,
    title: 'Writing & Translation',
    description: 'Whitepapers, documentation, and content creation',
    color: 'from-green-500 to-green-600',
    hoverColor: 'from-green-600 to-green-700',
    bgColor: 'from-green-50 to-green-100',
    route: 'writing'
  },
  {
    icon: Camera,
    title: 'Video & Animation',
    description: 'Product demos, explainer videos, and motion graphics',
    color: 'from-red-500 to-red-600',
    hoverColor: 'from-red-600 to-red-700',
    bgColor: 'from-red-50 to-red-100',
    route: 'video'
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Social media, SEO, and community management',
    color: 'from-yellow-500 to-orange-500',
    hoverColor: 'from-yellow-600 to-orange-600',
    bgColor: 'from-yellow-50 to-orange-100',
    route: 'marketing'
  },
  {
    icon: Music,
    title: 'Music & Audio',
    description: 'Podcasts, sound design, and voice overs',
    color: 'from-pink-500 to-pink-600',
    hoverColor: 'from-pink-600 to-pink-700',
    bgColor: 'from-pink-50 to-pink-100',
    route: 'audio'
  },
  {
    icon: Globe,
    title: 'Business',
    description: 'Consulting, market research, and strategy',
    color: 'from-indigo-500 to-indigo-600',
    hoverColor: 'from-indigo-600 to-indigo-700',
    bgColor: 'from-indigo-50 to-indigo-100',
    route: 'business'
  },
  {
    icon: Briefcase,
    title: 'Lifestyle',
    description: 'Fitness, wellness, and personal development',
    color: 'from-teal-500 to-teal-600',
    hoverColor: 'from-teal-600 to-teal-700',
    bgColor: 'from-teal-50 to-teal-100',
    route: 'lifestyle'
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (route: string) => {
    navigate(`/services/${route}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Browse Services by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover professional services across all industries, backed by 
            <span className="font-semibold text-blue-700"> blockchain security</span> and 
            <span className="font-semibold text-purple-700"> AI-powered dispute resolution</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.route)}
                className="group bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-3 transform relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} group-hover:bg-gradient-to-br group-hover:${category.hoverColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-current/25 group-hover:shadow-xl group-hover:shadow-current/40`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;