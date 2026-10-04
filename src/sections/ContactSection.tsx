import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Mail className="w-3.5 h-3.5" />
            Connect & Collaborate
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Get in <span className="gradient-text-cyan">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Interested in AI research, renewable energy machine learning, or software collaboration? Send a direct message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Social Links */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-solar-card border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold font-mono text-white">Contact & Profiles</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Feel free to reach out for machine learning projects, software engineering opportunities, or technical inquiries.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white font-mono block">GitHub</span>
                    <span className="text-xs text-slate-400">View code repositories & projects</span>
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-400/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 text-cyan-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white font-mono block">LinkedIn</span>
                    <span className="text-xs text-slate-400">Connect professionally</span>
                  </div>
                </div>
              </a>

              <a
                href="mailto:contact@solarpulse.ai"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-400/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 text-purple-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white font-mono block">Email</span>
                    <span className="text-xs text-slate-400">Direct email inquiry</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-solar-card border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
            <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              Send a Message
            </h3>

            {sent ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold font-mono text-white">Message Sent Successfully!</h4>
                <p className="text-xs">Thank you for your message. I will respond as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold font-mono text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
