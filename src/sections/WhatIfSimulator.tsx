import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Loader2, AlertTriangle } from 'lucide-react';
import { PredictionInputs, PredictionResponse, ApiHealthResponse } from '../types/prediction';
import { predictionApi } from '../services/predictionApi';

interface WhatIfSimulatorProps {
  health: ApiHealthResponse;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({  }) => {
  const [scenarioAInputs, setScenarioAInputs] = useState<PredictionInputs>({
    temperature: 25,
    humidity: 50,
    wind_speed: 3.0,
    irradiation: 450
  });

  const [scenarioBInputs, setScenarioBInputs] = useState<PredictionInputs>({
    temperature: 25,
    humidity: 50,
    wind_speed: 3.0,
    irradiation: 950
  });

  const [resultA, setResultA] = useState<PredictionResponse | null>(null);
  const [resultB, setResultB] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Execute BOTH requests against the REAL ML API concurrently
      const [resA, resB] = await Promise.all([
        predictionApi.predict(scenarioAInputs),
        predictionApi.predict(scenarioBInputs)
      ]);

      setResultA(resA);
      setResultB(resB);
    } catch (err: any) {
      setResultA(null);
      setResultB(null);
      setError(err?.message || 'ML prediction service is currently unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const diffKw = resultA && resultB ? (resultB.prediction - resultA.prediction) : 0;
  const percentageChange = resultA && resultA.prediction > 0 
    ? ((diffKw / resultA.prediction) * 100) 
    : (resultB && resultB.prediction > 0 ? 100 : 0);

  return (
    <section id="simulator" className="py-20 relative bg-solar-dark/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400">
            <GitCompare className="w-3.5 h-3.5" />
            Interactive Sensitivity Analysis
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Solar <span className="gradient-text-purple">What-If Simulator</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Compare two distinct environmental condition sets side-by-side. Both scenarios are queried live from the real Random Forest ML model API.
          </p>
        </div>

        {/* Form Inputs Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Scenario A Inputs */}
          <div className="p-6 rounded-2xl bg-solar-card border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Scenario A — Base Conditions
              </h3>
              <span className="text-xs text-cyan-400 font-mono">Baseline</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Irradiation (W/m²): <span className="text-white font-mono">{scenarioAInputs.irradiation}</span></label>
                <input
                  type="range" min="0" max="1400" step="10"
                  value={scenarioAInputs.irradiation}
                  onChange={(e) => setScenarioAInputs(prev => ({ ...prev, irradiation: parseFloat(e.target.value) }))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400">Temperature (°C): <span className="text-white font-mono">{scenarioAInputs.temperature}</span></label>
                <input
                  type="range" min="0" max="55" step="0.5"
                  value={scenarioAInputs.temperature}
                  onChange={(e) => setScenarioAInputs(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400">Humidity (%): <span className="text-white font-mono">{scenarioAInputs.humidity}</span></label>
                  <input
                    type="number" min="0" max="100" value={scenarioAInputs.humidity}
                    onChange={(e) => setScenarioAInputs(prev => ({ ...prev, humidity: parseFloat(e.target.value) || 0 }))}
                    className="glass-input w-full px-2 py-1 rounded text-right font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Wind (m/s): <span className="text-white font-mono">{scenarioAInputs.wind_speed}</span></label>
                  <input
                    type="number" min="0" max="25" step="0.1" value={scenarioAInputs.wind_speed}
                    onChange={(e) => setScenarioAInputs(prev => ({ ...prev, wind_speed: parseFloat(e.target.value) || 0 }))}
                    className="glass-input w-full px-2 py-1 rounded text-right font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scenario B Inputs */}
          <div className="p-6 rounded-2xl bg-solar-card border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Scenario B — Modified Conditions
              </h3>
              <span className="text-xs text-amber-400 font-mono">Alternative</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Irradiation (W/m²): <span className="text-white font-mono">{scenarioBInputs.irradiation}</span></label>
                <input
                  type="range" min="0" max="1400" step="10"
                  value={scenarioBInputs.irradiation}
                  onChange={(e) => setScenarioBInputs(prev => ({ ...prev, irradiation: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400">Temperature (°C): <span className="text-white font-mono">{scenarioBInputs.temperature}</span></label>
                <input
                  type="range" min="0" max="55" step="0.5"
                  value={scenarioBInputs.temperature}
                  onChange={(e) => setScenarioBInputs(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400">Humidity (%): <span className="text-white font-mono">{scenarioBInputs.humidity}</span></label>
                  <input
                    type="number" min="0" max="100" value={scenarioBInputs.humidity}
                    onChange={(e) => setScenarioBInputs(prev => ({ ...prev, humidity: parseFloat(e.target.value) || 0 }))}
                    className="glass-input w-full px-2 py-1 rounded text-right font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Wind (m/s): <span className="text-white font-mono">{scenarioBInputs.wind_speed}</span></label>
                  <input
                    type="number" min="0" max="25" step="0.1" value={scenarioBInputs.wind_speed}
                    onChange={(e) => setScenarioBInputs(prev => ({ ...prev, wind_speed: parseFloat(e.target.value) || 0 }))}
                    className="glass-input w-full px-2 py-1 rounded text-right font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleSimulate}
            disabled={isLoading}
            className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 shadow-lg shadow-purple-600/30 transition-all flex items-center gap-3 cursor-pointer font-mono text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Running Dual API Predictions...</span>
              </>
            ) : (
              <>
                <GitCompare className="w-5 h-5 text-purple-300" />
                <span>Run What-If Comparison</span>
              </>
            )}
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-sm max-w-xl mx-auto mb-8 text-center flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Results Comparison Output */}
        {resultA && resultB && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-solar-card border border-purple-500/30 backdrop-blur-xl shadow-2xl space-y-6"
          >
            <h4 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-semibold text-center">
              Real API Comparison Results
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Scenario A Result */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-center space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold">Scenario A Actual Prediction</span>
                <p className="text-3xl font-extrabold font-mono text-white">
                  {resultA.prediction.toFixed(2)} <span className="text-sm text-cyan-400">kW</span>
                </p>
                <p className="text-[11px] text-slate-400 font-mono">Irrad: {resultA.input_summary.irradiation} W/m²</p>
              </div>

              {/* Difference Delta */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 text-center space-y-2 shadow-inner">
                <span className="text-xs font-mono text-purple-300 font-semibold uppercase">Calculated Delta</span>
                <p className={`text-3xl font-extrabold font-mono ${diffKw >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {diffKw >= 0 ? `+${diffKw.toFixed(2)}` : diffKw.toFixed(2)} <span className="text-sm">kW</span>
                </p>
                <p className="text-xs font-mono text-slate-300">
                  {percentageChange >= 0 ? `+${percentageChange.toFixed(1)}%` : `${percentageChange.toFixed(1)}%`} shift
                </p>
              </div>

              {/* Scenario B Result */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 text-center space-y-2">
                <span className="text-xs font-mono text-amber-400 font-semibold">Scenario B Actual Prediction</span>
                <p className="text-3xl font-extrabold font-mono text-white">
                  {resultB.prediction.toFixed(2)} <span className="text-sm text-amber-400">kW</span>
                </p>
                <p className="text-[11px] text-slate-400 font-mono">Irrad: {resultB.input_summary.irradiation} W/m²</p>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
