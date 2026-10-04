import React, { useState } from 'react';
import { Sun, Menu, X, Cpu } from 'lucide-react';
import { ApiHealthResponse } from '../types/prediction';

interface NavbarProps {
  health: ApiHealthResponse;
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ health, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'SolarPulse AI', href: '#solarpulse-ai' },
    { name: 'Prediction', href: '#prediction' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'Model', href: '#model' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    if (onNavigate) {
      onNavigate(targetId);
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isOnline = health.status === 'online';

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-solar-dark/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
            <Sun className="w-6 h-6 text-slate-950 animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-mono flex items-center gap-1.5">
              SOLARPULSE <span className="text-amber-400 font-extrabold">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
              Solar Energy Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-3 py-2 text-xs lg:text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Real Backend Status Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-2 border shadow-inner ${
            isOnline
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 shadow-emerald-500/10'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-400 shadow-rose-500/10'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
            <span>{isOnline ? '● ML API ONLINE' : '● ML API OFFLINE'}</span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-solar-dark/95 border-b border-slate-800 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2">
          <div className="mb-4 pt-2 flex items-center justify-between border-b border-slate-800 pb-3">
            <div className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-2 border ${
              isOnline ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' : 'bg-rose-950/60 border-rose-500/40 text-rose-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span>{isOnline ? '● ML API ONLINE' : '● ML API OFFLINE'}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">v1.0.0</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-800/80 rounded-lg transition-all flex items-center gap-2"
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400/70" />
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
