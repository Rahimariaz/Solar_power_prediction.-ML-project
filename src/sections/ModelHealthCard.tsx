import React from 'react';
import { Activity, Cpu, Server, Clock } from 'lucide-react';
import { ApiHealthResponse } from '../types/prediction';

interface ModelHealthCardProps {
  health: ApiHealthResponse;
  lastPredictionTime?: string | null;
}

export const ModelHealthCard: React.FC<ModelHealthCardProps> = ({ health, lastPredictionTime }) => {
  const isOnline = health.status === 'online';
  const isModelLoaded = health.model_loaded;

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-6 sm:p-8 rounded-3xl bg-solar-card border border-slate-800 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              ML Infrastructure & Endpoint Monitoring
            </h3>
            <span className="text-xs font-mono text-slate-400">Live Diagnostics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            
            {/* ML API */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-cyan-400" /> REST API Host
              </span>
              <div className="flex items-center gap-2 font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                <span className={isOnline ? 'text-emerald-400' : 'text-rose-400'}>
                  {isOnline ? '● Online' : '● Offline'}
                </span>
              </div>
            </div>

            {/* Prediction Endpoint */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" /> POST /predict Endpoint
              </span>
              <div className="flex items-center gap-2 font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                <span className={isOnline ? 'text-emerald-400' : 'text-rose-400'}>
                  {isOnline ? '● Available' : '● Unavailable'}
                </span>
              </div>
            </div>

            {/* Model Loaded */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Random Forest Model
              </span>
              <div className="flex items-center gap-2 font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${isModelLoaded ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                <span className={isModelLoaded ? 'text-emerald-400' : 'text-rose-400'}>
                  {isModelLoaded ? '● Loaded' : '● Unavailable'}
                </span>
              </div>
            </div>

            {/* Last Prediction */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Last Inference Timestamp
              </span>
              <p className="text-slate-200 font-bold truncate">
                {lastPredictionTime ? new Date(lastPredictionTime).toLocaleTimeString() : 'None Yet'}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
