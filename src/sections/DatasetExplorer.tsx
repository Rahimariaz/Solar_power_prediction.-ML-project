import React, { useEffect, useState } from 'react';
import { Database, AlertCircle, Calendar, CheckCircle2 } from 'lucide-react';
import { DatasetInfoResponse } from '../types/prediction';
import { predictionApi } from '../services/predictionApi';

export const DatasetExplorer: React.FC = () => {
  const [dataInfo, setDataInfo] = useState<DatasetInfoResponse | null>(null);

  useEffect(() => {
    predictionApi.getDatasetInfo()
      .then(info => setDataInfo(info))
      .catch(() => setDataInfo(null));
  }, []);

  return (
    <section className="py-20 relative bg-solar-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Database className="w-3.5 h-3.5" />
            Telemetry Data Origin
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Dataset <span className="gradient-text-cyan">Explorer</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Authentic dataset metadata retrieved dynamically from backend dataset indexing service.
          </p>
        </div>

        {!dataInfo ? (
          <div className="p-12 rounded-3xl bg-solar-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              <AlertCircle className="w-8 h-8 text-amber-400/80" />
            </div>
            <p className="text-sm font-mono text-slate-300">
              Dataset statistics will appear after dataset processing.
            </p>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-solar-card border border-slate-800 backdrop-blur-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-slate-400">Dataset Name</span>
                <p className="text-base font-bold text-white font-mono">{dataInfo.dataset_name}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-slate-400">Merged Record Count</span>
                <p className="text-2xl font-extrabold text-amber-400 font-mono">
                  {dataInfo.total_records.toLocaleString()} <span className="text-xs text-slate-400">rows</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-slate-400">Collection Horizon</span>
                <p className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  {dataInfo.collection_period}
                </p>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
              <div className="space-y-2">
                <span className="text-slate-400 uppercase tracking-wider">Features Utilized:</span>
                <div className="flex flex-wrap gap-2">
                  {dataInfo.features.map(f => (
                    <span key={f} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 uppercase tracking-wider">Target Output Signal:</span>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-between">
                  <span>{dataInfo.target_variable}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
