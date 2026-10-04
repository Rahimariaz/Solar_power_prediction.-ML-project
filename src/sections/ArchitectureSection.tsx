import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Monitor, Server, ShieldCheck, Cpu, Activity, BarChart2, CheckCircle2 } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    { name: 'User Input', desc: 'User adjusts temperature, humidity, wind, & irradiation on React console.', icon: User, tech: 'React 18 + TS' },
    { name: 'React Dashboard', desc: 'Validates bounds and packages request JSON vector.', icon: Monitor, tech: 'Vite + Tailwind' },
    { name: 'REST API', desc: 'FastAPI async route handles POST /predict HTTP payload.', icon: Server, tech: 'FastAPI / CORS' },
    { name: 'Data Validation', desc: 'Pydantic schema enforces physical value bounds.', icon: ShieldCheck, tech: 'Pydantic v2' },
    { name: 'Trained RF Model', desc: 'Scikit-learn Random Forest model evaluates decision trees.', icon: Cpu, tech: 'Scikit-learn RF' },
    { name: 'Prediction Output', desc: 'Model returns calculated AC power in kW.', icon: Activity, tech: 'NumPy / Float' },
    { name: 'Analytics Service', desc: 'Appends clean inference result to local audit history.', icon: BarChart2, tech: 'Recharts + Storage' },
    { name: 'User Dashboard', desc: 'Updates SVG dial gauge & condition insights live.', icon: CheckCircle2, tech: 'Framer Motion' }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400">
            <Server className="w-3.5 h-3.5" />
            System Blueprint
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Project <span className="gradient-text-purple">Architecture</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Interactive system architecture diagram detailing end-to-end data flow from UI controls to REST ML backend.
          </p>
        </div>

        {/* Interactive Pipeline Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.name}
                onClick={() => setActiveStage(idx)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px] ${
                  isActive
                    ? 'bg-solar-card border-amber-400 shadow-xl ring-2 ring-amber-400/20'
                    : 'bg-solar-card/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    0{idx + 1}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">{stage.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-1">{stage.tech}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Box for Selected Stage */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-solar-card border border-amber-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono text-amber-400 uppercase font-semibold">
              Selected Stage 0{activeStage + 1}: {stages[activeStage].name}
            </span>
            <p className="text-base text-slate-200 font-sans">
              {stages[activeStage].desc}
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 whitespace-nowrap">
            Tech: {stages[activeStage].tech}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
