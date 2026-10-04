import React from 'react';
import { Sun, Github, Linkedin, Mail, Shield, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950">
                <Sun className="w-5 h-5 animate-spin-slow" />
              </div>
              <span className="text-xl font-bold font-mono text-white">
                SOLARPULSE <span className="text-amber-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              AI-Powered Solar Energy Intelligence platform integrating real Random Forest Machine Learning model inference with interactive environmental simulation.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Random Forest Regressor
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                Zero Dummy Data Policy
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#solarpulse-ai" className="hover:text-amber-400 transition-colors">SolarPulse AI</a></li>
              <li><a href="#prediction" className="hover:text-amber-400 transition-colors">Live Prediction Center</a></li>
              <li><a href="#simulator" className="hover:text-amber-400 transition-colors">What-If Simulator</a></li>
              <li><a href="#analytics" className="hover:text-amber-400 transition-colors">Analytics Dashboard</a></li>
              <li><a href="#model" className="hover:text-amber-400 transition-colors">Model Architecture</a></li>
            </ul>
          </div>

          {/* Portfolio Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Developer</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Researcher</a></li>
              <li><a href="#skills" className="hover:text-amber-400 transition-colors">Skills & Tech Stack</a></li>
              <li><a href="#projects" className="hover:text-amber-400 transition-colors">Featured Projects</a></li>
              <li><a href="#achievements" className="hover:text-amber-400 transition-colors">Achievements</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Get in Touch</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 font-mono">
            © {new Date().getFullYear()} SolarPulse AI. Built with React, TypeScript, FastAPI & Scikit-learn.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="mailto:contact@solarpulse.ai" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
