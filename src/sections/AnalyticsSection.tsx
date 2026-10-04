import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ScatterChart, Scatter, CartesianGrid } from 'recharts';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { SavedPrediction } from '../types/prediction';
import { getStoredHistory } from '../utils/helpers';

export const AnalyticsSection: React.FC = () => {
  const [history, setHistory] = useState<SavedPrediction[]>([]);

  useEffect(() => {
    setHistory(getStoredHistory());
  }, []);

  const hasData = history.length >= 2;

  // Prepare chart data from real history only
  const timeSeriesData = history.map((item, idx) => ({
    index: idx + 1,
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    power: item.prediction,
    irradiation: item.inputs.irradiation,
    temperature: item.inputs.temperature
  })).reverse();

  const scatterData = history.map((item) => ({
    irradiation: item.inputs.irradiation,
    power: item.prediction,
    temperature: item.inputs.temperature
  }));

  return (
    <section id="analytics" className="py-20 relative bg-solar-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <BarChart3 className="w-3.5 h-3.5" />
            Empirical Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Analytics <span className="gradient-text-cyan">Dashboard</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Visual analytics generated strictly from authentic user prediction history. Zero fabricated data points.
          </p>
        </div>

        {/* Empty state if insufficient data */}
        {!hasData ? (
          <div className="p-12 rounded-3xl bg-solar-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400">
              <AlertCircle className="w-8 h-8 text-amber-400/80" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">
              Insufficient Data for Analytics
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              More real predictions are required to generate analytics. Run at least 2 predictions in the Live Solar Prediction Center.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Time Series Power Generation */}
            <div className="p-6 rounded-2xl bg-solar-card border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Prediction Sequence (kW Output)
                </h3>
                <span className="text-xs text-slate-400 font-mono">{history.length} Samples</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748B" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" unit=" kW" />
                    <Tooltip
                      contentStyle={{ background: '#0B0F19', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="power" stroke="#FACC15" strokeWidth={2} fillOpacity={1} fill="url(#powerGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Irradiation vs Predicted Power */}
            <div className="p-6 rounded-2xl bg-solar-card border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Irradiation (W/m²) vs Predicted Power (kW)
                </h3>
                <span className="text-xs text-cyan-400 font-mono">Scatter Profile</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="irradiation" name="Irradiation" unit=" W/m²" stroke="#64748B" fontSize={11} fontFamily="monospace" />
                    <YAxis dataKey="power" name="Power" unit=" kW" stroke="#64748B" fontSize={11} fontFamily="monospace" />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ background: '#0B0F19', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Scatter data={scatterData} fill="#06B6D4" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
