import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, GitBranch, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const ModelExplainer: React.FC = () => {
  const advantages = [
    {
      title: "Handles Non-linear Relationships",
      desc: "Solar irradiation and ambient temperature have complex non-linear interactions with solar cell voltage and current."
    },
    {
      title: "Works Exceptionally Well with Tabular Data",
      desc: "Decision trees naturally partition high-dimensional tabular feature spaces without needing extensive normalization."
    },
    {
      title: "High Predictive Robustness",
      desc: "Averaging predictions over an ensemble of 100 decision trees reduces variance and prevents overfitting."
    },
    {
      title: "Resilient Against Outliers & Noise",
      desc: "Randomized sub-sampling of data features ensures sensor anomalies in raw telemetry do not distort predictions."
    }
  ];

  return (
    <section id="model" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400">
            <Cpu className="w-3.5 h-3.5" />
            Educational Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            How the <span className="gradient-text-purple">AI Works</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Random Forest combines predictions from multiple decision trees to produce a robust regression result.
          </p>
        </div>

        {/* Tree Ensemble Visual Flow Diagram */}
        <div className="p-8 rounded-3xl bg-solar-card border border-slate-800 backdrop-blur-xl shadow-2xl mb-16 space-y-8">
          
          <div className="text-center border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold font-mono text-white">
              Random Forest Regressor Decision Pipeline
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Parallel Decision Trees with Bootstrap Aggregation (Bagging)
            </p>
          </div>

          {/* Flow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center font-mono">
            
            {/* Input Features */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-amber-400 font-bold uppercase">Input Vector</span>
              <p className="text-xs text-slate-300">Temp, Humidity, Wind, Irradiation</p>
            </div>

            <div className="hidden md:block text-slate-600">→</div>

            {/* Parallel Decision Trees */}
            <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-2 relative">
              <div className="flex justify-center gap-2 text-purple-400 mb-1">
                <GitBranch className="w-4 h-4" />
                <GitBranch className="w-4 h-4" />
                <GitBranch className="w-4 h-4" />
              </div>
              <span className="text-xs text-purple-300 font-bold">Ensemble (100 Trees)</span>
              <p className="text-[11px] text-slate-400">Decision Trees 1..N</p>
            </div>

            <div className="hidden md:block text-slate-600">→</div>

            {/* Combined Averaged Output */}
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2">
              <Zap className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs text-emerald-400 font-bold">Mean Aggregation</span>
              <p className="text-xs text-white font-bold">Predicted AC Power (kW)</p>
            </div>

          </div>

          {/* Explanation Quote */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono text-center max-w-2xl mx-auto">
            "Random Forest combines predictions from multiple decision trees to produce a robust regression result."
          </div>

        </div>

        {/* Why Random Forest Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            Why Random Forest?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((adv, idx) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-solar-card border border-slate-800 hover:border-purple-500/30 transition-all flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white font-mono">{adv.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{adv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
