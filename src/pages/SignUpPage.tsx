import React, { useState } from 'react';
import { registerUser, loginUser } from "../auth"; // adjust the path if needed
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";



const roles = [
  {
    label: 'Client',
    value: 'client',
    description: 'Hire top freelancers for your projects, manage work, and pay securely.',
    details: 'As a client, you can post jobs, review proposals, chat with freelancers, and ensure your projects are completed on time and within budget. Enjoy a seamless hiring experience with full control and transparency.',
    icon: (
      <svg className="w-12 h-12 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5V6a4.5 4.5 0 10-9 0v1.5m-2.25 0A2.25 2.25 0 003 9.75v8.25A2.25 2.25 0 005.25 20.25h13.5A2.25 2.25 0 0021 18V9.75a2.25 2.25 0 00-2.25-2.25h-13.5z" /></svg>
    ),
    highlight: 'For businesses, startups, and anyone looking to get work done efficiently.'
  },
  {
    label: 'Freelancer',
    value: 'freelancer',
    description: 'Showcase your skills, find jobs, and get paid for your freelance work.',
    details: 'As a freelancer, you can create a standout profile, bid on projects that match your expertise, communicate with clients, and build your reputation. Unlock new opportunities and grow your freelance career with us.',
    icon: (
      <svg className="w-12 h-12 text-purple-600 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.75 22.5h-11.5A2.25 2.25 0 014.5 20.25v-.75z" /></svg>
    ),
    highlight: 'For professionals, creatives, and experts seeking flexible work and growth.'
  },
];

const illustrationUrl =
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80';

const SignUpPage = () => {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setSuccess('');
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setLoading(true);

  try {
    if (mode === 'signup') {
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // 🔐 Firebase Signup
      const userCredential = await registerUser(form.email, form.password);

// Set user's display name
if (userCredential.user) {
  await updateProfile(userCredential.user, {
    displayName: form.name,
  });
}

setSuccess('Signup successful!');
setShowRoleSelect(true);


    } else {
      // 🔑 Firebase Sign-in
      await loginUser(form.email, form.password);
      setSuccess('Signed in successfully!');
      resetForm();
      navigate('/'); // Redirect to home after sign in
    }
  } catch (err: any) {
    setError(err.message || 'An error occurred');
  } finally {
    setLoading(false);
  }
};


  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setTimeout(() => {
      setShowRoleSelect(false);
      setSuccess('Role selected: ' + role.charAt(0).toUpperCase() + role.slice(1));
      resetForm();
      navigate('/'); // Redirect to home after role selection
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-8 px-2">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-0 md:gap-8 p-0 md:p-8 bg-white/90 rounded-3xl shadow-2xl border border-blue-100 relative overflow-hidden animate-fadeIn">
        {/* Illustration and Welcome Content */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 h-full p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-50 rounded-3xl">
          <img src={illustrationUrl} alt="Freelance work" className="w-72 h-72 object-cover rounded-2xl shadow-lg mb-6" />
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Welcome to ChainWork!</h2>
          <p className="text-lg text-gray-700 text-center max-w-xs">Join a thriving community of clients and freelancers. Sign up to hire top talent or find your next big opportunity!</p>
        </div>
        {/* Form Card */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center z-10">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 font-semibold rounded-l-lg border border-blue-600 transition-colors duration-200 ${mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
              onClick={() => { setMode('signup'); resetForm(); setShowRoleSelect(false); }}
            >
              Sign Up
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-r-lg border border-blue-600 transition-colors duration-200 ${mode === 'signin' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
              onClick={() => { setMode('signin'); resetForm(); setShowRoleSelect(false); }}
            >
              Sign In
            </button>
          </div>
          <h2 className="text-2xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 bg-clip-text text-transparent drop-shadow-lg">
            {mode === 'signup' ? 'Create an Account' : 'Welcome Back!'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-sm"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-sm"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-sm"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 text-xs"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {mode === 'signup' && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-sm"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 text-xs"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            )}
            {error && <div className="text-red-500 text-sm animate-shake">{error}</div>}
            {success && <div className="text-green-600 text-sm animate-fadeIn">{success}</div>}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (mode === 'signup' ? 'Signing Up...' : 'Signing In...') : (mode === 'signup' ? 'Create Account' : 'Sign In')}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button className="text-blue-600 hover:underline" onClick={() => { setMode('signin'); resetForm(); setShowRoleSelect(false); }}>
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button className="text-blue-600 hover:underline" onClick={() => { setMode('signup'); resetForm(); setShowRoleSelect(false); }}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
        {/* Role Selection Modal/Section */}
        {showRoleSelect && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative animate-slideInUp border-2 border-blue-100 flex flex-col md:flex-row items-center gap-8">
              <h3 className="text-2xl font-extrabold text-center mb-2 text-blue-700 w-full">Select Your Role</h3>
              <p className="text-gray-600 text-center mb-6 max-w-2xl w-full">To personalize your experience, please tell us how you plan to use ChainWork.</p>
              <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                    className={`flex-1 min-w-[320px] max-w-[400px] flex flex-col items-center p-8 border-2 rounded-3xl transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 focus:ring-2 focus:ring-blue-400 ${selectedRole === role.value ? (role.value === 'client' ? 'border-blue-600 bg-blue-50' : 'border-purple-600 bg-purple-50') : 'border-blue-200 bg-white'}`}
                  >
                    {role.icon}
                    <span className={`text-2xl font-bold mb-2 ${role.value === 'client' ? 'text-blue-700' : 'text-purple-700'}`}>{role.label}</span>
                    <span className="text-gray-700 text-base mb-2 text-center font-medium">{role.description}</span>
                    <span className="text-gray-500 text-sm text-center mb-2">{role.details}</span>
                    <span className={`text-xs font-semibold mt-2 ${role.value === 'client' ? 'text-blue-500' : 'text-purple-500'}`}>{role.highlight}</span>
                  </button>
                ))}
              </div>
              {selectedRole && (
                <div className="mt-6 text-green-600 text-center animate-fadeIn text-lg w-full">
                  You selected: <b>{roles.find(r => r.value === selectedRole)?.label}</b>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s; }
        @keyframes slideInUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideInUp { animation: slideInUp 0.4s; }
        @keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.4s; }
      `}</style>
    </div>
  );
};

export default SignUpPage; 