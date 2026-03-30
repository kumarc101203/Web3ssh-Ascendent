import { Network, BrainCircuit, LockKeyhole, Coins } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 py-16 px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent drop-shadow-sm">
            AI-Triggered Web3 Escrow
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
            The next generation of freelance security. Your funds are secured by cryptographic math, and disputes are resolved by unbiased, instantaneous Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="relative group perspective">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <div className="relative h-full bg-white/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/80 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1)] flex flex-col items-center text-center transform transition-transform duration-500 hover:rotate-y-12 hover:-translate-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 shadow-[inset_4px_4px_10px_white,inset_-4px_-4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center mb-6">
                <Network className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">1. Connect</h3>
              <p className="text-gray-600 font-medium line-clamp-4">
                Client and Freelancer agree on terms. Project parameters, deadlines, and requirements are hashed onto the Ethereum network immutably.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group perspective">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <div className="relative h-full bg-white/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/80 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1)] flex flex-col items-center text-center transform transition-transform duration-500 hover:rotate-y-12 hover:-translate-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 shadow-[inset_4px_4px_10px_white,inset_-4px_-4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center mb-6">
                <LockKeyhole className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">2. Lock Funds</h3>
              <p className="text-gray-600 font-medium line-clamp-4">
                The client deposits cryptocurrency (ETH) into our impenetrable Smart Contract escrow. Funds are cryptographically locked until completion.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group perspective">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <div className="relative h-full bg-white/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/80 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1)] flex flex-col items-center text-center transform transition-transform duration-500 hover:rotate-y-12 hover:-translate-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 shadow-[inset_4px_4px_10px_white,inset_-4px_-4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center mb-6">
                <BrainCircuit className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">3. AI Verification</h3>
              <p className="text-gray-600 font-medium line-clamp-4">
                Upon delivery, if a dispute arises, our Chainlink-powered highly advanced AI Model parses the deliverables and acts as an immediate, flawless judge.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative group perspective">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <div className="relative h-full bg-white/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/80 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1)] flex flex-col items-center text-center transform transition-transform duration-500 hover:rotate-y-12 hover:-translate-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-[inset_4px_4px_10px_white,inset_-4px_-4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center mb-6">
                <Coins className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">4. Release</h3>
              <p className="text-gray-600 font-medium line-clamp-4">
                The Smart Contract automatically executes the ruling. Funds are instantly distributed to the rightful party via Web3 automation. No human bias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
