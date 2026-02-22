import React from 'react';
import { Shield, Twitter, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Shield className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                ChainWork
              </span>
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The future of freelancing with AI-powered dispute resolution and blockchain security. 
              <span className="text-blue-300 font-semibold"> Fair</span>, 
              <span className="text-purple-300 font-semibold"> transparent</span>, and 
              <span className="text-cyan-300 font-semibold"> automated</span>.
            </p>
            <div className="flex space-x-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer group transform hover:scale-110">
                <Twitter className="h-5 w-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer group transform hover:scale-110">
                <Github className="h-5 w-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer group transform hover:scale-110">
                <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer group transform hover:scale-110">
                <Mail className="h-5 w-5 text-gray-300 group-hover:text-green-400 transition-colors" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Programming & Tech</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Graphics & Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Writing & Translation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Support</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-gray-300 text-lg">
            &copy; 2024 <span className="font-semibold text-white">ChainWork</span>. All rights reserved. | 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"> Powered by AI</span>, 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"> Secured by Blockchain</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;