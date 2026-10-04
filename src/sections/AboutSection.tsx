import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Code, Rocket, UserCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const cards = [
    {
      icon: Brain,
      title: "AI & Data Science Student",
      description: "Dedicated student focusing on Artificial Intelligence, Machine Learning algorithms, mathematical optimization, and statistical modeling.",
      color: "from-amber-400 to-orange-500",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/20"
    },
    {
      icon: Database,
      title: "Data Science & Analytics",
      description: "Experienced in feature engineering, exploratory data analysis (EDA), data cleaning, tabular data pipelines, and predictive analytics.",
      color: "from-cyan-400 to-blue-500",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-500/20"
    },
    {
      icon: Code,
      title: "Software Development",
      description: "Building production-grade applications with full-stack frameworks (React, TypeScript) and high-performance Python REST APIs (FastAPI, Flask).",
      color: "from-purple-400 to-pink-500",
      textColor: "text-purple-400",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Rocket,
      title: "Real-World AI Solutions",
      description: "Passionate about applying Machine Learning to solve impactful real-world challenges in renewable energy, forecasting, and automated control.",
      color: "from-emerald-400 to-teal-500",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/20"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400">
            <UserCheck className="w-3.5 h-3.5" />
            Professional Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            About <span className="gradient-text-solar">Me</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Artificial Intelligence & Data Science student building real-world AI solutions at the intersection of machine learning, data engineering, and web technology.
          </p>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-solar-card border ${card.borderColor} backdrop-blur-xl hover:border-slate-700 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 text-white shadow-inner group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
