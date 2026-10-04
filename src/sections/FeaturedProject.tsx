import React from 'react';
import { motion } from 'framer-motion';
import { Sun, AlertCircle, Lightbulb, ArrowRight, Database, Filter, BarChart2, CheckSquare, GitBranch, Cpu, Activity, Award } from 'lucide-react';

export const FeaturedProject: React.FC = () => {
  const pipelineSteps = [
    { name: 'Dataset', desc: 'Solar Plant Generation & Weather Sensors', icon: Database, color: 'text-amber-400' },
    { name: 'Data Preprocessing', desc: 'Missing value handling, datetime parsing', icon: Filter, color: 'text-cyan-400' },
    { name: 'Exploratory Data Analysis', desc: 'Correlation analysis & thermal patterns', icon: BarChart2, color: 'text-purple-400' },
    { name: 'Feature Selection', desc: 'Irradiation, Temperature, Wind, Humidity', icon: CheckSquare, color: 'text-emerald-400' },
    { name: 'Train/Test Split', desc: '80/20 train-test evaluation partition', icon: GitBranch, color: 'text-blue-400' },
    { name: 'Random Forest Regressor', desc: 'Ensemble of 100 decision trees', icon: Cpu, color: 'text-amber-400' },
    { name: 'Prediction', desc: 'Real-time AC power output (kW)', icon: Activity, color: 'text-rose-400' },
    { name: 'Performance Evaluation', desc: 'R² = 0.9854, MAE = 17.26 kW', icon: Award, color: 'text-emerald-400' },
  ];

  return (
    <section id="solarpulse-ai" className="py-24 relative overflow-hidden">
      {/* Background glowing ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Sun className="w-4 h-4 animate-spin-slow" />
            Featured Machine Learning Research
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SolarPulse <span className="gradient-text-solar">AI</span>
          </h2>
          <p className="text-amber-400 font-mono text-lg font-semibold">
            Solar Power Generation Prediction
          </p>
        </div>

        {/* Problem vs Solution Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Problem Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-slate-900/90 border border-rose-500/30 backdrop-blur-xl shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-sans">The Challenge</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Solar power generation fluctuates rapidly with environmental and weather conditions—such as solar irradiance, ambient heat, wind velocity, and humidity—making accurate power forecasting exceptionally challenging for grid operators.
            </p>
          </motion.div>

          {/* Solution Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-sans">The ML Solution</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Leverage historical solar sensor datasets and train an ensemble Random Forest Regressor algorithm to learn non-linear environmental relationships and predict real-time AC power output with high accuracy.
            </p>
          </motion.div>

        </div>

        {/* Visual Pipeline Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              Machine Learning Pipeline Architecture
            </h3>
            <span className="text-xs font-mono text-slate-400">8 Modular Stages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-5 rounded-xl bg-solar-card border border-slate-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        Stage 0{index + 1}
                      </span>
                      <Icon className={`w-5 h-5 ${step.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <h4 className="text-base font-bold text-white font-mono">{step.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                  
                  {index < pipelineSteps.length - 1 && (
                    <div className="pt-3 hidden lg:block text-slate-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
