import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Thermometer, Droplets, Wind, Sun, Info, AlertTriangle, Loader2, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { PredictionInputs, PredictionResponse, ApiHealthResponse } from '../types/prediction';
import { predictionApi } from '../services/predictionApi';
import { GaugeChart } from '../components/GaugeChart';
import { getConditionInsights, savePredictionToHistory } from '../utils/helpers';

interface PredictionCenterProps {
  health: ApiHealthResponse;
  onPredictionSuccess?: (res: PredictionResponse) => void;
  onOpenReportModal?: (res: PredictionResponse) => void;
}

export const PredictionCenter: React.FC<PredictionCenterProps> = ({
  onPredictionSuccess,
  onOpenReportModal
}) => {
  const [inputs, setInputs] = useState<PredictionInputs>({
    temperature: 28,
    humidity: 45,
    wind_speed: 3.5,
    irradiation: 850
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof PredictionInputs, val: number) => {
    setInputs(prev => ({ ...prev, [field]: val }));
    setError(null);
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send inputs to REAL ML backend POST /predict
      const res = await predictionApi.predict(inputs);
      setResult(res);
      savePredictionToHistory(res);
      if (onPredictionSuccess) {
        onPredictionSuccess(res);
      }
    } catch (err: any) {
      setResult(null);
      setError(err?.message || 'ML prediction service is currently unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const insights = result ? getConditionInsights(result.input_summary) : [];

  return (
    <section id="prediction" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Play className="w-3.5 h-3.5 fill-amber-400" />
            Live Machine Learning Console
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Solar Intelligence <span className="gradient-text-solar">Center</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Enter current environmental conditions to generate a real Random Forest ML prediction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Environmental Inputs */}
          <div className="lg:col-span-7 bg-solar-card border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" />
                Environmental Parameters
              </h3>
              <span className="text-xs text-slate-400 font-mono">4 Features</span>
            </div>

            <form onSubmit={handlePredict} className="space-y-6">
              
              {/* Temperature */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="temp-input" className="font-semibold text-slate-200 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-rose-400" />
                    Ambient Temperature (°C)
                  </label>
                  <span className="font-mono text-amber-400 font-bold">{inputs.temperature} °C</span>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="55"
                    step="0.5"
                    value={inputs.temperature}
                    onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                    className="col-span-8 accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <input
                    id="temp-input"
                    type="number"
                    min="0"
                    max="55"
                    step="0.5"
                    value={inputs.temperature}
                    onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value) || 0)}
                    className="col-span-4 glass-input px-3 py-2 rounded-xl text-right font-mono text-sm"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Standard range: 0°C to 55°C</p>
              </div>

              {/* Humidity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="humidity-input" className="font-semibold text-slate-200 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    Relative Humidity (%)
                  </label>
                  <span className="font-mono text-cyan-400 font-bold">{inputs.humidity} %</span>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={inputs.humidity}
                    onChange={(e) => handleInputChange('humidity', parseFloat(e.target.value))}
                    className="col-span-8 accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <input
                    id="humidity-input"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={inputs.humidity}
                    onChange={(e) => handleInputChange('humidity', parseFloat(e.target.value) || 0)}
                    className="col-span-4 glass-input px-3 py-2 rounded-xl text-right font-mono text-sm"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Standard range: 0% to 100%</p>
              </div>

              {/* Wind Speed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="wind-input" className="font-semibold text-slate-200 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-indigo-400" />
                    Wind Speed (m/s)
                  </label>
                  <span className="font-mono text-indigo-400 font-bold">{inputs.wind_speed} m/s</span>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="0.1"
                    value={inputs.wind_speed}
                    onChange={(e) => handleInputChange('wind_speed', parseFloat(e.target.value))}
                    className="col-span-8 accent-indigo-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <input
                    id="wind-input"
                    type="number"
                    min="0"
                    max="25"
                    step="0.1"
                    value={inputs.wind_speed}
                    onChange={(e) => handleInputChange('wind_speed', parseFloat(e.target.value) || 0)}
                    className="col-span-4 glass-input px-3 py-2 rounded-xl text-right font-mono text-sm"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Standard range: 0 to 25 m/s</p>
              </div>

              {/* Solar Irradiation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="irrad-input" className="font-semibold text-slate-200 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    Solar Irradiation (W/m²)
                  </label>
                  <span className="font-mono text-amber-400 font-bold">{inputs.irradiation} W/m²</span>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="1400"
                    step="10"
                    value={inputs.irradiation}
                    onChange={(e) => handleInputChange('irradiation', parseFloat(e.target.value))}
                    className="col-span-8 accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <input
                    id="irrad-input"
                    type="number"
                    min="0"
                    max="1400"
                    step="10"
                    value={inputs.irradiation}
                    onChange={(e) => handleInputChange('irradiation', parseFloat(e.target.value) || 0)}
                    className="col-span-4 glass-input px-3 py-2 rounded-xl text-right font-mono text-sm"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Peak sunlight ~ 1000 W/m²</p>
              </div>

              {/* Submit Predict Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:brightness-110 shadow-xl shadow-amber-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Executing ML Prediction...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Predict Solar Power</span>
                  </>
                )}
              </button>

            </form>

          </div>

          {/* Right Display: Real API Prediction Result & Gauge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Error banner if API is offline or returns error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 space-y-2 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 font-bold font-mono text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span>API Connection Error</span>
                  </div>
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prediction Result Display */}
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Gauge Chart */}
                <GaugeChart
                  value={result.prediction}
                  modelName={result.model}
                  timestamp={result.timestamp}
                />

                {/* Input Summary Card */}
                <div className="p-5 rounded-2xl bg-solar-card border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                    <span>Model Input Vector</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      Temp: <span className="text-amber-400 font-bold">{result.input_summary.temperature}°C</span>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      Humidity: <span className="text-cyan-400 font-bold">{result.input_summary.humidity}%</span>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      Wind: <span className="text-indigo-400 font-bold">{result.input_summary.wind_speed} m/s</span>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      Irrad: <span className="text-amber-400 font-bold">{result.input_summary.irradiation} W/m²</span>
                    </div>
                  </div>

                  {onOpenReportModal && (
                    <button
                      onClick={() => onOpenReportModal(result)}
                      className="w-full mt-2 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-mono font-semibold text-slate-200 hover:text-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>Generate Prediction Report</span>
                    </button>
                  )}
                </div>

                {/* Condition-Based Insights */}
                {insights.length > 0 && (
                  <div className="p-5 rounded-2xl bg-solar-card border border-slate-800 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      <span>Condition-based insight</span>
                    </h4>
                    <div className="space-y-2">
                      {insights.map((ins, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs space-y-1">
                          <p className="font-bold text-white font-mono">{ins.title}</p>
                          <p className="text-slate-400">{ins.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Empty state before user runs prediction */
              <div className="p-8 rounded-3xl bg-solar-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <Sun className="w-8 h-8 text-amber-400/60 animate-spin-slow" />
                </div>
                <h4 className="text-lg font-bold text-white font-mono">
                  Ready for Real ML Prediction
                </h4>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                  Adjust the environmental sliders on the left and click <span className="text-amber-400 font-semibold">Predict Solar Power</span> to execute inference on the backend model.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
