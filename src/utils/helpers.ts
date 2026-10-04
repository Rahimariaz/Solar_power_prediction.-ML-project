import { PredictionInputs, SavedPrediction, PredictionResponse } from '../types/prediction';

const HISTORY_STORAGE_KEY = 'solarpulse_prediction_history_v1';

/**
 * Loads prediction history saved strictly from real API predictions.
 */
export function getStoredHistory(): SavedPrediction[] {
  try {
    const data = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Saves a new successful real API prediction to localStorage history.
 */
export function savePredictionToHistory(response: PredictionResponse): SavedPrediction[] {
  const current = getStoredHistory();
  const newItem: SavedPrediction = {
    id: `pred_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: response.timestamp,
    inputs: response.input_summary,
    prediction: response.prediction,
    unit: response.unit || 'kW',
    model: response.model || 'Random Forest Regressor'
  };

  const updated = [newItem, ...current];
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save prediction to localStorage', err);
  }
  return updated;
}

/**
 * Deletes a single item from history.
 */
export function deleteHistoryItem(id: string): SavedPrediction[] {
  const current = getStoredHistory();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to update localStorage history', err);
  }
  return updated;
}

/**
 * Clears all history.
 */
export function clearAllHistory(): SavedPrediction[] {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear localStorage history', err);
  }
  return [];
}

export interface ConditionInsight {
  type: 'favorable' | 'moderate' | 'warning' | 'info';
  title: string;
  description: string;
}

/**
 * Generates transparent condition-based insights strictly based on user-entered environmental conditions.
 */
export function getConditionInsights(inputs: PredictionInputs): ConditionInsight[] {
  const insights: ConditionInsight[] = [];

  // Irradiation insights
  if (inputs.irradiation >= 800) {
    insights.push({
      type: 'favorable',
      title: 'High Solar Irradiation Detected',
      description: `Current irradiation level (${inputs.irradiation} W/m²) provides strong photon flux for peak photovoltaic generation.`
    });
  } else if (inputs.irradiation >= 400) {
    insights.push({
      type: 'moderate',
      title: 'Moderate Solar Irradiation',
      description: `Irradiation level (${inputs.irradiation} W/m²) represents typical daytime generation potential.`
    });
  } else if (inputs.irradiation > 0) {
    insights.push({
      type: 'warning',
      title: 'Low Solar Irradiation',
      description: `Irradiation level (${inputs.irradiation} W/m²) is low, typical of early morning, late evening, or heavy cloud cover.`
    });
  } else {
    insights.push({
      type: 'warning',
      title: 'Zero Irradiation (Nighttime / Eclipse)',
      description: 'Zero solar irradiation entered. PV cells produce zero current in the absence of sunlight.'
    });
  }

  // Temperature insights (Thermal derating effect on PV panel efficiency)
  if (inputs.temperature >= 35) {
    insights.push({
      type: 'warning',
      title: 'High Temperature Thermal Loss',
      description: `Ambient temperature (${inputs.temperature}°C) may cause thermal derating of solar cell voltage output.`
    });
  } else if (inputs.temperature >= 15 && inputs.temperature <= 25) {
    insights.push({
      type: 'favorable',
      title: 'Optimal Operating Temperature',
      description: `Temperature (${inputs.temperature}°C) is close to Standard Test Conditions (STC 25°C), preserving maximum cell efficiency.`
    });
  }

  // Wind speed cooling benefit
  if (inputs.wind_speed >= 4.0 && inputs.temperature >= 25) {
    insights.push({
      type: 'favorable',
      title: 'Convective Wind Cooling',
      description: `Wind speed (${inputs.wind_speed} m/s) helps cool PV module surface temperature, offsetting heat derating.`
    });
  }

  // Humidity impact
  if (inputs.humidity >= 85) {
    insights.push({
      type: 'info',
      title: 'High Moisture Absorption',
      description: `Relative humidity (${inputs.humidity}%) indicates high airborne moisture content which can slightly scatter solar rays.`
    });
  }

  return insights;
}
