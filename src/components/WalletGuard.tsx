import React, { useEffect, useState } from 'react';
import { Wallet, Shield } from 'lucide-react';

interface WalletGuardProps {
  children: React.ReactNode;
}

const WalletGuard: React.FC<WalletGuardProps> = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [checking, setChecking] = useState(true);

  const checkWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        setIsWalletConnected(false);
        setChecking(false);
        return;
      }
      const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
      const connected = accounts && accounts.length > 0 && localStorage.getItem('isWalletConnected') === 'true';
      setIsWalletConnected(connected);
    } catch (err) {
      setIsWalletConnected(false);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkWallet();

    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isWalletConnected') {
        checkWallet();
      }
    };

    // Poll for changes (local component update)
    const interval = setInterval(checkWallet, 1000);

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isWalletConnected) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 md:p-20 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-xl text-center my-12 mx-4 md:mx-auto max-w-5xl">
        <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center mb-8 animate-pulse text-indigo-600 shadow-inner">
          <Wallet className="h-12 w-12" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Web3 Identity Required</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-10 font-medium leading-relaxed">
          The main functionality of this platform is locked to your blockchain identity. Please connect your MetaMask wallet to gain full access.
        </p>
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 text-indigo-700 font-bold bg-indigo-50/80 px-8 py-4 rounded-2xl border border-indigo-100 shadow-sm">
            <Shield className="h-6 w-6" />
            <span>Secured via Smart Contract Protocols</span>
          </div>
          
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest block">
            Connecting is safe and reduces network exposure when not in use.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WalletGuard;
