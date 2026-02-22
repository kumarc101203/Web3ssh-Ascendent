import React from 'react';
import { Search, HandHeart, Shield, Zap } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find the Perfect Service',
    description: 'Browse our marketplace and find the right freelancer for your project.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100'
  },
  {
    icon: HandHeart,
    title: 'Secure Smart Contract',
    description: 'Funds are held in escrow by our Solidity-based smart contract.',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100'
  },
  {
    icon: Shield,
    title: 'AI-Powered Protection',
    description: 'If disputes arise, our Vertex-AI system evaluates evidence fairly.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100'
  },
  {
    icon: Zap,
    title: 'Instant Resolution',
    description: 'Chainlink oracles deliver automated verdicts and release payments.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-100'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            How ChainWork Revolutionizes Freelancing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our blockchain-powered platform ensures fair transactions and dispute resolution through 
            <span className="font-semibold text-purple-700"> advanced AI technology</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                {/* Icon Container */}
                <div className="relative mb-8 flex flex-col items-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-2xl shadow-current/30 group-hover:shadow-3xl group-hover:shadow-current/50 transition-all duration-500 group-hover:scale-110 transform`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                {/* Content Card */}
                <div className={`bg-gradient-to-br ${step.bgColor} rounded-2xl p-6 shadow-xl border border-gray-200/50 group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 h-40 flex flex-col justify-center`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Additional spacing for better visual balance */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full border border-blue-200/50 shadow-lg">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Powered by Blockchain & AI Technology
            </span>
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;