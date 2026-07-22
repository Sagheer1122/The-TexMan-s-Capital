'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Briefcase,
  BookOpen,
  Users,
  Award,
  Bell,
  Sparkles,
  User,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Calendar,
  Radio
} from 'lucide-react';
import { useToast } from './ToastProvider';

interface NavbarProps {
  initialUser?: any;
}

export default function Navbar({ initialUser }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { addToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(initialUser || null);

  useEffect(() => {
    // Sync active session user
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      addToast('Logged out successfully', 'info');
      router.push('/login');
      router.refresh();
    } catch (err) {
      addToast('Logout failed', 'error');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: <Award className="w-4 h-4" /> },
    { name: 'Jobs & Articleship', href: '/jobs', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Resources Hub', href: '/resources', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Career Counseling', href: '/counseling', icon: <Users className="w-4 h-4" /> },
    { name: 'AI Career Suite', href: '/tools', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
    { name: 'Notices', href: '/announcements', icon: <Bell className="w-4 h-4" /> },
    { name: 'Events', href: '/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Podcasts', href: '/podcasts', icon: <Radio className="w-4 h-4" /> },
    { name: 'Community', href: '/community', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#010D1E]/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C853] to-emerald-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-[0_0_15px_rgba(0,200,83,0.4)] group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-none">
                The TaxMan&apos;s <span className="text-[#00C853]">Capital</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block mt-1">
                CA & ACCA Career Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 bg-[#01162E]/60 p-1.5 rounded-2xl border border-emerald-500/15">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00C853] to-emerald-600 text-slate-950 shadow-[0_0_12px_rgba(0,200,83,0.3)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Admin Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3 bg-[#01162E] p-1.5 rounded-2xl border border-emerald-500/20">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {user.fullName || user.username}
                  </span>
                </Link>

                {(user.role === 'admin' || user.role === 'team_head') && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/25 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C853] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(0,200,83,0.3)] transition-all hover:scale-105"
              >
                Student Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#01162E] text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#010D1E]/95 border-b border-emerald-500/20 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? 'bg-[#00C853] text-slate-950'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          {!user ? (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center mt-4 py-3 rounded-xl bg-[#00C853] text-slate-950 font-bold text-sm"
            >
              Sign In / Register
            </Link>
          ) : (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-emerald-400"
              >
                Dashboard ({user.username})
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-xs font-bold text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
