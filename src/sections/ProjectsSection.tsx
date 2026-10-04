import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, Code } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "SolarPulse AI Platform",
      desc: "Interactive Machine Learning solar power forecasting platform backed by a Scikit-learn Random Forest model and FastAPI REST architecture.",
      tech: ["Python", "FastAPI", "Scikit-learn", "React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com",
      live: "#home"
    },
    {
      title: "Real-time Defect Detection Pipeline",
      desc: "Computer vision classification system using OpenCV and deep learning feature extractors for automated manufacturing quality control.",
      tech: ["Python", "OpenCV", "PyTorch", "Flask", "Docker"],
      github: "https://github.com"
    },
    {
      title: "Predictive Maintenance Telemetry Dashboard",
      desc: "Industrial IoT sensor analytics dashboard processing multivariate time-series data to predict equipment downtime.",
      tech: ["Python", "Pandas", "React", "Recharts", "Node.js"],
      github: "https://github.com"
    }
  ];

  return (
    <section id="projects" className="py-20 relative bg-solar-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Other <span className="gradient-text-purple">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Selection of software engineering and machine learning projects built with modern frameworks.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-solar-card border border-slate-800 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-400">
                    <Code className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.live && (
                      <a href={proj.live} className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-mono group-hover:text-purple-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {proj.desc}
                </p>
              </div>

              <div className="pt-6 flex flex-wrap gap-1.5 border-t border-slate-800 mt-4">
                {proj.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
