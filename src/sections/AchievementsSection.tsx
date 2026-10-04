import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      title: "Artificial Intelligence & Data Science Specialization",
      org: "Academic Excellence",
      desc: "Demonstrated strong mastery in statistical modeling, machine learning algorithms, and deep neural networks.",
      icon: Trophy,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30"
    },
    {
      title: "Solar Power ML Prediction Pipeline",
      org: "Independent AI Project",
      desc: "Successfully trained Random Forest Regressor on 68,774 solar plant records achieving R² score of 0.9854 and low MAE of 17.26 kW.",
      icon: Star,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
    },
    {
      title: "Full-Stack AI REST Architecture Integration",
      org: "Software Systems Engineering",
      desc: "Built backend REST ML API with FastAPI and frontend control center with React, TypeScript, and Tailwind CSS.",
      icon: Award,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    }
  ];

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            Milestones & Recognition
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Key <span className="gradient-text-solar">Achievements</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Highlights of academic and project milestones in Artificial Intelligence and Software Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-solar-card border border-slate-800 space-y-4 shadow-xl"
              >
                <div className={`p-3 rounded-xl border w-fit ${ach.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{ach.org}</span>
                  <h3 className="text-lg font-bold text-white font-mono mt-1">{ach.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {ach.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
