import React from 'react';
import { ArrowRight, Shield, Zap, Brain, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full border border-blue-200/50 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                AI-Powered Dispute Resolution
              </span>
              <Zap className="h-4 w-4 text-purple-600 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            The Future of
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Freelance Work
            </span>
            <br />
            <span className="text-4xl md:text-5xl bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              is Here
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Experience the world's first <span className="font-semibold text-blue-700">blockchain-powered marketplace</span> with 
            <span className="font-semibold text-purple-700"> AI-driven dispute resolution</span>. 
            Fair, transparent, and automated using <span className="font-semibold text-indigo-700">Vertex-AI</span> and 
            <span className="font-semibold text-cyan-700"> Chainlink oracles</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:shadow-blue-500/50 transform hover:scale-105 hover:-translate-y-1">
              <span>Find Services</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl text-lg font-bold hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              Become a Freelancer
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl mb-6 mx-auto w-fit shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Blockchain Security</h3>
                <p className="text-gray-600 leading-relaxed">Smart contracts ensure payments are secured and disputes are resolved fairly with immutable transparency.</p>
              </div>
            </div>
            
            <div className="group bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl mb-6 mx-auto w-fit shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Dispute Resolution</h3>
                <p className="text-gray-600 leading-relaxed">Advanced AI analyzes evidence and delivers unbiased verdicts in seconds with 99.9% accuracy.</p>
              </div>
            </div>
            
            <div className="group bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-2xl mb-6 mx-auto w-fit shadow-lg shadow-yellow-500/30 group-hover:shadow-xl group-hover:shadow-yellow-500/50 transition-all duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Payments</h3>
                <p className="text-gray-600 leading-relaxed">Automatic escrow release based on smart contract conditions with lightning-fast execution.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;