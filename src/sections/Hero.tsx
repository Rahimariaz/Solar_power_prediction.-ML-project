import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ApiHealthResponse } from '../types/prediction';
import { SolarVisualizer } from '../components/SolarVisualizer';

interface HeroProps {
  health: ApiHealthResponse;
  onExploreClick: () => void;
  onPredictClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ health, onExploreClick, onPredictClick }) => {
  const isOnline = health.status === 'online';

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/10 to-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Live API Health Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg">
              <div className={`flex items-center gap-2 text-xs font-mono font-bold ${
                isOnline ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                <span>{isOnline ? '● ML API ONLINE' : '● ML API OFFLINE'}</span>
              </div>
              <span className="w-px h-3 bg-slate-700" />
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Zero Dummy Data
              </span>
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
                Building Intelligent Solutions with <span className="gradient-text-solar">AI, Data & Code.</span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 font-mono">
                SolarPulse AI — Predicting Solar Power with Machine Learning.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                An interactive machine learning system that analyzes environmental conditions and predicts solar power generation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore SolarPulse AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onPredictClick}
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Run Prediction</span>
              </button>
            </div>

            {/* Features summary pills */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Random Forest</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>R² Score: 0.9854</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>68,774 Dataset Rows</span>
              </div>
            </div>
          </motion.div>

          {/* Right Solar Animated Canvas Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 h-[420px] w-full"
          >
            <SolarVisualizer />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
