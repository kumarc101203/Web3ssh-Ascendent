import React, { useEffect, useState } from 'react';
import { Search, User, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChangedListener, logoutUser } from '../auth';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setDropdownOpen(false);
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg shadow-blue-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 group cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <Shield className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-all duration-300 drop-shadow-lg" />
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                ChainWork
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => navigate('/services')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group">
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group">
                Disputes
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group">
                Become a Freelancer
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white shadow-sm hover:shadow-md"
              />
            </div>
            {currentUser ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 p-2 rounded-full hover:bg-blue-50 hover:scale-110"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline text-sm font-semibold">{currentUser.displayName || currentUser.email}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="block w-full px-4 py-3 text-gray-700 font-semibold border-b border-gray-100 rounded-t-xl">
                      {currentUser.displayName || currentUser.email}
                    </div>
                    <button
                      className="block w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 rounded-b-xl"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 p-2 rounded-full hover:bg-blue-50 hover:scale-110"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  <User className="h-5 w-5" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 rounded-t-xl"
                      onClick={() => { setDropdownOpen(false); navigate('/signup'); }}
                    >
                      Sign Up
                    </button>
                    <button
                      className="block w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 rounded-b-xl"
                      onClick={() => { setDropdownOpen(false); navigate('/signup'); }}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;