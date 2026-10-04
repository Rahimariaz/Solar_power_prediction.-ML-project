import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

export const ProgressTimeline: React.FC = () => {
  const milestones = [
    { name: 'Problem Identification', status: 'Completed', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { name: 'Literature Survey', status: 'Completed', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { name: 'Dataset Collection', status: 'Completed', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { name: 'Data Preprocessing', status: 'In Progress', icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { name: 'EDA (Exploratory Analysis)', status: 'In Progress', icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { name: 'ML Model Development', status: 'In Progress', icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { name: 'REST API Integration', status: 'Active', icon: Sparkles, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { name: 'Interactive Dashboard', status: 'In Progress', icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { name: 'Production Deployment', status: 'Upcoming', icon: ArrowUpRight, color: 'text-slate-400 bg-slate-800 border-slate-700' }
  ];

  return (
    <section className="py-20 relative bg-solar-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            Development Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Project <span className="gradient-text-solar">Progress</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Current execution status across project milestones.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-solar-card border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500">Milestone 0{idx + 1}</span>
                  <h4 className="text-sm font-bold text-white font-mono">{m.name}</h4>
                </div>
                <div className={`px-3 py-1 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 whitespace-nowrap ${m.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.status}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
