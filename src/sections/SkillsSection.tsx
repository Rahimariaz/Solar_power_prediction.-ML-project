import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Server, Database, Wrench, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      category: 'Programming',
      icon: Code2,
      skills: ['Python', 'Java', 'C', 'C++'],
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      category: 'Machine Learning & Data Science',
      icon: Cpu,
      skills: ['Machine Learning', 'Scikit-learn', 'Data Science', 'OpenCV'],
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    },
    {
      category: 'Web Development',
      icon: Globe,
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    },
    {
      category: 'Backend Architecture',
      icon: Server,
      skills: ['FastAPI', 'Flask', 'Node.js'],
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      category: 'Database Management',
      icon: Database,
      skills: ['SQL', 'MySQL'],
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
    },
    {
      category: 'Developer Tools',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'VS Code'],
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
    }
  ];

  return (
    <section id="skills" className="py-20 relative bg-solar-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Skills & <span className="gradient-text-cyan">Competencies</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Comprehensive proficiency in core computer science fundamentals, machine learning frameworks, data science toolkits, and modern web architectures.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-solar-card border border-slate-800 hover:border-slate-700 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {cat.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all hover:scale-105 cursor-default ${cat.badgeColor}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
