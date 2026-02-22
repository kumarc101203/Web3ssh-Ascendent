import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, MapPin, Clock, Award, Shield, Eye, MessageCircle, CheckCircle, Calendar, DollarSign, Zap, X, Mail, Phone, Globe, Video, Send } from 'lucide-react';
import { AuthContext } from '../App';

const freelancerData = {
  1: {
    id: 1,
    name: 'CryptoMaster',
    title: 'Senior Blockchain Developer',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    level: 'Level 2 Seller',
    location: 'United States',
    memberSince: 'March 2022',
    responseTime: '1 hour',
    rating: 4.9,
    reviews: 127,
    completedOrders: 245,
    languages: ['English', 'Spanish'],
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'DeFi', 'Smart Contracts', 'React', 'Node.js'],
    description: 'I am a passionate blockchain developer with over 5 years of experience in creating secure and efficient smart contracts. I specialize in DeFi protocols, NFT marketplaces, and Web3 applications. My expertise includes Solidity, Web3.js, and various blockchain frameworks.',
    contactInfo: {
      email: 'cryptomaster@chainwork.com',
      phone: '+1 (555) 123-4567',
      website: 'https://cryptomaster.dev',
      timezone: 'EST (UTC-5)',
      workingHours: '9:00 AM - 6:00 PM EST',
      preferredContact: 'Email'
    },
    services: [
      {
        id: 1,
        title: 'I will develop smart contracts for your DeFi project',
        price: 500,
        deliveryTime: '7 days',
        image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.9,
        reviews: 45
      },
      {
        id: 2,
        title: 'I will audit your smart contracts for security',
        price: 300,
        deliveryTime: '5 days',
        image: 'https://images.pexels.com/photos/5474027/pexels-photo-5474027.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 5.0,
        reviews: 32
      }
    ],
    reviewsList: [
      {
        id: 1,
        user: 'TechStartup',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excellent work! CryptoMaster delivered a flawless smart contract for our DeFi platform. The code was clean, well-documented, and passed all security audits.',
        helpful: 12
      },
      {
        id: 2,
        user: 'BlockchainCorp',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '1 month ago',
        comment: 'Outstanding developer! Very professional, communicative, and delivered exactly what we needed. Will definitely work with again.',
        helpful: 8
      }
    ]
  },
  2: {
    id: 2,
    name: 'ArtisticVision',
    title: 'NFT Artist & Digital Designer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/5922284/pexels-photo-5922284.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    level: 'Top Rated Seller',
    location: 'Canada',
    memberSince: 'January 2021',
    responseTime: '30 minutes',
    rating: 4.8,
    reviews: 89,
    completedOrders: 156,
    languages: ['English', 'French'],
    skills: ['NFT Design', 'Digital Art', 'Illustration', 'Photoshop', 'Procreate', 'Blockchain Art'],
    description: 'Creative NFT artist with a passion for bringing digital visions to life. I specialize in creating unique, high-quality NFT collections that stand out in the marketplace. My work combines traditional art techniques with cutting-edge digital tools.',
    contactInfo: {
      email: 'artistic.vision@chainwork.com',
      phone: '+1 (555) 234-5678',
      website: 'https://artisticvision.art',
      timezone: 'PST (UTC-8)',
      workingHours: '10:00 AM - 7:00 PM PST',
      preferredContact: 'Email'
    },
    services: [
      {
        id: 1,
        title: 'I will create stunning NFT collection artwork',
        price: 300,
        deliveryTime: '5 days',
        image: 'https://images.pexels.com/photos/5922284/pexels-photo-5922284.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.8,
        reviews: 67
      },
      {
        id: 2,
        title: 'I will design custom digital avatars',
        price: 150,
        deliveryTime: '3 days',
        image: 'https://images.pexels.com/photos/5922284/pexels-photo-5922284.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.9,
        reviews: 22
      }
    ],
    reviewsList: [
      {
        id: 1,
        user: 'NFTCollector',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '1 week ago',
        comment: 'Amazing artwork! ArtisticVision created a beautiful NFT collection that exceeded all expectations. The attention to detail is incredible.',
        helpful: 15
      },
      {
        id: 2,
        user: 'DigitalGallery',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 4,
        date: '3 weeks ago',
        comment: 'Great communication and fast delivery. The final artwork was exactly what we were looking for.',
        helpful: 9
      }
    ]
  },
  3: {
    id: 3,
    name: 'TechWriter',
    title: 'Blockchain Technical Writer',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    level: 'Level 2 Seller',
    location: 'United Kingdom',
    memberSince: 'June 2022',
    responseTime: '2 hours',
    rating: 5.0,
    reviews: 45,
    completedOrders: 78,
    languages: ['English', 'German'],
    skills: ['Technical Writing', 'Whitepaper Creation', 'Documentation', 'Research', 'Blockchain Analysis'],
    description: 'Experienced technical writer specializing in blockchain and cryptocurrency documentation. I create comprehensive whitepapers, technical documentation, and research reports that clearly communicate complex concepts.',
    contactInfo: {
      email: 'techwriter@chainwork.com',
      phone: '+44 20 7946 0958',
      website: 'https://techwriter.pro',
      timezone: 'GMT (UTC+0)',
      workingHours: '9:00 AM - 5:00 PM GMT',
      preferredContact: 'Email'
    },
    services: [
      {
        id: 1,
        title: 'I will write comprehensive blockchain whitepapers',
        price: 250,
        deliveryTime: '10 days',
        image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 5.0,
        reviews: 28
      },
      {
        id: 2,
        title: 'I will create technical documentation',
        price: 180,
        deliveryTime: '7 days',
        image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.9,
        reviews: 17
      }
    ],
    reviewsList: [
      {
        id: 1,
        user: 'CryptoStartup',
        avatar: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Exceptional whitepaper! TechWriter perfectly captured our vision and presented it in a clear, professional manner.',
        helpful: 18
      },
      {
        id: 2,
        user: 'BlockchainFund',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '1 month ago',
        comment: 'Outstanding work on our technical documentation. Very thorough and well-researched.',
        helpful: 11
      }
    ]
  },
  4: {
    id: 4,
    name: 'SecurityPro',
    title: 'Smart Contract Security Auditor',
    avatar: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/5474027/pexels-photo-5474027.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    level: 'Top Rated Seller',
    location: 'Germany',
    memberSince: 'September 2021',
    responseTime: '1 hour',
    rating: 4.9,
    reviews: 73,
    completedOrders: 134,
    languages: ['English', 'German', 'Russian'],
    skills: ['Security Auditing', 'Smart Contract Analysis', 'Penetration Testing', 'Vulnerability Assessment', 'DeFi Security'],
    description: 'Cybersecurity expert specializing in smart contract auditing and blockchain security. I help projects identify and fix vulnerabilities before deployment, ensuring maximum security for your users and funds.',
    contactInfo: {
      email: 'security.pro@chainwork.com',
      phone: '+49 30 12345678',
      website: 'https://securitypro.audit',
      timezone: 'CET (UTC+1)',
      workingHours: '8:00 AM - 6:00 PM CET',
      preferredContact: 'Email'
    },
    services: [
      {
        id: 1,
        title: 'I will audit your DeFi protocol for security vulnerabilities',
        price: 800,
        deliveryTime: '14 days',
        image: 'https://images.pexels.com/photos/5474027/pexels-photo-5474027.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.9,
        reviews: 41
      },
      {
        id: 2,
        title: 'I will perform smart contract security review',
        price: 500,
        deliveryTime: '10 days',
        image: 'https://images.pexels.com/photos/5474027/pexels-photo-5474027.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 5.0,
        reviews: 32
      }
    ],
    reviewsList: [
      {
        id: 1,
        user: 'DeFiProtocol',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '1 week ago',
        comment: 'Thorough security audit that identified critical vulnerabilities. SecurityPro saved our project from potential exploits.',
        helpful: 22
      },
      {
        id: 2,
        user: 'SmartContractDev',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Professional and detailed audit report. Highly recommend for any serious blockchain project.',
        helpful: 16
      }
    ]
  },
  5: {
    id: 5,
    name: 'MarketingPro',
    title: 'Crypto Marketing Specialist',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    level: 'Level 1 Seller',
    location: 'Australia',
    memberSince: 'November 2022',
    responseTime: '3 hours',
    rating: 4.7,
    reviews: 156,
    completedOrders: 203,
    languages: ['English'],
    skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'SEO', 'Community Management', 'Influencer Marketing'],
    description: 'Digital marketing expert with a focus on cryptocurrency and blockchain projects. I help projects build strong communities, increase brand awareness, and drive user adoption through strategic marketing campaigns.',
    contactInfo: {
      email: 'marketing.pro@chainwork.com',
      phone: '+61 2 9876 5432',
      website: 'https://marketingpro.digital',
      timezone: 'AEST (UTC+10)',
      workingHours: '9:00 AM - 6:00 PM AEST',
      preferredContact: 'Email'
    },
    services: [
      {
        id: 1,
        title: 'I will create engaging crypto marketing campaigns',
        price: 150,
        deliveryTime: '3 days',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.7,
        reviews: 89
      },
      {
        id: 2,
        title: 'I will manage your crypto community',
        price: 200,
        deliveryTime: '5 days',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.8,
        reviews: 67
      }
    ],
    reviewsList: [
      {
        id: 1,
        user: 'CryptoProject',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '5 days ago',
        comment: 'Great marketing strategy that significantly increased our community engagement. Very professional service.',
        helpful: 14
      },
      {
        id: 2,
        user: 'TokenLaunch',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Good results on our marketing campaign. MarketingPro delivered as promised.',
        helpful: 8
      }
    ]
  },
  6: {
    id: 6,
    name: 'Web3Developer',
    title: 'Full-Stack Web3 Developer',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    level: 'Level 2 Seller',
    location: 'India',
    memberSince: 'April 2022',
    responseTime: '2 hours',
    rating: 4.8,
    reviews: 92,
    completedOrders: 167,
    languages: ['English', 'Hindi'],
    skills: ['React', 'Web3.js', 'Ethereum', 'dApp Development', 'Frontend Development', 'JavaScript', 'TypeScript'],
    description: 'Full-stack developer specializing in Web3 and decentralized applications. I build user-friendly dApps that seamlessly integrate with blockchain technology, providing excellent user experiences for crypto projects.',
    contactInfo: {
      email: 'web3dev@chainwork.com',
      phone: '+91 98765 43210',
      website: 'https://web3developer.tech',
      timezone: 'IST (UTC+5:30)',
      workingHours: '10:00 AM - 8:00 PM IST',
      preferredContact: 'Email'
    },
    services: [
      {
        id: 1,
        title: 'I will develop Web3 dApps with React and Solidity',
        price: 600,
        deliveryTime: '10 days',
        image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.8,
        reviews: 54
      },
      {
        id: 2,
        title: 'I will create responsive Web3 interfaces',
        price: 400,
        deliveryTime: '7 days',
        image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        rating: 4.9,
        reviews: 38
      }
    ],
    reviewsList: [
      {
        id: 1,
        user: 'DAppStartup',
        avatar: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 5,
        date: '1 week ago',
        comment: 'Excellent dApp development! Web3Developer created a beautiful and functional application that our users love.',
        helpful: 19
      },
      {
        id: 2,
        user: 'BlockchainTeam',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        rating: 4,
        date: '3 weeks ago',
        comment: 'Good work on the frontend development. The integration with our smart contracts was seamless.',
        helpful: 12
      }
    ]
  }
};

// Contact Modal Component
const ContactModal = ({ freelancer, isOpen, onClose }: { freelancer: any, isOpen: boolean, onClose: () => void }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = () => {
    // Here you would typically send the message to the freelancer
    alert(`Message sent to ${freelancer.name}!`);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Contact {freelancer.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">{freelancer.contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">{freelancer.contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-purple-600" />
                <a href={freelancer.contactInfo.website} className="text-blue-600 hover:underline">
                  {freelancer.contactInfo.website}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="text-gray-700">{freelancer.contactInfo.workingHours} ({freelancer.contactInfo.timezone})</span>
              </div>
            </div>
          </div>

          {/* Quick Message */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Send a Quick Message</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I'm interested in your services. Could we discuss my project requirements?"
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Preferred contact method: {freelancer.contactInfo.preferredContact}
              </span>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Call Modal Component
const ScheduleCallModal = ({ freelancer, isOpen, onClose }: { freelancer: any, isOpen: boolean, onClose: () => void }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState('zoom');
  const [agenda, setAgenda] = useState('');

  if (!isOpen) return null;

  const handleScheduleCall = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for the meeting.');
      return;
    }

    // Here you would typically integrate with Zoom API or calendar service
    const meetingDetails = {
      freelancer: freelancer.name,
      date: selectedDate,
      time: selectedTime,
      type: meetingType,
      agenda: agenda
    };

    alert(`Meeting scheduled with ${freelancer.name} on ${selectedDate} at ${selectedTime} via ${meetingType.toUpperCase()}!`);
    onClose();
  };

  // Generate time slots (9 AM to 6 PM in freelancer's timezone)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Schedule a Call with {freelancer.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Meeting Type */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Meeting Platform</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'zoom', name: 'Zoom', icon: Video, color: 'blue' },
                { id: 'google-meet', name: 'Google Meet', icon: Video, color: 'green' },
                { id: 'teams', name: 'Microsoft Teams', icon: Video, color: 'purple' }
              ].map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setMeetingType(platform.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    meetingType === platform.id
                      ? `border-${platform.color}-500 bg-${platform.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <platform.icon className={`h-6 w-6 mx-auto mb-2 ${
                    meetingType === platform.id ? `text-${platform.color}-600` : 'text-gray-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    meetingType === platform.id ? `text-${platform.color}-700` : 'text-gray-700'
                  }`}>
                    {platform.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Select Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select Time ({freelancer.contactInfo.timezone})
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Meeting Agenda */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Meeting Agenda (Optional)</h3>
            <textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="Brief description of what you'd like to discuss..."
              className="w-full h-24 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Freelancer Availability Info */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Availability</span>
            </div>
            <p className="text-sm text-green-700">
              {freelancer.contactInfo.workingHours} ({freelancer.contactInfo.timezone})
            </p>
            <p className="text-sm text-green-600 mt-1">
              Typically responds within {freelancer.responseTime}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleScheduleCall}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Schedule Meeting</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const user = useContext(AuthContext);
  const freelancer = user ? {
    ...freelancerData[1], // fallback to first static profile for demo
    name: user.displayName || user.email,
    email: user.email,
    avatar: user.photoURL || freelancerData[1].avatar,
    // add more fields as needed
  } : freelancerData[Number(id) as keyof typeof freelancerData];

  const handleSmartContract = () => {
    // Navigate to smart contract page
    window.location.href = 'http://localhost:5173/';
  };

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Freelancer not found</h2>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Services</span>
          </button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={freelancer.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Profile Header */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-xl border-4 border-white"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{freelancer.name}</h1>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {freelancer.level}
                    </div>
                  </div>
                  <p className="text-xl text-gray-600 mb-4">{freelancer.title}</p>
                  {user && (
                    <div className="mb-2 text-blue-700 font-semibold">Welcome, {user.email}!</div>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {'email' in freelancer && freelancer.email && (
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-gray-900">{freelancer.email}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-gray-900">{freelancer.rating}</span>
                      <span>({freelancer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{freelancer.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Responds in {freelancer.responseTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 mb-8">
              <div className="flex space-x-8 px-8 py-4 border-b border-gray-200/50">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'services', label: 'Services' },
                  { id: 'reviews', label: 'Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-4 font-semibold transition-all duration-300 relative ${
                      activeTab === tab.id
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
                      <p className="text-gray-600 leading-relaxed">{freelancer.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
                      <div className="flex flex-wrap gap-3">
                        {freelancer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-semibold rounded-xl border border-blue-200/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Languages</h3>
                      <div className="flex space-x-4">
                        {freelancer.languages.map((language, index) => (
                          <span key={index} className="text-gray-600">{language}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freelancer.services.map((service) => (
                      <div key={service.id} className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-32 object-cover rounded-xl mb-4"
                        />
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{service.title}</h4>
                        <div className="flex items-center space-x-2 mb-3">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-bold">{service.rating}</span>
                          <span className="text-sm text-gray-500">({service.reviews})</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">${service.price}</span>
                          <span className="text-sm text-gray-500">{service.deliveryTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {freelancer.reviewsList.map((review) => (
                      <div key={review.id} className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-6 border border-gray-200/50">
                        <div className="flex items-start space-x-4">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900">{review.user}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 mb-3">{review.comment}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                                <span>Helpful ({review.helpful})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-6">
              {/* Stats Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{freelancer.completedOrders}</div>
                    <div className="text-sm text-gray-600">Orders Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{freelancer.rating}</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{freelancer.responseTime}</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600">{freelancer.memberSince}</div>
                    <div className="text-sm text-gray-600">Member Since</div>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Contact Me</span>
                  </button>
                  <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Schedule Call</span>
                  </button>
                  <button 
                    onClick={() => handleSmartContract()}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Zap className="h-5 w-5" />
                    <span>Smart Contract</span>
                  </button>
                </div>
              </div>

              {/* Trust & Safety */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Trust & Safety</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-600">Identity Verified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-600">Email Verified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Top Rated Seller</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm text-gray-600">Fast Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContactModal 
        freelancer={freelancer} 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
      <ScheduleCallModal 
        freelancer={freelancer} 
        isOpen={showScheduleModal} 
        onClose={() => setShowScheduleModal(false)} 
      />
    </div>
  );
};

export default FreelancerProfile;