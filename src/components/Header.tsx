import { useEffect, useState } from 'react';
import { Search, User, Shield, Wallet, Power } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChangedListener, logoutUser } from '../auth';
import { ethers } from 'ethers';
import { fetchAPI } from '../utils/api';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isSepolia, setIsSepolia] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  const handleConnectWallet = async () => {
    if (walletAddress) {
      // Manual Disconnect (UI level)
      setWalletAddress(null);
      localStorage.removeItem('isWalletConnected');
      return;
    }

    try {
      if (!window.ethereum) throw new Error("No crypto wallet found. Please install MetaMask.");
      
      // Force MetaMask to show the 'Select Account' modal by requesting permissions
      await window.ethereum.request({ 
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }] 
      });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      localStorage.setItem('isWalletConnected', 'true');
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const health = await fetchAPI('/health');
        setBackendStatus(health.status === 'healthy' ? 'online' : 'offline');
      } catch (e) {
        setBackendStatus('offline');
      }

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        setIsSepolia(network.chainId === 11155111n || network.chainId === BigInt(11155111));
        
        // Auto-detect existing connection
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0 && localStorage.getItem('isWalletConnected') === 'true') {
          setWalletAddress(accounts[0]);
        } else {
          localStorage.removeItem('isWalletConnected');
        }
      }
    };
    checkStatus();

    // Re-check on network change
      if (window.ethereum) {
        window.ethereum.on('chainChanged', checkStatus);
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            setWalletAddress(null);
            localStorage.removeItem('isWalletConnected');
          } else {
            setWalletAddress(accounts[0]);
            localStorage.setItem('isWalletConnected', 'true');
          }
          checkStatus();
        });
      }


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
              {currentUser && (
                <>
                  <button 
                    onClick={() => navigate('/services')}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
                  >
                    Services
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button 
                    onClick={() => navigate('/how-it-works')}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
                  >
                    How It Works
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button 
                    onClick={() => navigate('/disputes')}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
                  >
                    Disputes
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </>
              )}
              {!currentUser && (
                <button 
                  onClick={() => navigate('/signup')}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
                >
                  Become a Freelancer
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                <div className="relative hidden md:block group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white shadow-sm hover:shadow-md"
                  />
                </div>
                
                {walletAddress && (
                  <div className="hidden md:flex items-center space-x-3 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-tighter">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1 ${isSepolia ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                      <span className={isSepolia ? 'text-green-600' : 'text-red-600'}>Sepolia</span>
                    </div>
                    <div className="w-px h-3 bg-gray-300"></div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1 ${backendStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                      <span className={backendStatus === 'online' ? 'text-green-600' : 'text-red-600'}>Backend</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleConnectWallet}
                  className={`flex items-center space-x-2 font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 ${
                    walletAddress 
                      ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:scale-105'
                  }`}
                >
                  {walletAddress ? <Power className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
                  <span className="hidden sm:inline">
                    {walletAddress ? 'Disconnect' : 'Connect Wallet'}
                  </span>
                </button>
                
                {walletAddress && (
                  <div className="hidden lg:block bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Active Account</p>
                    <p className="font-mono text-xs text-indigo-600 font-bold leading-none">
                      {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                    </p>
                  </div>
                )}
              </>
            )}
            
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