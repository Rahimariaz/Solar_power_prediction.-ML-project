import React, { useEffect, useState } from 'react';
import { Award, AlertCircle, BarChart2 } from 'lucide-react';
import { ModelInfoResponse } from '../types/prediction';
import { predictionApi } from '../services/predictionApi';

export const ModelPerformance: React.FC = () => {
  const [modelInfo, setModelInfo] = useState<ModelInfoResponse | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    predictionApi.getModelInfo()
      .then(info => setModelInfo(info))
      .catch(() => setModelInfo(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <Award className="w-3.5 h-3.5" />
            Verified Metrics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Model <span className="gradient-text-solar">Performance</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Real cross-validated evaluation metrics fetched directly from the ML REST backend.
          </p>
        </div>

        {/* Content or Empty State */}
        {!modelInfo ? (
          <div className="p-12 rounded-3xl bg-solar-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              <AlertCircle className="w-8 h-8 text-amber-400/80" />
            </div>
            <p className="text-sm font-mono text-slate-300">
              Model performance metrics will appear after the trained model is connected.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Core Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-solar-card border border-slate-800 text-center space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Algorithm</span>
                <p className="text-xl font-bold font-mono text-white">{modelInfo.model}</p>
              </div>

              <div className="p-6 rounded-2xl bg-solar-card border border-emerald-500/30 text-center space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase">R² Determination Score</span>
                <p className="text-3xl font-extrabold font-mono text-emerald-400">{modelInfo.r2_score}</p>
              </div>

              <div className="p-6 rounded-2xl bg-solar-card border border-amber-500/30 text-center space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase">Mean Absolute Error (MAE)</span>
                <p className="text-3xl font-extrabold font-mono text-amber-400">{modelInfo.mae} <span className="text-sm">kW</span></p>
              </div>

              <div className="p-6 rounded-2xl bg-solar-card border border-cyan-500/30 text-center space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase">Training Samples</span>
                <p className="text-3xl font-extrabold font-mono text-cyan-400">{modelInfo.training_samples.toLocaleString()}</p>
              </div>

            </div>

            {/* Feature Importances Breakdown */}
            {modelInfo.feature_importances && (
              <div className="p-8 rounded-3xl bg-solar-card border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-amber-400" />
                    Feature Importances (Random Forest Gini Impurity reduction)
                  </h3>
                </div>

                <div className="space-y-4">
                  {Object.entries(modelInfo.feature_importances).map(([feat, weight]) => (
                    <div key={feat} className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-slate-300">
                        <span className="capitalize">{feat.replace('_', ' ')}</span>
                        <span className="text-amber-400 font-bold">{(weight * 100).toFixed(2)}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                          style={{ width: `${Math.max(2, weight * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
