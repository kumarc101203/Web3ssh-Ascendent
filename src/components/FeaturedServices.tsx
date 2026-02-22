import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Eye, Zap } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Smart Contract Development',
    seller: 'CryptoMaster',
    rating: 4.9,
    reviews: 127,
    price: 'Starting at $500',
    image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    tags: ['Solidity', 'Web3', 'DeFi'],
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    title: 'NFT Collection Design',
    seller: 'ArtisticVision',
    rating: 4.8,
    reviews: 89,
    price: 'Starting at $300',
    image: 'https://images.pexels.com/photos/5922284/pexels-photo-5922284.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    tags: ['NFT', 'Digital Art', 'Blockchain'],
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    title: 'Blockchain Whitepaper',
    seller: 'TechWriter',
    rating: 5.0,
    reviews: 45,
    price: 'Starting at $250',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    tags: ['Writing', 'Technical', 'Crypto'],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 4,
    title: 'DeFi Protocol Audit',
    seller: 'SecurityPro',
    rating: 4.9,
    reviews: 73,
    price: 'Starting at $800',
    image: 'https://images.pexels.com/photos/5474027/pexels-photo-5474027.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    tags: ['Security', 'Audit', 'DeFi'],
    gradient: 'from-red-500 to-orange-600'
  }
];

const FeaturedServices = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: number) => {
    navigate(`/freelancer/${serviceId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Zap className="h-12 w-12 text-yellow-500 animate-bounce" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Featured Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover top-rated services from our 
            <span className="font-semibold text-blue-700"> verified blockchain</span> and 
            <span className="font-semibold text-purple-700"> crypto experts</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={() => handleServiceClick(service.id)}
              className="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-200/50"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-sm font-bold">{service.seller[0]}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{service.seller}</span>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                  <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/50">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                    {service.price}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">{Math.floor(Math.random() * 100) + 50}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;