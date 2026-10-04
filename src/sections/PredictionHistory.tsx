import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Search, Trash2, ArrowUpDown, Calendar, Zap, Eye, Sparkles } from 'lucide-react';
import { SavedPrediction } from '../types/prediction';
import { getStoredHistory, deleteHistoryItem, clearAllHistory } from '../utils/helpers';

interface PredictionHistoryProps {
  lastPrediction?: any;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({ lastPrediction }) => {
  const [history, setHistory] = useState<SavedPrediction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [selectedItem, setSelectedItem] = useState<SavedPrediction | null>(null);

  const loadHistory = () => {
    setHistory(getStoredHistory());
  };

  useEffect(() => {
    loadHistory();
  }, [lastPrediction]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setHistory(updated);
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all prediction history?')) {
      const updated = clearAllHistory();
      setHistory(updated);
      setSelectedItem(null);
    }
  };

  // Filter & Sort
  const filteredHistory = history
    .filter(item => {
      const query = searchQuery.toLowerCase();
      const dateStr = new Date(item.timestamp).toLocaleString().toLowerCase();
      const valStr = item.prediction.toString();
      const modelStr = item.model.toLowerCase();
      return dateStr.includes(query) || valStr.includes(query) || modelStr.includes(query);
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortBy === 'highest') {
        return b.prediction - a.prediction;
      } else {
        return a.prediction - b.prediction;
      }
    });

  return (
    <section id="history" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <History className="w-3.5 h-3.5" />
            Audit Trail
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Prediction <span className="gradient-text-solar">History</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Audit log of authentic inference results executed on the Random Forest ML backend.
          </p>
        </div>

        {/* Controls Bar: Search, Sort, Clear */}
        <div className="p-4 rounded-2xl bg-solar-card border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full pl-9 pr-4 py-2 rounded-xl text-xs font-mono"
            />
          </div>

          {/* Sort & Clear */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="glass-input px-3 py-1.5 rounded-lg text-xs"
              >
                <option value="newest">Newest First</option>
                <option value="highest">Highest Power</option>
                <option value="lowest">Lowest Power</option>
              </select>
            </div>

            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

        </div>

        {/* History Table / Empty State */}
        {filteredHistory.length === 0 ? (
          <div className="p-12 rounded-3xl bg-solar-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              <Sparkles className="w-8 h-8 text-amber-400/50" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">
              No Predictions Recorded Yet
            </h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Run your first prediction to build your history.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* History Records List */}
            <div className={`space-y-3 ${selectedItem ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              <AnimatePresence>
                {filteredHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedItem?.id === item.id
                        ? 'bg-slate-900 border-amber-400 ring-1 ring-amber-400/30'
                        : 'bg-solar-card border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white font-mono">
                          {item.prediction.toFixed(2)} <span className="text-xs text-amber-400">kW</span>
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {item.inputs.irradiation} W/m²
                      </span>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Selected Item Detail Card */}
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-5 p-6 rounded-2xl bg-solar-card border border-amber-500/30 backdrop-blur-xl space-y-4 sticky top-24"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Record Inspection
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">ID: {selectedItem.id.substring(0, 8)}</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 font-mono">Real Predicted Power</span>
                    <p className="text-3xl font-extrabold text-white font-mono mt-1">
                      {selectedItem.prediction.toFixed(2)} <span className="text-amber-400 text-sm">kW</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      Temp: <strong className="text-white">{selectedItem.inputs.temperature}°C</strong>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      Humidity: <strong className="text-white">{selectedItem.inputs.humidity}%</strong>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      Wind: <strong className="text-white">{selectedItem.inputs.wind_speed} m/s</strong>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      Irrad: <strong className="text-white">{selectedItem.inputs.irradiation} W/m²</strong>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1">
                    <p>Model: <span className="text-slate-200">{selectedItem.model}</span></p>
                    <p>Timestamp: <span className="text-slate-200">{new Date(selectedItem.timestamp).toISOString()}</span></p>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
