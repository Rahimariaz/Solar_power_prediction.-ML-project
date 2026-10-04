import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Award } from 'lucide-react';

interface GaugeChartProps {
  value: number; // in kW
  maxCapacity?: number; // default 1450 kW based on plant dataset
  modelName?: string;
  timestamp?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxCapacity = 1450,
  modelName = 'Random Forest Regressor',
  timestamp
}) => {
  const clampedValue = Math.min(Math.max(0, value), maxCapacity);
  const percentage = (clampedValue / maxCapacity) * 100;
  
  // Angle scale: -90 deg (0 kW) to +90 deg (maxCapacity kW)
  const angle = -90 + (percentage / 100) * 180;

  // Determine status label & color
  let tierLabel = 'Low Output';
  let tierColor = 'text-slate-400';
  let tierBorder = 'border-slate-700';

  if (percentage >= 75) {
    tierLabel = 'Optimal Peak Power';
    tierColor = 'text-amber-400';
    tierBorder = 'border-amber-500/40 bg-amber-500/10';
  } else if (percentage >= 45) {
    tierLabel = 'Moderate Generation';
    tierColor = 'text-cyan-400';
    tierBorder = 'border-cyan-500/40 bg-cyan-500/10';
  } else if (percentage > 5) {
    tierLabel = 'Low Photovoltaic Current';
    tierColor = 'text-indigo-400';
    tierBorder = 'border-indigo-500/40 bg-indigo-500/10';
  } else {
    tierLabel = 'Minimal / Zero Power';
    tierColor = 'text-slate-400';
    tierBorder = 'border-slate-700 bg-slate-900/60';
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Title Header */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-amber-400" />
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold">
          Predicted Solar Power
        </span>
      </div>

      {/* SVG Arc Gauge */}
      <div className="relative w-64 h-36 flex items-center justify-center">
        <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="40%" stopColor="#06B6D4" />
              <stop offset="70%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1E293B"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Active Gradient Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="251.3"
            strokeDashoffset={251.3 - (251.3 * percentage) / 100}
            filter="url(#glow)"
            className="transition-all duration-1000 ease-out"
          />

          {/* Dial Needle */}
          <g transform={`rotate(${angle} 100 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="#FACC15"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="8" fill="#0B0F19" stroke="#FACC15" strokeWidth="3" />
          </g>

          {/* Tick Markers */}
          <text x="15" y="108" fill="#64748B" fontSize="10" fontFamily="monospace">0 kW</text>
          <text x="100" y="18" fill="#64748B" fontSize="10" fontFamily="monospace" textAnchor="middle">{(maxCapacity / 2).toFixed(0)}</text>
          <text x="185" y="108" fill="#64748B" fontSize="10" fontFamily="monospace" textAnchor="end">{maxCapacity}</text>
        </svg>

        {/* Center Display Value */}
        <div className="absolute bottom-0 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={value}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-4xl font-extrabold font-mono text-white tracking-tight flex items-baseline gap-1"
          >
            {value.toFixed(2)}
            <span className="text-lg text-amber-400 font-semibold">kW</span>
          </motion.div>
        </div>
      </div>

      {/* Tier & Details Footer */}
      <div className="w-full mt-6 space-y-3">
        <div className={`w-full py-1.5 px-3 rounded-lg border text-center text-xs font-mono font-semibold ${tierBorder} ${tierColor}`}>
          {tierLabel} • {(percentage).toFixed(1)}% Capacity
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800">
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            {modelName}
          </span>
          {timestamp && (
            <span>
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
