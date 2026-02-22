import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Heart, Eye, MapPin, Clock, Award } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'I will develop smart contracts for your DeFi project',
    seller: {
      id: 'cryptomaster',
      name: 'CryptoMaster',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      level: 'Level 2 Seller',
      location: 'United States',
      responseTime: '1 hour'
    },
    rating: 4.9,
    reviews: 127,
    price: 500,
    image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    tags: ['Solidity', 'Web3', 'DeFi', 'Smart Contracts'],
    category: 'programming',
    deliveryTime: '7 days',
    views: 1250
  },
  {
    id: 2,
    title: 'I will create stunning NFT collection artwork',
    seller: {
      id: 'artisticvision',
      name: 'ArtisticVision',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      level: 'Top Rated Seller',
      location: 'Canada',
      responseTime: '30 minutes'
    },
    rating: 4.8,
    reviews: 89,
    price: 300,
    image: 'https://images.pexels.com/photos/5922284/pexels-photo-5922284.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    tags: ['NFT', 'Digital Art', 'Blockchain', 'Illustration'],
    category: 'design',
    deliveryTime: '5 days',
    views: 890
  },
  {
    id: 3,
    title: 'I will write comprehensive blockchain whitepapers',
    seller: {
      id: 'techwriter',
      name: 'TechWriter',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      level: 'Level 2 Seller',
      location: 'United Kingdom',
      responseTime: '2 hours'
    },
    rating: 5.0,
    reviews: 45,
    price: 250,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    tags: ['Writing', 'Technical', 'Crypto', 'Documentation'],
    category: 'writing',
    deliveryTime: '10 days',
    views: 567
  },
  {
    id: 4,
    title: 'I will audit your DeFi protocol for security vulnerabilities',
    seller: {
      id: 'securitypro',
      name: 'SecurityPro',
      avatar: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      level: 'Top Rated Seller',
      location: 'Germany',
      responseTime: '1 hour'
    },
    rating: 4.9,
    reviews: 73,
    price: 800,
    image: 'https://images.pexels.com/photos/5474027/pexels-photo-5474027.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    tags: ['Security', 'Audit', 'DeFi', 'Smart Contracts'],
    category: 'programming',
    deliveryTime: '14 days',
    views: 1100
  },
  {
    id: 5,
    title: 'I will create engaging crypto marketing campaigns',
    seller: {
      id: 'marketingpro',
      name: 'MarketingPro',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      level: 'Level 1 Seller',
      location: 'Australia',
      responseTime: '3 hours'
    },
    rating: 4.7,
    reviews: 156,
    price: 150,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    tags: ['Marketing', 'Social Media', 'Crypto', 'Content'],
    category: 'marketing',
    deliveryTime: '3 days',
    views: 780
  },
  {
    id: 6,
    title: 'I will develop Web3 dApps with React and Solidity',
    seller: {
      id: 'web3dev',
      name: 'Web3Developer',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      level: 'Level 2 Seller',
      location: 'India',
      responseTime: '2 hours'
    },
    rating: 4.8,
    reviews: 92,
    price: 600,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    tags: ['React', 'Web3', 'dApp', 'Frontend'],
    category: 'programming',
    deliveryTime: '10 days',
    views: 950
  }
];

const categories = [
  { id: 'all', name: 'All Categories', count: services.length },
  { id: 'programming', name: 'Programming & Tech', count: services.filter(s => s.category === 'programming').length },
  { id: 'design', name: 'Graphics & Design', count: services.filter(s => s.category === 'design').length },
  { id: 'writing', name: 'Writing & Translation', count: services.filter(s => s.category === 'writing').length },
  { id: 'marketing', name: 'Digital Marketing', count: services.filter(s => s.category === 'marketing').length }
];

const ServicesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('relevance');

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleServiceClick = (serviceId: number) => {
    navigate(`/freelancer/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Perfect <span className="text-yellow-300">Blockchain</span> Service
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover top-rated freelancers specializing in blockchain, crypto, and Web3 technologies
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 text-lg rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/20 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{cat.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        {cat.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold text-gray-900 mb-4">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Best Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredServices.length} services available
              </h2>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-200/50"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={service.seller.avatar}
                        alt={service.seller.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900">{service.seller.name}</span>
                        <div className="text-xs text-gray-500">{service.seller.level}</div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                      <span className="text-sm text-gray-500">({service.reviews})</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{service.views}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                        Starting at ${service.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;