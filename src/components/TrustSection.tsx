import React from 'react';
import { Shield, Eye, Clock, Award, Sparkles } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-12 w-12 text-yellow-300 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Built on Trust, Secured by Blockchain
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Our platform leverages cutting-edge technology to ensure every transaction is 
            <span className="font-semibold text-white"> secure</span>, 
            <span className="font-semibold text-white"> transparent</span>, and 
            <span className="font-semibold text-white"> fair</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group text-center text-white transform hover:scale-105 transition-all duration-500">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-white/10 group-hover:shadow-3xl group-hover:shadow-white/20 transition-all duration-500 group-hover:bg-white/30">
              <Shield className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">100%</h3>
            <p className="text-blue-100 text-lg font-medium">Secure Transactions</p>
          </div>
          
          <div className="group text-center text-white transform hover:scale-105 transition-all duration-500">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-white/10 group-hover:shadow-3xl group-hover:shadow-white/20 transition-all duration-500 group-hover:bg-white/30">
              <Eye className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">99.9%</h3>
            <p className="text-blue-100 text-lg font-medium">Dispute Resolution Accuracy</p>
          </div>
          
          <div className="group text-center text-white transform hover:scale-105 transition-all duration-500">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-white/10 group-hover:shadow-3xl group-hover:shadow-white/20 transition-all duration-500 group-hover:bg-white/30">
              <Clock className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">&lt;30s</h3>
            <p className="text-blue-100 text-lg font-medium">Average Resolution Time</p>
          </div>
          
          <div className="group text-center text-white transform hover:scale-105 transition-all duration-500">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-white/10 group-hover:shadow-3xl group-hover:shadow-white/20 transition-all duration-500 group-hover:bg-white/30">
              <Award className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">50K+</h3>
            <p className="text-blue-100 text-lg font-medium">Successful Projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;