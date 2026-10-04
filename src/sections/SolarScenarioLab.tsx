import React, { useState } from 'react';
import { FlaskConical, Sun, Sparkles, Loader2 } from 'lucide-react';
import { PredictionInputs, PredictionResponse } from '../types/prediction';
import { predictionApi } from '../services/predictionApi';

export const SolarScenarioLab: React.FC = () => {
  const [activePreset, setActivePreset] = useState<string>('High Irradiation Scenario');
  const [inputs, setInputs] = useState<PredictionInputs>({
    temperature: 32,
    humidity: 35,
    wind_speed: 4.5,
    irradiation: 1050
  });

  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    {
      name: 'Low Irradiation Scenario',
      desc: 'Early morning or overcast condition',
      inputs: { temperature: 18, humidity: 75, wind_speed: 1.5, irradiation: 180 },
      color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
    },
    {
      name: 'Moderate Irradiation Scenario',
      desc: 'Mid-morning or partial sun condition',
      inputs: { temperature: 25, humidity: 50, wind_speed: 3.2, irradiation: 580 },
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
    },
    {
      name: 'High Irradiation Scenario',
      desc: 'Peak noon clear sky condition',
      inputs: { temperature: 32, humidity: 35, wind_speed: 4.5, irradiation: 1050 },
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    }
  ];

  const handleSelectPreset = (preset: typeof presets[0]) => {
    setActivePreset(preset.name);
    setInputs(preset.inputs);
    setResult(null);
    setError(null);
  };

  const handleRunPresetPrediction = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await predictionApi.predict(inputs);
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'ML prediction service is currently unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 relative bg-solar-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <FlaskConical className="w-3.5 h-3.5" />
            Experimental Presets
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Solar Scenario <span className="gradient-text-cyan">Lab</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Select standard environmental presets to populate editable input parameters and query the trained backend model.
          </p>
        </div>

        {/* Presets Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleSelectPreset(preset)}
              className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                activePreset === preset.name
                  ? 'bg-solar-card border-amber-400 ring-2 ring-amber-400/20 shadow-xl'
                  : 'bg-solar-card/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${preset.color}`}>
                  {preset.name}
                </span>
                <p className="text-xs text-slate-300 font-normal">{preset.desc}</p>
                
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 border-t border-slate-800">
                  <span>Irrad: <strong className="text-white">{preset.inputs.irradiation} W/m²</strong></span>
                  <span>Temp: <strong className="text-white">{preset.inputs.temperature}°C</strong></span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Editable Scenario Inputs Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-solar-card border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Scenario Inputs (Editable)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Active: {activePreset}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Temp (°C)</label>
              <input
                type="number" value={inputs.temperature}
                onChange={(e) => setInputs(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 0 }))}
                className="glass-input w-full px-3 py-2 rounded-xl text-sm font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Humidity (%)</label>
              <input
                type="number" value={inputs.humidity}
                onChange={(e) => setInputs(prev => ({ ...prev, humidity: parseFloat(e.target.value) || 0 }))}
                className="glass-input w-full px-3 py-2 rounded-xl text-sm font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Wind (m/s)</label>
              <input
                type="number" value={inputs.wind_speed}
                onChange={(e) => setInputs(prev => ({ ...prev, wind_speed: parseFloat(e.target.value) || 0 }))}
                className="glass-input w-full px-3 py-2 rounded-xl text-sm font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Irradiation (W/m²)</label>
              <input
                type="number" value={inputs.irradiation}
                onChange={(e) => setInputs(prev => ({ ...prev, irradiation: parseFloat(e.target.value) || 0 }))}
                className="glass-input w-full px-3 py-2 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={handleRunPresetPrediction}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-mono font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Execute Real API Prediction</span>
            </button>

            {result && (
              <div className="text-sm font-mono text-white flex items-center gap-2">
                <span>Predicted Output:</span>
                <span className="text-xl font-extrabold text-amber-400">{result.prediction.toFixed(2)} kW</span>
              </div>
            )}
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-mono pt-2">{error}</p>
          )}
        </div>

      </div>
    </section>
  );
};
