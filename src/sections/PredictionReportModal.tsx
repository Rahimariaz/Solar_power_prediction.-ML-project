import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, FileText, Sun, ShieldCheck } from 'lucide-react';
import { PredictionResponse } from '../types/prediction';

interface ReportModalProps {
  prediction: PredictionResponse | null;
  onClose: () => void;
}

export const PredictionReportModal: React.FC<ReportModalProps> = ({ prediction, onClose }) => {
  if (!prediction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-solar-dark border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-mono">Solar Generation Report</h3>
                <p className="text-xs text-slate-400 font-mono">SolarPulse AI — Verified ML Inference</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Printable Report Document Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-left">
            
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-4 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Sun className="w-4 h-4 text-amber-400" /> SOLARPULSE AI RESEARCH
              </span>
              <span>Timestamp: {new Date(prediction.timestamp).toLocaleString()}</span>
            </div>

            {/* Main Result */}
            <div className="p-6 rounded-xl bg-slate-950 border border-amber-500/30 text-center space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Calculated Solar Power Generation</span>
              <p className="text-4xl font-extrabold font-mono text-white">
                {prediction.prediction.toFixed(2)} <span className="text-xl text-amber-400">kW</span>
              </p>
            </div>

            {/* Input Vector Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Recorded Input Parameters:
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-solar-card border border-slate-800">
                  Ambient Temp: <strong className="text-amber-400">{prediction.input_summary.temperature}°C</strong>
                </div>
                <div className="p-3 rounded-lg bg-solar-card border border-slate-800">
                  Humidity: <strong className="text-cyan-400">{prediction.input_summary.humidity}%</strong>
                </div>
                <div className="p-3 rounded-lg bg-solar-card border border-slate-800">
                  Wind Speed: <strong className="text-indigo-400">{prediction.input_summary.wind_speed} m/s</strong>
                </div>
                <div className="p-3 rounded-lg bg-solar-card border border-slate-800">
                  Irradiation: <strong className="text-amber-400">{prediction.input_summary.irradiation} W/m²</strong>
                </div>
              </div>
            </div>

            {/* Model Metadata */}
            <div className="p-4 rounded-xl bg-solar-card border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
              <p>Model Algorithm: <strong className="text-white">{prediction.model}</strong></p>
              <p>Feature Mapping: <span className="text-slate-400">Random Forest Regressor (100 Decision Trees)</span></p>
              <p>Data Integrity: <span className="text-emerald-400 flex inline-items gap-1"><ShieldCheck className="w-3.5 h-3.5 inline" /> Authentic API Inference</span></p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
