'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useToast } from './ToastProvider';

export default function ThreeDLoginCard({ startFlipped = false }: { startFlipped?: boolean }) {
  const router = useRouter();
  const { addToast } = useToast();
  const [isFlipped, setIsFlipped] = useState(startFlipped);

  // Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [signUpName, setSignUpName] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setSuccessMsg('Login successful! Redirecting...');
      addToast(`Welcome back, ${data.user.fullName || data.user.username}!`, 'success');
      setTimeout(() => {
        if (data.user.role === 'admin' || data.user.role === 'team_head') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
      addToast(err.message || 'Login error', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpUsername || !signUpEmail || !signUpPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signUpName,
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword,
          level: 'CAF',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccessMsg('Account registered successfully! Redirecting...');
      addToast('Welcome to The TaxMan\'s Capital!', 'success');
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration error.');
      addToast(err.message || 'Registration error', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        className={`relative w-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE: LOGIN FORM */}
        <div
          className={`w-full bg-[#011126]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,200,83,0.15)] ${
            isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Student & Alumni Sign In</h2>
            <p className="text-xs text-gray-400 mt-1">Access your articleship tracker & study notes</p>
          </div>

          {errorMsg && !isFlipped && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && !isFlipped && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@example.com"
                  required
                  className="w-full bg-[#010814] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#010814] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setIsFlipped(true);
                }}
                className="text-emerald-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* BACK SIDE: SIGNUP FORM */}
        <div
          className={`w-full bg-[#011126]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,200,83,0.15)] rotate-y-180 ${
            !isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Create Student Account</h2>
            <p className="text-xs text-gray-400 mt-1">Join Pakistan&apos;s #1 CA & ACCA Network</p>
          </div>

          {errorMsg && isFlipped && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && isFlipped && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="Ali Hassan"
                required
                className="w-full bg-[#010814] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Username</label>
              <input
                type="text"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
                placeholder="ali_ca_2026"
                required
                className="w-full bg-[#010814] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="ali@example.com"
                required
                className="w-full bg-[#010814] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showSignUpPassword ? 'text' : 'password'}
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Min 8 chars (letters & numbers)"
                  required
                  className="w-full bg-[#010814] border border-white/10 rounded-xl pl-3.5 pr-10 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors"
                >
                  {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all cursor-pointer mt-2"
            >
              {isSubmitting ? 'Registering Account...' : 'Complete Registration'}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setIsFlipped(false);
                }}
                className="text-emerald-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
